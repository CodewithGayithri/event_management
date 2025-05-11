import React, { useState } from "react";
import axios from "axios";

const CreateEvents = () => {
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [totalSeats, setTotalSeats] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/create-event`, {
        eventName,
        date,
        totalSeats,
      });
      alert(res.data.message);
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <form
        className="lg:w-1/3 md:w-1/2 flex flex-col md:mx-auto w-full md:py-8 mt-8 md:mt-0 bg-white dark:text-gray-400 dark:bg-inherit"
        onSubmit={handleSubmit}
      >
        <h2 className="text-gray-900 dark:text-white text-2xl mb-1 font-medium">
          Create event
        </h2>

        <div className="relative mb-4">
          <label className="leading-7 text-gray-600 dark:text-gray-400">
            Event Name
          </label>
          <input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            required
            className="w-full bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label className="leading-7 text-gray-600 dark:text-gray-400">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <div className="relative mb-4">
          <label className="leading-7 text-gray-600 dark:text-gray-400">
            Total Seats
          </label>
          <input
            type="number"
            placeholder="Total Seats"
            value={totalSeats}
            onChange={(e) => setTotalSeats(e.target.value)}
            required
            className="w-full bg-white dark:bg-gray-800 rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>
        <button
          className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          type="submit"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default CreateEvents;
