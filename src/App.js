import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home/Home';
import Appointment from './Pages/Appointment/Appointment/Appointment';
import Login from './Pages/Login/Login/Login';
import Signup from './Pages/Login/Signup/Signup';
import AuthProvider from './Context/AuthProvider/AuthProvider';
import PrivateRoute from './Pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import DashboardHome from './Pages/Dashboard/DashboardHome.js/DashboardHome';
import Payment from './Pages/Dashboard/Payment/Payment';
import AdminRoute from './Pages/Login/AdminRoute/AdminRoute';
import MakeAdmin from './Pages/Dashboard/MakeAdmin/MakeAdmin';
import AddDoctor from './Pages/Dashboard/AddDoctor/AddDoctor';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/appointment" element={<PrivateRoute>
              <Appointment />
            </PrivateRoute>} />

            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
              <Route exact path='/dashboard' element={<DashboardHome />} />
              <Route path={`/dashboard/payment/:appointmentId`} element={<Payment />} />
              <Route path={`/dashboard/makeAdmin`} element={<AdminRoute>
                <MakeAdmin />
              </AdminRoute>} />
              <Route path={`/dashboard/addDoctor`} element={<AdminRoute>
                <AddDoctor />
              </AdminRoute>} />
            </Route>

            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route exact path="/" element={<Home />} />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
