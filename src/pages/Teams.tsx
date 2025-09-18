import React, { useState } from 'react';
import { Users2, Trophy, MapPin, Search, Filter, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { mockTeams } from '../lib/mockData';

function Teams() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCity, setFilterCity] = useState('');
  const [filterWins, setFilterWins] = useState('');

  const allTeams = user?.sport ? mockTeams[user.sport] : [];

  // Filter teams based on search and filters
  const filteredTeams = allTeams.filter(team => {
    const matchesSearch = searchTerm === '' || 
      team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      team.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCity = filterCity === '' || 
      team.city.toLowerCase().includes(filterCity.toLowerCase());
    
    const matchesWins = filterWins === '' || 
      team.wins >= parseInt(filterWins);
    
    return matchesSearch && matchesCity && matchesWins;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
            <span className="text-neon">{user?.sport}</span> Teams
          </h2>
          <p className="mt-1 text-gray-400">
            Discover and connect with top {user?.sport} teams
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mt-6">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-700 rounded-md leading-5 bg-black text-gray-300 placeholder-gray-400 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon"
              placeholder={`Search for ${user?.sport} teams...`}
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="inline-flex items-center px-4 py-2 border border-gray-700 rounded-md bg-black text-gray-300 hover:border-neon hover:text-neon transition-colors"
          >
            <Filter className="h-5 w-5 mr-2" />
            Filters
            <ChevronDown className={`h-5 w-5 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Filter Options */}
        {showFilters && (
          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">City</label>
              <input
                type="text"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-700 rounded-md bg-black text-gray-300 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon"
                placeholder="Filter by city..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Minimum Wins</label>
              <input
                type="number"
                value={filterWins}
                onChange={(e) => setFilterWins(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-700 rounded-md bg-black text-gray-300 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon"
                placeholder="Minimum wins..."
                min="0"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <div
              key={team.id}
              className="bg-gray-900 rounded-lg shadow overflow-hidden hover:ring-2 hover:ring-neon transition-all duration-300 transform hover:-translate-y-1 border border-gray-800"
            >
              <div className="p-6">
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full border-2 border-neon object-cover"
                    src={team.logo}
                    alt={team.name}
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">{team.name}</h3>
                    <div className="flex items-center text-gray-400">
                      <MapPin className="h-4 w-4 mr-1 text-neon" />
                      {team.city}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-gray-300">{team.description}</p>

                {team.achievements && team.achievements.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-neon">Achievements</h4>
                    <ul className="mt-2 space-y-1">
                      {team.achievements.map((achievement, index) => (
                        <li key={index} className="text-gray-300 text-sm flex items-start">
                          <Trophy className="h-4 w-4 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-3 gap-4 border-t border-gray-700 pt-4">
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Members</dt>
                    <dd className="mt-1 flex items-center text-lg font-semibold text-white">
                      <Users2 className="h-5 w-5 mr-1 text-neon" />
                      {team.members}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Wins</dt>
                    <dd className="mt-1 text-lg font-semibold text-green-400">
                      {team.wins}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-400">Losses</dt>
                    <dd className="mt-1 text-lg font-semibold text-red-400">
                      {team.losses}
                    </dd>
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button 
                    onClick={() => alert('Team details feature coming soon!')}
                    className="text-neon hover:text-white transition-colors flex items-center"
                  >
                    View Team <Trophy className="h-4 w-4 ml-1" />
                  </button>
                  <div className="flex items-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neon bg-opacity-20 text-neon">
                      {Math.round((team.wins / (team.wins + team.losses)) * 100)}% Win Rate
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl text-gray-400">
              No teams found. Try adjusting your search or filters.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teams;