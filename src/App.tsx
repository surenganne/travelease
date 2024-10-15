import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import AdminDashboard from './components/admin/AdminDashboard';
import AdminLogin from './components/admin/AdminLogin';
import AdminOverview from './components/admin/AdminOverview';
import AnalyticsAndReporting from './components/admin/AnalyticsAndReporting';
import ManagePackages from './components/admin/ManagePackages';
import VendorManagement from './components/admin/VendorManagement';
import BookingManagement from './components/admin/BookingManagement';
import UserManagement from './components/admin/UserManagement';
import LandingPage from './components/consumer/LandingPage';
import AuthPage from './components/auth/AuthPage';
import SearchPage from './components/consumer/SearchPage';
import PackageListingPage from './components/consumer/PackageListingPage';
import PackageDetails from './components/consumer/PackageDetails';
import UserProfile from './components/consumer/UserProfile';
import AITravelAssistant from './components/consumer/AITravelAssistant';
import BookingConfirmation from './components/consumer/BookingConfirmation';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';

const ProtectedAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  if (!user || !user.isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

function AppContent() {
  return (
    <Router>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedAdminRoute>
              <AdminDashboard />
            </ProtectedAdminRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="analytics" element={<AnalyticsAndReporting />} />
          <Route path="packages" element={<ManagePackages />} />
          <Route path="vendors" element={<VendorManagement />} />
          <Route path="bookings" element={<BookingManagement />} />
          <Route path="users" element={<UserManagement />} />
        </Route>
        <Route
          path="*"
          element={
            <>
              <Header />
              <main className="flex-grow">
                <Routes>
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/packages" element={<PackageListingPage />} />
                  <Route path="/package/:id" element={<PackageDetails />} />
                  <Route path="/profile" element={<UserProfile />} />
                  <Route path="/booking-confirmation" element={<BookingConfirmation />} />
                  <Route path="/" element={<LandingPage />} />
                </Routes>
              </main>
              <Footer />
              <AITravelAssistant />
            </>
          }
        />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;