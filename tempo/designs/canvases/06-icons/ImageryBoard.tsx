import {
  MonoText,
  FONT_SANS,
  DARK,
} from '@/design-system/canvas-chrome';
import { HeartButton } from '@/design-system/components/HeartButton';
import { LISTINGS } from '@/data/listings';
import { SizePage } from './_helpers';

/* Section helper — label-left / arbitrary-content-right (no grid enforced).
   Used by the Imagery storyboard whose sections have varying content layouts. */
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: 56,
        alignItems: "flex-start",
        padding: "44px 0",
        borderTop: `1px solid ${DARK.hairline}`,
      }}
    >
      <div style={{ width: 280, flexShrink: 0, paddingTop: 8 }}>
        <h2
          contentEditable
          suppressContentEditableWarning
          style={{
            fontFamily: FONT_SANS,
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: "-0.015em",
            color: DARK.ink,
            margin: 0,
            lineHeight: 1.2,
            outline: "none",
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontFamily: FONT_SANS,
            fontSize: 13.5,
            color: DARK.inkQuiet,
            margin: "12px 0 0",
            lineHeight: 1.55,
          }}
        >
          {description}
        </p>
      </div>
      <div
        style={{
          flex: 1,
          minWidth: 0,
          border: "1px solid #ebebeb",
          borderRadius: 8,
          padding: "32px 44px",
          background: "#f7f7f7",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function ImageryBoard() {
  return (
    <SizePage
      title="Imagery"
      intro="Photos are the loudest part of any Havn page. Three approved aspect ratios, generous 16px rounding, and one overlay treatment — the coral heart top-right, optionally a 'Guest favourite' pill top-left."
    >
      <Section
        title="Aspect ratios"
        description="Square for ListingCard photos, 4:3 for the listing-detail hero, 16:9 for gallery rows. Every frame rounds at 16px (rounded-2xl)."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          <div>
            <div style={{ aspectRatio: "1 / 1", borderRadius: 16, overflow: "hidden", background: DARK.paperSunken }}>
              <img src={LISTINGS[0].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>Square · 1:1</p>
              <MonoText size={11} color="#717171">rounded-2xl · card photo</MonoText>
            </div>
          </div>
          <div>
            <div style={{ aspectRatio: "4 / 3", borderRadius: 16, overflow: "hidden", background: DARK.paperSunken }}>
              <img src={LISTINGS[1].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>Hero · 4:3</p>
              <MonoText size={11} color="#717171">rounded-2xl · listing hero</MonoText>
            </div>
          </div>
          <div>
            <div style={{ aspectRatio: "16 / 9", borderRadius: 16, overflow: "hidden", background: DARK.paperSunken }}>
              <img src={LISTINGS[2].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ marginTop: 10 }}>
              <p style={{ fontFamily: FONT_SANS, fontSize: 13, fontWeight: 600, color: "#222", margin: 0 }}>Wide · 16:9</p>
              <MonoText size={11} color="#717171">rounded-2xl · gallery row</MonoText>
            </div>
          </div>
        </div>
      </Section>

      <Section
        title="Gallery grid"
        description="The 5-image composite that anchors the listing-detail header. One hero photo (2:1, left) plus four supporting photos (1:1, right)."
      >
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gridTemplateRows: "1fr 1fr", gap: 8, height: 360, borderRadius: 16, overflow: "hidden" }}>
          <img src={LISTINGS[0].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", gridRow: "1 / 3" }} />
          <img src={LISTINGS[0].images[1] ?? LISTINGS[1].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <img src={LISTINGS[0].images[2] ?? LISTINGS[2].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <img src={LISTINGS[0].images[3] ?? LISTINGS[3].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <img src={LISTINGS[0].images[4] ?? LISTINGS[4].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        </div>
      </Section>

      <Section
        title="Overlays"
        description="The HeartButton sits top-right on every photo — white on dark imagery, coral when saved. The 'Guest favourite' pill is the only other overlay allowed; it sits top-left."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <div style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: 16, overflow: "hidden" }}>
            <img src={LISTINGS[0].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 14, right: 14 }}>
              <HeartButton saved={false} size="md" surface="overlay" />
            </div>
            <div style={{ position: "absolute", top: 14, left: 14 }}>
              <span style={{ background: "rgba(255,255,255,0.9)", color: "#222", fontSize: 12, fontWeight: 600, padding: "6px 10px", borderRadius: 999, fontFamily: FONT_SANS }}>Guest favourite</span>
            </div>
          </div>
          <div style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: 16, overflow: "hidden" }}>
            <img src={LISTINGS[4].images[0]} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", top: 14, right: 14 }}>
              <HeartButton saved={true} size="md" surface="overlay" />
            </div>
          </div>
        </div>
      </Section>
    </SizePage>
  );
}
