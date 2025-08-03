import express from "express";
import {
  createEvent,
  getEvents,
  rsvpEvent,
} from "../controller/eventController.js";
const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

// Protected routes
router.post("/", protect, createEvent);
router.get("/", getEvents);
router.post("/:id/rsvp", protect, rsvpEvent);

export default router;
