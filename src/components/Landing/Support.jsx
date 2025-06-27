import React, { useState } from 'react';
import { Mail, Phone, MessageCircle, HelpCircle } from 'lucide-react';

const faqs = [
  { q: 'How do I apply for a loan?', a: 'You can apply for a loan online by logging in and completing your KYC verification.' },
  { q: 'What documents are required for KYC?', a: 'Aadhar Card, PAN Card, Bank Account Details, and Address Proof are required.' },
  { q: 'How can I check my loan status?', a: 'Login to your account and navigate to the loan dashboard to check your status.' },
  { q: 'How do I contact customer support?', a: 'You can call us at 1800-123-4567 or email support@starfinance.in.' },
];

const Support = () => {
  const [open, setOpen] = useState(null);
  return (
    <section className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Support</h2>
          <p className="text-lg text-gray-600">We are here to help you 24/7</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-blue-600">
            <Phone className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-lg mb-1">Call Us</h3>
            <p className="text-blue-600 font-medium">1800-123-4567</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-blue-600">
            <Mail className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-lg mb-1">Email</h3>
            <p className="text-blue-600 font-medium">support@starfinance.in</p>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center border-t-4 border-blue-600">
            <MessageCircle className="w-8 h-8 text-blue-600 mb-2" />
            <h3 className="font-bold text-lg mb-1">Live Chat</h3>
            <p className="text-blue-600 font-medium">Chat support coming soon</p>
          </div>
        </div>
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2"><HelpCircle className="w-6 h-6 text-blue-600" /> Frequently Asked Questions</h3>
          <div className="space-y-4 max-w-2xl mx-auto">
            {faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow p-4">
                <button className="w-full text-left flex justify-between items-center font-semibold text-gray-900" onClick={() => setOpen(open === idx ? null : idx)}>
                  {faq.q}
                  <span className="ml-2 text-blue-600">{open === idx ? '-' : '+'}</span>
                </button>
                {open === idx && <div className="mt-2 text-gray-700">{faq.a}</div>}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h4 className="text-2xl font-bold mb-2">Support Form (Coming Soon)</h4>
          <p className="text-lg opacity-90">You will soon be able to submit your queries directly from this page.</p>
        </div>
      </div>
    </section>
  );
};

export default Support; 