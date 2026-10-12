// ════════════════════════════════════════════════════════════════════════════
//  00_App.jsx  —  ROOT ENTRY POINT  (updated to include LandingPage on "/")
// ════════════════════════════════════════════════════════════════════════════
import { useState, useEffect } from "react";
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { GLOBAL_CSS } from "./01_theme";
import { Navbar } from "./03_Navbar";
import { Footer } from "./04_Footer";
import { IntroAnimation } from "./05_IntroAnimation";
import { LandingPage } from "./06_HomePage";          // ← NEW
import { AboutPage } from "./07_AboutRama";
import { OurOfferingsPage } from "./08_Offerings";
import { FeaturedEventPage } from "./09_FeaturedEventPage";
import { EventsPage } from "./10_EventsPage";
import { GalleryPage } from "./11_GalleryPage";
import { QuizPage } from "./12_QuizPage";
import { ResourcesPage } from "./13_Resourcepage";
import { GetInvolvedPage } from "./14_Getinvolvedpage";
import { ShlokasPage } from "./15_ShlokasPage";
import { YoutubeShlokasPage } from "./16_YoutubeShlokasPage";
import { WeeklyQuizPage } from "./17_WeeklyQuizPage";
import { ScriptPage } from "./18_ScriptPage";
import { AdminDashboard } from "./19_AdminDashboard";
import { DemoHlsPage } from "./20_DemoHlsPage";


const ROUTES = {
  "Home": "/",
  "Know Rāmāyaṇa": "/home",
  "Daily Satsaṅga": "/dailysatsanga",
  "Learn Rāmāyaṇa": "/offerings",
  "Resources": "/resources",
  "Events": "/events",
  "Get Involved": "/get-involved",

  // Legacy fallback mappings
  "Know Ramayana": "/home",
  "Daily Satsanga": "/dailysatsanga",
  "Learn Ramayana": "/offerings",
  "About Ramayana": "/home",
  "Learn": "/offerings",
  "YT Shlokas": "/dailysatsanga",
  "Shloka Audios": "/shlokas",
  "Gallery": "/gallery",
  "Get Certified": "/quiz",
  "Shlokas": "/shlokas",
  "Admin": "/admin"
};

const SHOW_INTRO = false;

function AppShell() {
  const navigate = useNavigate();
  const location = useLocation();
  const [intro, setIntro] = useState(SHOW_INTRO);

  const pathToNav = {
    "/": "Home",
    "/home": "Know Rāmāyaṇa",
    "/dailysatsanga": "Daily Satsaṅga",
    "/offerings": "Learn Rāmāyaṇa",
    "/resources": "Resources",
    "/events": "Events",
    "/get-involved": "Get Involved"
  };
  const activePage = pathToNav[location.pathname] ?? "Know Rāmāyaṇa";

  const setActivePage = (label) => {
    const path = ROUTES[label];
    if (path) navigate(path);
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    // Auto-redirect if URL contains a track parameter (e.g. from TinyURL or UTM links)
    const searchParams = new URLSearchParams(window.location.search);
    const hashParts = window.location.hash.split('?');
    const hashParams = hashParts[1] ? new URLSearchParams(hashParts[1]) : null;
    const trackId = searchParams.get('track') || hashParams?.get('track');

    if (trackId && location.pathname !== "/dailysatsanga") {
      navigate(`/dailysatsanga?track=${trackId}`);
    }
  }, [location.pathname, navigate]);

  // LandingPage gets no Navbar / Footer — it IS the shell
  const isLanding = location.pathname === "/";
  const isAdmin = location.pathname === "/admin";

  return (
    <>
      <style>{GLOBAL_CSS}</style>

      {intro && <IntroAnimation onDone={() => setIntro(false)} />}

      {/* Hide Navbar/Footer on the splash landing page and admin page */}
      {!isLanding && !isAdmin && <Navbar activePage={activePage} setActivePage={setActivePage} />}

      <main style={{ minHeight: "100svh", background: "#FFFBF0", paddingTop: 0, overflowX: "hidden" }}>
        <Routes>
          {/* ─── Splash landing — no navbar / footer ─── */}
          <Route path="/" element={<LandingPage setActivePage={setActivePage} />} />

          {/* ─── Inner pages ─── */}
          <Route path="/home" element={<AboutPage setActivePage={setActivePage} />} />
          <Route path="/events" element={<EventsPage setActivePage={setActivePage} />} />
          <Route path="/parayana2026" element={<Navigate to="/events" replace />} />
          <Route path="/offerings" element={<OurOfferingsPage setActivePage={setActivePage} />} />
          <Route path="/gallery" element={<GalleryPage setActivePage={setActivePage} />} />
          <Route path="/quiz" element={<QuizPage setActivePage={setActivePage} />} />
          <Route path="/resources" element={<ResourcesPage setActivePage={setActivePage} />} />
          <Route path="/get-involved" element={<GetInvolvedPage setActivePage={setActivePage} />} />
          <Route path="/shlokas" element={<ShlokasPage setActivePage={setActivePage} />} />
          <Route path="/dailysatsanga" element={<YoutubeShlokasPage setActivePage={setActivePage} />} />
          <Route path="/weekly-quiz" element={<WeeklyQuizPage />} />
          <Route path="/script" element={<ScriptPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/demo-hls" element={<DemoHlsPage />} />


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isAdmin && <Footer setActivePage={setActivePage} />}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppShell />
    </HashRouter>
  );
}