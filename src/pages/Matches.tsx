import React from 'react';
import { Calendar, MapPin, Clock, Trophy, Plus } from 'lucide-react';
import { mockMatches } from '../lib/mockData';

function Matches() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
            Matches
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => alert('Schedule match feature coming soon!')}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-black bg-neon hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-neon"
          >
            <Plus className="h-4 w-4 mr-2" />
            Schedule Match
          </button>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        {mockMatches.map((match) => (
          <div
            key={match.id}
            className="bg-gray-800 overflow-hidden rounded-lg shadow-lg hover:ring-2 hover:ring-neon transition-all"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2 text-gray-400">
                  <Calendar className="h-5 w-5" />
                  <span>{match.date}</span>
                  <Clock className="h-5 w-5 ml-4" />
                  <span>{match.time}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    match.status === 'completed'
                      ? 'bg-green-900 text-green-200'
                      : 'bg-blue-900 text-blue-200'
                  }`}
                >
                  {match.status.charAt(0).toUpperCase() + match.status.slice(1)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={match.team1.logo}
                    alt={match.team1.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {match.team1.name}
                    </h3>
                    <p className="text-2xl font-bold text-neon">
                      {match.team1.score}
                    </p>
                  </div>
                </div>
                <div className="text-gray-400 text-lg font-medium">VS</div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <h3 className="text-lg font-medium text-white">
                      {match.team2.name}
                    </h3>
                    <p className="text-2xl font-bold text-neon">
                      {match.team2.score}
                    </p>
                  </div>
                  <img
                    src={match.team2.logo}
                    alt={match.team2.name}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center text-gray-400">
                  <MapPin className="h-5 w-5 mr-2" />
                  <span>{match.venue}</span>
                  <span className="mx-2">•</span>
                  <Trophy className="h-5 w-5 mr-2" />
                  <span>{match.format}</span>
                </div>
                {match.status === 'completed' && (
                  <p className="text-green-400 font-medium">{match.result}</p>
                )}
                {match.status === 'upcoming' && (
                  <button 
                    onClick={() => alert('Match details feature coming soon!')}
                    className="text-neon hover:text-white transition-colors"
                  >
                    View Details →
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;