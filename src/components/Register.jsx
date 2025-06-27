import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const initialRegister = {
  username: '',
  dob: '',
  email: '',
  phonenumber: '',
  password: '',
  address: '',
  city: '',
  state: '',
  postalcode: '',
};

const validateRegister = (values) => {
  const errors = {};
  if (!values.username) errors.username = 'Username is required';
  if (!values.dob) errors.dob = 'Date of birth is required';
  else {
    const dob = new Date(values.dob);
    const ageDifMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDifMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    if (age < 18) errors.dob = 'You must be at least 18 years old to register';
  }
  if (!values.email) errors.email = 'Email is required';
  else if (!/^\S+@gmail\.com$/.test(values.email)) errors.email = 'Email must be a valid Gmail address';
  if (!values.phonenumber) errors.phonenumber = 'Phone number is required';
  else if (!/^\d{10}$/.test(values.phonenumber)) errors.phonenumber = 'Phone must be 10 digits';
  if (!values.password) errors.password = 'Password is required';
  else if (values.password.length < 6) errors.password = 'Password must be at least 6 characters';
  if (!values.address) errors.address = 'Address is required';
  if (!values.city) errors.city = 'City is required';
  if (!values.state) errors.state = 'State is required';
  if (!values.postalcode) errors.postalcode = 'Postal code is required';
  else if (!/^\d{6}$/.test(values.postalcode)) errors.postalcode = 'Postal code must be 6 digits';
  return errors;
};

const Register = () => {
  const [register, setRegister] = useState(initialRegister);
  const [regErrors, setRegErrors] = useState({});
  const [regSubmitted, setRegSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agree, setAgree] = useState(false);
  const navigate = useNavigate();

  const handleRegisterChange = (e) => {
    setRegister({ ...register, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!agree) {
      toast.error('You must agree to all terms and conditions to register.');
      return;
    }
    const errors = validateRegister(register);
    setRegErrors(errors);
    setRegSubmitted(true);
    if (Object.keys(errors).length === 0) {
      setLoading(true);
      try {
        // console.log(register)
        await axios.post('http://localhost:8080/api/auth/register', register);
        toast.success('Registration successful!');
        navigate('/login');
      } catch (error) {
        toast.error('Registration failed: ' + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-50 to-yellow-50 p-4">
        <div className="w-full max-w-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 flex items-center justify-center shadow-lg mb-2">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><text x="12" y="17" textAnchor="middle" fontSize="14" fill="#f59e42" fontWeight="bold">SF</text></svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Star Finance</h1>
          </div>
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-900">Register</h2>
            <form className="space-y-4" onSubmit={handleRegisterSubmit} noValidate>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                  <input type="text" name="username" value={register.username} onChange={handleRegisterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
                  {regSubmitted && regErrors.username && <p className="text-red-600 text-xs mt-1">{regErrors.username}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                  <input type="date" name="dob" value={register.dob} onChange={handleRegisterChange} className={`w-full p-3 border ${regSubmitted && regErrors.dob ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition`} />
                  {regSubmitted && regErrors.dob && <p className="text-red-600 text-xs mt-1">{regErrors.dob}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" name="email" value={register.email} onChange={handleRegisterChange} className={`w-full p-3 border ${regSubmitted && regErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition`} />
                  {regSubmitted && regErrors.email && <p className="text-red-600 text-xs mt-1">{regErrors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                  <input type="tel" name="phonenumber" value={register.phonenumber} onChange={handleRegisterChange} maxLength={10} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
                  {regSubmitted && regErrors.phonenumber && <p className="text-red-600 text-xs mt-1">{regErrors.phonenumber}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <input type="password" name="password" value={register.password} onChange={handleRegisterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
                  {regSubmitted && regErrors.password && <p className="text-red-600 text-xs mt-1">{regErrors.password}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                  <input type="text" name="city" value={register.city} onChange={handleRegisterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
                  {regSubmitted && regErrors.city && <p className="text-red-600 text-xs mt-1">{regErrors.city}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                  <input type="text" name="address" value={register.address} onChange={handleRegisterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
                  {regSubmitted && regErrors.address && <p className="text-red-600 text-xs mt-1">{regErrors.address}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                  <input type="text" name="state" value={register.state} onChange={handleRegisterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
                  {regSubmitted && regErrors.state && <p className="text-red-600 text-xs mt-1">{regErrors.state}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                  <input type="text" name="postalcode" value={register.postalcode} onChange={handleRegisterChange} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 outline-none transition" />
                  {regSubmitted && regErrors.postalcode && <p className="text-red-600 text-xs mt-1">{regErrors.postalcode}</p>}
                </div>
              </div>
              <div className="flex items-center mb-4">
                <input
                  id="agree"
                  type="checkbox"
                  checked={agree}
                  onChange={e => setAgree(e.target.checked)}
                  className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                />
                <label htmlFor="agree" className="ml-2 block text-sm text-gray-700">
                  I agree to all <a href="#" className="text-blue-600 underline">terms and conditions</a>
                </label>
              </div>
              <button type="submit" disabled={loading || !agree} className="w-full bg-gradient-to-r hover:cursor-pointer from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-300 shadow">{loading ? 'Registering...' : 'Register'}</button>
            </form>
            <div className="text-center mt-6 border-t pt-4">
              <span className="text-gray-600">Already have an account? </span>
              <Link to="/login" className="text-blue-600 hover:underline font-semibold">Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;