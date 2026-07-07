import { FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { Badge } from '@/design-system/primitives/Badge';
import { PageShell, Section } from './_helpers';

/* ── PairSwatch — semantic pair (background + foreground) ────────── */
function PairSwatch({
  name,
  bg,
  fg,
  note,
}: {
  name: string;
  bg: string;
  fg: string;
  note: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          background: bg,
          color: fg,
          height: 120,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: FONT_SANS,
          fontSize: 14,
          fontWeight: 600,
        }}
      >
        {name}
      </div>
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>{name}</p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>
          bg {bg} · fg {fg}
        </p>
        <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "6px 0 0", lineHeight: 1.45 }}>
          {note}
        </p>
      </div>
    </div>
  );
}

export default function SystemStatesBoard() {
  return (
    <PageShell
      title="System states"
      intro="Four background/foreground pairs that flag a state. Success for confirmed, Warning for time-sensitive, Error for failure, Gold for Superhost identity. They live almost entirely inside Badges — chrome and body text never adopt them."
    >
      <Section
        title="State pairs"
        description="Each pair is one tint and one ink darker than 4.5:1 contrast. Designed to be readable at 12px in a pill, against the bright surface of the badge."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <PairSwatch
            name="Success"
            bg="#e8f5e9"
            fg="#1b5e20"
            note="Confirmed bookings · payment received · 'check-in complete'."
          />
          <PairSwatch
            name="Warning"
            bg="#fff3e0"
            fg="#e65100"
            note="Time-sensitive — 'check-in today', 'expires soon', incomplete profile."
          />
          <PairSwatch
            name="Error"
            bg="#ffebee"
            fg="#b71c1c"
            note="Cancelled bookings · payment failed · validation errors."
          />
          <PairSwatch
            name="Gold"
            bg="#fef7e0"
            fg="#7d5a00"
            note="Superhost identity — host-tier signal. Never used for state."
          />
        </div>
      </Section>

      <Section
        title="In badges"
        description="Where the state pairs actually live. The badge is the only chrome that adopts a state colour — outside of it, status is communicated with copy alone."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
          <Badge variant="success">Confirmed</Badge>
          <Badge variant="warning" pulse>Check-in today</Badge>
          <Badge variant="error">Cancelled</Badge>
          <Badge variant="gold">Superhost</Badge>
          <Badge variant="accent">Guest favourite</Badge>
          <Badge variant="ink">Ink</Badge>
          <Badge variant="muted">Past</Badge>
          <Badge variant="default">Default</Badge>
        </div>
      </Section>
    </PageShell>
  );
}
