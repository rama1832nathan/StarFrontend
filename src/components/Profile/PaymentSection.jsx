import React, { useState } from 'react';
import { Smartphone, Monitor, Building2, Users, Plus, Search, ArrowRight, CheckCircle, Clock, Shield } from 'lucide-react';

const PaymentSection = () => {
  const [selectedPayment, setSelectedPayment] = useState('upi');
  const [showAddBeneficiary, setShowAddBeneficiary] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const paymentMethods = {
    upi: {
      title: 'UPI Payments',
      icon: Smartphone,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      description: 'Quick and secure UPI transfers',
      features: [
        'Instant money transfers',
        '24/7 availability',
        'No additional charges',
        'UPI ID support',
        'QR code payments',
        'Split bill feature'
      ],
      recentTransactions: [
        { id: 'UPI001', to: 'john@okicici', amount: '₹2,500', status: 'success', time: '2 min ago' },
        { id: 'UPI002', to: 'sarah@paytm', amount: '₹1,200', status: 'pending', time: '5 min ago' },
        { id: 'UPI003', to: 'mike@phonepe', amount: '₹3,800', status: 'success', time: '10 min ago' }
      ]
    },
    netbanking: {
      title: 'Net Banking',
      icon: Monitor,
      color: 'from-blue-500 to-indigo-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Comprehensive online banking services',
      features: [
        'Fund transfers',
        'Bill payments',
        'Investment options',
        'Account statements',
        'Fixed deposits',
        'Tax payments'
      ],
      recentTransactions: [
        { id: 'NB001', to: 'HDFC Bank', amount: '₹5,000', status: 'success', time: '1 hour ago' },
        { id: 'NB002', to: 'Electricity Bill', amount: '₹800', status: 'success', time: '2 hours ago' },
        { id: 'NB003', to: 'ICICI Bank', amount: '₹10,000', status: 'pending', time: '3 hours ago' }
      ]
    },
    neft: {
      title: 'NEFT Transfers',
      icon: Building2,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'National Electronic Funds Transfer',
      features: [
        'Scheduled transfers',
        'Bulk transfers',
        'Cross-bank transfers',
        'Low transaction fees',
        'Settlement in batches',
        'Wide bank coverage'
      ],
      recentTransactions: [
        { id: 'NEFT001', to: 'SBI Bank', amount: '₹15,000', status: 'success', time: '1 day ago' },
        { id: 'NEFT002', to: 'Axis Bank', amount: '₹8,500', status: 'success', time: '2 days ago' },
        { id: 'NEFT003', to: 'PNB Bank', amount: '₹12,000', status: 'processing', time: '3 days ago' }
      ]
    },
    beneficiary: {
      title: 'Beneficiary Management',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      description: 'Manage your saved beneficiaries',
      features: [
        'Add new beneficiaries',
        'Edit beneficiary details',
        'Quick transfer to saved contacts',
        'Beneficiary verification',
        'Transfer limits',
        'Transaction history'
      ],
      beneficiaries: [
        { id: 'B001', name: 'John Doe', account: '1234567890', bank: 'HDFC Bank', type: 'Savings' },
        { id: 'B002', name: 'Sarah Smith', account: '0987654321', bank: 'ICICI Bank', type: 'Current' },
        { id: 'B003', name: 'Mike Johnson', account: '1122334455', bank: 'SBI Bank', type: 'Savings' }
      ]
    }
  };

  const currentPayment = paymentMethods[selectedPayment];

  return (
    <div className="space-y-8 bg-gradient-to-br from-[#0a2342] via-[#274690] to-[#a3cef1] rounded-2xl p-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Payment Services</h2>
        <p className="text-lg text-white">Multiple payment options for your convenience</p>
      </div>

      {/* Payment Method Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(paymentMethods).map(([key, method]) => {
          const Icon = method.icon;
          const isSelected = selectedPayment === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedPayment(key)}
              className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                isSelected
                  ? `${method.borderColor} ${method.bgColor} shadow-lg`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${method.color} text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h3 className={`font-semibold ${isSelected ? 'text-black' : 'text-white'}`}>{method.title}</h3>
                  <p className={`text-xs ${isSelected ? 'text-black/70' : 'text-white/80'}`}>{method.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Payment Method Details */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Features */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${currentPayment.color} text-white`}>
                <currentPayment.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{currentPayment.title}</h3>
            </div>

            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Features:</h4>
              {currentPayment.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                New {currentPayment.title === 'Beneficiary Management' ? 'Beneficiary' : 'Transaction'}
              </button>
              {selectedPayment === 'beneficiary' && (
                <button 
                  onClick={() => setShowAddBeneficiary(true)}
                  className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-3 rounded-lg transition-colors"
                >
                  Add New Beneficiary
                </button>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">Recent Activity</h4>
            
            {selectedPayment === 'beneficiary' ? (
              // Beneficiary List
              <div className="space-y-3">
                {currentPayment.beneficiaries.map((beneficiary) => (
                  <div key={beneficiary.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">{beneficiary.name}</h5>
                        <p className="text-sm text-gray-600">{beneficiary.bank} • {beneficiary.type}</p>
                        <p className="text-xs text-gray-500">A/C: {beneficiary.account}</p>
                      </div>
                      <button className="text-blue-600 hover:text-blue-700">
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              // Transaction History
              <div className="space-y-3">
                {currentPayment.recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="bg-white rounded-lg p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <h5 className="font-medium text-gray-900">{transaction.to}</h5>
                        <p className="text-sm text-gray-600">{transaction.amount}</p>
                        <p className="text-xs text-gray-500">{transaction.time}</p>
                      </div>
                      <div className="text-right">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          transaction.status === 'success' 
                            ? 'bg-green-100 text-green-800'
                            : transaction.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.status === 'success' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {transaction.status === 'pending' && <Clock className="w-3 h-3 mr-1" />}
                          {transaction.status === 'processing' && <Shield className="w-3 h-3 mr-1" />}
                          {transaction.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Payment Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">₹2.5Cr</div>
          <div className="text-sm text-gray-600">Total Transferred</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">15K+</div>
          <div className="text-sm text-gray-600">Transactions</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">99.9%</div>
          <div className="text-sm text-gray-600">Success Rate</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">24/7</div>
          <div className="text-sm text-gray-600">Availability</div>
        </div>
      </div>

      {/* Add Beneficiary Modal */}
      {showAddBeneficiary && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Add New Beneficiary</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Beneficiary Name</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Number</label>
                <input type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Select Bank</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>SBI Bank</option>
                  <option>Axis Bank</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                  <option>Savings</option>
                  <option>Current</option>
                </select>
              </div>
              <div className="flex space-x-3 pt-4">
                <button 
                  type="button"
                  onClick={() => setShowAddBeneficiary(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Add Beneficiary
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentSection; 