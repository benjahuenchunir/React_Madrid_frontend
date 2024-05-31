import {BrowserRouter, Routes, Route} from 'react-router-dom';
import AboutUs from './view-aboutus/AboutUs.jsx';

function Routing(){
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={"/aboutus"} element={<AboutUs/>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default Routing;