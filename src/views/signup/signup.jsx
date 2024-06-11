import { useEffect, useState, useRef } from 'react';
import './signup.scss';
import SignupForm from "./components/signupForm.jsx";

const Signup = () => {
  const svgRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const adjustSvgPosition = () => {
      if (window.innerWidth > 1024) {
        svgRef.current.style.right = 0;
        svgRef.current.style.left = 'auto';
        return;
      }

      if (svgRef.current) {
        const svgWidth = svgRef.current.offsetWidth;
        const viewportWidth = window.innerWidth;
        const leftPosition = (viewportWidth - svgWidth) / 2;
        svgRef.current.style.left = `${leftPosition}px`;
      }
    };

    adjustSvgPosition(); // Adjust position when component mounts

    window.addEventListener('resize', adjustSvgPosition); // Adjust position when window is resized

    // Clean up event listener when component is unmounted
    return () => {
      window.removeEventListener('resize', adjustSvgPosition);
    };
  }, []);

  return (
    <div id="signup-container">
      <div className="content">
        <div className="signup-container">
          <SignupForm/>
          <img ref={svgRef} src="/ship_with_stars.svg" alt="Ship on ground" className="signup-fixed-bottom"/>
        </div>
      </div>
    </div>
  )
};

export default Signup;