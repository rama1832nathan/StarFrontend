import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Crown, Coins, TrendingUp, Star, Clock, Users } from 'lucide-react';

const NewsCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const newsItems = [
    {
      id: 1,
      title: "Gold Loan Interest Rates Reduced",
      subtitle: "Now starting from 9.5% p.a.",
      description: "We've reduced our gold loan interest rates to make borrowing more affordable. Get instant loans against your gold jewelry with competitive rates and quick processing.",
      icon: Crown,
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      stats: { rate: "9.5%", ltv: "75%", processing: "24hrs" },
      tag: "New Rate"
    },
    {
      id: 2,
      title: "Silver Loan Scheme Launched",
      subtitle: "Loan against silver jewelry & coins",
      description: "Introducing our new silver loan scheme. Get loans against your silver jewelry, coins, and utensils with attractive interest rates and flexible repayment options.",
      icon: Coins,
      color: "from-gray-400 to-slate-600",
      bgColor: "bg-gray-50",
      stats: { rate: "11.5%", ltv: "70%", processing: "48hrs" },
      tag: "New Product"
    },
    {
      id: 3,
      title: "Digital Gold Investment Platform",
      subtitle: "Buy, sell, and earn from digital gold",
      description: "Invest in digital gold with as little as ₹1. Track real-time gold prices, earn interest on your holdings, and convert to physical gold anytime.",
      icon: TrendingUp,
      color: "from-green-400 to-emerald-500",
      bgColor: "bg-green-50",
      stats: { return: "2.5%", minAmount: "₹1", liquidity: "Instant" },
      tag: "New Feature"
    },
    {
      id: 4,
      title: "Enhanced Security for Vault Storage",
      subtitle: "Bank-grade security for your precious metals",
      description: "Upgraded our vault storage facilities with advanced security systems, 24/7 monitoring, and insurance coverage for complete peace of mind.",
      icon: Star,
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-blue-50",
      stats: { security: "99.9%", insurance: "Full", monitoring: "24/7" },
      tag: "Security Update"
    },
    {
      id: 5,
      title: "Quick KYC Verification Process",
      subtitle: "Complete KYC in under 10 minutes",
      description: "Streamlined KYC process with instant verification. Upload documents, get verified online, and start using all our services immediately.",
      icon: Users,
      color: "from-purple-400 to-pink-500",
      bgColor: "bg-purple-50",
      stats: { time: "10min", success: "99%", documents: "Digital" },
      tag: "Process Update"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [newsItems.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentNews = newsItems[currentSlide];

  return (
    <div className="bg-gradient-to-br from-[#0a2342] via-[#274690] to-[#a3cef1] rounded-xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">What's New at Star Finance</h2>
        <p className="text-lg text-white">Stay updated with our latest offerings and improvements</p>
      </div>

      {/* Carousel Container */}
      <div className="relative">
        {/* Main Carousel */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Content Side */}
            <div className="p-8">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${currentNews.color} text-white`}>
                  <currentNews.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    {currentNews.tag}
                  </span>
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{currentNews.title}</h3>
              <p className="text-lg text-blue-600 font-semibold mb-4">{currentNews.subtitle}</p>
              <p className="text-gray-600 mb-6 leading-relaxed">{currentNews.description}</p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                {Object.entries(currentNews.stats).map(([key, value]) => (
                  <div key={key} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{value}</div>
                    <div className="text-xs text-gray-600 capitalize">{key}</div>
                  </div>
                ))}
              </div>

              <button className="bg-gradient-to-r hover:cursor-pointer from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Visual Side */}
            <div className={`${currentNews.bgColor} p-8 flex items-center justify-center`}>
              <div className="text-center">
                <div className={`w-32 h-32 rounded-full bg-gradient-to-r ${currentNews.color} flex items-center justify-center mx-auto mb-6`}>
                  <currentNews.icon className="w-16 h-16 text-white" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">{currentNews.title}</h4>
                <p className="text-gray-600">{currentNews.subtitle}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 hover:cursor-pointer bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 hover:cursor-pointer bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-6 space-x-2">
          {newsItems.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick News Ticker */}
      <div className="mt-8 bg-white rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-3">
          <Clock className="w-5 h-5 text-blue-600" />
          <h4 className="font-semibold text-gray-900">Latest Updates</h4>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Gold price today: ₹5,850/gm (22K)</span>
            <span className="text-green-600 font-medium">+₹50</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Silver price today: ₹78/gm</span>
            <span className="text-red-600 font-medium">-₹2</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Processing time for gold loans reduced to 24 hours</span>
            <span className="text-blue-600 font-medium">New</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsCarousel; 