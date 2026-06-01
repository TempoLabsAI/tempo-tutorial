import { FONT_SANS } from '@/design-system/canvas-chrome';
import { PageShell, Section, Swatch } from './shared';

export function SurfacesBoard() {
  return (
    <PageShell
      title="Surfaces"
      intro="Four surface tokens cover every backdrop in the app. Paper is the default page. Paper warm lifts sections and cards. Paper deep is for chrome and the dark divisions inside images. Hairline is the one-pixel border that separates everything."
    >
      <Section
        title="Surface ramp"
        description="The four stops, lightest to deepest. Paper carries the page, Paper warm gives sections a quiet lift, Paper deep is reserved for chrome and decorative dividers."
      >
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          <Swatch name="Paper" value="#ffffff" note="The default page background." />
          <Swatch name="Paper warm" value="#f7f7f7" note="Section lifts · card hovers · inline panels." />
          <Swatch name="Paper deep" value="#dddddd" note="Chrome, image placeholders, dividers in dense rows." />
          <Swatch name="Hairline" value="#ebebeb" note="The one-pixel border. Used on cards, inputs, rows." />
        </div>
      </Section>

      <Section
        title="Paper warm in use"
        description="What it looks like when a section lifts off the page. Same content, just a warmer surface — enough to read as 'a different thing' without a heavy border."
      >
        <div style={{ background: "#fff", padding: 24, borderRadius: 12 }}>
          <div style={{ background: "#f7f7f7", padding: 24, borderRadius: 10 }}>
            <p style={{ fontFamily: FONT_SANS, fontSize: 15, fontWeight: 600, color: "#222", margin: 0 }}>
              Things you might like
            </p>
            <p style={{ fontFamily: FONT_SANS, fontSize: 13, color: "#717171", margin: "6px 0 0", lineHeight: 1.5 }}>
              A panel sitting on Paper warm. Reads as elevated without the cost of a shadow.
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
