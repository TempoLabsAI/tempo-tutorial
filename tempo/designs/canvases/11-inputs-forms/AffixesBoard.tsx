import { Search, Eye, AtSign, DollarSign, Check } from 'lucide-react';
import { Input } from '@/design-system/primitives/Input';
import { FONT_MONO } from '@/design-system/canvas-chrome';
import { PageShell, InputSection, InputRowWithCaption } from './shared';

export function AffixesBoard() {
  return (
    <PageShell
      width={1280}
      title="Affixes"
      description="Icons or short tokens sit inside the field. Prefix on the left previews context — Search, $, @. Suffix on the right signals state or an action — currency, eye toggle, check."
    >
      <InputSection
        title="Prefix"
        description="A 16px lucide icon at 14px from the left edge. Padding shifts to 40px so the value clears the icon. Always ink-quiet, never coral."
      >
        <InputRowWithCaption label="Search" caption="prefix · Search">
          <Input placeholder="Search destinations" prefix={<Search size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
        <InputRowWithCaption label="Currency" caption="prefix · $">
          <Input label="Nightly rate" defaultValue="180" prefix={<DollarSign size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
        <InputRowWithCaption label="Username" caption="prefix · @">
          <Input label="Username" defaultValue="maria.lisbon" prefix={<AtSign size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Suffix"
        description="An icon or short token on the right. Used for unit hints (nights, guests), state markers (check, error), or interactive togglers (eye for password reveal)."
      >
        <InputRowWithCaption label="Validated" caption="suffix · Check">
          <Input
            label="Email"
            defaultValue="maria@havn.com"
            suffix={<Check size={16} strokeWidth={2} className="text-emerald-500" />}
          />
        </InputRowWithCaption>
        <InputRowWithCaption label="Reveal" caption="suffix · Eye">
          <Input
            label="Password"
            type="password"
            defaultValue="••••••••"
            suffix={<Eye size={16} strokeWidth={1.75} />}
          />
        </InputRowWithCaption>
        <InputRowWithCaption label="Unit" caption="suffix · text">
          <Input label="Guests" defaultValue="4" suffix={<span style={{ fontSize: 13 }}>people</span>} />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Prefix + suffix"
        description="Both ends styled. Padding adjusts to 40px on both sides. Common when a field carries unit context on one side and validation on the other."
      >
        <InputRowWithCaption label="Currency + check" caption="both ends">
          <Input
            label="Nightly rate"
            defaultValue="180"
            prefix={<DollarSign size={16} strokeWidth={1.75} />}
            suffix={<Check size={16} strokeWidth={2} className="text-emerald-500" />}
          />
        </InputRowWithCaption>
        <InputRowWithCaption label="Search + clear" caption="composed">
          <Input
            placeholder="Search"
            defaultValue="Lis"
            prefix={<Search size={16} strokeWidth={1.75} />}
            suffix={<span style={{ fontSize: 11, fontFamily: FONT_MONO }}>⌘ K</span>}
          />
        </InputRowWithCaption>
      </InputSection>
    </PageShell>
  );
}
