import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";

import { NavBar } from "@/components/navigation/NavBar";
import { Footer } from "@/components/footer/Footer";
import { BootSequence } from "@/components/boot/BootSequence";
import { Home } from "@/pages/Home";
import { ModelsPage } from "@/pages/Models";
import { ModelDetailPage } from "@/pages/ModelDetail";
import { ResearchPage } from "@/pages/Research";
import { DevelopersPage } from "@/pages/Developers";
import { CompanyPage } from "@/pages/Company";
import { CareersPage } from "@/pages/Careers";
import { UpdatesPage } from "@/pages/Updates";
import { NotFoundPage } from "@/pages/NotFound";

/**
 * Scroll to top on route change, unless targeting a hash.
 */
function ScrollToHash() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: "auto" });
    } else {
      const el = document.getElementById(hash.slice(1));
      el?.scrollIntoView({ behavior: "smooth" });
    }
  }, [pathname, hash]);
  return null;
}

function shouldBoot(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  return true;
}

function AppRoutes() {
  const [booting, setBooting] = useState(shouldBoot);

  const onDone = useCallback(() => {
    setBooting(false);
  }, []);

  return (
    <div className="relative min-h-screen bg-void text-fg">
      <ScrollToHash />
      {booting && <BootSequence onDone={onDone} />}
      <NavBar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models" element={<ModelsPage />} />
          <Route path="/models/:slug" element={<ModelDetailPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/developers" element={<DevelopersPage />} />
          <Route path="/company" element={<CompanyPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/updates" element={<UpdatesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
