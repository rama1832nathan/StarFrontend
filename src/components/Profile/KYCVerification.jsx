import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from 'jwt-decode';

const KYCVerification = () => {
  const [formData, setFormData] = useState({
    aadharNumber: '',
    panNumber: '',
    phoneNumber: ''
  });
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  const navigate = useNavigate();
  const token = Cookies.get("token");
  const decoded = jwtDecode(token);
  const username = decoded.username || decoded.sub;

  // 🔍 Check if KYC already done
  useEffect(() => {
    const checkKycStatus = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/protected/kyc/status/${username}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.data === 'KYC done') {
          setVerificationComplete(true);
        }
      } catch (error) {
        console.error("Error checking KYC status:", error);
      } finally {
        setCheckingStatus(false);
      }
    };
    checkKycStatus();
  }, [username, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.phoneNumber.length !== 10) {
      toast.error('Phone number must be exactly 10 digits.');
      return;
    }
    if (formData.aadharNumber.length !== 12) {
      toast.error('Aadhar number must be exactly 12 digits.');
      return;
    }
    if (formData.panNumber.length !== 10) {
      toast.error('PAN number must be exactly 10 characters.');
      return;
    }

    setIsVerifying(true);

    const payload = {
      name: username,
      aadhaar: formData.aadharNumber,
      pan: formData.panNumber,
      phoneNumber: formData.phoneNumber
    };

    const verificationPromise = new Promise((resolve) => {
      setTimeout(async () => {
        try {
          const response = await axios.post('http://localhost:8080/api/protected/kyc/submit', payload, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          resolve(response);
        } catch (error) {
          resolve({ error });
        }
      }, 3000); // Simulate 3-second delay
    });

    try {
      const result = await verificationPromise;
      const message = result.data;
      if (message.includes("Invalid") || message.includes("PAN") || message.includes("AADHAR")) {
        toast.error(message);
      } else {
        setVerificationComplete(true);
        toast.success('KYC verification completed successfully!');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        toast.error(error.response.data);
      } else {
        toast.error('An unexpected error occurred during verification.');
      }
    } finally {
      setIsVerifying(false);
    }
  };

  if (checkingStatus) {
    return <div className="text-center text-white mt-10">Checking KYC status...</div>;
  }

  if (verificationComplete) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <button
          className="mb-6 flex items-center text-white hover:underline font-semibold"
          onClick={() => navigate('/profile')}
        >
          &#8592; Back to Profile
        </button>
        <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">KYC Verification Complete!</h2>
          <p className="text-green-700 mb-4">Your KYC has been successfully verified.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <ToastContainer position="top-center" autoClose={3000} />
      <button
        className="mb-6 flex items-center text-white hover:underline font-semibold"
        onClick={() => navigate('/profile')}
      >
        &#8592; Back to Profile
      </button>
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">KYC Verification</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
              <input
                type="tel"
                required
                value={formData.phoneNumber}
                onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
                maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                placeholder="Enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number</label>
              <input
                type="text"
                required
                value={formData.aadharNumber}
                onChange={e => setFormData({ ...formData, aadharNumber: e.target.value })}
                maxLength={12}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                placeholder="Enter your Aadhar number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">PAN Number</label>
              <input
                type="text"
                required
                value={formData.panNumber}
                onChange={e => setFormData({ ...formData, panNumber: e.target.value })}
                maxLength={10}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-colors"
                placeholder="Enter your PAN number"
              />
            </div>
          </div>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-blue-800">Important Note</h3>
                <p className="text-sm text-blue-700 mt-1">
                  Please double-check your Aadhar, PAN, and Phone Number before submitting. These details will be used for your KYC verification and cannot be changed later. Make sure they match your official documents.
                </p>
              </div>
            </div>
          </div>
          <button
            type="submit"
            disabled={isVerifying}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white py-3 px-6 rounded-lg font-semibold hover:from-yellow-500 hover:to-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isVerifying ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                <span>Verifying KYC details...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Verify KYC</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default KYCVerification;
