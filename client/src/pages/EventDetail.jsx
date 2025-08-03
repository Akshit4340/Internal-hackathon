import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
      return;
    }
    fetchEvent();
  }, [id]);

  const fetchEvent = () => {
    setLoading(true);
    fetch(`http://localhost:5000/api/events/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEvent(data);
        setLoading(false);
      })
      .catch((err) => console.error("Error loading event:", err));
  };

  const handleRSVP = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/events/${id}/rsvp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.ok) {
        fetchEvent();
      }
    } catch (err) {
      console.error("RSVP failed", err);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/events/${id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({ text: comment }),
        }
      );

      if (res.ok) {
        setComment("");
        fetchEvent();
      }
    } catch (err) {
      console.error("Comment failed", err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!event) return <p>Event not found.</p>;

  const hasRSVPed = event.attendees?.some(
    (attendee) => attendee._id === JSON.parse(localStorage.getItem("user"))._id
  );

  return (
    <div className="bg-[#F9F3EF] min-h-screen px-4 py-8 text-[#1B3C53]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">{event.title}</h2>
        <p className="mb-2">{event.description}</p>
        <p className="mb-2">Date: {new Date(event.date).toDateString()}</p>
        <p className="mb-4">Location: {event.location}</p>

        {!hasRSVPed ? (
          <button
            className="bg-[#456882] text-white px-4 py-2 rounded mb-6"
            onClick={handleRSVP}
          >
            RSVP Now
          </button>
        ) : (
          <p className="text-green-600 font-semibold mb-6">
            You have RSVPed ✅
          </p>
        )}

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">
            Attendees ({event.attendees.length})
          </h3>
          <ul className="list-disc list-inside">
            {event.attendees.map((user) => (
              <li key={user._id}>{user.name}</li>
            ))}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Comments</h3>
          {event.comments.length === 0 && <p>No comments yet.</p>}
          <ul className="space-y-2">
            {event.comments.map((c, i) => (
              <li key={i} className="bg-white p-3 rounded shadow">
                <p className="font-medium">{c.user?.name || "Anonymous"}</p>
                <p className="text-sm text-gray-600">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
                <p className="mt-1">{c.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            className="w-full p-3 border border-[#D2C1B6] rounded"
            rows="3"
            placeholder="Write your comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className="mt-2 bg-[#1B3C53] text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventDetails;
