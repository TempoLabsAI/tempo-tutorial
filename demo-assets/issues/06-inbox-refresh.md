# Refresh messaging inbox

**Status:** In Design
**Type:** Feature
**Linked PRD:** [Messaging with host](../prds/trips/02-messaging.md) *(spec WIP — design is ahead)*
**Linked canvas:** [Messaging — all storyboards](../../designs/pages/messaging/index.page.tsx)

## What

Redesign the messaging inbox and thread view. The current inbox is a plain list of email-style rows. Design is exploring a warmer, more conversational layout — closer to iMessage than Gmail.

## Why

Messaging is a trust surface. The design of the inbox communicates how Tempo thinks about the guest-host relationship. Email-style rows feel transactional and cold. A more conversational layout sets the right tone and makes it easier to see what needs attention.

## Notes on current state

The [Messaging PRD](../prds/trips/02-messaging.md) is a draft — functional requirements are still being finalized as design explores. **This is normal in Tempo:** the canvas is the working surface, and the PRD will be updated to reflect the design decisions, not the other way around.

Current canvas has storyboards for:
- Inbox (unread + all-read states)
- Thread view (conversation + compose)
- Empty states

PRD will be updated after design review to lock requirements.

## Acceptance criteria *(draft — subject to design review)*

- [ ] Inbox rows show host avatar (round, 40px), name, listing thumbnail, last message preview, unread dot
- [ ] Unread rows: bold preview text, visible unread dot
- [ ] Thread view: host messages left, guest messages right (iMessage layout)
- [ ] Compose bar: full-width input, send icon button, minimum touch target 44px
- [ ] Animations: new message slides up from bottom with spring easing
- [ ] Empty inbox: friendly illustration + *Your messages will appear here* copy
- [ ] Unread count badge on global nav *Messages* icon

## Notes

**Canvas is the source of truth right now.** See [Messaging canvas](../../designs/pages/messaging/index.page.tsx) for the direction. Engineering can begin component scaffolding from the canvas storyboards before the PRD is finalized.

**Components to build / update:**
- `<InboxRow />` — updated layout
- `<MessageBubble />` — guest and host variants
- `<ComposeBar />` — with send button
- `<UnreadBadge />` — shared with global nav
