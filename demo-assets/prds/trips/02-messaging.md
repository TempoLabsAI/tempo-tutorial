# Messaging with host

**Parent:** [Your trips](./00-parent-your-trips.md)
**Status:** Draft
**Linked canvases:** [Messaging](../../../designs/pages/messaging/index.page.tsx)
**Linked issues:** [#6 Refresh messaging inbox](../../issues/06-inbox-refresh.md)

> **State note:** This PRD is a draft — the design team is actively exploring directions on the [Messaging canvas](../../../designs/pages/messaging/index.page.tsx) before the spec is finalized. This demonstrates a "design first, spec WIP" workflow in Tempo.

## Problem

Guest ↔ host messaging happens entirely over email today. The result: conversations are scattered, hard to find, and often missed. Hosts who check email infrequently are unresponsive; guests who email the wrong address get no reply. The trust that messaging should build evaporates when communication breaks.

A first-party inbox, surfaced from the trips context, solves both sides: guests know where to look, hosts get a single prioritized stream.

## Goals

- Provide a lightweight inbox accessible from `/trips` and from the trip itinerary page.
- Support threaded guest ↔ host conversations per booking (not per listing).
- Surface unread messages as a badge on the global nav and as a banner on the itinerary page.

## Non-goals

- Group chats with multiple co-travelers — defer.
- Automated message templates (pre-check-in reminder, wifi instructions auto-send) — defer.
- File attachments — defer (linked documents only for now).
- Real-time presence ("typing..." indicators) — out of scope.

## User stories

- As a guest who has a question before arrival, I want to message my host directly in the app, so I don't have to search my email for an address.
- As a guest returning to the app, I want to see at a glance whether my host has replied, so I don't miss important information.
- As a guest who has completed multiple trips, I want my message history organized by trip, so I can find the right conversation quickly.

## Functional requirements (draft — subject to design)

- **FR-1.** `/messages` shows a list of conversations, one per booking. Each row: host avatar + name, listing thumbnail, booking dates, preview of last message, unread count badge.
- **FR-2.** Conversations are sorted by most recent message. An unread conversation has a blue dot and bold preview text.
- **FR-3.** Tapping a conversation opens the thread view: messages in chronological order, oldest at top. Each message: avatar, name, timestamp, prose. Guest messages are right-aligned; host messages are left-aligned.
- **FR-4.** Compose bar at the bottom: text input + send button. Sending a message marks the conversation as read and scrolls to bottom.
- **FR-5.** Unread count badge appears on the *Messages* nav item when there are unread messages.
- **FR-6.** Deep link from trip itinerary: tapping the host message banner on the itinerary page opens the conversation thread for that booking.
- **FR-7.** Notifications: push notification on new host message (requires notification permissions flow, out of scope for this PRD).

## UX notes

See [Messaging canvas](../../../designs/pages/messaging/index.page.tsx) for storyboards (design WIP):

- **Inbox — unread messages**
- **Inbox — all read**
- **Inbox — empty state** (no messages yet)
- **Thread — conversation view**
- **Thread — compose state** (keyboard raised on mobile)
- **Thread — delivered / read receipts**

Design exploration is ongoing. PRD functional requirements will be updated after design review.

## Open questions

- Read receipts: should guests see whether the host has read their message? — *Open.*
- Character limit on messages? — *Defer; no limit for now.*
- What triggers a push notification vs an in-app badge only? — *Open; depends on notification permission flow.*
