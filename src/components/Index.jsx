import React from 'react'
// import Header from './Header'
import Hero from '../components/Landing/Hero'
import Header from '../components/Landing/Header'
import Footer from '../components/Landing/Footer'
import { useEffect } from 'react'

import Services from '../components/Landing/Services'

const Index = () => {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/0197bbaf4d12738982d550d3e12328fbdba2/embed.js?skipWelcome=1&maximizable=1%27';
    script.async = true;
    document.body.appendChild(script);

    // Optional: clean up on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

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