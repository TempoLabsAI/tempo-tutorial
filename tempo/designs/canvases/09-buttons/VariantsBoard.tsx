import { Button } from '@/design-system/primitives/Button';
import { MonoText } from '@/design-system/canvas-chrome';
import { PageShell, ButtonSection, ROW_LABEL_STYLE } from './_helpers';

function ButtonRowVertical({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      className="[&_button]:w-[200px]!"
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: 24,
        alignItems: "center",
        padding: "16px 0",
      }}
    >
      <p style={ROW_LABEL_STYLE}>{label}</p>
      <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
        {children}
      </div>
    </div>
  );
}

export default function VariantsBoard() {
  return (
    <PageShell
      width={1280}
      title="Variants"
      description="Each variant has a single job, and each carries the same set of states. Pair the right variant to the action and the page reads itself — never more than one primary per screen."
    >
      <ButtonSection
        title="Primary"
        description="Coral pink. The one most important action on a screen — Reserve, Book, Send. Use once per view, never more."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="primary">Reserve</Button>
          <MonoText size={11} color="#717171">bg-accent</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="primary" className="bg-accent-hover! shadow-sm!">Reserve</Button>
          <MonoText size={11} color="#717171">bg-accent-hover</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="primary" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Reserve</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="primary" disabled>Reserve</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Loading">
          <Button variant="primary" loading>Reserve</Button>
          <MonoText size={11} color="#717171">loading prop</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Ink"
        description="Charcoal. Confirmations and continue-style CTAs inside modals and flows where coral would be too loud."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="ink">Continue</Button>
          <MonoText size={11} color="#717171">bg-ink</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="ink" className="bg-ink-soft!">Continue</Button>
          <MonoText size={11} color="#717171">bg-ink-soft</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="ink" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Continue</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="ink" disabled>Continue</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Loading">
          <Button variant="ink" loading>Continue</Button>
          <MonoText size={11} color="#717171">loading prop</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Outline"
        description="Transparent with a grey border. Quiet secondary actions that don't need to compete — share, see all, learn more."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="outline">Share</Button>
          <MonoText size={11} color="#717171">border-paper-deep</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="outline" className="border-ink! bg-paper-warm/50!">Share</Button>
          <MonoText size={11} color="#717171">border-ink · bg-paper-warm/50</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="outline" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Share</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="outline" disabled>Share</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Secondary"
        description="Soft paper fill. For pairs of equal-weight options or filter controls where outline-solid reads as too wiry."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="secondary">Browse all</Button>
          <MonoText size={11} color="#717171">bg-paper-warm</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="secondary" className="bg-paper-dark!">Browse all</Button>
          <MonoText size={11} color="#717171">bg-paper-dark</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="secondary" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Browse all</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="secondary" disabled>Browse all</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Destructive"
        description="Same shape as ink. The label carries the warning — Cancel trip, Delete account. Always second to a confirm step."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="destructive">Cancel trip</Button>
          <MonoText size={11} color="#717171">bg-ink</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="destructive" className="bg-ink-soft!">Cancel trip</Button>
          <MonoText size={11} color="#717171">bg-ink-soft</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="destructive" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Cancel trip</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="destructive" disabled>Cancel trip</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
      </ButtonSection>

      <ButtonSection
        title="Ghost"
        description="Transparent until hover. Inline links, dismissive actions, tertiary chrome that lives inside denser surfaces."
      >
        <ButtonRowVertical label="Rest">
          <Button variant="ghost">Skip</Button>
          <MonoText size={11} color="#717171">transparent</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Hover">
          <Button variant="ghost" className="bg-paper-warm!">Skip</Button>
          <MonoText size={11} color="#717171">bg-paper-warm</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Focus">
          <Button variant="ghost" className="ring-2 ring-offset-2 ring-offset-[#0f0f0e] ring-white/60">Skip</Button>
          <MonoText size={11} color="#717171">focus-visible:ring-3</MonoText>
        </ButtonRowVertical>
        <ButtonRowVertical label="Disabled">
          <Button variant="ghost" disabled>Skip</Button>
          <MonoText size={11} color="#717171">opacity-50</MonoText>
        </ButtonRowVertical>
      </ButtonSection>
    </PageShell>
  );
}
