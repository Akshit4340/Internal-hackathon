import Event from "../models/events.js";

// @desc    Create new event
const createEvent = async (req, res) => {
  try {
    const { title, description, category, date, location } = req.body;

    const event = await Event.create({
      title,
      description,
      category,
      date,
      location,
      createdBy: req.user._id,
    });

    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    Get all events
const getEvents = async (req, res) => {
  try {
    const events = await Event.find()
      .sort({ date: 1 })
      .populate("createdBy", "name email")
      .populate("attendees", "name email");

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc    RSVP to an event
const rsvpEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) return res.status(404).json({ message: "Event not found" });

    const alreadyJoined = event.attendees.includes(req.user._id);

    if (alreadyJoined) {
      // remove RSVP (toggle)
      event.attendees.pull(req.user._id);
    } else {
      // add RSVP
      event.attendees.push(req.user._id);
    }

    await event.save();
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export { createEvent, getEvents, rsvpEvent };
