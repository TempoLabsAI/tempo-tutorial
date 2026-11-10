/**
 * Display replica of the design-system `OnboardingFlow`
 * (ui/onboarding/OnboardingFlow.tsx) in project-setup mode on its first step:
 * the starfield panel with the "Create or open a project" choice tiles and a
 * disabled Next. The tutorial shows it as a picture of the real modal; the
 * user opens the real one from the app's "Add project" button.
 */
import type { CSSProperties, ReactNode } from "react";
import { AnimatedStarfield } from "./animated-starfield";

const FADE_IN_STYLES = `
@keyframes onboarding-step-fade-in {
  from { opacity: 0; }
  to   { opacity: 1; }
}
`;

const TILE =
  "group relative flex w-[200px] cursor-pointer flex-col items-start justify-start gap-[20px] overflow-hidden rounded-lg border-[1.5px] px-[16px] py-[16px] text-left font-sans transition-all duration-500 ease-out border-transparent bg-surface-container-low hover:bg-surface-container [[data-theme=light]_&]:hover:brightness-[0.97] [--tile-accent:var(--tile-accent-dark)] [--tile-square:color-mix(in_srgb,var(--tile-accent-dark)_15%,transparent)] [[data-theme=light]_&]:bg-[var(--tile-card-light)] [[data-theme=light]_&]:[--tile-accent:var(--tile-accent-light)] [[data-theme=light]_&]:[--tile-square:var(--tile-square-light)]";

const NEXT_BUTTON =
  "inline-flex shrink-0 cursor-pointer select-none items-center justify-center whitespace-nowrap ring-1 ring-inset ring-transparent text-[13px] font-medium outline-none transition-[colors,transform] duration-150 ease-out active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-focus/60 disabled:cursor-default disabled:pointer-events-none disabled:bg-[var(--button-disabled-surface)] disabled:text-[var(--button-disabled-text)] disabled:ring-transparent disabled:active:scale-100 [&_svg]:pointer-events-none [&_svg]:shrink-0 bg-accent text-on-accent hover:bg-accent/85 active:bg-accent/75 h-9 gap-1.5 rounded-lg px-6 [--tw-outline-style:none]";

function MethodTile({
  title,
  description,
  icon,
  accent,
}: {
  title: string;
  description: string;
  icon: ReactNode;
  accent: CSSProperties;
}) {
  return (
    <button type="button" className={TILE} style={accent}>
      <div
        className="flex size-[40px] shrink-0 items-center justify-center rounded-md"
        style={{ backgroundColor: "var(--tile-square)" }}
      >
        {icon}
      </div>
      <div className="flex shrink-0 flex-col items-start justify-center gap-[8px]">
        <span className="font-medium text-text-primary text-[14px] leading-5">
          {title}
        </span>
        <p className="text-left text-text-tertiary [[data-theme=light]_&]:text-text-secondary text-[11px] leading-[14px]">
          {description}
        </p>
      </div>
    </button>
  );
}

/** hugeicons `SparklesIcon` + `FolderOpenIcon`, as the tiles draw them. */
function TileIcon({ children }: { children: ReactNode }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      color="currentColor"
      className="size-5"
      strokeWidth="2"
      stroke="currentColor"
      style={{ color: "var(--tile-accent)" }}
    >
      {children}
    </svg>
  );
}

