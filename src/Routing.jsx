import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import AboutUs from './views/about-us/AboutUs';
import Chats from './views/chats/chats';


function Routing(){
    return (
        <>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path='/' element={
                    <div>
                        <h1>Landing</h1>
                    </div>
                    } />
                    <Route path='/chats' element={<Chats/>} />
                    <Route path={"/about-us"} element={<AboutUs/>}/>
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
            </BrowserRouter>
        </>
    )
}

export default Routing;