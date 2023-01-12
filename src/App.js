import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Countdown from './pages/Countdown';
import Enroll from './pages/Enroll';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import FillSubscription from './pages/Dashboard/FillSubscription';
import Ticket from './pages/Dashboard/Ticket';
import { Payment, PaymentInfo } from './pages/Dashboard/Payment';
import Hotel from './pages/Dashboard/Hotel';
import { Activities, ActivitiesUnauthorized } from './pages/Dashboard/Activities';
import Certificate from './pages/Dashboard/Certificate';

import { EventInfoProvider } from './contexts/EventInfoContext';
import UserContext from './contexts/UserContext';

import useToken from './hooks/useToken';
import { useState } from 'react';

export default function App() {
  const loggedUser = JSON.parse(localStorage.getItem('driventUser'));
  const [user, setUser] = useState(loggedUser);
  console.log('user: ', user);

  return (
    <>
      <ToastContainer />
      <EventInfoProvider>
        <UserContext.Provider value={{ user, setUser }}>
          <Router>
            <Routes>
              <Route path="/" element={<Countdown />} />
              <Route path="/enroll" element={user ? <Navigate replace to={'/dashboard'}/> :<Enroll />} />
              <Route path="/sign-in" element={<SignIn />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRouteGuard>
                    <Dashboard />
                  </ProtectedRouteGuard>
                }
              >
                <Route path="subscription" element={<FillSubscription />} />
                <Route path="ticket" element={<Ticket />} />
                <Route path="payment" element={<Payment />} />
                <Route path="payment-info" element={<PaymentInfo />} />
                <Route path="hotel" element={<Hotel />} />
                <Route path="activities" element={<Activities />} />
                <Route path="activities-unauthorized" element={<ActivitiesUnauthorized />} />
                <Route path="certificate" element={<Certificate />} />
                <Route index path="*" element={<Navigate to="/dashboard/subscription" />} />
              </Route>
            </Routes>
          </Router>
        </UserContext.Provider>
      </EventInfoProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/sign-in" />;
  }

  return <>{children}</>;
}
