import { Input } from '@/design-system/primitives/Input';
import { InputSection, InputRowWithCaption, PageShell } from './_helpers';

export default function StatesBoard() {
  return (
    <PageShell
      width={1280}
      title="States"
      description="Six visual states — default, hover, focus, filled, disabled, error — plus the with-hint variant that wraps the field with help copy below."
    >
      <InputSection
        title="Default"
        description="The resting state. Light grey border, ink label above, ink-quiet placeholder inside."
      >
        <InputRowWithCaption label="Rest" caption="border-paper-deep">
          <Input label="Destination" placeholder="Search destinations" />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Hover"
        description="Border darkens to ink-quiet as the cursor enters. Background stays white — the change is subtle on purpose."
      >
        <InputRowWithCaption label="Hover" caption="hover:border-ink-quiet">
          <Input label="Destination" placeholder="Search destinations" className="border-ink-quiet!" />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Focus"
        description="Border goes ink, a 2px ring-3 of 6% black halo lifts the field off the surface. The single strongest signal in the system that this is where input goes."
      >
        <InputRowWithCaption label="Focus" caption="focus:border-ink + ring-3">
          <Input
            label="Destination"
            defaultValue="Lis"
            className="border-ink! shadow-[0_0_0_2px_rgba(0,0,0,0.06)]!"
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Filled"
        description="When a value is present. Same border weight as default — value alone signals progress."
      >
        <InputRowWithCaption label="Filled" caption="value present">
          <Input label="Destination" defaultValue="Lisbon, Portugal" />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Disabled"
        description="50% opacity, cursor not-allowed. Used for fields locked by context — recipient on a message reply, promo not yet active."
      >
        <InputRowWithCaption label="Disabled" caption="opacity-50">
          <Input label="Promo code" placeholder="Coming soon" disabled />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Error"
        description="Border turns coral, error text replaces hint below. Reserve for genuine input errors — never for missing-required-field nags during typing."
      >
        <InputRowWithCaption label="Error · rest" caption="border-accent">
          <Input label="Email" defaultValue="not-an-email" error="Please enter a valid email" />
        </InputRowWithCaption>
        <InputRowWithCaption label="Error · focus" caption="ring 10% coral">
          <Input
            label="Email"
            defaultValue="not-an-email"
            error="Please enter a valid email"
            className="shadow-[0_0_0_2px_rgba(255,56,92,0.10)]!"
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="With hint"
        description="A short line of help under the field. 12px, ink-quiet — quieter than the input itself so it never competes."
      >
        <InputRowWithCaption label="Rest" caption="hint prop">
          <Input
            label="Phone number"
            placeholder="+1 555 0123"
            hint="We'll only use this to confirm your booking."
          />
        </InputRowWithCaption>
      </InputSection>
    </PageShell>
  );
}
