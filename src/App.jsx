import { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

// Direct imports (not the ./components barrel) so blog pages don't download three.js.
import Navbar from "./components/Navbar";
import { BlogList, BlogPost } from "./components/Blog";

const Home = lazy(() => import("./Home"));
const Admin = lazy(() => import("./components/Admin"));

const App = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <div className="relative z-0 bg-primary text-text scanlines">
        <Navbar />
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog" element={<BlogList />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
        <footer className="border-t border-border px-4 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center font-mono text-[12px] text-muted">
          <p className="break-words">
            <span className="text-accent">$</span> echo "built with react + three.js + tailwind ·{" "}
            <span className="text-accent">© {new Date().getFullYear()} hwan</span>"
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
