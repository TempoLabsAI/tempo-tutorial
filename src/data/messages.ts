export interface Message {
  id: string;
  senderId: "guest" | "host";
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  tripId: string;
  hostName: string;
  hostAvatar: string;
  listingTitle: string;
  listingThumbnail: string;
  messages: Message[];
  lastRead: string;
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "conv-001",
    tripId: "trp-001",
    hostName: "Lucia R.",
    hostAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80",
    listingTitle: "Coastal stone cottage with sea views",
    listingThumbnail: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=300&q=80",
    lastRead: "2026-05-01T10:00:00Z",
    messages: [
      {
        id: "m-001",
        senderId: "guest",
        text: "Hi Lucia! Really looking forward to staying at the cottage. Is parking available nearby?",
        timestamp: "2026-05-01T09:45:00Z",
        read: true,
      },
      {
        id: "m-002",
        senderId: "host",
        text: "Benvenuto! There's a public car park at the edge of the village, about 300m from the cottage — €8/day. I'd recommend arriving before noon as it fills up in June. Let me know if you need any other tips!",
        timestamp: "2026-05-01T10:12:00Z",
        read: false,
      },
    ],
  },
  {
    id: "conv-002",
    tripId: "trp-003",
    hostName: "Marcus T.",
    hostAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80",
    listingTitle: "Modernist desert villa, Joshua Tree",
    listingThumbnail: "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=300&q=80",
    lastRead: "2026-05-03T08:00:00Z",
    messages: [
      {
        id: "m-003",
        senderId: "host",
        text: "Hey! Excited for your stay. Pool is heated to 88°F. There's a star chart in the kitchen drawer — Scorpius is directly overhead this week.",
        timestamp: "2026-05-03T07:45:00Z",
        read: false,
      },
      {
        id: "m-004",
        senderId: "host",
        text: "Also the gate code changed last week — it's 1147 now. I'll update the listing, but wanted to let you know directly.",
        timestamp: "2026-05-03T07:46:00Z",
        read: false,
      },
    ],
  },
  {
    id: "conv-003",
    tripId: "trp-002",
    hostName: "Heidi & Thomas B.",
    hostAvatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&q=80",
    listingTitle: "Alpine lodge above the cloud line",
    listingThumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80",
    lastRead: "2026-04-20T15:00:00Z",
    messages: [
      {
        id: "m-005",
        senderId: "guest",
        text: "Hello! Is the ski pass included or do we arrange that separately?",
        timestamp: "2026-04-20T14:30:00Z",
        read: true,
      },
      {
        id: "m-006",
        senderId: "host",
        text: "Grüezi! Ski passes are separate — we recommend the Jungfrau Region pass from the gondola office. We can arrange transport from Grindelwald station if you let us know your arrival time.",
        timestamp: "2026-04-20T15:02:00Z",
        read: true,
      },
    ],
  },
];

export function getConversationByTripId(tripId: string): Conversation | undefined {
  return CONVERSATIONS.find((c) => c.tripId === tripId);
}

export function getTotalUnread(): number {
  return CONVERSATIONS.reduce(
    (sum, conv) =>
      sum + conv.messages.filter((m) => m.senderId === "host" && !m.read).length,
    0
  );
}
