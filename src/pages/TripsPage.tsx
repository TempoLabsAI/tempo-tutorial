import { Container } from "@/design-system/layout/Container";
import { BookingCard } from "@/design-system/components/BookingCard";
import { TRIPS } from "@/data/trips";
import { Link } from "react-router-dom";
import { Button } from "@/design-system/primitives/Button";

const upcoming = TRIPS.filter(
  (t) => t.status !== "completed" && t.status !== "cancelled",
);
const past = TRIPS.filter(
  (t) => t.status === "completed" || t.status === "cancelled",
);

export function TripsPage() {
  return (
    <div className="min-h-screen pb-24 bg-white">
      <Container className="pt-10 max-w-3xl">
        <h1 className="text-[32px] font-semibold text-ink mb-8 tracking-tight">
          Trips
        </h1>

        {upcoming.length > 0 && (
          <section className="mb-10">
            <h2 className="text-[18px] font-semibold text-ink mb-4">
              Upcoming reservations
            </h2>
            <div className="space-y-3 reveal-up">
              {upcoming.map((trip) => (
                <BookingCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section>
            <h2 className="text-[18px] font-semibold text-ink mb-4">
              Where you've been
            </h2>
            <div className="space-y-3 reveal-up">
              {past.map((trip) => (
                <BookingCard key={trip.id} trip={trip} />
              ))}
            </div>
          </section>
        )}

        {upcoming.length === 0 && past.length === 0 && (
          <div className="text-center py-20 max-w-md mx-auto border-t border-paper-deep">
            <p className="text-[24px] font-semibold text-ink mt-12">
              No trips booked... yet!
            </p>
            <p className="text-[14px] text-ink-quiet mt-2 mb-6">
              Time to dust off your bags and start planning your next adventure.
            </p>
            <Link to="/search">
              <Button>Start searching</Button>
            </Link>
          </div>
        )}
      </Container>
    </div>
  );
}
