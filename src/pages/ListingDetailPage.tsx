import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  Share,
  Wifi,
  UtensilsCrossed,
  Waves,
  Key,
  Users,
  Award,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/design-system/layout/Container";
import { Button } from "@/design-system/primitives/Button";
import { Avatar } from "@/design-system/primitives/Avatar";
import { HeartButton } from "@/design-system/components/HeartButton";
import { RatingStars } from "@/design-system/components/RatingStars";
import { formatPrice } from "@/lib/utils";
import { getListingById } from "@/data/listings";

const amenityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi size={20} strokeWidth={1.5} />,
  Kitchen: <UtensilsCrossed size={20} strokeWidth={1.5} />,
  Pool: <Waves size={20} strokeWidth={1.5} />,
};

export function ListingDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const listing = getListingById(id ?? "");
  const [showBooking, setShowBooking] = useState(false);
  const [booked, setBooked] = useState(false);

  if (!listing) {
    return (
      <Container className="py-32 text-center">
        <p className="text-[24px] font-semibold">Listing not found</p>
        <Button onClick={() => navigate("/search")} className="mt-6">
          Back to search
        </Button>
      </Container>
    );
  }

  const nights = 5;
  const cleaning = 85;
  const service = Math.round(listing.pricePerNight * nights * 0.12);
  const taxes = Math.round(listing.pricePerNight * nights * 0.08);
  const total = listing.pricePerNight * nights + cleaning + service + taxes;

  return (
    <div className="pb-32 lg:pb-12 bg-white min-h-screen">
      {/* Sub-nav */}
      <div className="sticky top-[120px] z-30 bg-white border-b border-paper-deep">
        <Container className="flex items-center justify-between h-12">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-1.5 text-[14px] font-medium text-ink hover:underline"
          >
            <ChevronLeft size={16} strokeWidth={2} /> Back
          </button>
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1.5 text-[14px] font-medium text-ink hover:bg-paper-warm transition-colors px-3 py-2 rounded-full underline">
              <Share size={14} strokeWidth={2} /> Share
            </button>
            <div className="px-2">
              <HeartButton size="md" surface="inline" />
            </div>
          </div>
        </Container>
      </div>

      <Container className="pt-6">
        {/* Title */}
        <div className="mb-4">
          <h1 className="text-[26px] sm:text-[30px] font-semibold text-ink tracking-tight text-balance">
            {listing.title}
          </h1>
          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-ink">
            <RatingStars rating={listing.rating} count={listing.reviewCount} />
            <span className="text-ink-quiet">·</span>
            <span className="font-medium underline">{listing.location}</span>
          </div>
        </div>

        {/* Photo gallery */}
        <div className="grid grid-cols-4 grid-rows-2 gap-2 rounded-2xl overflow-hidden h-[280px] sm:h-[440px] mb-6">
          <div className="col-span-4 sm:col-span-2 row-span-2 relative">
            <img
              src={listing.images[0]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
          </div>
          {listing.images.slice(1, 3).map((img, i) => (
            <div key={i} className="hidden sm:block col-span-1 row-span-1 relative">
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
          {[...Array(Math.max(0, 4 - listing.images.length))].map((_, i) => (
            <div
              key={`ph-${i}`}
              className="hidden sm:block col-span-1 row-span-1 bg-paper-warm"
            />
          ))}
          <button className="hidden sm:flex absolute bottom-6 right-6 items-center gap-2 bg-white border border-ink rounded-lg px-3 py-1.5 text-[13px] font-medium text-ink hover:bg-paper-warm transition-colors">
            Show all photos
          </button>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-16">
          {/* Left column */}
          <div>
            {/* Header / host */}
            <section className="pb-6 border-b border-paper-deep">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-[22px] font-semibold text-ink">
                    Entire home in {listing.region}
                  </h2>
                  <p className="text-[15px] text-ink mt-1">
                    {listing.maxGuests} guests · {listing.beds} beds · {listing.baths}{" "}
                    {listing.baths === 1 ? "bath" : "baths"}
                  </p>
                </div>
                <Avatar src={listing.host.avatar} alt={listing.host.name} size="lg" />
              </div>
              {listing.host.superhost && (
                <div className="mt-4 flex items-center gap-2 text-[14px] text-ink">
                  <Award size={18} strokeWidth={1.75} className="text-accent" />
                  <span>
                    <span className="font-semibold">{listing.host.name}</span> is a Superhost
                  </span>
                </div>
              )}
            </section>

            {/* Highlights */}
            <section className="py-6 border-b border-paper-deep space-y-4">
              {[
                {
                  icon: Key,
                  title: "Self check-in",
                  body: "Check yourself in with the smartlock.",
                },
                {
                  icon: Sparkles,
                  title: "Great cleanliness",
                  body: "Recent guests said this place is sparkling clean.",
                },
                {
                  icon: Users,
                  title: `${listing.host.responseRate}% response rate`,
                  body: `${listing.host.name} usually responds within an hour.`,
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex gap-4">
                  <Icon
                    size={22}
                    strokeWidth={1.5}
                    className="text-ink-quiet flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <p className="text-[15px] font-semibold text-ink">{title}</p>
                    <p className="text-[14px] text-ink-quiet mt-0.5">{body}</p>
                  </div>
                </div>
              ))}
            </section>

            {/* Description */}
            <section className="py-6 border-b border-paper-deep">
              <p className="text-[15px] text-ink leading-relaxed">{listing.description}</p>
            </section>

            {/* Amenities */}
            <section className="py-6 border-b border-paper-deep">
              <h2 className="text-[20px] font-semibold text-ink mb-5">
                What this place offers
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {listing.amenities.slice(0, 8).map((a) => (
                  <div key={a} className="flex items-center gap-4 text-[15px] text-ink">
                    <span className="text-ink-quiet">
                      {amenityIcons[a] ?? <Key size={20} strokeWidth={1.5} />}
                    </span>
                    {a}
                  </div>
                ))}
              </div>
              {listing.amenities.length > 8 && (
                <Button variant="outline" size="md" className="mt-6">
                  Show all {listing.amenities.length} amenities
                </Button>
              )}
            </section>

            {/* Reviews */}
            <section className="py-6">
              <div className="flex items-center gap-2 mb-5">
                <RatingStars rating={listing.rating} count={listing.reviewCount} size="md" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  {
                    name: "Sarah M.",
                    date: "March 2026",
                    text: "Absolutely stunning. The views were exactly as advertised, and Lucia was incredibly responsive. One of our best trips.",
                  },
                  {
                    name: "Tom & Rie",
                    date: "February 2026",
                    text: "Perfect base for exploring the area. The cottage is charming and comfortable — we'd go back every year if we could.",
                  },
                ].map((r) => (
                  <div key={r.name}>
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar alt={r.name} size="md" />
                      <div>
                        <p className="text-[14px] font-semibold text-ink">{r.name}</p>
                        <p className="text-[13px] text-ink-quiet">{r.date}</p>
                      </div>
                    </div>
                    <p className="text-[14px] text-ink leading-relaxed">{r.text}</p>
                  </div>
                ))}
              </div>
              <Button variant="outline" size="md" className="mt-6">
                Show all {listing.reviewCount} reviews
              </Button>
            </section>
          </div>

          {/* Right column — Booking widget */}
          <aside className="hidden lg:block">
            <div className="sticky top-[180px] rounded-2xl border border-paper-deep p-6 shadow-card bg-white">
              <div className="flex items-baseline gap-1.5 mb-5">
                <span className="text-[22px] font-semibold text-ink">
                  {formatPrice(listing.pricePerNight)}
                </span>
                <span className="text-[15px] text-ink">night</span>
              </div>

              {/* Date + guest pickers */}
              <div className="grid grid-cols-2 border border-paper-deep rounded-t-lg overflow-hidden">
                {[
                  { label: "CHECK-IN", val: listing.dateRange.split("–")[0].trim() },
                  { label: "CHECKOUT", val: listing.dateRange.split("–")[1]?.trim() ?? "—" },
                ].map((d, i) => (
                  <button
                    key={d.label}
                    className={`p-3 text-left hover:bg-paper-warm transition-colors ${
                      i === 0 ? "border-r border-paper-deep" : ""
                    }`}
                  >
                    <p className="text-[10px] font-bold text-ink tracking-[0.05em]">
                      {d.label}
                    </p>
                    <p className="text-[14px] text-ink mt-0.5">{d.val}</p>
                  </button>
                ))}
              </div>
              <button className="w-full p-3 text-left border-x border-b border-paper-deep rounded-b-lg hover:bg-paper-warm transition-colors mb-4">
                <p className="text-[10px] font-bold text-ink tracking-[0.05em]">
                  GUESTS
                </p>
                <p className="text-[14px] text-ink mt-0.5">2 guests</p>
              </button>

              <Button
                size="lg"
                className="w-full mb-3"
                onClick={() => setShowBooking(true)}
              >
                Reserve
              </Button>

              <p className="text-center text-[14px] text-ink-quiet mb-5">
                You won't be charged yet
              </p>

              <div className="space-y-3 text-[14px]">
                {[
                  {
                    label: `${formatPrice(listing.pricePerNight)} × ${nights} nights`,
                    value: listing.pricePerNight * nights,
                  },
                  { label: "Cleaning fee", value: cleaning },
                  { label: "Service fee", value: service },
                  { label: "Taxes", value: taxes },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-ink">
                    <span className="underline">{row.label}</span>
                    <span className="tabular-nums">{formatPrice(row.value)}</span>
                  </div>
                ))}
                <div className="border-t border-paper-deep pt-3 flex justify-between font-semibold text-ink">
                  <span>Total before taxes</span>
                  <span className="tabular-nums">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </Container>

      {/* Mobile bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-paper-deep px-5 py-3 flex items-center justify-between gap-4">
        <div>
          <p className="text-[15px] text-ink">
            <span className="font-semibold">{formatPrice(listing.pricePerNight)}</span>{" "}
            <span className="text-ink-quiet">night</span>
          </p>
          <p className="text-[12px] underline text-ink-quiet">{listing.dateRange}</p>
        </div>
        <Button size="lg" onClick={() => setShowBooking(true)}>
          Reserve
        </Button>
      </div>

      {/* Booking modal */}
      {showBooking && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowBooking(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            className="bg-white rounded-2xl shadow-modal w-full max-w-md p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {booked ? (
              <div className="text-center py-4">
                <div className="text-5xl mb-4">🎉</div>
                <h3 className="text-[24px] font-semibold text-ink mb-2">
                  Trip booked!
                </h3>
                <p className="text-[14px] text-ink-quiet">
                  Confirmation code:{" "}
                  <span className="text-ink font-mono">HMXK9W</span>
                </p>
                <Button className="mt-6 w-full" onClick={() => setShowBooking(false)}>
                  Done
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <img
                    src={listing.images[0]}
                    alt=""
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-ink line-clamp-1">
                      {listing.title}
                    </p>
                    <p className="text-[13px] text-ink-quiet">{listing.location}</p>
                  </div>
                </div>
                <div className="space-y-3 text-[14px] mb-6">
                  <div className="flex justify-between text-ink">
                    <span>Dates</span>
                    <span>{listing.dateRange}</span>
                  </div>
                  <div className="flex justify-between text-ink">
                    <span>Guests</span>
                    <span>2</span>
                  </div>
                  <div className="border-t border-paper-deep pt-3 flex justify-between font-semibold text-ink">
                    <span>Total</span>
                    <span className="tabular-nums">{formatPrice(total)}</span>
                  </div>
                </div>
                <p className="text-[12px] text-ink-quiet mb-5 bg-paper-warm rounded-xl p-3">
                  <strong className="text-ink">Cancellation policy:</strong> Free
                  cancellation until 14 days before check-in, then 50% refund until 7
                  days before.
                </p>
                <Button
                  size="lg"
                  className="w-full mb-2"
                  onClick={() => setBooked(true)}
                >
                  Confirm and pay
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  onClick={() => setShowBooking(false)}
                >
                  Cancel
                </Button>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