export function OnboardingFlow(_props: {
  projectSetupOnly?: boolean;
  initialStep?: "create-project";
  presentation?: { progressLabel?: string; hideBack?: boolean };
  onComplete?: () => void;
  onOpenExistingProject?: () => Promise<unknown>;
  renderCreatePromptInput?: () => ReactNode;
}) {
  return (
    // `FullscreenShell embedded`: the same sky drawn as one still frame.
    <div className="relative h-full w-full overflow-hidden bg-surface-container-lowest">
      <style>{FADE_IN_STYLES}</style>
      <AnimatedStarfield glowPosition="center" still />
      <div className="relative z-[2] h-full w-full overflow-auto">
        <div className="relative flex h-full w-full flex-col items-center px-8 pb-10 pt-4">
          <div className="flex w-full max-w-[1100px] flex-1 flex-col justify-center gap-10 h-full items-center pb-[0px] pt-[24px]">
            <div
              className="relative flex w-full flex-col items-center justify-center gap-9 py-8"
              style={{
                animation: "onboarding-step-fade-in 220ms ease-out both",
              }}
            >
              <div className="flex flex-col items-center gap-10 w-full">
                <div
                  className="flex flex-col items-center text-center gap-4"
                  style={{ gap: "8px" }}
                >
                  <h1 className="w-[482px] break-words text-center text-[32px] font-medium leading-9 text-text-primary">
                    Create or open a project
                  </h1>
                </div>
                <div className="flex w-max flex-row flex-wrap justify-center gap-4">
                  <MethodTile
                    title="Create new project"
                    description="Start fresh and let Tempo scaffold the codebase."
                    accent={
                      {
                        "--tile-accent-dark": "#67CFFD",
                        "--tile-accent-light": "var(--blueberry-900)",
                        "--tile-card-light": "var(--blueberry-200)",
                        "--tile-square-light": "var(--blueberry-300)",
                      } as CSSProperties
                    }
                    icon={
                      <TileIcon>
                        <path
                          d="M10 7L9.48415 8.39405C8.80774 10.222 8.46953 11.136 7.80278 11.8028C7.13603 12.4695 6.22204 12.8077 4.39405 13.4842L3 14L4.39405 14.5158C6.22204 15.1923 7.13603 15.5305 7.80278 16.1972C8.46953 16.864 8.80774 17.778 9.48415 19.6059L10 21L10.5158 19.6059C11.1923 17.778 11.5305 16.864 12.1972 16.1972C12.864 15.5305 13.778 15.1923 15.6059 14.5158L17 14L15.6059 13.4842C13.778 12.8077 12.864 12.4695 12.1972 11.8028C11.5305 11.136 11.1923 10.222 10.5158 8.39405L10 7Z"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                        <path
                          d="M18 3L17.7789 3.59745C17.489 4.38087 17.3441 4.77259 17.0583 5.05833C16.7726 5.34408 16.3809 5.48903 15.5975 5.77892L15 6L15.5975 6.22108C16.3809 6.51097 16.7726 6.65592 17.0583 6.94167C17.3441 7.22741 17.489 7.61913 17.7789 8.40255L18 9L18.2211 8.40255C18.511 7.61913 18.6559 7.22741 18.9417 6.94166C19.2274 6.65592 19.6191 6.51097 20.4025 6.22108L21 6L20.4025 5.77892C19.6191 5.48903 19.2274 5.34408 18.9417 5.05833C18.6559 4.77259 18.511 4.38087 18.2211 3.59745L18 3Z"
                          stroke="currentColor"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </TileIcon>
                    }
                  />
                  <MethodTile
                    title="Open existing project"
                    description="Open a project folder that's already on your computer."
                    accent={
                      {
                        "--tile-accent-dark": "#CD9DFA",
                        "--tile-accent-light": "var(--lavender-700)",
                        "--tile-card-light": "var(--lavender-200)",
                        "--tile-square-light": "var(--lavender-300)",
                      } as CSSProperties
                    }
                    icon={
                      <TileIcon>
                        <path
                          d="M2.5 20V8.87695C2.5 7.58945 2.5 6.9457 2.78533 6.47048C2.9541 6.18939 3.18939 5.9541 3.47048 5.78533C3.9457 5.5 4.59449 5.5 5.89206 5.5C6.52339 5.5 6.83906 5.5 7.12612 5.58819C7.31759 5.64702 7.49914 5.73428 7.66469 5.84705C7.91289 6.01611 8.10859 6.26074 8.5 6.75C8.89141 7.23926 9.08711 7.48389 9.33531 7.65295C9.50086 7.76572 9.68241 7.85298 9.87388 7.91181C10.1609 8 10.4742 8 11.1008 8H15C16.4045 8 17.1067 8 17.6111 8.33706C17.8295 8.48298 18.017 8.67048 18.1629 8.88886C18.5 9.39331 18.5 10.0955 18.5 11.5"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                        <path
                          d="M4.42028 14.0144L3.63368 16.0144C2.65618 18.4998 2.16743 19.7425 2.7524 20.6213C3.33737 21.5 4.65337 21.5 7.28537 21.5H15.1903C16.4249 21.5 17.0422 21.5 17.5295 21.1795C18.0169 20.859 18.2702 20.2865 18.7769 19.1415L19.6618 17.1415C20.7866 14.5992 21.349 13.3281 20.7679 12.4141C20.1868 11.5 18.8163 11.5 16.0752 11.5H8.07196C6.78232 11.5 6.1375 11.5 5.63811 11.8439C5.13872 12.1877 4.89924 12.7966 4.42028 14.0144Z"
                          stroke="currentColor"
                          strokeWidth="2"
                        />
                        <path
                          d="M11.5 4.51456C12.4151 3.28409 13.6662 2.55594 15.5125 2.50161C16.1155 2.48386 16.7152 2.61395 17.2682 2.85544C18.5748 3.42601 19.4185 4.15644 20 5.5L21.5 3"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                        />
                      </TileIcon>
                    }
                  />
                </div>
              </div>
              <div className="flex flex-col gap-3 items-center">
                <div className="flex gap-2">
                  <button
                    type="button"
                    data-disabled=""
                    tabIndex={0}
                    disabled
                    data-slot="button"
                    className={NEXT_BUTTON}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
