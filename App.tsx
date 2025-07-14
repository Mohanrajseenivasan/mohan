
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ComponentDashboard from './components/ComponentDashboard';
import ComponentDetail from './components/ComponentDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/machine/:machineId/:component" element={<ComponentDashboard />} />
        <Route path="/component/:id" element={<ComponentDetail />} />
      </Routes>
    </Router>
  );
}

export default App;