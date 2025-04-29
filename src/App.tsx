// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Body from './components/login/body/Body';
import PrivateRoute from './components/auth/PrivateRoute';
import { useAuth } from './hooks/useAuth';
import Home from './components/home/Home';
import EmployeeDetails from './components/home/employeeDetail/EmployeeDetail';

const AppContent = () => {
  useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Body />} />
      <Route path="/" element={<PrivateRoute element={<Home />} />}>
        <Route path="page/:page" element={<PrivateRoute element={<Home />} />} />
      </Route>
      <Route path="/employee/:id" element={<PrivateRoute element={<EmployeeDetails />} />} />
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