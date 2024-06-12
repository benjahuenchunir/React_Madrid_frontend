import { useEffect, useState, useRef } from 'react';
import './login.scss';
import LoginForm from "./components/loginForm.jsx";

const Login = () => {
  const loginContainerRef = useRef(null);
  const svgRef = useRef(null);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const setLoginContainerHeight = () => {
      const navbar = document.querySelector('nav');
      if (navbar && loginContainerRef.current) {
        const navbarHeight = navbar.offsetHeight;
        loginContainerRef.current.style.height = `calc(100vh - ${navbarHeight}px)`;
      }
    };

    setLoginContainerHeight(); // Set initial height

    const observer = new MutationObserver(setLoginContainerHeight);

    const navbar = document.querySelector('nav');
    if (navbar) {
      observer.observe(navbar, { attributes: true, childList: true, subtree: true });
    }

    window.addEventListener('resize', setLoginContainerHeight); // Update height when window is resized

    // Clean up event listener and observer when component is unmounted
    return () => {
      window.removeEventListener('resize', setLoginContainerHeight);
      observer.disconnect();
    };
  }, []);

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
    <div id="login-container">
      <div className="content">
        <div className="login-container" ref={loginContainerRef}>
          <LoginForm/>
          <img ref={svgRef} src="/ship_with_stars.svg" alt="Ship on ground" className="login-fixed-bottom"/>
        </div>
      </div>
    </div>
  )
};

export default Login;