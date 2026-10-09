import { useState } from "react";
import {
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import "./App.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileBottomNav from "./components/MobileBottomNav";
import ScrollToTop from "./components/ScrollToTop";
import SearchOverlay from "./components/SearchOverlay";

import Home from "./pages/Home";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import Gallery from "./pages/Gallery";
import Account from "./pages/Account";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import SignUp from "./pages/SignUp";

function App() {
  const location = useLocation();

  const [searchOpen, setSearchOpen] =
    useState(false);

  return (
    <>
      <ScrollToTop />

      <Header
        onSearchOpen={() => setSearchOpen(true)}
      />

      <SearchOverlay
        open={searchOpen}
        onClose={() => setSearchOpen(false)}
      />

      <main>
        <AnimatePresence mode="wait">
          <Routes
            location={location}
            key={location.pathname}
          >
            <Route path="/" element={<Home />} />

            <Route
              path="/events"
              element={<Events />}
            />

            <Route
              path="/events/:id"
              element={<EventDetails />}
            />

            <Route
              path="/gallery"
              element={<Gallery />}
            />

            <Route
              path="/account"
              element={<Account />}
            />

            <Route
              path="*"
              element={<NotFound />}
            />
            <Route
              path="/events/:slug/checkout"
              element={<Checkout />}
            />
            <Route 
              path="/signup" 
              element={<SignUp />} 
            />
          </Routes>
        </AnimatePresence>
      </main>

      <Footer />

      <MobileBottomNav />
    </>
  );
}

export default App;