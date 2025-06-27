import React, { useState } from 'react';
import { MapPin, Search } from 'lucide-react';

const branches = [
  { name: 'Mumbai Main Branch', address: '123 Business District, Mumbai, Maharashtra 400001', phone: '1800-123-4567' },
  { name: 'Chennai Branch', address: '456 Anna Salai, Chennai, Tamil Nadu 600002', phone: '1800-234-5678' },
  { name: 'Delhi Branch', address: '789 Connaught Place, New Delhi 110001', phone: '1800-345-6789' },
  { name: 'Bangalore Branch', address: '101 MG Road, Bangalore, Karnataka 560001', phone: '1800-456-7890' },
];

const BranchLocator = () => {
  const [query, setQuery] = useState('');
  const filtered = branches.filter(b => b.name.toLowerCase().includes(query.toLowerCase()) || b.address.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="min-h-screen flex items-center justify-center py-16 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Branch Locator</h2>
          <p className="text-lg text-gray-600">Find the nearest Star Finance branch to you</p>
        </div>
        <div className="flex flex-col md:flex-row gap-6 mb-10 items-center justify-center">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search by city, branch, or address..."
              value={query}
              onChange={e => setQuery(e.target.value)}
              className="w-full p-4 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">No branches found.</div>
          ) : (
            filtered.map((branch, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow p-6 flex items-start gap-4 border-l-4 border-blue-600">
                <MapPin className="w-8 h-8 text-blue-600 mt-1" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{branch.name}</h3>
                  <p className="text-gray-700 mb-1">{branch.address}</p>
                  <p className="text-blue-600 font-medium">{branch.phone}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white text-center">
          <h4 className="text-2xl font-bold mb-2">Branch Map (Coming Soon)</h4>
          <p className="text-lg opacity-90">Interactive map to locate branches will be available soon.</p>
        </div>
      </div>
    </section>
  );
};

export default BranchLocator; 