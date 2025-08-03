import express from "express";
import {
  createEvent,
  getEvents,
  rsvpEvent,
  getEventAnalytics,
} from "../controller/eventController.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

// Protected routes
router.post("/", protect, createEvent);
router.get("/", getEvents);
router.post("/:id/rsvp", protect, rsvpEvent);
router.get("/:id", protect, getEventAnalytics);

export default router;
