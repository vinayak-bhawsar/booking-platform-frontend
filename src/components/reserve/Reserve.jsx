const handleClick = async () => {
  if (!user) {
    navigate("/login");
    return;
  }

  // ❌ DATE VALIDATION REMOVE
  // if (!startDate || !endDate) {
  //   alert("Please select dates first from search page.");
  //   navigate("/");
  //   return;
  // }

  if (selectedRooms.length === 0) {
    alert("Please select at least one room.");
    return;
  }

  try {
    // 🔥 Agar dates nahi hai to availability update skip karo
    if (startDate && endDate) {
      await Promise.all(
        selectedRooms.map((roomId) =>
          axios.put(
            `https://booking-platform-w5pg.onrender.com/api/rooms/availability/${roomId}`,
            { dates: alldates },
            { withCredentials: true }
          )
        )
      );
    }

    const totalPrice =
      (days || 1) *
      selectedRooms.length *
      (data?.[0]?.price || 0);

    await axios.post(
      "https://booking-platform-w5pg.onrender.com/api/bookings",
      {
        hotelId,
        hotelName: hotel?.name,
        rooms: selectedRooms,
        totalPrice,
        startDate: startDate || null,
        endDate: endDate || null,
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