import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Crown, Coins } from 'lucide-react';

const METAL_RATES = {
  gold: 5850, // 22K per gram
  silver: 78, // per gram
};
const LTV = {
  gold: 0.75,
  silver: 0.7,
};

const Hero = () => {
  const navigate = useNavigate();
  const [metal, setMetal] = useState('gold');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState('₹0');

  const handleCalculate = (e) => {
    e.preventDefault();
    const w = parseFloat(weight);
    if (!w || w <= 0) {
      setResult('Enter a valid weight.');
      return;
    }
    const rate = METAL_RATES[metal];
    const ltv = LTV[metal];
    const amount = w * rate * ltv;
    setResult(`₹${amount.toLocaleString('en-IN', { maximumFractionDigits: 0 })}`);
  };

  return (
    <section className="relative min-h-screen flex items-center bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }}></div>

      {/* Floating Gold Coins Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            <div className="w-3 h-3 bg-yellow-400 rounded-full opacity-30"></div>
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Your Trusted
              <span className="text-yellow-400 block">Gold & Silver</span>
              Finance Partner
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Get instant loans against your precious metals with competitive rates, 
              secure storage, and hassle-free processing. Complete KYC verification 
              for instant approvals up to ₹10 lakhs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r hover:cursor-pointer from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center"
              >
                <Crown className="w-5 h-5 mr-2" />
                Apply for Gold Loan
              </button>
              <button
                onClick={() => navigate('/login')}
                className="bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-bold py-4 px-8 rounded-lg transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center justify-center hover:cursor-pointer"
              >
                <Coins className="w-5 h-5 mr-2" />
                Apply for Silver Loan
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">10%</div>
                <div className="text-blue-100 text-sm">Interest Rate</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">75%</div>
                <div className="text-blue-100 text-sm">LTV Ratio</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">24/7</div>
                <div className="text-blue-100 text-sm">Support</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <div className="text-2xl font-bold text-yellow-400">100%</div>
                <div className="text-blue-100 text-sm">Secure</div>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-3xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-6">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Quick Loan Calculator</h3>
                  <p className="text-gray-600">Get instant loan estimate</p>
                </div>
                <form className="space-y-4" onSubmit={handleCalculate}>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Metal Type</label>
                    <select
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={metal}
                      onChange={e => setMetal(e.target.value)}
                    >
                      <option value="gold">Gold (22K)</option>
                      <option value="silver">Silver (99.9%)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Weight (grams)</label>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="Enter weight"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      value={weight}
                      onChange={e => setWeight(e.target.value)}
                    />
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <div className="text-sm text-green-700 mb-1">Estimated Loan Amount</div>
                    <div className="text-2xl font-bold text-green-800">{result}</div>
                  </div>
                  <button type="submit" className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:cursor-pointer">
                    Calculate Loan
                  </button>
                  <div className="text-xs text-gray-500 mt-2 text-center">
                    <strong>Note:</strong> The rate may increase or decrease. This is an estimated amount only.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
