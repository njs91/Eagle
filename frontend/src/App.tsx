import './css/default.module.scss';
import StyleGuide from './pages/StyleGuide';
import Homepage from './pages/Homepage';
import NotFound from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pages from './pages/Pages';
import About from './pages/About';
import Login from './pages/Login';
import { FC } from 'react';
import Terms from './pages/legal/Terms';
import Privacy from './pages/legal/Privacy';

const App: FC = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Homepage />} />
            <Route path='/styles' element={<StyleGuide />} />
            <Route path='/pages' element={<Pages />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    </BrowserRouter>
);

export default App;
