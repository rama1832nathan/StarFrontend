  import React, { useState, useEffect } from 'react';
  import { ChevronDown, User, Shield, Coins, CreditCard, Wallet } from 'lucide-react';
  import axios from 'axios';
  import Cookies from 'js-cookie';
  import { jwtDecode } from 'jwt-decode';
  import { useNavigate } from 'react-router-dom';

  const ProfileNavbar = ({ activeSection, setActiveSection, userData, setUserData }) => {
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [loading, setLoading] = useState(true);
    const [kycVerified, setKycVerified] = useState(null); 

    const navigate = useNavigate();

    const navigationItems = [
      { id: 'loan', label: 'Loan', icon: Coins },
      { id: 'cards', label: 'Cards', icon: CreditCard },
      { id: 'payment', label: 'Payment', icon: Wallet }
    ];

    useEffect(() => {
      const fetchUserDetails = async () => {
        try {
          const token = Cookies.get('token');
          if (!token) return;
    
          const decoded = jwtDecode(token);
          const username = decoded.username || decoded.sub;
    
          // Set user data
          const response = await axios.get(`http://localhost:8080/api/user/details/${username}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    
          if (response.data) {
            setUserData({
              username: response.data.username || username,
              email: response.data.email || '',
              phone: response.data.phonenumber || '',
              address: response.data.address || '',
              aadharnumber: response.data.aadharnumber || ''
            });
          }
    
          // 👇 KYC status check
          const kycResponse = await axios.get(`http://localhost:8080/api/protected/kyc/status/${username}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
    
          setKycVerified(kycResponse.data === "KYC done");
        } catch (error) {
          console.error('Error:', error);
        } finally {
          setLoading(false);
        }
      };
    
      fetchUserDetails();
    }, [setUserData]);
    

    const handleLogout = () => {
      Cookies.remove('token');
      navigate('/login');
    };

    return (
      <nav className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo */}
            <div className="flex items-center space-x-3">
              <img src="/images/VERSION%2002.png" alt="Star Finance Logo" className="w-40 h-24 object-contain" />
            </div>

            {/* Navigation Items */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-800 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side - KYC and User */}
            <div className="flex items-center space-x-4">
              {/* KYC Indicator */}
              <div className="relative">
  <button
    className={`flex items-center space-x-2 px-3 py-2 rounded-lg border hover:cursor-pointer transition-all duration-200 ${
      kycVerified === null
        ? 'bg-gray-50 text-gray-500 border-gray-200'
        : kycVerified
        ? 'bg-green-50 text-green-600 border-green-200 hover:bg-green-100'
        : 'bg-red-50 text-red-600 border-red-200 hover:bg-red-100'
    }`}
    onClick={() => navigate('/profile/kyc')}
  >
    <div
      className={`w-2 h-2 rounded-full ${
        kycVerified === null
          ? 'bg-gray-400'
          : kycVerified
          ? 'bg-green-500'
          : 'bg-red-500 animate-pulse'
      }`}
    ></div>
    <Shield className="w-4 h-4" />
    <span className="font-medium text-sm">
      {kycVerified === null
        ? 'Checking KYC...'
        : kycVerified
        ? 'KYC Verified'
        : 'KYC Pending'}
    </span>
  </button>
</div>


              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>

                {/* User Dropdown Menu */}
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
                    <div className="p-4">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {loading ? 'Loading...' : (userData?.username || 'User')}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {loading ? 'Loading...' : (userData?.email || 'user@email.com')}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Phone:</span>
                          <span className="text-sm font-medium">
                            {loading ? 'Loading...' : (userData?.phone || 'N/A')}
                          </span>
                        </div>
                        {/* <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Email:</span>
                          <span className="text-sm font-medium">
                            {loading ? 'Loading...' : (userData?.email || 'N/A')}
                          </span>
                        </div> */}
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Address:</span>
                          <span className="text-sm font-medium max-w-32 truncate">
                            {loading ? 'Loading...' : (userData?.address || 'N/A')}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors mb-2"
                          onClick={() => navigate('/userprofile')}
                        >
                          View Profile
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex space-x-4 overflow-x-auto">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-lg whitespace-nowrap transition-all duration-200 ${
                      activeSection === item.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </nav>
    );
  };

  export default ProfileNavbar; 