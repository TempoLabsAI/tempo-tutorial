import type { TempoPage, TempoStoryboard } from 'tempo-sdk';
import { Send, ArrowLeft } from 'lucide-react';
import { Container } from '@/design-system/layout/Container';
import { MessagesPage } from '@/pages/MessagesPage';
import { Avatar } from '@/design-system/primitives/Avatar';
import { CONVERSATIONS } from '@/data/messages';
import {
  Frame as ChromeFrame,
  TitleSpread,
  Annotation,
} from '@/design-system/canvas-chrome';

const page: TempoPage = {
  name: "Messaging flow",
};

export default page;

/* ────────────────────────────────────────────────────────────────────────
   Messaging flow — a host-and-guest conversation, end to end.
   ──────────────────────────────────────────────────────────────────────── */

const conv = CONVERSATIONS[0];

/* Cover ──────────────────────────────────────────────────────────── */
export const Cover: TempoStoryboard = {
  render: () => (
    <TitleSpread
      eyebrow="Flow · 05 · Messaging"
      title={
        <>
          A letter from
          <br />
          your host.
        </>
      }
      caption="The host sends a message before check-in. The guest reads, replies, and the thread is filed against the trip. Three desktop frames and one mobile companion."
      meta={[
        { label: "Frames", value: "5" },
        { label: "Personas", value: "Guest · Host" },
        { label: "Surface", value: "Web · iOS" },
        { label: "Owner", value: "Joel · Eng" },
      ]}
    />
  ),
  name: "Cover",
  layout: { x: 0, y: 0, width: 1240, height: 720 },
};

/* Step 1 — Inbox with an unread thread (entry state) ─────────────── */
export const Step1Inbox: TempoStoryboard = {
  render: () => (
    <ChromeFrame route="/messages">
      <MessagesPage />
    </ChromeFrame>
  ),
  name: "01 · Inbox · pick a thread",
  layout: { x: 1280, y: 0, width: 1480, height: 900 },
};

/* Annotation 1 → 2 ───────────────────────────────────────────────── */
export const NoteInboxToRead: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 01 → 02"
      title="Tap the unread thread"
      body="The unread dot disappears as soon as the thread is opened. The selected row stays highlighted for orientation."
    />
  ),
  name: "→ Open the thread",
  layout: { x: 0, y: 760, width: 1240, height: 280 },
};

