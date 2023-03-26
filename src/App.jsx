import { BrowserRouter } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";

const App = () => {

  const [isLoading, setIsLoading] = useState(true);

  const handleLoading = () => {
    setIsLoading(false);
  }

  useEffect(()=>{
    setTimeout(handleLoading, 3000);
  },[])

  
  return (
    <>
      {!isLoading &&
      <BrowserRouter>
        <div className='relative z-0 bg-primary'>
          <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center'>
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <div className='relative z-0'>
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      </BrowserRouter> }
      {
        isLoading && <div> Loading </div>
      }
    </>
  );
}

export default App;
