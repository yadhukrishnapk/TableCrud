// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from './components/login/body/Body';
import PrivateRoute from './components/auth/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import Home from './components/home/Home';

const AppContent = () => {
  useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Body />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />} />
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
      <ToastContainer />
    </Router>
  );
};

export default App;