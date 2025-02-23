import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css'
import NavBar from './component/NavBar'
import Hero from './component/Hero'
import About from './component/About'
import Initiatives from './component/Initiatives'
import Events from './component/Events'
import Gallery from './component/Gallery'
import Collabrators from './component/Collabrators'
import Contact from './component/contact'
import Footer from './component/Footer'
import TeamPage from './pages/team'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import GalleryPage from './pages/gallery'
import GoogleCallback from './pages/GoogleCallback'
import EventRegister from './pages/event_register'
import 'react-toastify/dist/ReactToastify.css';
import EventPopup from './component/popup_event'
import LoginPopup from './component/login_popup'
import JoinEcell from './pages/joinecell'
import ProtectedRoute from './components/ProtectedRoute'

function App() {
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  return (
    <Router>
      <div>
        <Routes>
          {/* Default Routes */}
          <Route
            path="/"
            element={
              <>
                <NavBar />
                <LoginPopup onShowChange={setShowLoginPopup} />
                <EventPopup isBlurred={showLoginPopup} />
                <Hero />
                
                <div id="about">
                  <About />
                </div>
                <div id="initiatives">
                  <Initiatives />
                </div>
                <div id="events">
                  <Events />
                </div>
                <div id="Collabrators">
                  <Collabrators />
                </div>
                <div id="gallery">
                  <Gallery />
                </div>
                <div id="contact">
                  <Contact />
                </div>
                <Footer />
              </>
            }
          />

          {/* Protected Routes */}
          <Route
            path="/eventregister"
            element={
              <ProtectedRoute>
                <EventRegister />
              </ProtectedRoute>
            }
          />

          <Route
            path="/joinecell"
            element={
              <ProtectedRoute>
                <JoinEcell />
              </ProtectedRoute>
            }
          />

          {/* Public Routes */}
          <Route path="/team" element={<TeamPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/event-registration" element={<EventRegister />} />
          <Route path="/api/auth/google/callback" element={<GoogleCallback />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
