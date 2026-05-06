// ════════════════════════════════════════════════════════════════════════════
//  00_App.jsx  —  ROOT ENTRY POINT  (with react-router-dom URL routing)
//
//  SETUP — install router first:
//    npm install react-router-dom
//
//  URL MAP:
//    ramayana.vyoma.org/             → redirects to /parayana2026
//    ramayana.vyoma.org/home         → Home page
//    ramayana.vyoma.org/offerings    → Our Offerings
//    ramayana.vyoma.org/parayana2026 → * Mahotsava 2026 (featured event)
//    ramayana.vyoma.org/events       → Events
//    ramayana.vyoma.org/gallery      → Gallery
//    ramayana.vyoma.org/quiz         → Quiz & Rewards
//    ramayana.vyoma.org/resources    → Resources
//    ramayana.vyoma.org/get-involved → Get Involved
//
//  DEPLOYMENT (CRA):
//    Add to package.json:  "homepage": "https://ramayana.vyoma.org"
//    Add public/_redirects (Netlify) OR .htaccess (Apache):
//      /*  /index.html  200
//
//  FILE STRUCTURE:
//  ├─ 01_theme.js               ← colors, nav items, CSS, featured event toggle
//  ├─ 02_SharedComponents.jsx   ← Card, Tag, Btn, Om, Divider, PageHdr, SpiritualHero
//  ├─ 03_Navbar.jsx             ← top navigation bar (hamburger on mobile)
//  ├─ 04_Footer.jsx             ← footer with contact, social, links
//  ├─ 05_IntroAnimation.jsx     ← full-screen page-load animation
//  ├─ 06_HomePage.jsx           ← Home page
//  ├─ 07_Offerings.jsx          ← Offerings (Courses) + Books (Products) pages
//  ├─ 08_FeaturedEventPage.jsx  ← Mahotsava 2026 featured page
//  ├─ 09_EventsPage.jsx         ← Events page
//  ├─ 10_GalleryPage.jsx        ← Gallery page
//  ├─ 11_QuizPage.jsx           ← Quiz & Rewards page
//  ├─ 12_ResourcePage.jsx       ← Resources (Shlokas, Audio, Links)
//  └─ 13_GetInvolvedPage.jsx    ← Get Involved (Volunteer + Sponsorship)
// ════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react";
import {
  HashRouter,        // ← switched from BrowserRouter for Hostinger compatibility
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { GLOBAL_CSS } from "./01_theme";
import { Navbar }          from "./03_Navbar";
import { Footer }          from "./04_Footer";
import { IntroAnimation }  from "./05_IntroAnimation";
import { HomePage }        from "./06_HomePage";
import { OurOfferingsPage } from "./07_Offerings";
import { FeaturedEventPage } from "./08_FeaturedEventPage";
import { EventsPage }      from "./09_EventsPage";
import { GalleryPage }     from "./10_GalleryPage";
import { QuizPage }        from "./11_QuizPage";
import { ResourcesPage }   from "./12_Resourcepage";
import { GetInvolvedPage } from "./13_Getinvolvedpage";

// ─── Route ↔ Nav label mapping ───────────────────────────────────────────────
// Edit URL slugs here — these become ramayana.vyoma.org/<slug>
// NOTE: If you change a slug here, also update ROUTE_MAP in 03_Navbar.jsx
const ROUTES = {
  "Home":          "/home",
  "Events":        "/events",
  "Learn":         "/offerings",
  "Get Certified": "/quiz",
  "Resources":     "/resources",
  "Get Involved":  "/get-involved",
  "View":          "/gallery",
};

const SHOW_INTRO = false;

// ─── Inner shell (has access to router hooks) ─────────────────────────────────
function AppShell() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [intro, setIntro] = useState(SHOW_INTRO);

  // Derive active nav label from current URL path (Navbar handles its own highlighting)
  const pathToNav = Object.fromEntries(Object.entries(ROUTES).map(([l,p]) => [p, l]));
  const activePage = pathToNav[location.pathname] ?? "Home";

  // Navigation helper passed to all pages — navigates by URL
  const setActivePage = (label) => {
    const path = ROUTES[label];
    if (path) navigate(path);
  };

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {/* Intro animation — plays once per session */}
      {intro && <IntroAnimation onDone={() => setIntro(false)} />}

      {/* Fixed top navbar — always visible */}
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      {/* Page content */}
      <main style={{ minHeight: "100svh", background: "#FFFBF0", paddingTop: 0, overflowX: "hidden" }}>
        <Routes>
          {/* Default root → redirect to home */}
          <Route path="/"               element={<Navigate to="/home" replace />} />

          {/* Named pages */}
          <Route path="/home"           element={<HomePage         setActivePage={setActivePage} />} />
          <Route path="/events"         element={<EventsPage        setActivePage={setActivePage} />} />
          <Route path="/parayana2026"   element={<Navigate to="/events" replace />} />
          <Route path="/offerings"      element={<OurOfferingsPage setActivePage={setActivePage} />} />
          <Route path="/gallery"        element={<GalleryPage       setActivePage={setActivePage} />} />
          <Route path="/quiz"           element={<QuizPage          setActivePage={setActivePage} />} />
          <Route path="/resources"      element={<ResourcesPage     setActivePage={setActivePage} />} />
          <Route path="/get-involved"   element={<GetInvolvedPage   setActivePage={setActivePage} />} />

          {/* Catch-all → 404 fallback to home */}
          <Route path="*"               element={<Navigate to="/home" replace />} />
        </Routes>
      </main>

      {/* Footer */}
      <Footer setActivePage={setActivePage} />
    </>
  );
}

// ─── Root export — wraps everything in HashRouter (fixes Hostinger refresh/direct-link 404s) ──
export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}