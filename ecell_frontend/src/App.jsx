import React, { useState } from 'react'
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

          {/* Team Route */}
          <Route
            path="/team"
            element={
              <TeamPage />
            }
          />

        </Routes>
      </div>
    </Router>
  )
}

export default App
