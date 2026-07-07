import {
  Search,
  Heart,
  Send,
  Plus,
  ArrowRight,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/design-system/primitives/Button';
import { HeartButton } from '@/design-system/components/HeartButton';
import { MonoText } from '@/design-system/canvas-chrome';
import { PageShell, ButtonSection, ButtonRow } from './_helpers';

export default function IconsBoard() {
  return (
    <PageShell
      width={1280}
      title="Icons"
      description="All icons come from lucide-react at 16×16, strokeWidth 2. They inherit the label colour and sit on either side of the label — or stand alone."
    >
      <ButtonSection
        title="Leading icon"
        description="The most common pattern. The icon previews the action — search, save, send, add. Always 8px before the label."
      >
        <ButtonRow label="Default">
          <Button variant="primary"><Search size={16} strokeWidth={2} /> Search</Button>
          <Button variant="outline"><Heart size={16} strokeWidth={2} /> Save</Button>
          <Button variant="ink"><Send size={16} strokeWidth={2} /> Send</Button>
          <Button variant="ghost"><Plus size={16} strokeWidth={2} /> Add guest</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Trailing icon"
        description="Used when the icon points forward — Continue, Next, drop-down chevrons. Sits 8px after the label."
      >
        <ButtonRow label="Default">
          <Button variant="primary">Continue <ArrowRight size={16} strokeWidth={2} /></Button>
          <Button variant="ink">Next <ArrowRight size={16} strokeWidth={2} /></Button>
          <Button variant="outline">Filters <ChevronDown size={16} strokeWidth={2} /></Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Icon only"
        description="One exception to label-first buttons: the HeartButton. The heart is a universally read save action, so the icon alone carries the meaning. Every other action ships with a label. See the Components canvas for the full HeartButton breakdown."
      >
        <ButtonRow label="On imagery">
          <div style={{ background: "#222222", padding: 16, borderRadius: 12, display: "flex", gap: 16, alignItems: "center" }}>
            <HeartButton saved={false} size="md" surface="overlay" />
            <HeartButton saved={true} size="md" surface="overlay" />
          </div>
          <MonoText size={11} color="#717171">surface="overlay"</MonoText>
        </ButtonRow>
        <ButtonRow label="On paper">
          <div style={{ background: "#fff", padding: 12, borderRadius: 8, display: "flex", gap: 16, alignItems: "center", border: "1px solid #ebebeb" }}>
            <HeartButton saved={false} size="md" surface="inline" />
            <HeartButton saved={true} size="md" surface="inline" />
          </div>
          <MonoText size={11} color="#717171">surface="inline"</MonoText>
        </ButtonRow>
      </ButtonSection>
    </PageShell>
  );
}
