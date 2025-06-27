import React from 'react';
import { Coins, Home, Car, CreditCard, Shield, TrendingUp, Clock, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      icon: Coins,
      title: "Gold/Silver Loans",
      description: "Instant loans against your precious metals with competitive rates starting from 12% per annum.",
      features: ["Instant approval", "75% of gold value", "Flexible tenure"],
      status: "Available Now",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Home,
      title: "Property Loans",
      description: "Secure loans against your residential or commercial properties with attractive interest rates.",
      features: ["Up to ₹5 Crores", "Longer tenure", "Minimal documentation"],
      status: "Coming Soon",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: Car,
      title: "Vehicle Loans",
      description: "Get loans against your cars, bikes, or commercial vehicles with quick processing.",
      features: ["Fast processing", "Competitive rates", "Easy documentation"],
      status: "Phase 3",
      gradient: "from-green-500 to-teal-500"
    }
  ];

  const features = [
    {
      icon: Shield,
      title: "Bank-Grade Security",
      description: "Your data and transactions are protected with 256-bit encryption and multi-factor authentication."
    },
    {
      icon: Clock,
      title: "24/7 Digital Services",
      description: "Access our services anytime, anywhere with our fully digital platform and instant processing."
    },
    {
      icon: TrendingUp,
      title: "Competitive Rates",
      description: "Get the best market rates with transparent pricing and no hidden charges."
    },
    {
      icon: Award,
      title: "Trusted Partner",
      description: "Regulated by RBI with over 20 years of experience in the banking and finance sector."
    }
  ];

  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Banking Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive financial solutions designed to meet your diverse banking needs with 
            cutting-edge technology and personalized service.
          </p>
        </div>

        {/* Main Services */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div key={index} className="group relative">
              <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${service.gradient}`}></div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-r ${service.gradient} text-white`}>
                      <service.icon className="h-8 w-8" />
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      service.status === 'Available Now' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {service.status}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-6">{service.description}</p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-3 px-6 rounded-lg font-semibold hover:cursor-pointer text-white bg-gradient-to-r ${service.gradient} hover:shadow-lg transition-all duration-300 ${service.status !== 'Available Now' ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={service.status !== 'Available Now'}
                    onClick={() => navigate('/login')}
                  >
                    {service.status === 'Available Now' ? 'Get Started' : 'Notify Me'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Star Finance?</h3>
            <p className="text-lg text-gray-600">Built for the modern digital age with customer-first approach</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-100 transition-colors">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h4>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
            <p className="text-xl mb-8 opacity-90">
              Complete your KYC verification in minutes and unlock instant loan approvals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-yellow-500 hover:cursor-pointer hover:bg-yellow-600 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              >
                Start KYC Verification
              </button>
              <button
                onClick={() => navigate('/login')}
                className="border-2 border-white/30 hover:cursor-pointer hover:bg-white/10 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300"
              >
                Calculate Loan Amount
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
