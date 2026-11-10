import { CursorMascot } from "./_ui/cursor-mascot";
import { Sparkles } from "./_ui/icons";
import { Button } from "./_ui/primitives";
import { requestImportDesigns } from "./_tutorialBridge";
import { TutorialStyles } from "./_bits";
import { ProjectSetupPreview, SidebarAddProjectPreview } from "./_finale";
import { THEME_BRIDGE } from "./_themeBridge";
import { SubtleSpace } from "./_introSpace";
import type { ReactNode } from "react";
import { defineControls } from "tempo-sdk/assets";

/**
 * 6. The tour's last stop: where to go to start your own project. In the app
 * it's "+ Add project" at the bottom of the left sidebar, which opens the
 * "Create or open a project" modal.
 */
export function StartProject({ footer }: { footer?: ReactNode }) {
  return (
    <div
      data-theme="dark"
      style={THEME_BRIDGE}
      className="relative isolate flex w-[1014px] flex-col gap-10 overflow-hidden rounded-[24px] border border-border-primary bg-surface-dim px-14 py-14 font-sans text-text-primary"
    >
      <TutorialStyles />
      <SubtleSpace />
      <div className="flex flex-col gap-3">
        <h2 className="text-[40px] leading-[46px] font-semibold tracking-[-0.025em]">
          Ready to make your own?
        </h2>
        <p className="text-[17px] leading-[26px] text-text-secondary">
          You've seen the tour. Now bring in your own code, or start fresh.
        </p>
      </div>

      <div className="flex flex-row gap-5">
        {/* 1. Add project, bottom of the left sidebar */}
        <div className="flex w-[340px] flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="flex flex-row items-baseline gap-2 text-[16px] leading-[22px] font-semibold">
              <span className="tabular-nums text-text-tertiary">1</span>
              Click Add project
            </span>
            <span className="pl-[18px] text-[13px] leading-[19px] text-text-secondary">
              It's at the bottom of the left sidebar.
            </span>
          </div>
          <div className="otv-bg-lilac relative flex h-[460px] items-center justify-center overflow-hidden rounded-2xl shadow-[0_14px_36px_rgba(0,0,0,0.3)]">
            <SidebarAddProjectPreview />
          </div>
        </div>

        {/* 2. Create new or open existing */}
        <div className="flex flex-1 flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="flex flex-row items-baseline gap-2 text-[16px] leading-[22px] font-semibold">
              <span className="tabular-nums text-text-tertiary">2</span>
              Create or open a project
            </span>
            <span className="pl-[18px] text-[13px] leading-[19px] text-text-secondary">
              Describe something new, or open a folder you already have.
            </span>
          </div>
          <div className="otv-bg-sky relative flex h-[460px] items-center justify-center overflow-hidden rounded-2xl shadow-[0_14px_36px_rgba(0,0,0,0.3)]">
            <div className="h-[364px] w-[504px]">
              <div className="origin-top-left scale-[0.7] rounded-xl shadow-[0_24px_60px_rgba(10,10,40,0.45)]">
                <ProjectSetupPreview />
              </div>
            </div>
            <div className="pointer-events-none absolute right-[4px] top-[18px] scale-[0.6] rotate-[24deg] drop-shadow-[0_8px_18px_rgba(30,20,70,0.5)]">
              <CursorMascot animated />
            </div>
          </div>
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
export function YourProject() {
  return (
    <div className="relative w-[1014px]">
      <StartProject
        footer={
          <div className="flex flex-col gap-6 border-t border-border-primary pt-10">
            <div className="flex flex-col gap-2">
              <h3 className="text-[24px] font-semibold leading-[30px]">
                Already have designs?
              </h3>
              <p className="text-[16px] leading-6 text-text-secondary">
                Bring a Figma file or screenshots into your project, then
                recreate them with the components in your codebase.
              </p>
            </div>
            <div className="otv-bg-gold flex min-h-[240px] items-center justify-center rounded-2xl p-7">
              <div className="flex w-full flex-col gap-5 rounded-xl bg-surface-container-low p-6">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={requestImportDesigns}
                >
                  <Sparkles className="size-5" />
                  Import designs
                </Button>
                <p className="text-center text-sm text-text-secondary">
                  You can also copy a frame in Figma and paste it onto the
                  canvas.
                </p>
              </div>
            </div>
          </div>
        }
      />
    </div>
  );
}

defineControls(StartProject, { footer: false });
defineControls(YourProject, {});
