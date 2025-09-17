import React, { useState } from 'react';
import { Trophy, Calendar, Users2, MapPin, Search, Filter, ChevronDown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

function Tournaments() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterVenue, setFilterVenue] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Sport-specific tournaments
  const sportTournaments = {
    Cricket: [
      {
        id: 1,
        name: 'Spring Championship 2025',
        format: 'T20',
        teams: 8,
        startDate: 'April 1, 2025',
        venue: 'Central Stadium',
        status: 'upcoming',
        description: 'The premier T20 cricket tournament featuring top teams from across the region',
        prize: '$5,000',
        registrationOpen: true,
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=300&fit=crop&auto=format'
      },
      {
        id: 2,
        name: 'City League',
        format: 'ODI',
        teams: 6,
        startDate: 'March 15, 2025',
        venue: 'Sports Complex',
        status: 'ongoing',
        description: 'Local cricket league with intense rivalries and high-quality cricket',
        prize: '$3,000',
        registrationOpen: false,
        image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=600&h=300&fit=crop&auto=format'
      },
      {
        id: 3,
        name: 'National Cricket Cup',
        format: 'Test',
        teams: 4,
        startDate: 'May 10, 2025',
        venue: 'National Stadium',
        status: 'upcoming',
        description: 'The most prestigious long-format cricket tournament in the country',
        prize: '$10,000',
        registrationOpen: true,
        image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=300&fit=crop&auto=format'
      }
    ],
    Football: [
      {
        id: 1,
        name: 'Premier League 2025',
        format: 'League',
        teams: 10,
        startDate: 'March 20, 2025',
        venue: 'City Stadium',
        status: 'upcoming',
        description: 'The top-tier football league with the best teams competing for glory',
        prize: '$8,000',
        registrationOpen: true,
        image: 'https://images.unsplash.com/photo-1508098682722-e99c643e7f0b?w=600&h=300&fit=crop&auto=format'
      },
      {
        id: 2,
        name: 'Champions Cup',
        format: 'Knockout',
        teams: 16,
        startDate: 'April 5, 2025',
        venue: 'National Arena',
        status: 'upcoming',
        description: 'Exciting knockout tournament with teams from multiple regions',
        prize: '$5,000',
        registrationOpen: true,
        image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&h=300&fit=crop&auto=format'
      },
      {
        id: 3,
        name: 'Regional Football Series',
        format: 'Group + Knockout',
        teams: 12,
        startDate: 'March 1, 2025',
        venue: 'Sports Village',
        status: 'ongoing',
        description: 'Regional tournament featuring group stages followed by knockout rounds',
        prize: '$3,500',
        registrationOpen: false,
        image: 'https://images.unsplash.com/photo-1518091043644-c1d4457512c6?w=600&h=300&fit=crop&auto=format'
      }
    ],
    Basketball: [
      {
        id: 1,
        name: 'City Basketball Championship',
        format: '5v5',
        teams: 12,
        startDate: 'March 25, 2025',
        venue: 'Indoor Arena',
        status: 'upcoming',
        description: 'The biggest basketball tournament in the city with elite competition',
        prize: '$6,000',
        registrationOpen: true,
        image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600&h=300&fit=crop&auto=format'
      },
      {
        id: 2,
        name: 'Street Basketball League',
        format: '3v3',
        teams: 24,
        startDate: 'April 10, 2025',
        venue: 'Downtown Courts',
        status: 'upcoming',
        description: 'Fast-paced 3v3 basketball tournament with street-style rules',
        prize: '$2,500',
        registrationOpen: true,
        image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?w=600&h=300&fit=crop&auto=format'
      },
      {
        id: 3,
        name: 'Pro Basketball Invitational',
        format: '5v5',
        teams: 8,
        startDate: 'March 5, 2025',
        venue: 'Sports Center',
        status: 'ongoing',
        description: 'Invitation-only tournament featuring the best basketball teams',
        prize: '$10,000',
        registrationOpen: false,
        image: 'https://images.unsplash.com/photo-1518085250887-2f903c200a89?w=600&h=300&fit=crop&auto=format'
      }
    ]
  };

  const tournaments = user?.sport ? sportTournaments[user.sport] : [];

  // Filter tournaments based on search and filters
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = searchTerm === '' || 
      tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tournament.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesVenue = filterVenue === '' || 
      tournament.venue.toLowerCase().includes(filterVenue.toLowerCase());
    
    const matchesStatus = filterStatus === '' || 
      tournament.status === filterStatus;
    
    return matchesSearch && matchesVenue && matchesStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
            <span className="text-neon">{user?.sport}</span> Tournaments
          </h2>
          <p className="mt-1 text-gray-400">
            Discover and register for upcoming {user?.sport} tournaments
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
              placeholder={`Search for ${user?.sport} tournaments...`}
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
              <label className="block text-sm font-medium text-gray-300 mb-1">Venue</label>
              <input
                type="text"
                value={filterVenue}
                onChange={(e) => setFilterVenue(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-700 rounded-md bg-black text-gray-300 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon"
                placeholder="Filter by venue..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-700 rounded-md bg-black text-gray-300 focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon"
              >
                <option value="">All Statuses</option>
                <option value="upcoming">Upcoming</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-6 grid-cols-1 lg:grid-cols-2">
        {filteredTournaments.length > 0 ? (
          filteredTournaments.map((tournament) => (
            <div
              key={tournament.id}
              className="bg-gray-900 rounded-lg shadow overflow-hidden hover:ring-2 hover:ring-neon transition-all duration-300 transform hover:-translate-y-1 border border-gray-800"
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={tournament.image}
                  alt={tournament.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      tournament.status === 'upcoming'
                        ? 'bg-blue-900 text-blue-200'
                        : tournament.status === 'ongoing'
                        ? 'bg-green-900 text-green-200'
                        : 'bg-gray-700 text-gray-200'
                    }`}
                  >
                    {tournament.status.charAt(0).toUpperCase() + tournament.status.slice(1)}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neon text-black">
                    Prize: {tournament.prize}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Trophy className="h-8 w-8 text-neon" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-white">
                      {tournament.name}
                    </h3>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-700 text-neon">
                      {tournament.format}
                    </span>
                  </div>
                </div>

                <p className="mt-3 text-gray-300">{tournament.description}</p>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="h-5 w-5 mr-2 text-neon" />
                    {tournament.startDate}
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Users2 className="h-5 w-5 mr-2 text-neon" />
                    {tournament.teams} Teams
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-5 w-5 mr-2 text-neon" />
                    {tournament.venue}
                  </div>
                </div>

                <div className="mt-6 flex justify-between items-center">
                  <button className="text-neon hover:text-white transition-colors flex items-center">
                    View Details <Trophy className="h-4 w-4 ml-1" />
                  </button>
                  {tournament.registrationOpen && (
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-neon hover:bg-opacity-90 transition-colors">
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl text-gray-400">
              No tournaments found. Try adjusting your search or filters.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}

export default Tournaments;