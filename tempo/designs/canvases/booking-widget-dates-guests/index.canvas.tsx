import { Canvas, Storyboard, RouteStoryboard } from "tempo-sdk/canvas";
import { BookingWidgetEmpty } from "./BookingWidgetEmpty";
import { BookingWidgetValidRange } from "./BookingWidgetValidRange";
import { CalendarOpenHarness } from "./CalendarOpenHarness";
import { GuestsAtCapHarness } from "./GuestsAtCapHarness";

export default function BookingWidgetDatesGuestsCanvas() {
  return (
    <Canvas name={"Booking Widget — Dates & Guests"}>
      <RouteStoryboard
        id="ListingPage"
        name="Listing detail (live)"
        route="/listing/lst-001"
        layout={{ x: 0, y: 0, width: 1280, height: 1600 }}
      />
      <Storyboard
        id="Empty"
        name="Widget — empty state"
        component={BookingWidgetEmpty}
        layout={{ x: 1330, y: 0, width: 460, height: 560 }}
      />
      <Storyboard
        id="ValidRange"
        name="Widget — dates chosen"
        component={BookingWidgetValidRange}
        layout={{ x: 1840, y: 0, width: 460, height: 640 }}
      />
      <Storyboard
        id="CalendarOpen"
        name="Calendar popover — open"
        component={CalendarOpenHarness}
        layout={{ x: 2350, y: 0, width: 640, height: 460 }}
      />
      <Storyboard
        id="GuestsAtCap"
        name="Guest stepper — at cap"
        component={GuestsAtCapHarness}
        layout={{ x: 0, y: 1650, width: 420, height: 220 }}
      />
    </Canvas>
  );
}
