import { About, Contact, Experience, Hero, Works, StarsCanvas } from "./components";

const Home = () => (
  <>
    <div className="relative">
      <Hero />
    </div>
    <About />
    <Experience />
    <Works />
    <div className="relative z-0">
      <Contact />
      <StarsCanvas />
    </div>
  </>
);

export default Home;
