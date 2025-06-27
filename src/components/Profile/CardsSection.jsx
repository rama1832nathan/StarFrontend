import React, { useState } from 'react';
import { CreditCard, CreditCard as DebitCard, Star, Shield, Gift, Zap, TrendingUp, CheckCircle } from 'lucide-react';

const CardsSection = () => {
  const [selectedCard, setSelectedCard] = useState('credit');

  const cardTypes = {
    credit: {
      title: 'Credit Cards',
      icon: CreditCard,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      description: 'Unlock financial freedom with our premium credit cards',
      cards: [
        {
          name: 'Star Finance Premium',
          type: 'Credit Card',
          limit: '₹5 Lakhs',
          annualFee: '₹2,500',
          benefits: [
            '5X reward points on dining',
            '3X points on travel',
            '1% cashback on all purchases',
            'Complimentary airport lounge access',
            'Zero foreign transaction fees',
            'Contactless payments'
          ],
          features: ['EMI conversion', 'Fuel surcharge waiver', 'Insurance coverage']
        },
        {
          name: 'Star Finance Classic',
          type: 'Credit Card',
          limit: '₹2 Lakhs',
          annualFee: '₹1,000',
          benefits: [
            '2X reward points on all purchases',
            '1% cashback on fuel',
            'No joining fee',
            'Easy EMI options',
            '24/7 customer support',
            'Mobile banking access'
          ],
          features: ['Balance transfer', 'Reward redemption', 'Bill reminders']
        }
      ]
    },
    debit: {
      title: 'Debit Cards',
      icon: DebitCard,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      description: 'Secure and convenient banking with our debit cards',
      cards: [
        {
          name: 'Star Finance Platinum',
          type: 'Debit Card',
          limit: '₹1 Lakh/day',
          annualFee: '₹500',
          benefits: [
            'Unlimited ATM withdrawals',
            'Zero transaction fees',
            'Shopping discounts',
            'Movie ticket offers',
            'Fuel surcharge waiver',
            'International usage'
          ],
          features: ['UPI payments', 'Contactless', 'SMS alerts']
        },
        {
          name: 'Star Finance Classic',
          type: 'Debit Card',
          limit: '₹50,000/day',
          annualFee: '₹200',
          benefits: [
            'Free ATM transactions',
            'Online shopping security',
            'Reward points on purchases',
            'Easy bill payments',
            'Mobile recharge offers',
            '24/7 support'
          ],
          features: ['UPI enabled', 'SMS notifications', 'Lost card protection']
        }
      ]
    }
  };

  const currentCardType = cardTypes[selectedCard];

  return (
    <div className="space-y-8 bg-gradient-to-br from-[#0a2342] via-[#274690] to-[#a3cef1] rounded-2xl p-4">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Card Services</h2>
        <p className="text-lg text-white">Choose from our range of credit and debit cards</p>
      </div>

      {/* Card Type Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(cardTypes).map(([key, cardType]) => {
          const Icon = cardType.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedCard(key)}
              className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                selectedCard === key
                  ? `${cardType.borderColor} ${cardType.bgColor} shadow-lg`
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${cardType.color} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <h3 className="text-xl font-semibold text-gray-900">{cardType.title}</h3>
                  <p className="text-sm text-gray-600">{cardType.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {currentCardType.cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Card Header */}
            <div className={`bg-gradient-to-r ${currentCardType.color} p-6 text-white`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <currentCardType.icon className="w-8 h-8" />
                  <div>
                    <h3 className="text-xl font-bold">{card.name}</h3>
                    <p className="text-sm opacity-90">{card.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm opacity-90">Annual Fee</div>
                  <div className="text-lg font-bold">{card.annualFee}</div>
                </div>
              </div>
              
              {/* Card Limit */}
              <div className="bg-white/20 rounded-lg p-3">
                <div className="text-sm opacity-90">Daily Limit</div>
                <div className="text-xl font-bold">{card.limit}</div>
              </div>
            </div>

            {/* Card Benefits */}
            <div className="p-6">
              <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="w-5 h-5 text-yellow-500 mr-2" />
                Key Benefits
              </h4>
              <div className="space-y-2 mb-6">
                {card.benefits.map((benefit, idx) => (
                  <div key={idx} className="flex items-center space-x-3">
                    <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              {/* Features */}
              <div className="mb-6">
                <h5 className="font-medium text-gray-900 mb-3">Additional Features:</h5>
                <div className="flex flex-wrap gap-2">
                  {card.features.map((feature, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-2 rounded-lg transition-all duration-300">
                  Apply Now
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Card Benefits Overview */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Choose Our Cards?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Secure & Protected</h4>
            <p className="text-gray-600">Advanced security features and fraud protection</p>
          </div>
          <div className="text-center">
            <Gift className="w-12 h-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Rewards & Offers</h4>
            <p className="text-gray-600">Earn points and get exclusive discounts</p>
          </div>
          <div className="text-center">
            <Zap className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Instant Approval</h4>
            <p className="text-gray-600">Quick application process and fast delivery</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">10M+</div>
          <div className="text-sm text-gray-600">Active Cards</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
          <div className="text-sm text-gray-600">Security Rate</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">24/7</div>
          <div className="text-sm text-gray-600">Support</div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center">
          <div className="text-3xl font-bold text-orange-600 mb-2">₹50Cr</div>
          <div className="text-sm text-gray-600">Rewards Given</div>
        </div>
      </div>
    </div>
  );
};

export default CardsSection; 