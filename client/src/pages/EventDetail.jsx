import React from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-[#F9F3EF] text-[#1B3C53] p-8">
      <h1 className="text-3xl font-bold mb-6">Event Details</h1>
      <p>Viewing event with ID: {id}</p>
    </div>
  );
};

export default EventDetails;
