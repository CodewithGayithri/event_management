import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ViewEvents from "./components/ViewEvents";
import CreateEvents from "./components/CreateEvents";
import BookSeats from "./components/BookSeats";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ViewEvents />} />
        <Route path="/create-event" element={<CreateEvents />} />
        <Route path="/book-seats/:id" element={<BookSeats />} />
      </Routes>
    </BrowserRouter>
  );
}
