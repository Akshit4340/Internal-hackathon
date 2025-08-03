import Event from "../models/events.js";

// @desc    Create new event
const createEvent = async (req, res) => {
  const io = req.app.get("io");
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
    io.emit("newEvent", event); // Broadcast to everyone
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// controllers/eventController.js

export const addCommentToEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { content } = req.body;
    const userId = req.user._id;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ error: "Event not found" });

    event.comments.push({
      author: userId,
      content,
    });

    await event.save();

    const populated = await event.populate("comments.author", "name");
    res
      .status(200)
      .json({ message: "Comment added", comments: populated.comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
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
  const io = req.app.get("io");
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
    io.emit("eventUpdated", event); // Notify all clients about the update
    res.json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getEventAnalytics = async (req, res) => {
  try {
    const { id } = req.params;

    const event = await Event.findById(id).populate("comments.author", "name");
    if (!event) return res.status(404).json({ error: "Event not found" });

    const totalRSVPs = event.attendees.length;
    const totalComments = event.comments.length;

    // Find most active commenters
    const commenterMap = {};
    for (const comment of event.comments) {
      const authorId = comment.author._id.toString();
      commenterMap[authorId] = (commenterMap[authorId] || 0) + 1;
    }

    const topCommenters = Object.entries(commenterMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([userId, count]) => {
        const user = event.comments.find(
          (c) => c.author._id.toString() === userId
        )?.author;
        return {
          userId,
          name: user?.name || "Unknown",
          count,
        };
      });

    res.status(200).json({
      id,
      totalRSVPs,
      totalComments,
      topCommenters,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};

export { createEvent, getEvents, rsvpEvent, getEventAnalytics };
