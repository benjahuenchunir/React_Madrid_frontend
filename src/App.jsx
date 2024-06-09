import { Route, Routes } from 'react-router-dom';
import Chats from './views/chats/chats';
import { useEffect } from 'react';
import Navbar from './components/Navbar/Navbar';
import Landing from "./views/landing/landing.jsx";
import AboutUs from './views/aboutus/AboutUs';
import DocsPage from './views/docs/docs';
import Login from './views/login/login.jsx';


function App() {

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const resizeObserver = new ResizeObserver(entries => {
            for (let entry of entries) {
                document.documentElement.style.setProperty('--navbar-height', `${entry.target.offsetHeight}px`);
            }
        });

        resizeObserver.observe(navbar);

        return () => resizeObserver.unobserve(navbar);
    }
}, []);

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/chats' element={<Chats/>} />
        <Route path='/about-us' element={<div>
            <AboutUs/>
          </div>} />
        <Route path='/docs' element={<div>
          <DocsPage/>
        </div>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<div>
          <h1>Register</h1>
        </div>} />
      </Routes>
    </>
  )
}

export default App