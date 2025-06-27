import React, { useState } from 'react';
import { Crown, Coins, Calculator, TrendingUp, Shield, Clock, CheckCircle } from 'lucide-react';

const LoanSection = () => {
  const [selectedLoan, setSelectedLoan] = useState('gold');
  const [loanAmount, setLoanAmount] = useState('');
  const [weight, setWeight] = useState('');

  const loanTypes = {
    gold: {
      title: 'Gold Loan',
      icon: Crown,
      color: 'from-yellow-400 to-orange-500',
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-200',
      rate: '10%',
      ltv: '75%',
      maxAmount: '₹10 Lakhs',
      features: [
        'Instant approval within 24 hours',
        'Competitive interest rates starting from 10%',
        'Flexible repayment options',
        'Secure vault storage',
        'No prepayment charges',
        'Loan against 22K gold jewelry'
      ]
    },
    silver: {
      title: 'Silver Loan',
      icon: Coins,
      color: 'from-gray-400 to-slate-600',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200',
      rate: '12%',
      ltv: '70%',
      maxAmount: '₹5 Lakhs',
      features: [
        'Quick processing and disbursal',
        'Interest rates starting from 12%',
        'Loan against 99.9% pure silver',
        'Professional storage facilities',
        'Easy documentation process',
        'Tenure up to 18 months'
      ]
    }
  };

  const calculateLoan = () => {
    if (!weight || weight <= 0) return '₹0';
    
    const rates = {
      gold: 5850, // 22K per gram
      silver: 78   // per gram
    };
    const ltv = {
      gold: 0.75,
      silver: 0.70
    };
    
    const amount = weight * rates[selectedLoan] * ltv[selectedLoan];
    return `₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`;
  };

  const currentLoan = loanTypes[selectedLoan];

  return (
    <div className="space-y-8 bg-gradient-to-br from-[#0a2342] via-[#274690] to-[#a3cef1] rounded-2xl p-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Loan Services</h2>
        <p className="text-lg text-white">Get instant loans against your precious metals with competitive rates</p>
      </div>

      {/* Loan Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(loanTypes).map(([key, loan]) => {
          const Icon = loan.icon;
          // Set background image and text color
          const bgImage = key === 'gold' ? 'url(/public/images/gold1.jpg)' : 'url(/public/images/silver1.jpg)';
          const textColor = key === 'gold' ? 'text-yellow-900 drop-shadow' : 'text-gray-900 drop-shadow';
          const overlay = key === 'gold' ? 'bg-yellow-100/70' : 'bg-gray-100/70';
          return (
            <button
              key={key}
              onClick={() => setSelectedLoan(key)}
              className={`relative p-6 rounded-xl border-2 transition-all hover:cursor-pointer duration-300  ${
                selectedLoan === key
                  ? `${loan.borderColor} ${loan.bgColor} shadow-lg`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{ backgroundImage: bgImage, backgroundSize: 'cover', backgroundPosition: 'center' }}
            >
              {/* Overlay for readability */}
              <div className={`absolute inset-0 ${overlay} pointer-events-none`} />
              <div className="relative flex items-center space-x-4 z-10">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${loan.color} text-white bg-opacity-90`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className={`text-left ${textColor}`}> 
                  <h3 className="text-xl font-semibold">{loan.title}</h3>
                  <p className="text-sm">Click to select</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Selected Loan Details */}
      <div className="bg-white rounded-xl shadow-lg p-8 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Loan Information */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${currentLoan.color} text-white`}>
                <currentLoan.icon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{currentLoan.title}</h3>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{currentLoan.rate}</div>
                <div className="text-sm text-gray-600">Interest Rate</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{currentLoan.ltv}</div>
                <div className="text-sm text-gray-600">LTV Ratio</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-2xl font-bold text-purple-600">{currentLoan.maxAmount}</div>
                <div className="text-sm text-gray-600">Max Amount</div>
              </div>
            </div>

            {/* Features */}
            <div className="space-y-3">
              <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
              {currentLoan.features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Loan Calculator */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6">
            <div className="flex items-center space-x-3 mb-6">
              <Calculator className="w-6 h-6 text-blue-600" />
              <h4 className="text-xl font-semibold text-gray-900">Loan Calculator</h4>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (grams)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter weight in grams"
                />
              </div>

              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Estimated Loan Amount</div>
                <div className="text-2xl font-bold text-green-600">{calculateLoan()}</div>
              </div>

              <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300">
                Apply for {currentLoan.title}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <Clock className="w-8 h-8 text-blue-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Quick Processing</h4>
          <p className="text-sm text-gray-600">Get your loan approved within 24 hours</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <Shield className="w-8 h-8 text-green-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Secure Storage</h4>
          <p className="text-sm text-gray-600">Your precious metals are stored in bank-grade vaults</p>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-3" />
          <h4 className="font-semibold text-gray-900 mb-2">Best Rates</h4>
          <p className="text-sm text-gray-600">Competitive interest rates in the market</p>
        </div>
      </div>
    </div>
  );
};

export default LoanSection; 