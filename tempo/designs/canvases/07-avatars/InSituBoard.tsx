import { Avatar } from '@/design-system/primitives/Avatar';
import { Badge } from '@/design-system/primitives/Badge';
import { LISTINGS } from '@/data/listings';
import { HavnMark, FONT_SANS, DARK } from '@/design-system/canvas-chrome';
import { AvatarSection, AvatarRow } from './_helpers';

export default function InSituBoard() {
  return (
    <div
      className="w-[992px] h-[975px]"
      style={{ background: DARK.paper, color: DARK.ink, padding: "100px 72px 56px", fontFamily: FONT_SANS, position: "relative" }}
    >
      <HavnMark />

      <h1
        contentEditable
        suppressContentEditableWarning
        className="mt-[32px] font-medium text-4xl"
        style={{ fontFamily: FONT_SANS, letterSpacing: "-0.02em", color: DARK.ink, margin: "0 0 52px", outline: "none" }}
      >
        In situ
      </h1>

      <AvatarSection
        title="Host row"
        description="The most common composition. Default avatar on the left, name and a piece of metadata (hosting tenure, location) stacked on the right."
      >
        <AvatarRow label="Default">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, minWidth: 280 }}>
            <Avatar src={LISTINGS[0].host.avatar} alt={LISTINGS[0].host.name} size="md" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#222", margin: 0, fontFamily: FONT_SANS }}>{LISTINGS[0].host.name}</p>
              <p style={{ fontSize: 12, color: "#717171", margin: "2px 0 0", fontFamily: FONT_SANS }}>Hosting for 7 years</p>
            </div>
          </div>
        </AvatarRow>
      </AvatarSection>

      <AvatarSection
        title="Superhost row"
        description="Same shape as the host row, but with a gold Superhost badge underneath the name. Used wherever an earned-tier host appears."
      >
        <AvatarRow label="With badge">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, minWidth: 280 }}>
            <Avatar src={LISTINGS[1].host.avatar} alt={LISTINGS[1].host.name} size="md" />
            <div>
              <p style={{ fontSize: 14, fontWeight: 600, color: "#222", margin: 0, fontFamily: FONT_SANS }}>{LISTINGS[1].host.name}</p>
              <div style={{ marginTop: 4 }}>
                <Badge variant="gold">Superhost</Badge>
              </div>
            </div>
          </div>
        </AvatarRow>
      </AvatarSection>

      <AvatarSection
        title="Guest stack"
        description="Overlapping compact avatars to indicate a group of guests on a single trip. The fallback initials avatar caps the stack when the group exceeds what fits."
      >
        <AvatarRow label="Overlap">
          <div style={{ background: "#fff", padding: 16, borderRadius: 12, display: "flex", alignItems: "center", gap: 12, minWidth: 280 }}>
            <div style={{ display: "flex" }}>
              <Avatar src={LISTINGS[0].host.avatar} alt="g1" size="sm" />
              <div style={{ marginLeft: -10 }}>
                <Avatar src={LISTINGS[1].host.avatar} alt="g2" size="sm" />
              </div>
              <div style={{ marginLeft: -10 }}>
                <Avatar src={LISTINGS[2].host.avatar} alt="g3" size="sm" />
              </div>
              <div style={{ marginLeft: -10 }}>
                <Avatar alt="+3" size="sm" />
              </div>
            </div>
            <p style={{ fontSize: 13, color: "#717171", margin: 0, fontFamily: FONT_SANS }}>6 guests on this trip</p>
          </div>
        </AvatarRow>
      </AvatarSection>
    </div>
  );
}
