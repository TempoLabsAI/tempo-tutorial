import { useState } from "react";
import { Link } from "react-router-dom";
import { Send, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/design-system/layout/Container";
import { Avatar } from "@/design-system/primitives/Avatar";
import { cn } from "@/lib/utils";
import { CONVERSATIONS } from "@/data/messages";

export function MessagesPage() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [newMsg, setNewMsg] = useState("");
  const [localMessages, setLocalMessages] = useState<Record<string, string[]>>({});

  const active = CONVERSATIONS.find((c) => c.id === activeId);
  const unreadTotal = CONVERSATIONS.reduce(
    (s, c) => s + c.messages.filter((m) => m.senderId === "host" && !m.read).length,
    0,
  );

  function send() {
    if (!newMsg.trim() || !activeId) return;
    setLocalMessages((prev) => ({
      ...prev,
      [activeId]: [...(prev[activeId] ?? []), newMsg.trim()],
    }));
    setNewMsg("");
  }

  return (
    <div className="min-h-screen pb-0 bg-white">
      <Container className="pt-0 px-0 sm:px-6 max-w-5xl">
        <div className="flex h-[calc(100vh-160px)] min-h-[520px] sm:rounded-2xl sm:my-6 sm:border sm:border-paper-deep overflow-hidden bg-white">
          {/* Inbox sidebar */}
          <div
            className={cn(
              "w-full sm:w-80 shrink-0 sm:border-r border-paper-deep flex flex-col",
              activeId && "hidden sm:flex",
            )}
          >
            <header className="px-5 py-5 border-b border-paper-deep">
              <h1 className="text-[24px] font-semibold text-ink">
                Messages
                {unreadTotal > 0 && (
                  <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-[11px] font-bold bg-accent text-white rounded-full align-middle">
                    {unreadTotal}
                  </span>
                )}
              </h1>
            </header>
            <div className="overflow-y-auto flex-1">
              {CONVERSATIONS.map((conv) => {
                const unread = conv.messages.filter(
                  (m) => m.senderId === "host" && !m.read,
                ).length;
                const last = conv.messages[conv.messages.length - 1];
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveId(conv.id)}
                    className={cn(
                      "w-full flex items-start gap-3 px-5 py-4 text-left border-b border-paper-deep/60",
                      "hover:bg-paper-warm transition-colors",
                      activeId === conv.id && "bg-paper-warm",
                    )}
                  >
                    <Avatar
                      src={conv.hostAvatar}
                      alt={conv.hostName}
                      size="md"
                      className="shrink-0 mt-0.5"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2 mb-0.5">
                        <p
                          className={cn(
                            "text-[14px] text-ink",
                            unread > 0 && "font-semibold",
                          )}
                        >
                          {conv.hostName}
                        </p>
                        {unread > 0 && (
                          <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
                        )}
                      </div>
                      <p className="text-[12px] text-ink-quiet line-clamp-1">
                        {conv.listingTitle}
                      </p>
                      <p
                        className={cn(
                          "text-[13px] mt-1 line-clamp-1",
                          unread > 0 ? "text-ink font-medium" : "text-ink-quiet",
                        )}
                      >
                        {last?.senderId === "guest" ? "You: " : ""}
                        {last?.text}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Thread */}
          <div className={cn("flex-1 flex flex-col min-w-0", !activeId && "hidden sm:flex")}>
            {!active ? (
              <div className="flex-1 flex items-center justify-center px-6">
                <div className="text-center max-w-sm">
                  <p className="text-[20px] font-semibold text-ink mb-1">
                    Your messages
                  </p>
                  <p className="text-[14px] text-ink-quiet">
                    Choose a conversation from the inbox to read or reply.
                  </p>
                </div>
              </div>
            ) : (
              <>
                <header className="flex items-center gap-3 px-5 py-4 border-b border-paper-deep">
                  <button
                    onClick={() => setActiveId(null)}
                    className="sm:hidden text-ink-quiet hover:text-ink"
                    aria-label="Back to inbox"
                  >
                    <ArrowLeft size={18} />
                  </button>
                  <Avatar src={active.hostAvatar} alt={active.hostName} size="sm" />
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-ink truncate">
                      {active.hostName}
                    </p>
                    <p className="text-[12px] text-ink-quiet truncate">
                      {active.listingTitle}
                    </p>
                  </div>
                  <Link
                    to={`/trips/${active.tripId}`}
                    className="ml-auto text-[13px] font-medium text-accent hover:underline"
                  >
                    View trip →
                  </Link>
                </header>

                <div className="flex-1 overflow-y-auto px-5 py-6 space-y-3">
                  {active.messages.map((msg) => (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex gap-2",
                        msg.senderId === "guest" ? "flex-row-reverse" : "flex-row",
                      )}
                    >
                      {msg.senderId === "host" && (
                        <Avatar
                          src={active.hostAvatar}
                          alt={active.hostName}
                          size="xs"
                          className="shrink-0 mt-1"
                        />
                      )}
                      <div
                        className={cn(
                          "max-w-[78%] px-4 py-2.5 rounded-3xl text-[14px] leading-relaxed",
                          msg.senderId === "guest"
                            ? "bg-paper-warm text-ink"
                            : "bg-ink text-white",
                        )}
                      >
                        {msg.text}
                      </div>
                    </motion.div>
                  ))}
                  {(localMessages[active.id] ?? []).map((m, i) => (
                    <motion.div
                      key={`local-${i}`}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex flex-row-reverse"
                    >
                      <div className="max-w-[78%] px-4 py-2.5 rounded-3xl text-[14px] bg-paper-warm text-ink leading-relaxed">
                        {m}
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="px-5 py-3 border-t border-paper-deep flex items-end gap-2 bg-white">
                  <textarea
                    value={newMsg}
                    onChange={(e) => setNewMsg(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        send();
                      }
                    }}
                    placeholder="Type a message…"
                    rows={1}
                    className="flex-1 resize-none bg-paper-warm rounded-3xl px-4 py-3 text-[14px] text-ink placeholder:text-ink-quiet focus:outline-hidden focus:ring-2 focus:ring-ink/10 min-h-[44px] max-h-32"
                  />
                  <button
                    onClick={send}
                    disabled={!newMsg.trim()}
                    className="w-11 h-11 rounded-full bg-accent text-white flex items-center justify-center transition-opacity disabled:opacity-40 hover:bg-accent-hover shrink-0"
                    aria-label="Send"
                  >
                    <Send size={16} strokeWidth={2} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
