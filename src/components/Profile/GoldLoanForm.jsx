import React, { useState, useEffect } from 'react';
import { ArrowLeft, Upload, Crown, Save, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';

const GoldLoanForm = () => {
  const navigate = useNavigate();
  const [hasExistingApplication, setHasExistingApplication] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 
  const [formData, setFormData] = useState({
    // Customer Details
    knNumber: '',
    // Asset Details
    goldType: '',
    weight: '',
    placeBoughtFrom: '',
    jewelersName: '',
    jewelersAddress: '',
    goldPhoto: null,
    // Declaration
    declaration: false,
    // Bank Details
    accountHolderName: '',
    accountType: '',
    accountNumber: '',
    ifscCode: '',
    bankName: '',
    branchName: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    checkExistingApplication();
  }, []);

  const checkExistingApplication = async () => {
    try {
      const token = Cookies.get('token');
      // const username = JSON.parse(atob(token.split('.')[1])).username || JSON.parse(atob(token.split('.')[1])).sub;
      const decoded = jwtDecode(token);
      const username = decoded.username || decoded.sub ;
      const res = await axios.get(`http://localhost:8080/api/protected/gold-loan/status/${username}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(res)
      if (res.status ===202) {
      
        setHasExistingApplication(true);
        toast.warning(res.data); // "You have already submitted a gold loan application..."
      }
    } catch (err) {
      console.error('Error checking loan status:', err);
      // Only show error if it's not a 409 status (which means no existing application)
      if (err.response?.status !== 409) {
        toast.error('Error verifying existing application. Try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.declaration) {
      toast.error('Please accept the declaration to proceed');
      return;
    }
    setIsSubmitting(true);
    try {
      const token = Cookies.get('token');
      const username = JSON.parse(atob(token.split('.')[1])).username || JSON.parse(atob(token.split('.')[1])).sub;
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });
      formDataToSend.append('username', username);
      await axios.post('http://localhost:8080/api/protected/goldloan/apply', formDataToSend, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      toast.success('Gold loan application submitted successfully!');
      navigate('/profile');
    } catch (error) {
      console.error('Error submitting loan application:', error);
      // Display the actual error message from the backend
      const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to submit loan application. Please try again.';
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a2342] via-[#274690] to-[#a3cef1] py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-t-2xl p-6 shadow-lg">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => navigate('/profile')}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Gold Loan Application</h1>
                <p className="text-gray-600">Complete the form below to apply for your gold loan</p>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="bg-white rounded-b-2xl shadow-lg p-6">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Checking application status...</span>
            </div>
          </div>
        ) : hasExistingApplication ? (
          <div className="bg-white rounded-b-2xl shadow-lg p-6">
            <div className="flex items-center justify-center py-12">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-yellow-100 rounded-full">
                    <AlertCircle className="w-8 h-8 text-yellow-600" />
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Application Already Submitted</h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  You have already submitted a gold loan application. Please wait for the review process to complete.
                </p>
                <button
                  onClick={() => navigate('/profile')}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Back to Profile
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-b-2xl shadow-lg p-6 space-y-8">
            {/* Customer Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Customer Details</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  KN Number *
                </label>
                <input
                  type="text"
                  name="knNumber"
                  value={formData.knNumber}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your KN Number"
                />
              </div>
            </div>
            {/* Asset Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Asset Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gold Type *
                  </label>
                  <select
                    name="goldType"
                    value={formData.goldType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Gold Type</option>
                    <option value="8">8 Carat</option>
                    <option value="16">16 Carat</option>
                    <option value="24">24 Carat</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Weight (in grams) *
                  </label>
                  <input
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter weight in grams"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Place Bought From *
                </label>
                <input
                  type="text"
                  name="placeBoughtFrom"
                  value={formData.placeBoughtFrom}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter place where gold was purchased"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jeweler's Name *
                </label>
                <input
                  type="text"
                  name="jewelersName"
                  value={formData.jewelersName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter jeweler's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Jeweler's Address *
                </label>
                <textarea
                  name="jewelersAddress"
                  value={formData.jewelersAddress}
                  onChange={handleInputChange}
                  required
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter complete jeweler's address"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Photo of Gold Ornament *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                  <input
                    type="file"
                    name="goldPhoto"
                    onChange={handleInputChange}
                    required
                    accept="image/*"
                    className="hidden"
                    id="goldPhoto"
                  />
                  <label htmlFor="goldPhoto" className="cursor-pointer">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      {formData.goldPhoto ? formData.goldPhoto.name : 'Click to upload photo of gold ornament'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG, or GIF up to 5MB</p>
                  </label>
                </div>
              </div>
            </div>
            {/* Declaration */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Declaration</h2>
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  name="declaration"
                  checked={formData.declaration}
                  onChange={handleInputChange}
                  required
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <div className="text-sm text-gray-700 space-y-2 text-left">
                  <p className="font-medium">I hereby declare that:</p>
                  <div className="space-y-1">
                    <p>1. The information provided above is true and correct to the best of my knowledge</p>
                    <p>2. I am the rightful owner of the gold ornaments mentioned above</p>
                    <p>3. I understand the terms and conditions of the gold loan</p>
                    <p>4. I agree to the storage and security arrangements for my gold ornaments</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Bank Details */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">Bank Details</h2>
              {/* Account Holder Name full width */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Holder Name *
                </label>
                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter account holder name"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Type *
                  </label>
                  <select
                    name="accountType"
                    value={formData.accountType}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Account Type</option>
                    <option value="savings">Savings Account</option>
                    <option value="current">Current Account</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter account number"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IFSC Code *
                  </label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                    placeholder="Enter IFSC code"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Name *
                  </label>
                  <input
                    type="text"
                    name="bankName"
                    value={formData.bankName}
                    onChange={handleInputChange}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter bank name"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Branch Name *
                </label>
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter branch name"
                />
              </div>
            </div>
            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <button
                type="button"
                onClick={() => navigate('/profile')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-5 h-5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit Application'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default GoldLoanForm; 