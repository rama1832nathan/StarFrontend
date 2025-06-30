import React from 'react';
import ProfileDashboard from './Profile/ProfileDashboard';
import { useEffect } from 'react';

const Profile = () => {
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
  return <ProfileDashboard />;
};

export default Profile; 