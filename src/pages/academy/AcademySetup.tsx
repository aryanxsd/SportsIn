import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Users, Trophy, Clipboard, Plus, Mail, Phone } from 'lucide-react';

function AcademySetup() {
  const [setupType, setSetupType] = useState<'own' | 'new'>('own');

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white">Academy Services</h2>
        <p className="mt-2 text-gray-400">
          Choose how you want to proceed with your academy
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Own Academy Section */}
        <div
          className={`p-6 rounded-lg border-2 ${
            setupType === 'own'
              ? 'border-neon bg-neon bg-opacity-10'
              : 'border-gray-700'
          } cursor-pointer`}
          onClick={() => setSetupType('own')}
        >
          <Building2 className="h-12 w-12 text-neon mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">I Have an Academy</h3>
          <p className="text-gray-400 mb-4">
            Already running an academy? List it on our platform and reach more students.
          </p>
          
          {setupType === 'own' && (
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Academy Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 focus:border-neon focus:ring focus:ring-neon focus:ring-opacity-50"
                  placeholder="Enter academy name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300">Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 focus:border-neon focus:ring focus:ring-neon focus:ring-opacity-50"
                  placeholder="Enter location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Contact Email</label>
                <input
                  type="email"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 focus:border-neon focus:ring focus:ring-neon focus:ring-opacity-50"
                  placeholder="Enter contact email"
                />
              </div>

              <button className="w-full bg-neon text-black rounded-md py-2 font-medium hover:bg-opacity-90">
                List My Academy
              </button>
            </div>
          )}
        </div>

        {/* New Academy Section */}
        <div
          className={`p-6 rounded-lg border-2 ${
            setupType === 'new'
              ? 'border-neon bg-neon bg-opacity-10'
              : 'border-gray-700'
          } cursor-pointer`}
          onClick={() => setSetupType('new')}
        >
          <Trophy className="h-12 w-12 text-neon mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Start a New Academy</h3>
          <p className="text-gray-400 mb-4">
            Want to start your own academy? Let us help you set it up professionally.
          </p>

          {setupType === 'new' && (
            <div className="space-y-4 mt-6">
              <div>
                <label className="block text-sm font-medium text-gray-300">Your Name</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 focus:border-neon focus:ring focus:ring-neon focus:ring-opacity-50"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Contact Number</label>
                <input
                  type="tel"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 focus:border-neon focus:ring focus:ring-neon focus:ring-opacity-50"
                  placeholder="Enter contact number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300">Preferred Location</label>
                <input
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-800 text-white px-3 py-2 focus:border-neon focus:ring focus:ring-neon focus:ring-opacity-50"
                  placeholder="Enter preferred location"
                />
              </div>

              <button className="w-full bg-neon text-black rounded-md py-2 font-medium hover:bg-opacity-90">
                Get Started
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-white mb-4">Why Choose Our Services?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-gray-800 rounded-lg">
            <Users className="h-8 w-8 text-neon mb-3" />
            <h4 className="text-lg font-medium text-white mb-2">Expert Support</h4>
            <p className="text-gray-400">Get guidance from industry experts to set up and run your academy</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <Trophy className="h-8 w-8 text-neon mb-3" />
            <h4 className="text-lg font-medium text-white mb-2">Professional Setup</h4>
            <p className="text-gray-400">Complete infrastructure and management solution for your academy</p>
          </div>
          <div className="p-4 bg-gray-800 rounded-lg">
            <MapPin className="h-8 w-8 text-neon mb-3" />
            <h4 className="text-lg font-medium text-white mb-2">Location Analysis</h4>
            <p className="text-gray-400">Get help in choosing the best location for your academy</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AcademySetup;