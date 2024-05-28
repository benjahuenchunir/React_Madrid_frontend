import { Route, Routes } from 'react-router-dom';
import Chats from './views/chats/chats';

function App() {

  return (
    <Routes>
      <Route path='/' element={<h1>Landing</h1>} />
      <Route path='/chats' element={<Chats/>} />
    </Routes>
  )
}

export default App
