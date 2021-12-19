import './css/default.module.scss';
import StyleGuide from './pages/StyleGuide';
import Homepage from './pages/Homepage';
import NotFound from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Pages from './pages/Pages';
import About from './pages/About';

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Homepage />} />
                <Route path='/styles' element={<StyleGuide />} />
                <Route path='/pages' element={<Pages />} />
                <Route path='/about' element={<About />} />
                <Route path='*' element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
