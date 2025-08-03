// src/pages/EventsPage.js
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  const fetchEvents = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (res.status === 401) {
        navigate("/login");
        return;
      }

      const data = await res.json();
      setEvents(data);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      fetchEvents();
    }
  }, []);

  return (
    <div className="bg-[#F9F3EF] min-h-screen p-6 text-[#1B3C53]">
      <h1 className="text-3xl font-bold mb-4">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {events.map((event) => (
          <div
            key={event._id}
            className="bg-white p-4 rounded shadow border border-[#D2C1B6]"
          >
            <h2 className="text-xl font-semibold">{event.title}</h2>
            <p className="text-gray-700">{event.description}</p>
            <p className="text-sm text-gray-500">
              {new Date(event.date).toDateString()} — {event.location}
            </p>
            <Link
              to={`/events/${event._id}`}
              className="inline-block mt-3 bg-[#1B3C53] text-white px-4 py-2 rounded"
            >
              View Event
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
