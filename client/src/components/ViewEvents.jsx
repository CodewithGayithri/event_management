import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ViewEvents = () => {
  const [events, setEvents] = useState([]);

  const fetchAllEvents = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/events`);
      setEvents(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllEvents();
  }, []);

  return (
    <div>
      <section className="text-gray-400 bg-white dark:bg-inherit">
        <div className="container px-5 py-20 mx-auto">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900 dark:text-white text-center w-full">
            All Events
          </h1>

          <div className="flex flex-wrap">
            {events.map((event) => (
              <div
                key={event._id}
                className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 dark:border-gray-800"
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
                <Link to={`/book-seats/${event._id}`}>
                  <div className="text-indigo-500 dark:text-indigo-400 inline-flex items-center">
                    Book Seats
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          <Link to="/create-event">
          <button className="flex mx-auto mt-16 text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
            Create Event
          </button></Link>
        </div>
      </section>
    </div>
  );
};

export default ViewEvents;
