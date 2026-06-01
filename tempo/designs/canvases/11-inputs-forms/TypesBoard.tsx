import { Search, Mail, Lock, Eye, Calendar, Phone, User } from 'lucide-react';
import { Input } from '@/design-system/primitives/Input';
import { PageShell, InputSection, InputRowWithCaption } from './shared';

export function TypesBoard() {
  return (
    <PageShell
      width={1280}
      title="Types"
      description="Native HTML input types, all wearing the same chrome. The browser handles keyboard, validation, and the OS-level helpers (autofill, datepicker, numeric keypad) — the design layer doesn't change."
    >
      <InputSection
        title="Text"
        description="The default. Plain text input — destinations, names, anything free-form."
      >
        <InputRowWithCaption label="Text" caption='type="text"'>
          <Input label="Full name" placeholder="Maria Costa" prefix={<User size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Email"
        description='type="email" — surfaces the @ key on mobile keyboards and enables browser-level email validation.'
      >
        <InputRowWithCaption label="Email" caption='type="email"'>
          <Input label="Email" type="email" placeholder="you@example.com" prefix={<Mail size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Password"
        description='type="password" — characters mask as bullets. Pair with an eye suffix for a reveal toggle.'
      >
        <InputRowWithCaption label="Password" caption='type="password"'>
          <Input
            label="Password"
            type="password"
            defaultValue="••••••••••"
            prefix={<Lock size={16} strokeWidth={1.75} />}
            suffix={<Eye size={16} strokeWidth={1.75} />}
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Search"
        description='type="search" — UA-styled clear button on some browsers, "Search" enter key on mobile.'
      >
        <InputRowWithCaption label="Search" caption='type="search"'>
          <Input
            type="search"
            placeholder="Search destinations"
            prefix={<Search size={16} strokeWidth={1.75} />}
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Number"
        description='type="number" — numeric keypad on mobile, native spinner controls (hidden by Tailwind base styles by default).'
      >
        <InputRowWithCaption label="Number" caption='type="number"'>
          <Input label="Guests" type="number" defaultValue="2" />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Tel"
        description='type="tel" — surfaces the dial pad on mobile. No format validation — pair with a format hint below.'
      >
        <InputRowWithCaption label="Tel" caption='type="tel"'>
          <Input
            label="Phone number"
            type="tel"
            placeholder="+1 555 0123"
            prefix={<Phone size={16} strokeWidth={1.75} />}
            hint="Include country code."
          />
        </InputRowWithCaption>
      </InputSection>

      <InputSection
        title="Date"
        description='type="date" — opens the native datepicker. Use sparingly; the booking flow uses a custom calendar instead.'
      >
        <InputRowWithCaption label="Date" caption='type="date"'>
          <Input label="Check-in" type="date" defaultValue="2026-06-12" prefix={<Calendar size={16} strokeWidth={1.75} />} />
        </InputRowWithCaption>
      </InputSection>
    </PageShell>
  );
}
