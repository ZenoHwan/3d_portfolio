import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";

import { About, Contact, Experience, Hero, Navbar, Works, StarsCanvas } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <Analytics />
      <div className="relative z-0 bg-primary text-text scanlines">
        <div className="relative">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Works />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
        <footer className="border-t border-border py-6 text-center font-mono text-[12px] text-muted">
          <p>
            <span className="text-accent">$</span> echo "built with react + three.js + tailwind ·{" "}
            <span className="text-accent">© {new Date().getFullYear()} hwan</span>"
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};

export default App;
