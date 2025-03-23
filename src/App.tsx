import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Classes from './pages/Classes';
import Schedule from './pages/Schedule';
import FAQ from './pages/FAQ';
import Layout from './layouts/layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/2nd-period-isp-model-scheduler-2024-2025/schedule" element={<Schedule />} />
        <Route index element={<Home />} />
        <Route path="/2nd-period-isp-model-scheduler-2024-2025/" element={<Home />} />
	<Route path="/2nd-period-isp-model-scheduler-2024-2025/" element={<Layout />}>
          <Route path="/2nd-period-isp-model-scheduler-2024-2025/classes" element={<Classes />} />
          <Route path="/2nd-period-isp-model-scheduler-2024-2025/faq" element={<FAQ />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
