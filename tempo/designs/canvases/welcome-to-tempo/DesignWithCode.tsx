import { defineControls } from "tempo-sdk/assets";
import { ArrowUpRight } from "./_ui/icons";
import { TutorialStyles } from "./_bits";
import { IntroSpace, useInPlay } from "./_introSpace";
import { ShippyOrbit } from "./_shippyOrbit";
import { THEME_BRIDGE } from "./_themeBridge";

/** Lesson 01: the title card. Press Play and the stars and Shippy wake up. */
export function DesignWithCode() {
  const inPlay = useInPlay();
  return (
    <div
      data-theme="dark"
      style={THEME_BRIDGE}
      className="relative h-[600px] w-[1014px] overflow-hidden rounded-[24px] border border-border-primary bg-surface-container-lowest font-sans text-text-primary"
    >
      <TutorialStyles />
      <IntroSpace />
      <div className="absolute left-14 top-1/2 flex w-[480px] -translate-y-[58%] flex-col gap-5">
        <span className="text-[13px] font-medium uppercase tracking-[0.18em] text-text-tertiary">
          Your turn to play
        </span>
        <h1 className="text-[64px] font-semibold leading-[66px] tracking-[-0.035em]">
          Design
          <br />
          with code.
        </h1>
        <p className="max-w-[395px] text-[17px] leading-[26px] text-text-secondary">
          A canvas that feels familiar.
          <br />
          Real code beneath everything you create.
        </p>
      </div>
      <div className="absolute right-6 top-5 flex items-center gap-2 text-[14px] font-medium text-text-secondary">
        {inPlay ? "You're in. Have a play." : "Press Play up here"}
        <ArrowUpRight className="size-5 text-[var(--blueberry-300)]" />
      </div>
      <div className="pointer-events-none absolute right-[80px] top-[90px]">
        <ShippyOrbit spinning={inPlay} />
      </div>
    </div>
  );
}

defineControls(DesignWithCode, {});
