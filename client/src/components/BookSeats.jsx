import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const BookSeats = () => {
  const { id } = useParams();
  const [seats, setSeats] = useState("");
  const [event, setEvent] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events/${id}`);
      setEvent(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchEvents();
  }, []);

  const handleBooking = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/events/${id}/book`,
        { seats: parseInt(seats) }
      );
      alert(res.data.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert(error.response.data.message);
      navigate("/");
    }
  };
  return (
    <div>
      <h2 className="text-gray-900 dark:text-white text-2xl my-10 mx-auto font-medium">
        Book Seats
      </h2>
      <div
        key={event._id}
        className="xl:w-1/4 lg:w-1/2 md:w-full mx-auto px-8 py-6 border-l-2 border-gray-200 dark:border-gray-800"
      >
        <h2 className="text-lg sm:text-xl text-gray-900 dark:text-white font-medium title-font mb-2">
          {event.eventName}
        </h2>
        <p className="leading-relaxed text-base mb-1">
          Date: {new Date(event.date).toDateString()}
        </p>
        <p className="leading-relaxed text-base mb-4">
          Seats Booked: {event.bookedSeats}/{event.totalSeats}
        </p>
      </div>
      <div className="flex flex-row space-x-6 justify-center items-center mb-4">
        <label className="leading-7 text-gray-600 dark:text-gray-400">
          Select Seats:
        </label>
        <input
          type="number"
          placeholder="Number of seats"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
          required
          className="w-auto bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
        onClick={handleBooking}
      >
        Book
      </button>
    </div>
  );
};

export default BookSeats;
