import React, { useState, useEffect } from 'react';
import { User, ArrowLeft, Calendar, Phone, MapPin, Building, Hash, Map, CreditCard, Shield, Key } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const fieldList = [
  { label: 'Full Name', valueKey: 'name', icon: <User className="w-5 h-5 text-blue-500" /> },
  { label: 'Date of Birth', valueKey: 'dob', icon: <Calendar className="w-5 h-5 text-blue-500" /> },
  { label: 'Phone Number', valueKey: 'phone', icon: <Phone className="w-5 h-5 text-blue-500" /> },
  { label: 'Address', valueKey: 'address', icon: <MapPin className="w-5 h-5 text-blue-500" /> },
  { label: 'City', valueKey: 'city', icon: <Building className="w-5 h-5 text-blue-500" /> },
  { label: 'Postal Code', valueKey: 'postalcode', icon: <Hash className="w-5 h-5 text-blue-500" /> },
  { label: 'State', valueKey: 'state', icon: <Map className="w-5 h-5 text-blue-500" /> },
  { label: 'Account Number', valueKey: 'accountNumber', icon: <CreditCard className="w-5 h-5 text-blue-500" /> },
  { label: 'KN Number', valueKey: 'knNumber', icon: <Key className="w-5 h-5 text-blue-500" /> },
  { label: 'IFSC Code', valueKey: 'ifscCode', icon: <Shield className="w-5 h-5 text-blue-500" /> },
];

const UserProfile = () => {
  const [userData, setUserData] = useState({
    name: '',
    dob: '',
    phone: '',
    address: '',
    city: '',
    postalcode: '',
    state: '',
    accountNumber: '',
    ifscCode: '',
    knNumber: ''
  });
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = Cookies.get("token");
  const decoded = jwtDecode(token);
  const username = decoded.username || decoded.sub;

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/user/details/${username}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const bankRes = await axios.get(`http://localhost:8080/api/bank/details/${username}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.data) {
          setUserData({
            name: response.data.name || response.data.username || username,
            dob: response.data.dob || 'N/A',
            phone: response.data.phonenumber || response.data.phone || 'N/A',
            address: response.data.address || 'N/A',
            city: response.data.city || 'N/A',
            postalcode: response.data.postalcode || response.data.postal_code || 'N/A',
            state: response.data.state || 'N/A',
            accountNumber: bankRes.data?.accountNumber || 'N/A',
            ifscCode: bankRes.data?.ifscCode || 'N/A',
            knNumber: bankRes.data?.knNumber || 'N/A'
          });
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [username, token]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <button
          className="mb-6 flex items-center text-white hover:underline font-semibold"
          onClick={() => navigate('/profile')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Profile
        </button>
        <div className="text-center text-white mt-10">Loading user details...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <button
        className="mb-6 flex items-center text-white hover:underline font-semibold"
        onClick={() => navigate('/profile')}
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Profile
      </button>
      <div className="bg-white rounded-lg shadow-md p-8">
        <div className="flex items-center space-x-4 mb-6">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">User Profile</h2>
            <p className="text-gray-600">View your personal information</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {fieldList.map(({ label, valueKey, icon }) => (
            <div
              key={valueKey}
              className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm transition-all duration-200 hover:shadow-lg hover:border-blue-400 group cursor-pointer"
            >
              <div className="flex-shrink-0">
                {icon}
              </div>
              <div>
                <div className="text-xs text-gray-500 group-hover:text-blue-600 font-medium">{label}</div>
                <div className="text-base font-semibold text-gray-900 group-hover:text-blue-800">
                  {valueKey === 'accountNumber' && userData.accountNumber && userData.accountNumber.length > 4
                    ? `**** **** **** ${userData.accountNumber.slice(-4)}`
                    : userData[valueKey]}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 