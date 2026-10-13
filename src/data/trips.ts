import { LISTINGS } from "./listings";
import type { Listing } from "./listings";

export type TripStatus = "confirmed" | "check-in-today" | "completed" | "cancelled";

export interface Trip {
  id: string;
  listing: Listing;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: TripStatus;
  totalPrice: number;
  confirmationCode: string;
  checkInMethod: "lockbox" | "smart-lock" | "host-greet" | "building-staff";
  checkInInstructions: string[];
  unreadMessages: number;
  cancellationPolicy: "flexible" | "moderate" | "strict";
}

export const TRIPS: Trip[] = [
  {
    id: "trp-001",
    listing: LISTINGS[0], // Cinque Terre
    checkIn: "2026-06-08",
    checkOut: "2026-06-13",
    guests: 2,
    status: "confirmed",
    totalPrice: 1388,
    confirmationCode: "HMXK9W",
    checkInMethod: "lockbox",
    checkInInstructions: [
      "Walk up Via Roma to the blue door on the left (look for #14).",
      "The lockbox is mounted to the left of the door frame.",
      "Code: 7421. Press the * button first, then enter the code.",
      "Your key is inside. Replace it in the lockbox on checkout.",
    ],
    unreadMessages: 1,
    cancellationPolicy: "moderate",
  },
  {
    id: "trp-002",
    listing: LISTINGS[6], // Grindelwald
    checkIn: "2026-12-20",
    checkOut: "2026-12-27",
    guests: 6,
    status: "confirmed",
    totalPrice: 3920,
    confirmationCode: "SWLP3T",
    checkInMethod: "host-greet",
    checkInInstructions: [
      "Heidi will meet you at the base of the Männlichen gondola at 4pm.",
      "She'll drive you up in the snowcat (about 15 minutes).",
      "She'll give you a full orientation — ask her about the sauna.",
    ],
    unreadMessages: 0,
    cancellationPolicy: "strict",
  },
  {
    id: "trp-003",
    listing: LISTINGS[4], // Joshua Tree
    checkIn: "2026-05-05",
    checkOut: "2026-05-10",
    guests: 4,
    status: "check-in-today",
    totalPrice: 2420,
    confirmationCode: "JTXV8R",
    checkInMethod: "smart-lock",
    checkInInstructions: [
      "Your smart lock code is 4819. Works from 3pm on check-in day.",
      "The gate code is 1147 — punch it in at the cattle grid on Quail Springs Rd.",
      "Pool heat is on. Check the thermostat in the utility room.",
    ],
    unreadMessages: 2,
    cancellationPolicy: "flexible",
  },
  {
    id: "trp-004",
    listing: LISTINGS[2], // Treehouse
    checkIn: "2025-09-17",
    checkOut: "2025-09-22",
    guests: 2,
    status: "completed",
    totalPrice: 1760,
    confirmationCode: "OLYX5D",
    checkInMethod: "lockbox",
    checkInInstructions: [],
    unreadMessages: 0,
    cancellationPolicy: "moderate",
  },
];

export function getTripById(id: string): Trip | undefined {
  return TRIPS.find((t) => t.id === id);
}
