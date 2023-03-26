import React, { lazy, useState, useEffect} from "react";
const  BallCanvas  = lazy(() => import('../components/canvas/Ball'));

import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
    {isMounted && (
    <div className='flex flex-row flex-wrap justify-center gap-10'>
      {technologies.map((technology) => (
        <div className='w-28 h-28' key={technology.name}>
           <BallCanvas icon={technology.icon} /> 
        </div>
      ))}
    </div> )}
    </>
  );
};

export default SectionWrapper(Tech, "");
