export interface Listing {
  id: string;
  title: string;
  location: string;
  region: string;
  type: "entire" | "private" | "shared";
  pricePerNight: number;
  rating: number;
  reviewCount: number;
  beds: number;
  baths: number;
  maxGuests: number;
  images: string[];
  dateRange: string;
  badge?: string;
  amenities: string[];
  description: string;
  host: {
    id: string;
    name: string;
    avatar: string;
    responseRate: number;
    superhost: boolean;
  };
  coordinates: { lat: number; lng: number };
}

export const LISTINGS: Listing[] = [
  {
    id: "lst-001",
    title: "Coastal stone cottage with sea views",
    location: "Cinque Terre, Italy",
    region: "Italy",
    type: "entire",
    pricePerNight: 248,
    rating: 4.97,
    reviewCount: 184,
    beds: 2,
    baths: 1,
    maxGuests: 4,
    images: [
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=800&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&q=80",
    ],
    dateRange: "Jun 8–13",
    badge: "Guest favourite",
    amenities: ["Wifi", "Kitchen", "Sea view", "Terrace", "Air conditioning", "Washer"],
    description:
      "A sun-warmed stone cottage perched above the Ligurian coast. Wake to fishing boats and turquoise water. Walk to the village in eight minutes, or stay on the terrace all day with a glass of Vermentino.",
    host: { id: "h-001", name: "Lucia R.", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80", responseRate: 99, superhost: true },
    coordinates: { lat: 44.1461, lng: 9.6439 },
  },
  {
    id: "lst-002",
    title: "Riad with rooftop pool, medina views",
    location: "Marrakech, Morocco",
    region: "Morocco",
    type: "entire",
    pricePerNight: 195,
    rating: 4.93,
    reviewCount: 312,
    beds: 3,
    baths: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&q=80",
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    ],
    dateRange: "Apr 3–8",
    badge: "Rare find",
    amenities: ["Wifi", "Pool", "Breakfast included", "Air conditioning", "Concierge", "Hammam"],
    description:
      "Hidden behind an unmarked door in the heart of the medina, this restored 18th-century riad opens onto a courtyard fountain and a rooftop plunge pool with Atlas Mountain views.",
    host: { id: "h-002", name: "Karim B.", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80", responseRate: 97, superhost: true },
    coordinates: { lat: 31.6295, lng: -7.9811 },
  },
  {
    id: "lst-003",
    title: "Timber treehouse in old-growth forest",
    location: "Olympic Peninsula, WA",
    region: "Pacific Northwest",
    type: "entire",
    pricePerNight: 320,
    rating: 4.99,
    reviewCount: 97,
    beds: 1,
    baths: 1,
    maxGuests: 2,
    images: [
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?w=800&q=80",
      "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80",
    ],
    dateRange: "May 17–22",
    badge: "Guest favourite",
    amenities: ["Wifi", "Outdoor shower", "Fire pit", "Kitchen", "EV charger", "Telescope"],
    description:
      "Suspended 30 feet up in a 200-year-old Douglas fir. Rain sounds. Elk passing below. A wood-burning stove and a cloud of stars through the skylight.",
    host: { id: "h-003", name: "Dane & Mira K.", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&q=80", responseRate: 100, superhost: true },
    coordinates: { lat: 47.9731, lng: -123.4984 },
  },
  {
    id: "lst-004",
    title: "Canal-front apartment, Jordaan",
    location: "Amsterdam, Netherlands",
    region: "Netherlands",
    type: "entire",
    pricePerNight: 175,
    rating: 4.88,
    reviewCount: 256,
    beds: 2,
    baths: 1,
    maxGuests: 4,
    images: [
      "https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?w=800&q=80",
      "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&q=80",
    ],
    dateRange: "Mar 22–27",
    amenities: ["Wifi", "Bikes included", "Washer", "Kitchen", "Canal view"],
    description:
      "A 17th-century merchant's house with original beams, steep Dutch stairs, and a canal view that looks like a Vermeer. Two bikes in the downstairs storage — the city is yours.",
    host: { id: "h-004", name: "Annelise V.", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80", responseRate: 95, superhost: false },
    coordinates: { lat: 52.3722, lng: 4.8841 },
  },
  {
    id: "lst-005",
    title: "Modernist desert villa, Joshua Tree",
    location: "Joshua Tree, CA",
    region: "California",
    type: "entire",
    pricePerNight: 440,
    rating: 4.96,
    reviewCount: 143,
    beds: 3,
    baths: 2,
    maxGuests: 6,
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    ],
    dateRange: "Oct 5–10",
    badge: "Guest favourite",
    amenities: ["Wifi", "Pool", "Hot tub", "Kitchen", "Outdoor kitchen", "Stargazing deck", "EV charger"],
    description:
      "A 1960s Case Study–inspired house with floor-to-ceiling glass, a concrete pool, and 10 acres of desert boulders. Dark sky certified — bring a star chart.",
    host: { id: "h-005", name: "Marcus T.", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80", responseRate: 98, superhost: true },
    coordinates: { lat: 34.1348, lng: -116.3136 },
  },
  {
    id: "lst-006",
    title: "Fisherman's hut on stilts, Bacalar",
    location: "Bacalar, Mexico",
    region: "Mexico",
    type: "entire",
    pricePerNight: 160,
    rating: 4.91,
    reviewCount: 78,
    beds: 1,
    baths: 1,
    maxGuests: 2,
    images: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80",
      "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&q=80",
    ],
    dateRange: "Feb 10–15",
    amenities: ["Wifi", "Kayak", "Paddleboard", "Fan", "Breakfast included"],
    description:
      "A hand-built palapa perched over the Lagoon of Seven Colors. Swim off the dock. Kayak to cenotes. Fall asleep to the lap of jade water.",
    host: { id: "h-006", name: "Alejandro M.", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80", responseRate: 93, superhost: false },
    coordinates: { lat: 18.6813, lng: -88.3944 },
  },
  {
    id: "lst-007",
    title: "Alpine lodge above the cloud line",
    location: "Grindelwald, Switzerland",
    region: "Switzerland",
    type: "entire",
    pricePerNight: 520,
    rating: 4.98,
    reviewCount: 61,
    beds: 4,
    baths: 3,
    maxGuests: 8,
    images: [
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&q=80",
    ],
    dateRange: "Dec 20–27",
    badge: "Rare find",
    amenities: ["Wifi", "Sauna", "Hot tub", "Ski-in/ski-out", "Fireplace", "Full kitchen"],
    description:
      "A timber-and-glass chalet above the clouds with Eiger views from every window. Ski in, ski out. Sauna, fondue, repeat.",
    host: { id: "h-007", name: "Heidi & Thomas B.", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80", responseRate: 99, superhost: true },
    coordinates: { lat: 46.6241, lng: 8.0410 },
  },
  {
    id: "lst-008",
    title: "Converted lighthouse keeper's cottage",
    location: "Orkney Islands, Scotland",
    region: "Scotland",
    type: "entire",
    pricePerNight: 215,
    rating: 4.94,
    reviewCount: 112,
    beds: 2,
    baths: 1,
    maxGuests: 4,
    images: [
      "https://images.unsplash.com/photo-1543731068-7e0f5beff43a?w=800&q=80",
      "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=800&q=80",
    ],
    dateRange: "Jul 14–19",
    amenities: ["Wifi", "Sea view", "Fireplace", "Kitchen", "Binoculars"],
    description:
      "Stone walls two feet thick, a wood-burning stove, and Atlantic storms outside. Puffins nest nearby in summer. Silence so complete you hear your own heartbeat.",
    host: { id: "h-008", name: "Fiona M.", avatar: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&q=80", responseRate: 96, superhost: true },
    coordinates: { lat: 58.9785, lng: -2.9605 },
  },
];

export function getListingById(id: string): Listing | undefined {
  return LISTINGS.find((l) => l.id === id);
}
