import React from 'react'
// import Header from './Header'
import Hero from '../components/Landing/Hero'
import Header from '../components/Landing/Header'
import Footer from '../components/Landing/Footer'

import Services from '../components/Landing/Services'

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Header />
      <main>
        <Hero />
        <Services />
      </main>
      <Footer />
      {/* <StarAdvisorChatbot /> */}
    </div>
  )
}

export default Index