import { Button } from '@/design-system/primitives/Button';
import { PageShell, ButtonSection, ButtonRow } from './shared';

export function ContentBoard() {
  return (
    <PageShell
      width={1280}
      title="Content"
      description="A button label is a promise. Start with a verb, keep it under three words, and write what happens next."
    >
      <ButtonSection
        title="Use action verbs"
        description="Start with a verb that names the result — Reserve, Send, Continue. Avoid 'Click here', 'Submit', or vague nouns."
      >
        <ButtonRow label="Do">
          <Button variant="primary">Reserve</Button>
          <Button variant="ink">Send message</Button>
          <Button variant="outline">Save listing</Button>
        </ButtonRow>
        <ButtonRow label="Don't">
          <Button variant="primary" className="!opacity-60">Submit</Button>
          <Button variant="ink" className="!opacity-60">OK</Button>
          <Button variant="outline" className="!opacity-60">Click here</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Keep it short"
        description="One to three words. If the label needs more, the page needs a sentence around it — not a longer button."
      >
        <ButtonRow label="Do">
          <Button variant="primary">Confirm trip</Button>
          <Button variant="ink">Add guests</Button>
        </ButtonRow>
        <ButtonRow label="Don't">
          <Button variant="primary" className="!opacity-60">Confirm your trip details now</Button>
        </ButtonRow>
      </ButtonSection>

      <ButtonSection
        title="Sentence case"
        description="Capitalise only the first word, plus proper nouns. No title case, no all caps — buttons read as quiet directives, not headlines."
      >
        <ButtonRow label="Do">
          <Button variant="primary">Reserve stay</Button>
          <Button variant="ink">Add to wishlist</Button>
        </ButtonRow>
        <ButtonRow label="Don't">
          <Button variant="primary" className="!opacity-60">Reserve Stay</Button>
          <Button variant="ink" className="!opacity-60">ADD TO WISHLIST</Button>
        </ButtonRow>
      </ButtonSection>
    </PageShell>
  );
}
