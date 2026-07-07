import {
  Mail,
  Lock,
  Eye,
  MapPin,
  AtSign,
  Phone,
  User,
  Check,
} from 'lucide-react';
import { Input } from '@/design-system/primitives/Input';
import { Button } from '@/design-system/primitives/Button';
import { Eyebrow, FONT_SANS } from '@/design-system/canvas-chrome';
import { InputSection, PageShell } from './_helpers';

export default function InSituBoard() {
  return (
    <PageShell
      width={1280}
      title="In situ"
      description="Four real forms from the app. Each shows how labels, inputs, hints, and a primary action stack — and how the rhythm holds even as field count grows."
    >
      <InputSection
        title="Sign in"
        description="Two fields, primary action, ghost secondary. The simplest possible form — what most marketing pages settle on."
      >
        <div style={{ width: 380, background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
            Welcome back
          </p>
          <Input label="Email" type="email" placeholder="you@example.com" prefix={<Mail size={16} strokeWidth={1.75} />} />
          <Input label="Password" type="password" placeholder="••••••••" prefix={<Lock size={16} strokeWidth={1.75} />} suffix={<Eye size={16} strokeWidth={1.75} />} />
          <Button variant="primary">Continue</Button>
          <Button variant="ghost">Forgot password?</Button>
        </div>
      </InputSection>

      <InputSection
        title="Sign up"
        description="Four fields, one hint to set expectations on password strength, one primary CTA. Inline error on email if it's already taken."
      >
        <div style={{ width: 380, background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
            Create your account
          </p>
          <Input label="Full name" placeholder="Maria Costa" prefix={<User size={16} strokeWidth={1.75} />} />
          <Input
            label="Email"
            type="email"
            defaultValue="maria@havn.com"
            prefix={<Mail size={16} strokeWidth={1.75} />}
            error="Looks like you already have an account."
          />
          <Input
            label="Password"
            type="password"
            placeholder="At least 8 characters"
            prefix={<Lock size={16} strokeWidth={1.75} />}
            hint="Mix letters, numbers, and one symbol."
          />
          <Button variant="primary">Create account</Button>
        </div>
      </InputSection>

      <InputSection
        title="Send a host message"
        description="Recipient is locked (disabled), message is free-form, primary action sends. The shape that lives inside every booking conversation."
      >
        <div style={{ width: 460, background: "#fff", padding: 28, borderRadius: 12, display: "flex", flexDirection: "column", gap: 16 }}>
          <Eyebrow>Send a message</Eyebrow>
          <Input label="To" defaultValue="Maria · Lisbon host" disabled />
          <Input
            label="Message"
            placeholder="Hi Maria — quick question about check-in…"
            hint="Hosts usually reply within an hour."
          />
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="ink">Send</Button>
          </div>
        </div>
      </InputSection>

      <InputSection
        title="Edit profile"
        description="A heavier form — six fields in a two-column grid. Affixes carry context: $ for rate, MapPin for city, @ for username."
      >
        <div style={{ width: 640, background: "#fff", padding: 32, borderRadius: 12, display: "flex", flexDirection: "column", gap: 20 }}>
          <p style={{ fontFamily: FONT_SANS, fontSize: 20, fontWeight: 600, color: "#222", margin: 0, letterSpacing: "-0.01em" }}>
            Edit your profile
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <Input label="First name" defaultValue="Maria" />
            <Input label="Last name" defaultValue="Costa" />
            <Input label="Username" defaultValue="maria.lisbon" prefix={<AtSign size={16} strokeWidth={1.75} />} />
            <Input label="City" defaultValue="Lisbon" prefix={<MapPin size={16} strokeWidth={1.75} />} />
            <Input label="Email" type="email" defaultValue="maria@havn.com" prefix={<Mail size={16} strokeWidth={1.75} />} suffix={<Check size={16} strokeWidth={2} className="text-emerald-500" />} />
            <Input label="Phone" type="tel" defaultValue="+351 912 345 678" prefix={<Phone size={16} strokeWidth={1.75} />} />
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}>
            <Button variant="ghost">Cancel</Button>
            <Button variant="ink">Save changes</Button>
          </div>
        </div>
      </InputSection>
    </PageShell>
  );
}
