import { MessageCircle } from 'lucide-react';
import { Frame } from '@/design-system/canvas-chrome';
import { MessagesPage } from '@/pages/MessagesPage';
import { EmptyState, GroupHeader, SectionBlock, groupShell } from './_helpers';

export default function MessagesPageGroupBoard() {
  return (
    <div className="w-[1168px]" style={groupShell}>
      <GroupHeader
        index="06 · Page"
        title="MessagesPage · /messages"
        subtext="A two-pane inbox. Conversation list on the left, the active thread with the host on the right."
      />
      <SectionBlock
        index="State · 01"
        title="Inbox + thread"
        subtext="List sidebar with previews and unread dots. Selected conversation expands into the message thread on the right, with a composer at the bottom."
      >
        <Frame route="/messages"><MessagesPage /></Frame>
      </SectionBlock>
      <SectionBlock
        index="State · 02"
        title="Empty · no messages"
        subtext="When the inbox is empty — message bubble icon, calm copy, and a way back to discovery."
      >
        <Frame route="/messages">
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "80px 24px", minHeight: 760, background: "#fff" }}>
            <div style={{ width: "100%", maxWidth: 520 }}>
              <EmptyState
                icon={MessageCircle}
                title="Nothing here yet"
                body="When you book a stay, your messages with the host will appear here."
                cta="Find a stay"
              />
            </div>
          </div>
        </Frame>
      </SectionBlock>
    </div>
  );
}
