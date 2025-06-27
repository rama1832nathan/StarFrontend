import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coins, Crown, ArrowRight, CheckCircle, Shield } from 'lucide-react';
import { toast } from 'sonner';

const LoanTypeSelector = () => {
  const navigate = useNavigate();

  const handleLoanApplication = (type) => {
    toast.error('Please login first to apply for loans.');
    navigate('/auth');
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Loan Type
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get instant loans against your precious metals with competitive rates and quick processing
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Gold Loan Card */}
          <div className="relative overflow-hidden border-2 border-yellow-200 hover:border-yellow-400 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-bl-full flex items-center justify-center">
              <Crown className="w-8 h-8 text-white" />
            </div>

            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 text-2xl font-semibold mb-4">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Crown className="w-6 h-6 text-yellow-600" />
                </div>
                Gold Loan
                <span className="text-sm px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                  Most Popular
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-800">10%</p>
                  <p className="text-sm text-yellow-600">Interest Rate (Starting)</p>
                </div>
                <div className="text-center p-3 bg-yellow-50 rounded-lg">
                  <p className="text-2xl font-bold text-yellow-800">75%</p>
                  <p className="text-sm text-yellow-600">LTV Ratio</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "Loan amount up to ₹10 lakhs",
                  "Tenure: 6 months to 2 years",
                  "Instant approval after KYC"
                ].map((text, idx) => (
                  <div className="flex items-center gap-2" key={idx}>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Bank-grade security & insurance</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg border border-yellow-200 mb-6">
                <h4 className="font-semibold text-yellow-900 mb-2">Current Gold Rates</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>24K Gold:</span><span className="font-semibold">₹6,380/10g</span>
                  </div>
                  <div className="flex justify-between">
                    <span>22K Gold:</span><span className="font-semibold">₹5,850/10g</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleLoanApplication('gold')}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Apply for Gold Loan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Silver Loan Card */}
          <div className="relative overflow-hidden border-2 border-gray-200 hover:border-gray-400 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 bg-white">
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-bl-full flex items-center justify-center">
              <Coins className="w-8 h-8 text-white" />
            </div>

            <div className="p-6 pb-4">
              <div className="flex items-center gap-3 text-2xl font-semibold mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <Coins className="w-6 h-6 text-gray-600" />
                </div>
                Silver Loan
                <span className="text-sm px-2 py-1 border border-gray-300 text-gray-700 rounded-full font-medium">
                  Quick Access
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-800">12%</p>
                  <p className="text-sm text-gray-600">Interest Rate (Starting)</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-gray-800">70%</p>
                  <p className="text-sm text-gray-600">LTV Ratio</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {[
                  "Loan amount up to ₹5 lakhs",
                  "Tenure: 6 months to 18 months",
                  "Same day approval"
                ].map((text, idx) => (
                  <div className="flex items-center gap-2" key={idx}>
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{text}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Professional vault storage</span>
                </div>
              </div>

              <div className="bg-gradient-to-r from-gray-50 to-slate-50 p-4 rounded-lg border border-gray-200 mb-6">
                <h4 className="font-semibold text-gray-900 mb-2">Current Silver Rate</h4>
                <div className="text-sm flex justify-between">
                  <span>Silver (99.9%):</span><span className="font-semibold">₹78/gram</span>
                </div>
              </div>

              <button
                onClick={() => handleLoanApplication('silver')}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-gray-500 to-slate-600 hover:from-gray-600 hover:to-slate-700 text-white font-semibold py-3 rounded-lg transition-all duration-200"
              >
                Apply for Silver Loan
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* KYC Notice */}
        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <Shield className="w-6 h-6 text-blue-600 mt-1 mr-4" />
              <div>
                <h4 className="font-semibold text-blue-900 mb-2">KYC Verification Required</h4>
                <p className="text-blue-700 mb-3">
                  Complete profile verification with all required documents is mandatory before applying for any loan.
                  This ensures quick processing and instant approval.
                </p>
                <div className="text-sm text-blue-600">
                  <p className="font-medium">Required Documents:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Aadhar Card (Mandatory)</li>
                    <li>PAN Card (Mandatory)</li>
                    <li>Bank Account Details</li>
                    <li>Address Proof</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LoanTypeSelector;
