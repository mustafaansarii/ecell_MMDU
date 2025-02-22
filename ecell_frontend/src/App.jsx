import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
import EventRegister from './pages/eventregister'
function App() {

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

          {/* Event Register Route */}
          <Route
            path="/eventregister"
            element={
              <EventRegister />
            }
          />

          {/* Team Route */}
          <Route
            path="/team"
            element={
              <TeamPage />
            }
          />
          {/* Gallery Route */}
          <Route
            path="/gallery"
            element={
              <GalleryPage />
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={
              <Login />
            }
          />
          {/* Register Route */}
          <Route
            path="/register"
            element={
              <Register />
            }
          />
          {/* Forgot Password Route */}
          <Route
            path="/forgot-password"
            element={
              <ForgotPassword />
            }
          />

          <Route path="/api/auth/google/callback" element={<GoogleCallback />} />

        </Routes>
      </div>
    </Router>
  )
}

export default App
