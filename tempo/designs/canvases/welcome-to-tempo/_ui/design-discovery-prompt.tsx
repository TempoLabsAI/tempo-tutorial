/**
 * Replica of tempo-client's `DesignDiscoveryPrompt` in its chat card layout
 * (src/workspaces/components/onboarding/DesignDiscoveryPrompt.tsx) with the
 * rules it uses from design-discovery-prompt.css. Both cards call
 * `onImportDesigns`; the tutorial wires that to the app's Import designs
 * dialog.
 *
 * The class names carry a `tutorial-` prefix so they are this file's alone.
 * Under the app's own names, a document that had also loaded the app's
 * stylesheet (Tempo's own canvas, which renders both) restyled the replica
 * with every rule the app has changed since the copy was made.
 */
import { Sparkles } from "./icons";
import { Button } from "./primitives";

const DISCOVERY_STYLES = `
.tutorial-discovery-prompt {
  --tutorial-discovery-purple: var(--text-lavender);
  --tutorial-discovery-blue: var(--text-blueberry);
  border: 1px solid var(--border-secondary);
  border-radius: 16px;
  background: linear-gradient(
    115deg,
    color-mix(
      in srgb,
      var(--tutorial-discovery-purple) 7%,
      var(--surface-container-low)
    ),
    var(--surface-container-low) 58%
  );
  color: var(--text-primary);
}
.tutorial-discovery-title {
  font-size: 24px;
  line-height: 30px;
  letter-spacing: -0.6px;
  font-weight: 600;
  margin: 0;
}
.tutorial-discovery-actions {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;
  min-width: 0;
}
.tutorial-discovery-action {
  position: relative;
  display: flex;
  gap: 14px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 132px;
  min-width: 0;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid var(--border-secondary);
  background: var(--surface-container);
  text-align: left;
  white-space: normal;
  transition:
    border-color 150ms,
    background 150ms;
}
.tutorial-discovery-action-system:hover {
  border-color: color-mix(in srgb, var(--text-lavender) 55%, transparent);
  background: color-mix(
    in srgb,
    var(--text-lavender) 5%,
    var(--surface-container)
  );
}
.tutorial-discovery-action-flows:hover {
  border-color: color-mix(in srgb, var(--text-blueberry) 55%, transparent);
  background: color-mix(
    in srgb,
    var(--text-blueberry) 5%,
    var(--surface-container)
  );
}
.tutorial-discovery-action-copy {
  display: flex;
  flex: 1;
  min-width: 0;
  flex-direction: column;
  gap: 8px;
}
.tutorial-discovery-action-art {
  display: contents;
}
.tutorial-discovery-action-title {
  display: block;
  font-size: 13px;
  line-height: 18px;
  font-weight: 500;
  color: var(--text-primary);
}
.tutorial-discovery-action-description {
  display: block;
  font-size: 12px;
  line-height: 18px;
  font-weight: 400;
  color: var(--text-secondary);
}
.tutorial-discovery-prompt-chat {
  position: relative;
  padding: 12px 14px 14px;
  border-radius: 12px;
  background: transparent;
}
.tutorial-discovery-prompt-chat .tutorial-discovery-intro {
  margin-bottom: 10px;
}
.tutorial-discovery-prompt-chat .tutorial-discovery-title {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.1px;
  font-weight: 500;
}
.tutorial-discovery-prompt-chat .tutorial-discovery-actions {
  gap: 8px;
}
.tutorial-discovery-prompt-chat .tutorial-discovery-action {
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  height: 96px;
  padding: 10px 14px;
  background: var(--surface-container-low);
}
.tutorial-discovery-prompt-chat .tutorial-discovery-action-art {
  position: relative;
  display: flex;
  align-items: center;
  flex: 0 0 34px;
  width: 56px;
  height: 34px;
  opacity: 0.88;
}
.tutorial-discovery-prompt-chat .tutorial-discovery-action .tutorial-discovery-art {
  position: absolute;
  top: 50%;
  height: 78px;
  margin: 0;
  transform: translateY(-50%) scale(0.56);
  transform-origin: left center;
}
.tutorial-discovery-prompt-chat .tutorial-discovery-action .tutorial-discovery-art-flows {
  transform: translateY(calc(-50% + 3px)) scale(0.56);
}
.tutorial-discovery-prompt-chat .tutorial-discovery-action-copy {
  gap: 2px;
}
.tutorial-discovery-prompt-chat .tutorial-discovery-action-description {
  line-height: 16px;
}
.tutorial-discovery-art {
  position: relative;
  display: block;
  width: 80px;
  height: 78px;
  flex: 0 0 80px;
}
.tutorial-discovery-art-back {
  position: absolute;
  width: 51px;
  height: 51px;
  top: 7px;
  left: 20px;
  transform: rotate(10deg);
  border-radius: 10px;
  border: 1px solid color-mix(in srgb, var(--text-lavender) 38%, transparent);
  background: color-mix(
    in srgb,
    var(--text-lavender) 12%,
    var(--surface-container-low)
  );
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  padding: 10px;
}
.tutorial-discovery-art-back > span {
  border-radius: 3px;
  background: color-mix(in srgb, var(--text-lavender) 45%, transparent);
}
.tutorial-discovery-art-front {
  position: absolute;
  top: 24px;
  left: 5px;
  width: 54px;
  height: 49px;
  border-radius: 9px;
  background: var(--surface-container-high);
  border: 1px solid
    color-mix(in srgb, var(--text-lavender) 35%, var(--border-secondary));
  box-shadow: 0 6px 16px
    color-mix(in srgb, var(--surface-container-lowest) 50%, transparent);
  transform: rotate(-8deg);
  padding: 6px 8px;
}
.tutorial-discovery-art-type {
  display: block;
  font-size: 18px;
  line-height: 22px;
  letter-spacing: -0.7px;
  color: var(--text-lavender);
  font-weight: 500;
}
.tutorial-discovery-art-swatches {
  display: flex;
  gap: 4px;
  margin-top: 3px;
}
.tutorial-discovery-art-swatches i {
  width: 9px;
  height: 5px;
  border-radius: 2px;
  background: var(--text-lavender);
}
.tutorial-discovery-art-swatches i:nth-child(2) {
  background: var(--text-blueberry);
}
.tutorial-discovery-art-swatches i:nth-child(3) {
  background: var(--text-primary);
}
.tutorial-discovery-art-spark {
  position: absolute;
  left: 0;
  top: 7px;
  width: 12px;
  height: 12px;
  color: var(--text-lavender);
}
.tutorial-discovery-art-flows {
  display: flex;
  align-items: center;
  gap: 5px;
}
.tutorial-discovery-art-link {
  position: absolute;
  left: 6px;
  right: 3px;
  top: 39px;
  height: 1px;
  background: var(--text-blueberry);
  opacity: 0.5;
}
.tutorial-discovery-art-screen {
  position: relative;
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 4px;
  height: 40px;
  padding: 5px;
  border: 1px solid
    color-mix(in srgb, var(--text-blueberry) 35%, var(--border-secondary));
  border-radius: 5px;
  background: var(--surface-container-high);
}
.tutorial-discovery-art-screen:nth-child(3) {
  transform: translateY(-10px);
}
.tutorial-discovery-art-screen:nth-child(4) {
  transform: translateY(7px);
}
.tutorial-discovery-art-screen i {
  display: block;
  height: 13px;
  border-radius: 2px;
  background: color-mix(in srgb, var(--text-blueberry) 45%, transparent);
}
.tutorial-discovery-art-screen > span {
  display: block;
  height: 2px;
  border-radius: 1px;
  background: color-mix(in srgb, var(--text-blueberry) 25%, transparent);
}
.tutorial-discovery-art-screen > span:last-child {
  width: 60%;
}
`;

