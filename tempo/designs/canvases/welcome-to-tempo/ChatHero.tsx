import { ChatPreview } from "./ChatPreview";
import havnHome from "./assets/havn-home.webp";
import havnTrips from "./assets/havn-trips.webp";
import havnListing from "./assets/havn-listing.webp";

/**
 * The Plan strip's hero: the real chat composer with three product
 * screenshots (havn) fanned out behind it, peeking above the top edge —
 * the original "chat design" look. The composer is opaque so the lower
 * half of each screenshot tucks behind it.
 */
export function ChatHero() {
  return (
    <div className="relative w-full pt-[127px]">
      {/* Fanned product screenshots, anchored to the top, behind the composer. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[160px]">
        <img
          src={havnTrips}
          alt=""
          className="absolute left-[37px] top-[37px] w-[36%] -rotate-[9deg] rounded-xl shadow-2xl ring-1 ring-black/10 border-solid border-[#fff6] border-[3px] opacity-[67%]"
        />
        <img
          src={havnListing}
          alt=""
          className="absolute right-[29px] top-[28px] w-[41%] rounded-xl shadow-2xl ring-1 ring-black/10 border-solid border-[#fff6] border-[3px] [transform:rotate(4deg)] opacity-[72%]"
        />
        {/* Colour token — swatch + name + hex. Tucked into the scatter just
            below the front screenshot, dimmed so it reads as a working
            material peeking out from behind the page rather than floating
            on top of it. */}
        <div className="absolute left-[71px] top-[92px] flex -rotate-[8deg] items-center gap-2 rounded-xl border-[3px] border-solid border-[#fff6] bg-white px-2.5 py-2 shadow-2xl ring-1 ring-black/10 [filter:brightness(90%)]">
          <span className="size-7 rounded-md ring-1 ring-black/5" style={{ background: "#FE3759" }} />
          <div className="leading-tight">
            <div className="text-[11px] font-semibold text-[#1b1f29]">Primary</div>
            <div className="text-[10px] font-medium tabular-nums text-[#6b7280]">#FE3759</div>
          </div>
        </div>
        <img
          src={havnHome}
          alt=""
          className="absolute left-1/2 top-0 w-[47%] -translate-x-1/2 rotate-[1deg] rounded-xl shadow-2xl ring-1 ring-black/10 border-solid border-[3px] border-[#fff6]"
        />
      </div>
      {/* Design-system tokens scattered into the stack — the canvas matches your
          DS, so the agent's working materials (a colour token, a button, a type
          specimen) float in among the product screenshots. Above the shots
          (z-[5]) but below the composer (z-10) so they tuck behind it too. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 z-[5] h-[160px]">
        {/* Button token — a real-looking primary button on a chip. */}
        <div className="absolute right-[109px] top-[105px] rounded-xl border-[3px] border-solid border-[#fff6] bg-white px-3 py-2.5 shadow-2xl ring-1 ring-black/10 [filter:brightness(97%)] [transform:rotate(-3deg)]">
          <span
            className="block rounded-lg px-3.5 py-1.5 text-center text-[11px] font-semibold text-white"
            style={{
              background: "linear-gradient(180deg, #FE3759 0%, #D81E40 100%)",
              boxShadow: "0 1px 0 rgba(255,255,255,0.3) inset, 0 0 0 1px rgba(176,20,48,0.7)",
            }}
          >
            Button
          </span>
        </div>
        {/* Type specimen — a typography token. */}
        <div className="absolute left-[135px] top-[107px] flex rotate-[3deg] items-baseline gap-2 rounded-xl border-[3px] border-solid border-[#fff6] bg-white px-3 py-2 shadow-2xl ring-1 ring-black/10">
          <span className="text-[22px] font-bold leading-none tracking-tight text-[#1b1f29]">Aa</span>
          <span className="text-[10px] font-medium text-[#6b7280]">Inter · 600</span>
        </div>
      </div>
      {/* Bare chat input, in front of the fanned screenshots — no card frame.
          Upward drop-shadow casts onto the pages tucked behind it for contrast. */}
      <div
        className="relative z-10"
        style={{ filter: "drop-shadow(0 -12px 18px rgba(0,0,0,0.28))" }}
      >
        <ChatPreview />
      </div>
    </div>
  );
}
