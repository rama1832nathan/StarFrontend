
import React from 'react';
import { Star, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                <Star className="h-6 w-6 text-white" style={{ color: '#ffffff' }} />
              </div>
              <div>
                <h3 className="text-xl font-bold" style={{ color: '#ffffff' }}>Star Finance</h3>
                <p className="text-sm text-gray-400" style={{ color: '#9ca3af' }}>Trusted Banking Partner</p>
              </div>
            </div>
            <p className="text-gray-400 mb-4" style={{ color: '#9ca3af' }}>
              Leading the digital transformation in small and medium banking & finance with innovative solutions and trusted services.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" style={{ color: '#9ca3af' }} />
              <Twitter className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" style={{ color: '#9ca3af' }} />
              <Linkedin className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" style={{ color: '#9ca3af' }} />
              <Instagram className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer transition-colors" style={{ color: '#9ca3af' }} />
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#ffffff' }}>Our Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Gold/Silver Loans</a></li>
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Property Loans (Coming Soon)</a></li>
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Auto Loans (Coming Soon)</a></li>
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>KYC Verification</a></li>
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Digital Banking</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#ffffff' }}>Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>About Us</a></li>
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Interest Rates</a></li>
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors" style={{ color: '#9ca3af' }}>Customer Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4" style={{ color: '#ffffff' }}>Contact Us</h4>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center">
                <Phone className="w-5 h-5 mr-3" style={{ color: '#9ca3af' }} />
                <span style={{ color: '#9ca3af' }}>1800-123-4567</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3" style={{ color: '#9ca3af' }} />
                <span style={{ color: '#9ca3af' }}>support@starfinance.in</span>
              </div>
              <div className="flex items- ">
                <MapPin className="w-5 h-5 mr-3 mt-1" style={{ color: '#9ca3af' }} />
                <span style={{ color: '#9ca3af' }}>
                  Star Finance Head Office<br />
                  123 Business District<br />
                  Mumbai, Maharashtra 400001
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm" style={{ color: '#9ca3af' }}>
              © 2024 Star Finance. All rights reserved. Licensed by RBI.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" style={{ color: '#9ca3af' }}>NBFC License</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" style={{ color: '#9ca3af' }}>Security</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors" style={{ color: '#9ca3af' }}>Grievances</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

