import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ChevronLeft,
  MapPin,
  MessageSquare,
  Lock,
  Users,
  Smartphone,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/design-system/layout/Container";
import { Avatar } from "@/design-system/primitives/Avatar";
import { Badge } from "@/design-system/primitives/Badge";
import { Button } from "@/design-system/primitives/Button";
import { formatDate, formatPrice } from "@/lib/utils";
import { getTripById } from "@/data/trips";

const checkInIcons = {
  lockbox: <Lock size={20} strokeWidth={1.5} />,
  "smart-lock": <Smartphone size={20} strokeWidth={1.5} />,
  "host-greet": <Users size={20} strokeWidth={1.5} />,
  "building-staff": <Building2 size={20} strokeWidth={1.5} />,
};

const checkInLabels = {
  lockbox: "Lockbox",
  "smart-lock": "Smart lock",
  "host-greet": "Host greets you",
  "building-staff": "Building staff",
};

export function TripDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const trip = getTripById(id ?? "");
  const [showCancel, setShowCancel] = useState(false);
  const [cancelStep, setCancelStep] = useState<1 | 2 | 3 | "done">(1);

  if (!trip) {
    return (
      <Container className="py-32 text-center">
        <p className="text-[24px] font-semibold">Trip not found</p>
        <Button onClick={() => navigate("/trips")} className="mt-6">
          Back to trips
        </Button>
      </Container>
    );
  }

  const isPast = trip.status === "completed" || trip.status === "cancelled";
  const refundAmount =
    trip.cancellationPolicy === "flexible"
      ? trip.totalPrice
      : trip.cancellationPolicy === "moderate"
        ? Math.round(trip.totalPrice * 0.5)
        : 0;

  const status =
    trip.status === "check-in-today"
      ? { variant: "warning" as const, label: "Check-in today", pulse: true }
      : trip.status === "confirmed"
        ? { variant: "success" as const, label: "Confirmed", pulse: false }
        : { variant: "muted" as const, label: "Past", pulse: false };

  return (
    <div className="min-h-screen pb-20 bg-white">
      <div className="sticky top-[120px] z-30 bg-white border-b border-paper-deep">
        <Container className="flex items-center h-12">
          <button
            onClick={() => navigate("/trips")}
            className="flex items-center gap-1.5 text-[14px] font-medium text-ink hover:underline"
          >
            <ChevronLeft size={16} strokeWidth={2} /> All trips
          </button>
        </Container>
      </div>

      <Container className="pt-8 max-w-3xl">
        {/* Unread banner */}
        {trip.unreadMessages > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between gap-3 p-4 mb-6 rounded-xl bg-accent-soft"
          >
            <div className="flex items-center gap-3">
              <MessageSquare
                size={18}
                strokeWidth={1.75}
                className="text-accent shrink-0"
              />
              <p className="text-[14px] text-ink">
                <strong>{trip.listing.host.name}</strong> sent{" "}
                {trip.unreadMessages === 1 ? "a message" : `${trip.unreadMessages} messages`}
              </p>
            </div>
            <Link to="/messages">
              <Button size="sm">Read</Button>
            </Link>
          </motion.div>
        )}

        {/* Hero */}
        <div className="relative rounded-2xl overflow-hidden h-60 sm:h-72 mb-6">
          <img
            src={trip.listing.images[0]}
            alt={trip.listing.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/55 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5">
            <h1 className="text-[24px] font-semibold text-white tracking-tight text-balance">
              {trip.listing.title}
            </h1>
            <p className="text-[14px] text-white/85 flex items-center gap-1 mt-1">
              <MapPin size={14} /> {trip.listing.location}
            </p>
          </div>
          <div className="absolute top-5 right-5">
            <Badge variant={status.variant} pulse={status.pulse}>
              {status.label}
            </Badge>
          </div>
        </div>

        {/* Itinerary */}
        <section className="mb-6 rounded-2xl border border-paper-deep p-5 bg-white">
          <h2 className="text-[18px] font-semibold text-ink mb-4">Your trip</h2>
          <div className="grid grid-cols-2 gap-4 text-[14px]">
            <div>
              <p className="text-[12px] font-semibold text-ink-quiet uppercase tracking-wide mb-1">
                Check-in
              </p>
              <p className="text-ink font-medium">{formatDate(trip.checkIn)}</p>
              <p className="text-ink-quiet text-[12px] mt-0.5">After 3:00 PM</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-ink-quiet uppercase tracking-wide mb-1">
                Checkout
              </p>
              <p className="text-ink font-medium">{formatDate(trip.checkOut)}</p>
              <p className="text-ink-quiet text-[12px] mt-0.5">Before 11:00 AM</p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-ink-quiet uppercase tracking-wide mb-1">
                Guests
              </p>
              <p className="text-ink font-medium">
                {trip.guests} guest{trip.guests !== 1 ? "s" : ""}
              </p>
            </div>
            <div>
              <p className="text-[12px] font-semibold text-ink-quiet uppercase tracking-wide mb-1">
                Total paid
              </p>
              <p className="text-ink font-medium">{formatPrice(trip.totalPrice)}</p>
            </div>
          </div>
          <a
            href="#"
            className="mt-4 pt-4 border-t border-paper-deep flex items-center gap-2 text-[14px]"
          >
            <MapPin size={14} className="text-accent shrink-0" />
            <span className="text-ink hover:underline">
              {trip.listing.location} — open in Maps
            </span>
          </a>
        </section>

        {/* Getting there */}
        {!isPast && trip.checkInInstructions.length > 0 && (
          <section className="mb-6 rounded-2xl border border-paper-deep p-5 bg-white">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-ink-quiet">{checkInIcons[trip.checkInMethod]}</span>
              <h2 className="text-[18px] font-semibold text-ink">Getting there</h2>
              <Badge variant="muted">{checkInLabels[trip.checkInMethod]}</Badge>
            </div>
            <ol className="space-y-3">
              {trip.checkInInstructions.map((step, i) => (
                <li key={i} className="flex gap-3 text-[14px]">
                  <span className="w-6 h-6 rounded-full bg-paper-warm text-ink-quiet text-[12px] font-semibold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-ink leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        )}

        {/* Host */}
        <section className="mb-6 rounded-2xl border border-paper-deep p-5 bg-white">
          <h2 className="text-[18px] font-semibold text-ink mb-4">Your host</h2>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Avatar
                src={trip.listing.host.avatar}
                alt={trip.listing.host.name}
                size="lg"
              />
              <div>
                <p className="text-[15px] font-semibold text-ink">
                  {trip.listing.host.name}
                </p>
                <p className="text-[13px] text-ink-quiet">
                  {trip.listing.host.responseRate}% response rate
                </p>
              </div>
            </div>
            <Link to="/messages">
              <Button variant="outline" size="sm" className="gap-2">
                <MessageSquare size={14} /> Message
              </Button>
            </Link>
          </div>
        </section>

        {/* Confirmation */}
        <section className="mb-6 rounded-2xl bg-paper-warm p-4">
          <p className="text-[13px] text-ink-quiet">
            Confirmation code:{" "}
            <strong className="text-ink font-mono">{trip.confirmationCode}</strong>
          </p>
        </section>

        {/* Cancel */}
        {!isPast && (
          <button
            onClick={() => setShowCancel(true)}
            className="text-[14px] font-medium text-ink underline decoration-paper-deep hover:decoration-ink transition-colors"
          >
            Cancel this reservation
          </button>
        )}
      </Container>

      {/* Cancellation flow */}
      {showCancel && (
        <div
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
          onClick={() => {
            if (cancelStep === 1 || cancelStep === 2) setShowCancel(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
            className="bg-white rounded-2xl shadow-modal w-full max-w-md p-7"
            onClick={(e) => e.stopPropagation()}
          >
            {cancelStep === 1 && (
              <>
                <h3 className="text-[22px] font-semibold text-ink mb-1">
                  Cancel this reservation?
                </h3>
                <p className="text-[13px] text-ink-quiet mb-5">
                  {trip.listing.title} · {formatDate(trip.checkIn)} – {formatDate(trip.checkOut)}
                </p>
                <div className="rounded-xl bg-paper-warm p-5 mb-5 text-center">
                  <p className="text-[12px] text-ink-quiet mb-1">Your refund</p>
                  <p className="text-[32px] font-semibold text-moss tracking-tight">
                    {formatPrice(refundAmount)}
                  </p>
                  <p className="text-[12px] text-ink-quiet mt-1">
                    {trip.cancellationPolicy === "flexible"
                      ? "Full refund — flexible policy applies"
                      : trip.cancellationPolicy === "moderate"
                        ? "50% refund — moderate window"
                        : "No refund — strict policy"}
                  </p>
                </div>
                <Button className="w-full mb-2" onClick={() => setCancelStep(2)}>
                  Continue to cancel
                </Button>
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={() => setShowCancel(false)}
                >
                  Keep reservation
                </Button>
              </>
            )}
            {cancelStep === 2 && (
              <>
                <h3 className="text-[22px] font-semibold text-ink mb-5">
                  Why are you cancelling?
                </h3>
                <div className="space-y-2 mb-5">
                  {[
                    "Plans changed",
                    "Dates wrong",
                    "Found a better option",
                    "Emergency",
                    "Other",
                  ].map((r) => (
                    <button
                      key={r}
                      className="w-full text-left p-3.5 rounded-xl border border-paper-deep hover:border-ink text-[14px] text-ink transition-colors"
                    >
                      {r}
                    </button>
                  ))}
                </div>
                <Button className="w-full mb-2" onClick={() => setCancelStep(3)}>
                  Continue
                </Button>
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={() => setShowCancel(false)}
                >
                  Back
                </Button>
              </>
            )}
            {cancelStep === 3 && (
              <>
                <h3 className="text-[22px] font-semibold text-ink mb-5">
                  Confirm cancellation
                </h3>
                <div className="rounded-xl bg-paper-warm p-4 mb-5 text-[14px] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-ink-quiet">Reservation</span>
                    <span className="text-ink font-mono text-[12px]">
                      {trip.confirmationCode}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-ink-quiet">Refund</span>
                    <span className="text-moss font-semibold">
                      {formatPrice(refundAmount)}
                    </span>
                  </div>
                  <p className="text-[12px] text-ink-quiet pt-2 border-t border-paper-deep">
                    Refund arrives in 5–10 business days to your original
                    payment method.
                  </p>
                </div>
                <Button
                  className="w-full mb-2"
                  variant="destructive"
                  onClick={() => setCancelStep("done")}
                >
                  Confirm cancellation
                </Button>
                <Button
                  className="w-full"
                  variant="ghost"
                  onClick={() => setCancelStep(2)}
                >
                  Back
                </Button>
              </>
            )}
            {cancelStep === "done" && (
              <div className="text-center py-2">
                <div className="text-5xl mb-4">✓</div>
                <h3 className="text-[22px] font-semibold text-ink mb-2">
                  Reservation cancelled
                </h3>
                <p className="text-[13px] text-ink-quiet">
                  You'll receive {formatPrice(refundAmount)} within 5–10 business
                  days.
                </p>
                <Button
                  className="mt-6 w-full"
                  onClick={() => {
                    setShowCancel(false);
                    navigate("/trips");
                  }}
                >
                  Back to trips
                </Button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
