import './App.css';
import Dashboard from './pages/Dashboard';
import { Signup } from './pages/Signup';
import { Signin } from './pages/Signin';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RecieveDashboard from './pages/RecieveDashboard';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Signin />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/:brainId" element={<RecieveDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
