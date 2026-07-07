import { Badge } from '@/design-system/primitives/Badge';
import { HavnMark, FONT_SANS, DARK } from '@/design-system/canvas-chrome';
import { BadgeSection, BadgeRow } from './_helpers';

export default function BadgesBoard() {
  return (
    <div
      className="w-[1012px] h-[3091px] pt-[100px]"
      style={{ background: DARK.paper, color: DARK.ink, padding: "100px 72px 56px", fontFamily: FONT_SANS, position: "relative" }}
    >
      <HavnMark />

      {/* Page header */}
      <h1 className="mt-[32px] font-medium text-4xl"
        style={{ fontFamily: FONT_SANS, letterSpacing: "-0.02em", color: DARK.ink, margin: 0 }}
      >
        Badges
      </h1>
      <p
        style={{
          fontFamily: FONT_SANS,
          fontSize: 15,
          color: DARK.inkQuiet,
          margin: "16px 0 56px",
          lineHeight: 1.6,
          maxWidth: 540,
        }}
      ></p>

      <BadgeSection
        title="Neutral / Identity Badge"
        description="A generic label that has contrast against the background. We usually use these for labelling types of users, like 'Guest' or 'Host', and for plain factual metadata."
      >
        <BadgeRow label="Strong">
          <Badge variant="ink">Host</Badge>
          <Badge variant="ink">Top of the night</Badge>
        </BadgeRow>
        <BadgeRow label="Light">
          <Badge variant="default">Guest</Badge>
          <Badge variant="default">Member since 2023</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Accent Badge"
        description="Coral brand emphasis. Reserved for the few moments worth the brand-coloured pop — Guest favourite, featured stays, editor picks."
      >
        <BadgeRow label="Filled">
          <Badge variant="accent">Guest favourite</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="accent">Featured</Badge>
          <Badge variant="accent">Editor's pick</Badge>
          <Badge variant="accent">New</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Success Badge"
        description="Used to indicate confirmation, approval, or when a task has completed. Most common: a confirmed booking on the trips list."
      >
        <BadgeRow label="Filled">
          <Badge variant="success">Confirmed</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="success">Approved</Badge>
          <Badge variant="success">Booked</Badge>
          <Badge variant="success">Paid</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Warning Badge"
        description="Used to draw attention to potential issues, or warn a user about a potential problem. Pulses when the matter is time-sensitive — like a same-day check-in."
      >
        <BadgeRow label="Pulsing">
          <Badge variant="warning" pulse>Check-in today</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="warning">Action needed</Badge>
          <Badge variant="warning">Limited availability</Badge>
          <Badge variant="warning">In review</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Danger Badge"
        description="Used for destructive actions, errors, or something that urgently needs attention. Lives on cancelled trips and refunded transactions."
      >
        <BadgeRow label="Filled">
          <Badge variant="error">Cancelled</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="error">Removed</Badge>
          <Badge variant="error">Refunded</Badge>
          <Badge variant="error">Unavailable</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Muted Badge"
        description="For things that have passed or been quietly archived. Same shape as the rest — the muted tone signals 'historical' or 'inactive' without raising alarm."
      >
        <BadgeRow label="Filled">
          <Badge variant="muted">Past</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="muted">Archived</Badge>
          <Badge variant="muted">Inactive</Badge>
          <Badge variant="muted">Draft</Badge>
        </BadgeRow>
      </BadgeSection>

      <BadgeSection
        title="Tier Badge"
        description="Gold marker for earned status. Reserved for Superhosts — hosts who've consistently delivered exceptional experiences."
      >
        <BadgeRow label="Filled">
          <Badge variant="gold">Superhost</Badge>
        </BadgeRow>
        <BadgeRow label="Examples">
          <Badge variant="gold">Premium host</Badge>
          <Badge variant="gold">Verified</Badge>
        </BadgeRow>
      </BadgeSection>
    </div>
  );
}
