import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Schedule from './pages/Schedule';
import FAQ from './pages/FAQ';
import Layout from './layouts/layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="schedule" element={<Schedule />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="classes" element={<Classes />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
