import { Route, Routes } from 'react-router-dom';
import Chats from './views/chats/chats';
import Navbar from './components/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={
          <div>
            <h1>Landing</h1>
          </div>
        } />
        <Route path='/chats' element={<Chats/>} />
        <Route path='/about-us' element={<div>
            <h1>Nosotros</h1>
          </div>} />
        <Route path='/docs' element={<div>
          <h1>Docs</h1>
        </div>} />
        <Route path='/login' element={<div>
          <h1>Login</h1>
        </div>} />
        <Route path='/register' element={<div>
          <h1>Register</h1>
        </div>} />
      </Routes>
    </>
  )
}

export default App