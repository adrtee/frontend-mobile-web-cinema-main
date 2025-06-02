"use client";

import { useState } from "react";

import styles from "./Booking.module.css";
import { getDates } from "../../../utils/date";

enum Booking {
  AVAILABLE = "Available",
  SELLING_FAST = "Selling Fast",
  SOLD_OUT = "Sold Out",
}

type BookingLocation = {
  name: string;
  slots: BookingSlot[];
};

type BookingSlot = {
  time: number;
  availability: Booking;
};

const booking = [
  {
    name: "CAUSEWAY POINT",
    slots: [
      { time: 1030, availability: Booking.AVAILABLE },
      { time: 1245, availability: Booking.AVAILABLE },
      { time: 1500, availability: Booking.SELLING_FAST },
      { time: 2000, availability: Booking.SOLD_OUT },
    ],
  },
  {
    name: "CENTURY SQUARE",
    slots: [
      { time: 1015, availability: Booking.AVAILABLE },
      { time: 1230, availability: Booking.AVAILABLE },
      { time: 1445, availability: Booking.AVAILABLE },
      { time: 1700, availability: Booking.AVAILABLE },
      { time: 1915, availability: Booking.AVAILABLE },
      { time: 2300, availability: Booking.SELLING_FAST },
      { time: 2340, availability: Booking.SOLD_OUT },
    ],
  },
  {
    name: "CLEMENTI 321",
    slots: [
      { time: 1230, availability: Booking.AVAILABLE },
      { time: 1445, availability: Booking.AVAILABLE },
      { time: 1700, availability: Booking.SELLING_FAST },
      { time: 2100, availability: Booking.AVAILABLE },
    ],
  },
  {
    name: "DOWNTOWN EAST",
    slots: [
      { time: 1000, availability: Booking.AVAILABLE },
      { time: 1215, availability: Booking.AVAILABLE },
      { time: 1430, availability: Booking.AVAILABLE },
      { time: 1900, availability: Booking.SOLD_OUT },
    ],
  },
];

export default function BookingUI() {
  const [daySelected, setDaySelected] = useState(0);

  const days = getDates(4);

  const handleBook = (slot: BookingSlot, location: string) => {
    if (slot.availability !== Booking.SOLD_OUT) {
      const time =
        String(slot.time).slice(0, 2) + ":" + String(slot.time).slice(2);
      alert(
        `Booking successful!\n\nLocation: ${location}\nDate: ${days[daySelected]}\nTime: ${time}`
      );
    } else {
      alert("No more vacancy is available!");
    }
  };

  return (
    <div>
      {booking.map((location: BookingLocation) => {
        return (
          <div key={location.name} className={styles.bookingContainer}>
            <h2>{location.name}</h2>

            <div className={styles.dates}>
              {days.map((day, idx) => (
                <div
                  key={`${location.name}-${idx}`}
                  className={
                    idx === daySelected ? styles.activeDay : styles.day
                  }
                  onClick={() => {
                    setDaySelected(idx);
                  }}
                >
                  {day.split(" ")[0]} <br />
                  {day.split(" ")[1] + " " + day.split(" ")[2]}
                </div>
              ))}
            </div>

            <div className={styles.slots}>
              {location.slots.map((slot: BookingSlot) => (
                <button
                  key={`${location.name}-${slot.time}`}
                  className={`${styles.slot} && ${
                    slot.availability === Booking.SELLING_FAST &&
                    styles.slotYellow
                  } && ${
                    slot.availability === Booking.SOLD_OUT && styles.slotGrey
                  }`}
                  onClick={() => handleBook(slot, location.name)}
                >
                  {String(slot.time).slice(0, 2) +
                    ":" +
                    String(slot.time).slice(2)}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
