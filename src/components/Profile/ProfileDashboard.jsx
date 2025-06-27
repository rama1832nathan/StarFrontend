import React, { useState, useEffect } from 'react';
import ProfileNavbar from './ProfileNavbar';
import LoanSection from './LoanSection';
import CardsSection from './CardsSection';
import PaymentSection from './PaymentSection';
import NewsCarousel from './NewsCarousel';

const ProfileDashboard = () => {
  const [activeSection, setActiveSection] = useState('loan');
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    phone: '',
    address: '',
    aadharnumber: ''
  });

  const renderSection = () => {
    switch (activeSection) {
      case 'loan':
        return <LoanSection />;
      case 'cards':
        return <CardsSection />;
      case 'payment':
        return <PaymentSection />;
      default:
        return <LoanSection />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <ProfileNavbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        userData={userData}
        setUserData={setUserData}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {userData.username || 'User'}!
          </h1>
          <p className="text-gray-600">
            Manage your loans, cards, and payments all in one place
          </p>
        </div> */}

        {/* Active Section Content */}
        <div className="mb-8">
          {renderSection()}
        </div>

        {/* News Carousel */}
        <NewsCarousel />
      </div>
    </div>
  );
};

export default ProfileDashboard; 