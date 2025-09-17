import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  Search, 
  Filter,
  MessageSquare,
  School,
  Users,
  Video,
  Calendar,
  MapPin,
  ShoppingBag,
  Award,
  Hammer,
  Heart,
  Dumbbell,
  ChevronDown
} from 'lucide-react';

function Community() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');

  const categories = [
    {
      id: 'academies',
      name: 'Academies',
      icon: <School className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=300&h=200&fit=crop&auto=format',
      description: 'Find top sports academies and training centers'
    },
    {
      id: 'umpires',
      name: 'Umpires & Referees',
      icon: <Users className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1547941126-3d5322b218b0?w=300&h=200&fit=crop&auto=format',
      description: 'Connect with certified match officials'
    },
    {
      id: 'streamers',
      name: 'Streamers',
      icon: <Video className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=300&h=200&fit=crop&auto=format',
      description: 'Follow live sports streamers and analysts'
    },
    {
      id: 'organizers',
      name: 'Tournament Organizers',
      icon: <Calendar className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1459865264687-595d652de67e?w=300&h=200&fit=crop&auto=format',
      description: 'Find professional tournament organizers'
    },
    {
      id: 'grounds',
      name: 'Grounds & Venues',
      icon: <MapPin className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?w=300&h=200&fit=crop&auto=format',
      description: 'Book sports grounds and facilities'
    },
    {
      id: 'shops',
      name: 'Equipment Shops',
      icon: <ShoppingBag className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=300&h=200&fit=crop&auto=format',
      description: 'Shop for quality sports equipment'
    },
    {
      id: 'trophyVendors',
      name: 'Trophy Vendors',
      icon: <Award className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=300&h=200&fit=crop&auto=format',
      description: 'Custom trophies and awards'
    },
    {
      id: 'manufacturers',
      name: 'Equipment Manufacturers',
      icon: <Hammer className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?w=300&h=200&fit=crop&auto=format',
      description: 'Connect with equipment manufacturers'
    },
    {
      id: 'physio',
      name: 'Physiotherapists',
      icon: <Heart className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=200&fit=crop&auto=format',
      description: 'Find sports physiotherapists'
    },
    {
      id: 'fitnessTrainers',
      name: 'Fitness Trainers',
      icon: <Dumbbell className="h-12 w-12 text-neon" />,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=200&fit=crop&auto=format',
      description: 'Connect with professional fitness trainers'
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
            <span className="text-neon">{user?.sport}</span> Community
          </h2>
          <p className="mt-1 text-gray-400">
            Connect with various services and professionals in the {user?.sport} ecosystem
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
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
              placeholder={`Search for ${user?.sport} services...`}
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

        {showFilters && (
          <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-800">
            {/* Add filter options here */}
          </div>
        )}
      </div>

      {/* Categories Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCategories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-900 rounded-lg overflow-hidden hover:ring-2 hover:ring-neon transition-all duration-300 transform hover:-translate-y-1 border border-gray-800"
            onClick={() => setSelectedCategory(category.id)}
          >
            <div className="relative h-48">
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center">
                  {category.icon}
                  <h3 className="ml-3 text-xl font-semibold text-white">
                    {category.name}
                  </h3>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-gray-300">{category.description}</p>
              
              <div className="mt-4 flex justify-between items-center">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-black bg-neon hover:bg-opacity-90 transition-colors">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Connect
                </button>
                <span className="text-gray-400 text-sm">
                  {Math.floor(Math.random() * 50) + 10} providers
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Community;