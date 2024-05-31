import { useEffect } from 'react';
import Routing from './Routing';

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
      <Routing/>
    </>
  )
}

export default App