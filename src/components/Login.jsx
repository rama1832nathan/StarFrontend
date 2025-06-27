import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import Cookies from 'js-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BackArrow = ({ onClick }) => (
  <button
    className="absolute top-6 left-6 flex items-center gap-2 text-blue-700 hover:text-blue-900 font-semibold text-lg bg-white/80 hover:bg-blue-50 rounded-full px-4 py-2 shadow transition-colors cursor-pointer z-20"
    onClick={onClick}
    type="button"
    aria-label="Back to Home"
  >
    <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    Back
  </button>
);

const Login = () => {
  const [login, setLogin] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:8080/api/auth/login', login);
      const email = res.data.email;
      const token = res.data.token;
      if (!email) throw new Error('No email found for user');
      if (!token) throw new Error('No token found for user');
      Cookies.set('token', token, { expires: 1 });
      setUserEmail(email);
      const randomOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(randomOtp);
      setOtpLoading(true);
      await emailjs.send(
        'service_xf589d8',
        'template_oo3s354',
        {
          email: email,
          passcode: randomOtp,
          time: 15,
        },
        'BRVS-yF1PaNr1-FOE'
      );
      console.log(randomOtp);
      setShowOtp(true);
      toast.success('OTP sent to your email!');
    } catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
      setOtpLoading(false);
    }
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      toast.success('OTP verified!');
      navigate('/profile');
    } else {
      toast.error('Invalid OTP. Please try again.');
    }
  };

  if (showOtp) {
    return (
      <>
        <ToastContainer position="top-center" autoClose={3000} />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-4 relative rounded">
          <BackArrow onClick={() => navigate('/')} />
          <div className="w-full max-w-md">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg mb-2">
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><text x="12" y="17" textAnchor="middle" fontSize="14" fill="#f59e42" fontWeight="bold">SF</text></svg>
              </div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Star Finance</h1>
            </div>
            <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
              <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Enter OTP</h2>
              <form className="space-y-6" onSubmit={handleOtpSubmit}>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">OTP sent to {userEmail}</label>
                  <input
                    type="text"
                    name="otp"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition text-center tracking-widest text-lg cursor-pointer"
                    required
                    maxLength={6}
                    minLength={6}
                    autoFocus
                  />
                </div>
                <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow cursor-pointer">
                  Verify OTP
                </button>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-4 relative">
        <BackArrow onClick={() => navigate('/')} />
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg mb-2 cursor-pointer" onClick={() => navigate('/') }>
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><text x="12" y="17" textAnchor="middle" fontSize="14" fill="#f59e42" fontWeight="bold">SF</text></svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight cursor-pointer" onClick={() => navigate('/') }>
              Star Finance
            </h1>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Customer Login</h2>
            <form className="space-y-6" onSubmit={handleLoginSubmit}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                <input
                  type="text"
                  name="username"
                  value={login.username}
                  onChange={handleLoginChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition cursor-pointer"
                  required
                  autoComplete="username"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={handleLoginChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition cursor-pointer"
                  required
                  autoComplete="current-password"
                />
              </div>
              <button type="submit" disabled={loading || otpLoading} className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow cursor-pointer">
                {loading || otpLoading ? 'Processing...' : 'Login'}
              </button>
            </form>
            <div className="text-center mt-6 border-t pt-4">
              <span className="text-gray-600">Don't have an account? </span>
              <Link to="/register" className="text-blue-600 hover:underline font-semibold cursor-pointer">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;