import type { LucideIcon } from 'lucide-react';
import { Heart, Search, Calendar, Check, Star } from 'lucide-react';
import { MonoText, FONT_SANS, FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, Section } from './shared';

/* ── IconSwatch — icon rendered in the token's colour on a paper tile ── */
function IconSwatch({
  name,
  value,
  surface = "#ffffff",
  note,
  icon: Icon = Heart,
}: {
  name: string;
  value: string;
  surface?: string;
  note?: string;
  icon?: LucideIcon;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        style={{
          background: surface,
          height: 120,
          borderRadius: 12,
          border: surface === "#ffffff" ? "1px solid #ebebeb" : "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon size={28} strokeWidth={1.75} color={value} />
      </div>
      <div>
        <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>{name}</p>
        <p style={{ fontFamily: FONT_MONO, fontSize: 11, color: "#717171", margin: "2px 0 0" }}>{value}</p>
        {note && (
          <p style={{ fontFamily: FONT_SANS, fontSize: 12, color: "#717171", margin: "6px 0 0", lineHeight: 1.45 }}>
            {note}
          </p>
        )}
      </div>
    </div>
  );
}

export function IconColoursBoard() {
  return (
    <PageShell
      title="Icon colours"
      intro="Icons inherit colour from the label they sit beside — there isn't a separate icon palette. The five tokens below are the only colours an icon is ever rendered in. Stroke width 1.75–2, never filled (except the saved heart and rating star)."
    >
      <Section
        title="The five tokens"
        description="Default for primary actions, soft and quiet for supporting roles, accent for the one important saved state, on-dark for icons that overlay imagery. Disabled is a deliberate fifth — only used on locked controls."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
          <IconSwatch icon={Search} name="Default" value="#222222" note="Buttons, input affixes, primary nav. The same as Ink." />
          <IconSwatch icon={Calendar} name="Soft" value="#484848" note="Section headers, dense rows beside a label." />
          <IconSwatch icon={Star} name="Quiet" value="#717171" note="Captions, hints, metadata. The same as Ink quiet." />
          <IconSwatch icon={Heart} name="Accent" value="#FF385C" note="The saved heart, error states, the one CTA per page." />
          <IconSwatch icon={Heart} name="On dark" value="#ffffff" surface="#222222" note="Icons on imagery or the dark chrome of an overlay button." />
        </div>
      </Section>

      <Section
        title="Inheriting label colour"
        description="In practice every icon is paired with text. The icon almost always picks up the text's colour — never the other way around. If the label is Ink soft, the icon is Ink soft."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#222", fontFamily: FONT_SANS, fontSize: 15, fontWeight: 600 }}>
            <Search size={18} strokeWidth={1.75} /> Search destinations
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#484848", fontFamily: FONT_SANS, fontSize: 14 }}>
            <Calendar size={16} strokeWidth={1.75} /> Jun 8 – 13 · 5 nights
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#717171", fontFamily: FONT_SANS, fontSize: 13 }}>
            <Star size={14} strokeWidth={1.75} /> 4.97 · 184 reviews
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#FF385C", fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600 }}>
            <Heart size={14} strokeWidth={2} fill="#FF385C" /> Saved to wishlist
          </div>
        </div>
      </Section>

      <Section
        title="Filled exceptions"
        description="Two icons break the stroke-only rule because their meaning depends on it. The heart fills with Accent when saved, and the rating star is always filled Ink."
      >
        <div style={{ background: "#fff", padding: 28, borderRadius: 12, display: "flex", gap: 32, alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Heart size={24} strokeWidth={2} fill="#FF385C" color="#FF385C" />
            <MonoText size={11} color="#717171">heart · fill-accent</MonoText>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Star size={24} strokeWidth={2} fill="#222" color="#222" />
            <MonoText size={11} color="#717171">star · fill-ink</MonoText>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Check size={24} strokeWidth={2.5} color="#1b5e20" />
            <MonoText size={11} color="#717171">check · success fg</MonoText>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
