import { Sparkles } from "./_ui/icons";
import { Button } from "./_ui/primitives";
import { requestImportDesigns } from "./_tutorialBridge";
import { TutorialStyles } from "./_bits";
import { SidebarAddProjectPreview } from "./_finale";
import { THEME_BRIDGE } from "./_themeBridge";
import { Stars, StepLabel } from "./_ascii";
import { AsciiShape } from "./_asciiShape";
import type { ReactNode } from "react";
import { defineControls } from "tempo-sdk/assets";

/**
 * 6. The tour's last stop: where to go to start your own project. In the app
 * it's "+ Add project" at the bottom of the left sidebar, which opens the
 * "Create or open a project" modal. The lesson stops at the button: the modal
 * explains itself once it opens.
 */
export function StartProject({
  title = "Start your own project",
  footer,
}: {
  title?: string;
  footer?: ReactNode;
}) {
  return (
    <div
      data-theme="dark"
      data-tutorial-token-scope=""
      style={THEME_BRIDGE}
      className="relative isolate flex w-[1014px] flex-col gap-10 overflow-hidden rounded-[10px] border border-border-primary bg-[#050508] px-14 pb-14 pt-[88px] font-sans text-text-primary"
    >
      <TutorialStyles />
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Stars />
      </div>
      <StepLabel>05 / 05 · Make it yours</StepLabel>
      <div className="flex flex-row items-center justify-between gap-10">
        <div className="flex w-[420px] flex-col gap-3">
          <h2 className="text-[40px] leading-[46px] font-semibold tracking-[-0.025em]">
            {title}
          </h2>
          <p className="text-[17px] leading-[26px] text-text-secondary">
            Click Add project at the bottom of the left sidebar.
          </p>
        </div>
        <div className="otv-bg-lilac relative flex h-[430px] w-[420px] shrink-0 items-center justify-center overflow-hidden rounded-none">
          <SidebarAddProjectPreview />
        </div>
      </div>
      {footer}
    </div>
  );
}

/**
 * Lesson 05: start your own project, or bring designs you already have.
 * "Import designs" opens the app's real Import designs dialog (Play mode).
 */
export function YourProject({ title }: { title?: string } = {}) {
  return (
    <div className="relative w-[1014px]">
      <StartProject
        title={title}
        footer={
          // The send-off: the one thing left to do, beside a planet and its orbits.
          // It runs to the frame's own edges, so it cancels the frame's padding.
          <div className="relative -mx-14 -mb-14 mt-4 flex h-[460px] flex-col justify-center overflow-hidden border-t border-white/10 px-14">
            <AsciiShape
              shape="orbits"
              width={900}
              height={900}
              className="pointer-events-none absolute left-[420px] top-[-60px] opacity-80"
            />
            <div className="relative z-10 flex w-[440px] flex-col gap-5">
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-text-tertiary">
                End of the tour
              </span>
              <h2 className="text-[64px] font-semibold leading-[66px] tracking-[-0.035em]">
                What will
                <br />
                you design?
              </h2>
              <p className="max-w-[395px] text-[17px] leading-[26px] text-text-secondary">
                Already have designs? Once your project is open,
                <br />
                bring in a Figma file or screenshots.
              </p>
              <div className="mt-2 flex items-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={requestImportDesigns}
                >
                  <Sparkles className="size-5" />
                  Import designs
                </Button>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

defineControls(StartProject, { title: { type: "text" }, footer: false });
defineControls(YourProject, { title: { type: "text" } });
