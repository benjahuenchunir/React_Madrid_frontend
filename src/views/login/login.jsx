import React, { useEffect, useRef } from 'react';
import './login.css';
import LoginForm from "./components/loginForm.jsx";

const Login = () => {
  const loginContainerRef = useRef(null);

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

  return (
    <div className="login-container" ref={loginContainerRef}>
      <LoginForm/>
    </div>
  )
};

export default Login;