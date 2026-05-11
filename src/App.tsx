import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Navbar } from "@/design-system/layout/Navbar";
import { Container } from "@/design-system/layout/Container";
import { Button } from "@/design-system/primitives/Button";
import { HomePage } from "@/pages/HomePage";
import { SearchPage } from "@/pages/SearchPage";
import { ListingDetailPage } from "@/pages/ListingDetailPage";
import { TripsPage } from "@/pages/TripsPage";
import { TripDetailPage } from "@/pages/TripDetailPage";
import { MessagesPage } from "@/pages/MessagesPage";
import { WishlistsPage } from "@/pages/WishlistsPage";

function NotFound() {
  return (
    <Container className="py-32 text-center max-w-md">
      <p className="text-[80px] font-semibold text-ink leading-none mb-6">404</p>
      <p className="text-[24px] font-semibold text-ink mb-2">
        We can't seem to find that page
      </p>
      <p className="text-[14px] text-ink-quiet mb-8">
        It may have moved, or the link is broken.
      </p>
      <div className="flex items-center justify-center gap-3">
        <Link to="/">
          <Button>Back to home</Button>
        </Link>
        <Link to="/search">
          <Button variant="outline">Browse stays</Button>
        </Link>
      </div>
    </Container>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="bg-white min-h-screen">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/listing/:id" element={<ListingDetailPage />} />
          <Route path="/trips" element={<TripsPage />} />
          <Route path="/trips/:id" element={<TripDetailPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/wishlists" element={<WishlistsPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
