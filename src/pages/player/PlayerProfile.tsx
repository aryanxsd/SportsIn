import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import {
  Trophy,
  TrendingUp,
  Activity,
  Award,
  Calendar,
  Target,
  Share2,
  Settings,
  Link as LinkIcon,
  Image as ImageIcon,
  Video,
  MessageSquare,
  Heart,
  MoreHorizontal,
  Edit3,
  Copy
} from 'lucide-react';

function PlayerProfile() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'stats'>('posts');
  const [showShareModal, setShowShareModal] = useState(false);

  // Mock posts data - will be replaced with Supabase data
  const posts = [
    {
      id: 1,
      type: 'image',
      content: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop&auto=format',
      caption: 'Great practice session today! Working on my batting technique 🏏',
      likes: 124,
      comments: 8,
      timestamp: '2h ago'
    },
    {
      id: 2,
      type: 'video',
      content: 'https://assets.mixkit.co/videos/preview/mixkit-cricket-player-hitting-the-ball-40317-large.mp4',
      caption: 'Match winning shot from yesterday\'s game! 🏆',
      likes: 256,
      comments: 15,
      timestamp: '1d ago'
    }
  ];

  const stats = [
    {
      label: 'Matches',
      value: '45',
      icon: <Calendar className="h-5 w-5 text-neon" />,
    },
    {
      label: 'Win Rate',
      value: '67%',
      icon: <Trophy className="h-5 w-5 text-neon" />,
    },
    {
      label: 'Form',
      value: 'Good',
      icon: <Activity className="h-5 w-5 text-neon" />,
    },
    {
      label: 'Rating',
      value: '4.8',
      icon: <Award className="h-5 w-5 text-neon" />,
    },
  ];

  const handleShare = () => {
    // Will implement actual sharing functionality
    setShowShareModal(true);
  };

  const handleNewPost = () => {
    // Will implement post creation with Supabase
    console.log('New post');
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-gray-900 rounded-lg p-6 mb-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <img
              className="h-24 w-24 rounded-full border-2 border-neon object-cover"
              src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.username}`}
              alt={user?.username}
            />
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-white">{user?.username}</h1>
              <p className="text-gray-400">{user?.sport} Player</p>
              <div className="mt-2 flex items-center">
                <Target className="h-5 w-5 text-neon mr-2" />
                <span className="text-gray-300">All-Rounder</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={handleShare}
              className="p-2 text-gray-400 hover:text-neon transition-colors"
            >
              <Share2 className="h-5 w-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-neon transition-colors">
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-white">245</div>
            <div className="text-sm text-gray-400">Posts</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">15.2K</div>
            <div className="text-sm text-gray-400">Followers</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-white">482</div>
            <div className="text-sm text-gray-400">Following</div>
          </div>
        </div>

        <div className="mt-6">
          <button 
            onClick={() => {}} 
            className="w-full bg-neon text-black rounded-md py-2 font-medium hover:bg-opacity-90 transition-colors"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 mb-6">
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'posts'
              ? 'text-neon border-b-2 border-neon'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('posts')}
        >
          Posts
        </button>
        <button
          className={`flex-1 py-3 text-center ${
            activeTab === 'stats'
              ? 'text-neon border-b-2 border-neon'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setActiveTab('stats')}
        >
          Stats
        </button>
      </div>

      {/* Content */}
      {activeTab === 'posts' ? (
        <div className="space-y-6">
          {/* New Post Button */}
          <button
            onClick={handleNewPost}
            className="w-full bg-gray-900 rounded-lg p-4 flex items-center justify-center space-x-2 hover:bg-gray-800 transition-colors border border-gray-800 hover:border-neon"
          >
            <ImageIcon className="h-5 w-5 text-neon" />
            <Video className="h-5 w-5 text-neon" />
            <span className="text-gray-300">Share a post</span>
          </button>

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <img
                    src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.username}`}
                    alt={user?.username}
                    className="h-8 w-8 rounded-full border border-neon"
                  />
                  <span className="ml-2 text-white">{user?.username}</span>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MoreHorizontal className="h-5 w-5" />
                </button>
              </div>

              {post.type === 'image' ? (
                <img
                  src={post.content}
                  alt="Post content"
                  className="w-full aspect-square object-cover"
                />
              ) : (
                <video
                  src={post.content}
                  controls
                  className="w-full aspect-video object-cover"
                />
              )}

              <div className="p-4">
                <div className="flex items-center space-x-4 mb-4">
                  <button className="text-gray-400 hover:text-neon transition-colors">
                    <Heart className="h-6 w-6" />
                  </button>
                  <button className="text-gray-400 hover:text-neon transition-colors">
                    <MessageSquare className="h-6 w-6" />
                  </button>
                  <button className="text-gray-400 hover:text-neon transition-colors">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>
                <div className="text-white font-medium mb-1">{post.likes} likes</div>
                <p className="text-gray-300">{post.caption}</p>
                <p className="text-gray-400 text-sm mt-1">
                  View all {post.comments} comments
                </p>
                <p className="text-gray-500 text-xs mt-2">{post.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-gray-900 rounded-lg p-4 flex items-center border border-gray-800"
              >
                {stat.icon}
                <div className="ml-3">
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-white font-semibold">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Performance Chart */}
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 text-neon mr-2" />
              Performance Trend
            </h3>
            {/* Chart will be implemented */}
            <div className="h-48 flex items-center justify-center text-gray-400">
              Performance chart coming soon
            </div>
          </div>
        </div>
      )}

      {/* Share Profile Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-medium text-white mb-4">Share Profile</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-3 bg-gray-800 rounded-lg text-white hover:bg-gray-700">
                <div className="flex items-center">
                  <LinkIcon className="h-5 w-5 text-neon mr-2" />
                  <span>Copy Profile Link</span>
                </div>
                <Copy className="h-5 w-5 text-gray-400" />
              </button>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 text-gray-400 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PlayerProfile;