/** Decorative building blocks, not a second implementation of an app surface. */
export function DiscoveryArtwork({ kind }: { kind: "system" | "flows" }) {
  return kind === "system" ? (
    <span
      className="tutorial-discovery-art tutorial-discovery-art-system"
      aria-hidden="true"
    >
      <span className="tutorial-discovery-art-back">
        <span />
        <span />
        <span />
        <span />
      </span>
      <span className="tutorial-discovery-art-front">
        <span className="tutorial-discovery-art-type">Aa</span>
        <span className="tutorial-discovery-art-swatches">
          <i />
          <i />
          <i />
        </span>
      </span>
      <Sparkles className="tutorial-discovery-art-spark" />
    </span>
  ) : (
    <span
      className="tutorial-discovery-art tutorial-discovery-art-flows"
      aria-hidden="true"
    >
      <span className="tutorial-discovery-art-link" />
      <span className="tutorial-discovery-art-screen">
        <i />
        <span />
        <span />
      </span>
      <span className="tutorial-discovery-art-screen">
        <i />
        <span />
        <span />
      </span>
      <span className="tutorial-discovery-art-screen">
        <i />
        <span />
        <span />
      </span>
    </span>
  );
}

/** The chat-variant import cards; both open the Import designs dialog. */
export function DesignDiscoveryPrompt({
  onImportDesigns,
}: {
  variant?: "chat";
  onImportDesigns?: () => void;
}) {
  return (
    <section
      className="tutorial-discovery-prompt tutorial-discovery-prompt-chat"
      aria-label="Bring your project onto the canvas"
    >
      <style>{DISCOVERY_STYLES}</style>
      <div className="tutorial-discovery-intro">
        <h3 className="tutorial-discovery-title">Import designs</h3>
      </div>
      <div className="tutorial-discovery-actions">
        <Button
          variant="ghost"
          onClick={onImportDesigns}
          className="tutorial-discovery-action tutorial-discovery-action-system"
        >
          <span className="tutorial-discovery-action-art">
            <DiscoveryArtwork kind="system" />
          </span>
          <span className="tutorial-discovery-action-copy">
            <span className="tutorial-discovery-action-title">
              Import design system
            </span>
            <span className="tutorial-discovery-action-description">
              Components, colors &amp; type.
            </span>
          </span>
        </Button>
        <Button
          variant="ghost"
          onClick={onImportDesigns}
          className="tutorial-discovery-action tutorial-discovery-action-flows"
        >
          <span className="tutorial-discovery-action-art">
            <DiscoveryArtwork kind="flows" />
          </span>
          <span className="tutorial-discovery-action-copy">
            <span className="tutorial-discovery-action-title">
              Import screen templates
            </span>
            <span className="tutorial-discovery-action-description">
              Recreate screens pixel for pixel.
            </span>
          </span>
        </Button>
      </div>
    </section>
  );
}
