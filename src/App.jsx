import { Route, Routes, Link } from 'react-router-dom'; // Import Link
import Chats from './views/chats/chats';

function App() {
  return (
    <Routes>
      <Route path='/' element={
        <div>
          <h1>Landing</h1>
          <Link to="/chats">Ir a chats</Link>
        </div>
      } />
      <Route path='/chats' element={<Chats/>} />
    </Routes>
  )
}

export default App