/* Step 2 — Reading the thread (active conversation) ──────────────── */
export const Step2Read: TempoStoryboard = {
  render: () => (
    <ChromeFrame route="/messages">
      <Container className="pt-0 px-0 sm:px-6 max-w-5xl">
        <div className="flex h-[680px] sm:rounded-2xl sm:my-6 sm:border sm:border-paper-deep overflow-hidden bg-white">
          {/* Inbox sidebar */}
          <div className="w-80 flex-shrink-0 border-r border-paper-deep flex flex-col">
            <header className="px-5 py-5 border-b border-paper-deep">
              <h1 className="text-[24px] font-semibold text-ink">Messages</h1>
            </header>
            <div className="overflow-y-auto flex-1">
              <div className="w-full flex items-start gap-3 px-5 py-4 text-left border-b border-paper-deep/60 bg-paper-warm">
                <Avatar src={conv.hostAvatar} alt={conv.hostName} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] text-ink font-semibold">{conv.hostName}</p>
                  <p className="text-[12px] text-ink-quiet line-clamp-1">{conv.listingTitle}</p>
                  <p className="text-[13px] text-ink mt-1.5 font-medium line-clamp-1">
                    Benvenuto! There's a public car park…
                  </p>
                </div>
              </div>
              {CONVERSATIONS.slice(1).map((c) => (
                <div
                  key={c.id}
                  className="w-full flex items-start gap-3 px-5 py-4 text-left border-b border-paper-deep/60"
                >
                  <Avatar src={c.hostAvatar} alt={c.hostName} size="md" />
                  <div className="min-w-0 flex-1">
                    <p className="text-[14px] text-ink">{c.hostName}</p>
                    <p className="text-[12px] text-ink-quiet line-clamp-1">{c.listingTitle}</p>
                    <p className="text-[13px] text-ink-quiet mt-1.5 line-clamp-1">
                      {c.messages[c.messages.length - 1]?.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Thread */}
          <div className="flex-1 flex flex-col min-w-0">
            <header className="flex items-center gap-3 px-5 py-4 border-b border-paper-deep">
              <Avatar src={conv.hostAvatar} alt={conv.hostName} size="sm" />
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-ink">{conv.hostName}</p>
                <p className="text-[12px] text-ink-quiet">{conv.listingTitle}</p>
              </div>
              <span className="ml-auto text-[13px] font-medium text-accent">
                View trip →
              </span>
            </header>
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
              {conv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.senderId === "guest" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.senderId === "host" && (
                    <Avatar src={conv.hostAvatar} alt={conv.hostName} size="xs" className="flex-shrink-0 mt-1" />
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-3xl text-[14px] leading-relaxed ${
                      msg.senderId === "guest" ? "bg-paper-warm text-ink" : "bg-ink text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <div className="px-5 py-3 border-t border-paper-deep flex items-end gap-2 bg-white">
              <div className="flex-1 bg-paper-warm rounded-3xl px-4 py-3 text-[14px] text-ink-quiet min-h-[44px]">
                Type a message…
              </div>
              <button
                disabled
                className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center opacity-40 flex-shrink-0"
                aria-label="Send"
              >
                <Send size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </ChromeFrame>
  ),
  name: "02 · Read the thread",
  layout: { x: 0, y: 1080, width: 1740, height: 900 },
};

/* Annotation 2 → 3 ───────────────────────────────────────────────── */
export const NoteReadToCompose: TempoStoryboard = {
  render: () => (
    <Annotation
      step="Step 02 → 03"
      title="Tap the input to reply"
      body="The composer expands to fit a multi-line reply. Enter sends; shift+enter adds a line break."
    />
  ),
  name: "→ Reply",
  layout: { x: 0, y: 2020, width: 1240, height: 280 },
};

/* Step 3 — Composing a reply ─────────────────────────────────────── */
export const Step3Compose: TempoStoryboard = {
  render: () => (
    <ChromeFrame route="/messages">
      <Container className="pt-0 px-0 sm:px-6 max-w-5xl">
        <div className="flex h-[680px] sm:rounded-2xl sm:my-6 sm:border sm:border-paper-deep overflow-hidden bg-white">
          <div className="w-80 flex-shrink-0 border-r border-paper-deep flex flex-col">
            <header className="px-5 py-5 border-b border-paper-deep">
              <h1 className="text-[24px] font-semibold text-ink">Messages</h1>
            </header>
            <div className="overflow-y-auto flex-1">
              <div className="w-full flex items-start gap-3 px-5 py-4 text-left border-b border-paper-deep/60 bg-paper-warm">
                <Avatar src={conv.hostAvatar} alt={conv.hostName} size="md" />
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] text-ink">{conv.hostName}</p>
                  <p className="text-[12px] text-ink-quiet line-clamp-1">{conv.listingTitle}</p>
                  <p className="text-[13px] text-ink-quiet mt-1.5 line-clamp-1">
                    You: Perfect, thanks Lucia! See you soon.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 flex flex-col min-w-0">
            <header className="flex items-center gap-3 px-5 py-4 border-b border-paper-deep">
              <Avatar src={conv.hostAvatar} alt={conv.hostName} size="sm" />
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-ink">{conv.hostName}</p>
                <p className="text-[12px] text-ink-quiet">{conv.listingTitle}</p>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
              {conv.messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-2 ${msg.senderId === "guest" ? "flex-row-reverse" : "flex-row"}`}
                >
                  {msg.senderId === "host" && (
                    <Avatar src={conv.hostAvatar} alt={conv.hostName} size="xs" className="flex-shrink-0 mt-1" />
                  )}
                  <div
                    className={`max-w-[78%] px-4 py-2.5 rounded-3xl text-[14px] leading-relaxed ${
                      msg.senderId === "guest" ? "bg-paper-warm text-ink" : "bg-ink text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div className="flex flex-row-reverse">
                <div className="max-w-[78%] px-4 py-2.5 rounded-3xl text-[14px] bg-paper-warm text-ink leading-relaxed">
                  Perfect, thanks Lucia! See you soon.
                </div>
              </div>
            </div>
            <div className="px-5 py-3 border-t border-paper-deep flex items-end gap-2 bg-white">
              <div className="flex-1 bg-paper-warm rounded-3xl px-4 py-3 text-[14px] text-ink min-h-[44px]">
                Sounds great — we'll be there around 11.|
              </div>
              <button
                className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center flex-shrink-0"
                aria-label="Send"
              >
                <Send size={16} strokeWidth={2} />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </ChromeFrame>
  ),
  name: "03 · Composing a reply",
  layout: { x: 0, y: 2340, width: 1740, height: 900 },
};

/* Step 4 — Mobile thread (narrow viewport) ─────────────────────────── */
export const Step4Mobile: TempoStoryboard = {
  render: () => (
    <div className="flex flex-col h-full bg-white">
      <header className="flex items-center gap-3 px-4 py-3 border-b border-paper-deep">
        <ArrowLeft size={18} className="text-ink" />
        <Avatar src={conv.hostAvatar} alt={conv.hostName} size="sm" />
        <div className="min-w-0">
          <p className="text-[14px] font-semibold text-ink">{conv.hostName}</p>
          <p className="text-[11px] text-ink-quiet truncate">{conv.listingTitle}</p>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {conv.messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 ${msg.senderId === "guest" ? "flex-row-reverse" : "flex-row"}`}
          >
            {msg.senderId === "host" && (
              <Avatar src={conv.hostAvatar} alt={conv.hostName} size="xs" className="flex-shrink-0 mt-1" />
            )}
            <div
              className={`max-w-[78%] px-3.5 py-2 rounded-3xl text-[13px] leading-relaxed ${
                msg.senderId === "guest" ? "bg-paper-warm text-ink" : "bg-ink text-white"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="px-3 py-2.5 border-t border-paper-deep flex items-end gap-2 bg-white">
        <div className="flex-1 bg-paper-warm rounded-3xl px-3.5 py-2.5 text-[13px] text-ink-quiet min-h-[40px]">
          Type a message…
        </div>
        <button
          className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center opacity-40 flex-shrink-0"
          aria-label="Send"
        >
          <Send size={14} strokeWidth={2} />
        </button>
      </div>
    </div>
  ),
  name: "04 · Thread on mobile",
  layout: { x: 1780, y: 1080, width: 375, height: 812 },
};

