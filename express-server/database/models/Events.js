import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  eventName: String,
  date: String,
  totalSeats: Number,
  bookedSeats: { type: Number, default: 0 },
});

export const Event = mongoose.model("Event", eventSchema);
