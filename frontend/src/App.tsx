import './css/default.module.scss';
import TestApiPage from './pages/TestApiPage';
import StyleGuide from './pages/StyleGuide';
import Homepage from './pages/Homepage';
import NotFound from './pages/404';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/test-api' element={<TestApiPage />} />
        <Route path='/styles' element={<StyleGuide />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
