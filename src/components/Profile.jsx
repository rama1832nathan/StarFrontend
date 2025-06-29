import React from 'react';
import ProfileDashboard from './Profile/ProfileDashboard';
import { useEffect } from 'react';

const Profile = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.jotfor.ms/agent/embedjs/0197bb9158a47fae89683c1977989eedc7cd/embed.js?skipWelcome=1&maximizable=1';
    script.async = true;
    document.body.appendChild(script);

    // Optional: clean up on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return <ProfileDashboard />;
};

export default Profile; 