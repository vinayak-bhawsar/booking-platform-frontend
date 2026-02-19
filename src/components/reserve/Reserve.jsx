import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Reserve = ({ setOpen, hotelId, hotel }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);

  const { data } = useFetch(`/hotels/room/${hotelId}`);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;

    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const handleClick = async () => {
    if (!user) {
      navigate("/login");
      return;
    }

    if (selectedRooms.length === 0) {
      alert("Please select at least one room.");
      return;
    }

    try {
      const pricePerRoom = data?.[0]?.price || 0;
      const totalPrice = selectedRooms.length * pricePerRoom;

      await axios.post(
        "https://booking-platform-w5pg.onrender.com/api/bookings",
        {
          hotelId,
          hotelName: hotel?.name,
          rooms: selectedRooms,
          totalPrice,
        },
        { withCredentials: true }
      );

      alert("Booking successful 🎉");
      setOpen(false);
      navigate("/my-bookings");
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />

        <span>Select your rooms:</span>

        {data?.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">${item.price}</div>
            </div>

            <div className="rSelectRooms">
              {item.roomNumbers?.map((roomNumber) => (
                <div className="room" key={roomNumber._id}>
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;