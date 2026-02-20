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

      <div className="bookingPage">
        <h1 className="bookingHeading">My Bookings</h1>

        {loading ? (
          <div className="centerText">Loading your bookings...</div>
        ) : bookings.length === 0 ? (
          <div className="emptyState">
            <h2>No Bookings Yet 😔</h2>
            <p>Book your first stay and enjoy your trip!</p>
          </div>
        ) : (
          <div className="bookingGrid">
            {bookings.map((booking) => (
              <div className="bookingCard" key={booking._id}>
                <div className="bookingTop">
                  <h2>{booking.hotelName}</h2>
                  <span className="statusBadge">
                    {booking.status || "Confirmed"}
                  </span>
                </div>

                {booking.startDate && booking.endDate && (
                  <div className="dateBox">
                    {new Date(booking.startDate).toDateString()} →{" "}
                    {new Date(booking.endDate).toDateString()}
                  </div>
                )}

                <div className="bookingBottom">
                  <div>
                    <strong>Rooms:</strong> {booking.rooms?.length}
                  </div>
                  <div className="priceTag">
                    ₹ {booking.totalPrice}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;