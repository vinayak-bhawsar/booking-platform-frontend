import "./myBookings.css";
import Navbar from "../../components/navbar/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          "https://booking-platform-w5pg.onrender.com/api/bookings/my-bookings",
          { withCredentials: true }
        );
        setBookings(res.data);
      } catch (err) {
        console.log(err);
      }
      setLoading(false);
    };

    fetchBookings();
  }, []);

  return (
    <div>
      <Navbar />

      <div className="bookingContainer">
        <h1 className="bookingTitle">My Bookings</h1>

        {loading ? (
          <div className="centerMessage">Loading bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="emptyBox">
            <h3>No bookings found 😔</h3>
            <p>Book your next stay now!</p>
          </div>
        ) : (
          bookings.map((booking) => (
            <div className="bookingCard" key={booking._id}>
              <div className="bookingLeft">
                <h2>{booking.hotelName}</h2>

                {booking.startDate && booking.endDate && (
                  <p className="bookingDates">
                    {new Date(booking.startDate).toDateString()} →{" "}
                    {new Date(booking.endDate).toDateString()}
                  </p>
                )}

                <p className="roomsText">
                  Rooms Booked: {booking.rooms?.length}
                </p>
              </div>

              <div className="bookingRight">
                <h3 className="price">
                  ₹ {booking.totalPrice}
                </h3>

                <span
                  className={`status ${
                    booking.status || "confirmed"
                  }`}
                >
                  {booking.status || "Confirmed"}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyBookings;