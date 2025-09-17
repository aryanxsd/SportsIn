import React, { useState } from 'react';
import { Users2, Trophy, MapPin, Search, Filter, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Teams() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCity, setFilterCity] = useState('');
  const [filterWins, setFilterWins] = useState('');

  // Sport-specific teams
  const sportTeams = {
    Cricket: [
      {
        id: 1,
        name: 'Royal Strikers',
        city: 'Mumbai',
        members: 15,
        wins: 12,
        losses: 3,
        logo: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=200&h=200&fit=crop&crop=faces&auto=format&q=60',
        description: 'Premier cricket team with a focus on aggressive batting and disciplined bowling',
        achievements: ['City League Champions 2024', 'State Runners-up 2023']
      },
      {
        id: 2,
        name: 'Thunder Kings',
        city: 'Delhi',
        members: 14,
        wins: 10,
        losses: 5,
        logo: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=200&h=200&fit=crop&crop=faces&auto=format&q=60',
        description: 'A balanced team known for their strategic gameplay and team spirit',
        achievements: ['National T20 Semifinalists', 'Corporate Cup Winners']
      },
      {
        id: 3,
        name: 'Phoenix Warriors',
        city: 'Bangalore',
        members: 16,
        wins: 14,
        losses: 2,
        logo: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?w=200&h=200&fit=crop&crop=faces&auto=format&q=60',
        description: 'Rising stars of the cricket scene with exceptional young talent',
        achievements: ['Youth Championship Winners', 'Regional Tournament Finalists']
      }
    ],
    Football: [
      {
        id: 1,
        name: 'City Warriors FC',
        city: 'Manchester',
        members: 18,
        wins: 15,
        losses: 3,
        logo: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=200&h=200&fit=crop&crop=faces&auto=format&q=60',
        description: 'Elite football club with a strong focus on attacking play',
        achievements: ['Premier League Champions', 'Cup Semifinalists']
      },
      {
        id: 2,
        name: 'United Rovers',
        city: 'London',
        members: 20,
        wins: 12,
        losses: 6,
        logo: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=200&h=200&fit=crop&crop=faces&auto=format&q=60',
        description: 'Historic club known for their defensive solidity and counter-attacks',
        achievements: ['League Cup Winners', 'European Qualifiers']
      },
      {
        id: 3,
        name: 'Athletic FC',
        city: 'Liverpool',
        members: 19,
        wins: 11,
        losses: 7,
        logo: 'https://images.unsplash.com/photo-1589487391730-58f20eb2c308?w=200&h=200&fit=crop&crop=faces&auto=format&q=60',
        description: 'A team with rich tradition and passionate supporters',
        achievements: ['Community Shield Winners', 'Youth Academy Excellence Award']
      }
    ],
    Basketball: [
      {
        id: 1,
        name: 'City Blazers',
        city: 'Chicago',
        members: 12,
        wins: 18,
        losses: 4,
        logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&crop=faces&auto=format&q=60',
        description: 'Fast-paced team with exceptional three-point shooters',
        achievements: ['Conference Champions', 'All-Star Weekend Winners']
      },
      {
        id: 2,
        name: 'Phoenix Knights',
        city: 'Los Angeles',
        members: 12,
        wins: 16,
        losses: 6,
        logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&crop=faces&auto=format&q=60',
        description: 'Defensive specialists with strong inside presence',
        achievements: ['Division Champions', 'Playoff Semifinalists']
      },
      {
        id: 3,
        name: 'Slam Dunkers',
        city: 'New York',
        members: 13,
        wins: 15,
        losses: 7,
        logo: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop&crop=faces&auto=format&q=60',
        description: 'Exciting team known for their highlight-reel plays',
        achievements: ['State Tournament Winners', 'Most Improved Team Award']
      }
    ]
  };

  const allTeams = user?.sport ? sportTeams[user.sport] : [];

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
                  <button className="text-neon hover:text-white transition-colors flex items-center">
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