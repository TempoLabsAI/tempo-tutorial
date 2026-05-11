import { Link, useLocation } from "react-router-dom";
import { Globe, Menu, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { SearchBar } from "@/design-system/components/SearchBar";

const tabs = [
  { to: "/search", label: "Stays" },
  { to: "/wishlists", label: "Wishlists" },
  { to: "/trips", label: "Trips" },
  { to: "/messages", label: "Messages" },
];

/**
 * Navbar — Airbnb-style.
 *  Row 1:  [Logo]                         [Search center on home]                         [Globe] [Profile menu]
 *  Row 2:  [Section tabs] (small underline indicator)
 */
export function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-paper-deep">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-10">
        {/* Row 1: masthead */}
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-6 h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5" aria-label="Havn home">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden>
              <path
                d="M16 1c-1.1 0-2.1.6-2.7 1.6L1.6 22.4c-.5.9-.6 2-.3 3 .3 1 1 1.8 1.9 2.3.6.3 1.2.4 1.8.4 1.3 0 2.6-.7 3.3-1.9L16 14.5l7.6 11.7c.7 1.2 2 1.9 3.3 1.9.6 0 1.3-.1 1.8-.4.9-.5 1.6-1.3 1.9-2.3.3-1 .2-2-.3-3L18.7 2.6C18.1 1.6 17.1 1 16 1z"
                fill="var(--accent)"
              />
            </svg>
            <span className="hidden sm:inline text-[22px] font-bold text-accent tracking-tight">
              havn
            </span>
          </Link>

          {/* Center: search (compact bar on inner pages, hidden on home where the hero owns it) */}
          <div className="flex items-center justify-center min-w-0">
            {!isHome && (
              <div className="hidden md:block w-full max-w-md">
                <SearchBar compact />
              </div>
            )}
          </div>

          {/* Right rail */}
          <nav className="flex items-center gap-1 sm:gap-2">
            <Link
              to="/listing/lst-001"
              className="hidden md:inline-block px-3 py-2.5 text-[14px] font-semibold text-ink hover:bg-paper-warm rounded-full transition-colors"
            >
              Become a host
            </Link>
            <button
              className="hidden md:inline-flex w-10 h-10 items-center justify-center rounded-full hover:bg-paper-warm transition-colors"
              aria-label="Choose a language and region"
            >
              <Globe size={16} strokeWidth={2} className="text-ink" />
            </button>
            <button
              className={cn(
                "h-12 pl-3 pr-1 inline-flex items-center gap-2 rounded-full",
                "border border-paper-deep hover:shadow-card transition-shadow duration-200 bg-white",
              )}
              aria-label="Account menu"
            >
              <Menu size={16} strokeWidth={2.25} className="text-ink" />
              <span className="w-8 h-8 rounded-full bg-ink text-white grid place-items-center">
                <User size={16} strokeWidth={2.25} />
              </span>
            </button>
          </nav>
        </div>

        {/* Row 2: section tabs */}
        <nav className="flex items-center gap-1 -mt-1">
          {tabs.map((s) => {
            const active = location.pathname.startsWith(s.to);
            return (
              <Link
                key={s.to}
                to={s.to}
                className={cn(
                  "relative inline-flex items-center px-4 h-10 text-[14px] font-medium transition-colors",
                  active ? "text-ink" : "text-ink-quiet hover:text-ink",
                )}
              >
                {s.label}
                {active && (
                  <span
                    aria-hidden
                    className="absolute -bottom-px left-3 right-3 h-0.5 bg-ink rounded-full"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
