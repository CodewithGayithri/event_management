import { Event } from "../database/models/Events.js";

export * from "./test-controllers.js";

export const createEventController = async (req, res) => {
    const { eventName, date, totalSeats } = req.body;

    if (!eventName || !date || !totalSeats) {
        return res.status(401).json({ message: "All fields are required!" });
    }
    try {
        const newEvent = new Event({ eventName, date, totalSeats });
        await newEvent.save();
        res.status(201).json({ message: "Event created succefully." });
    } catch (error) {
        res.status(501).json({ message: "Error creating Event!!", error: error.message });
    }
};

export const bookSeatsController = async (req, res) => {
    const { id } = req.params;
    const { seats } = req.body;

    if (!seats || seats <= 0) {
        return res.status(401).json({ message: "Invalid Number!" });
    }

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(401).json({ message: "Event Not Found!" });
        }

        if (event.bookedSeats + seats > event.totalSeats) {
            return res.status(402).json({ message: "Not Enough Seats Available! Try Another Event." });
        }

        event.bookedSeats += seats;
        await event.save();

        res.json({ message: "Booking Confirmed.", availableSeats: event.totalSeats - event.bookedSeats });
    } catch (error) {
        res.status(501).json({ message: "Error Booking Seats!!", error: error.message });
    }
};

export const getEventDetailsController = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(401).json({ message: "Event Not Found!" });
        }

        res.json(event);
    } catch (error) {
        res.status(501).json({ message: "Error Fetching Event Details!!", error: error.message });
    }
};

export const getAllEventsDetailsController = async (req, res) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(501).json({ message: "Error fetching Events!!", error: error.message });
    }
};
