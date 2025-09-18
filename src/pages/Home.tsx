import React, { useRef, useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, ThumbsUp, Share2, Users, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { mockPosts, STORAGE_KEYS } from '../lib/mockData';

function Home() {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', () => setIsPlaying(true));
      videoRef.current.addEventListener('pause', () => setIsPlaying(false));
    }
  }, []);

  useEffect(() => {
    // Load liked posts from localStorage
    const savedLikes = localStorage.getItem(STORAGE_KEYS.LIKED_POSTS);
    if (savedLikes) {
      try {
        setLikedPosts(new Set(JSON.parse(savedLikes)));
      } catch {
        setLikedPosts(new Set());
      }
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  const handleLike = (postId: string) => {
    const newLikedPosts = new Set(likedPosts);
    if (likedPosts.has(postId)) {
      newLikedPosts.delete(postId);
    } else {
      newLikedPosts.add(postId);
    }
    setLikedPosts(newLikedPosts);
    localStorage.setItem(STORAGE_KEYS.LIKED_POSTS, JSON.stringify([...newLikedPosts]));
  };

  const userSport = user?.sport || 'Cricket';
  const relevantPosts = mockPosts[userSport] || [];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-gray-900 to-black rounded-lg p-6 mb-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white">Welcome back, <span className="text-neon">{user?.username || 'Athlete'}</span>!</h2>
        <p className="text-gray-300 mt-2">Stay updated with the latest {userSport} news and connect with your community.</p>
      </div>
      
      {/* Create Post */}
      <div className="bg-gray-900 rounded-lg p-4 mb-8 border border-gray-800 hover:border-neon transition-all duration-300">
        <div className="flex items-center space-x-4">
          <img
            src={user?.avatar_url || `https://ui-avatars.com/api/?name=${user?.username}&background=39FF14&color=000000`}
            alt="Profile"
            className="h-10 w-10 rounded-full border border-neon"
          />
          <button
            className="flex-1 bg-black text-gray-300 rounded-full px-4 py-2 text-left hover:bg-gray-800 transition-colors border border-gray-800 hover:border-neon"
            onClick={() => alert('Post creation feature coming soon!')}
          >
            Share something with the community...
          </button>
        </div>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {relevantPosts.map((post) => (
          <div key={post.id} className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-neon transition-all duration-300">
            {/* Post Header */}
            <div className="p-4 flex items-center space-x-3">
              <img
                src={post.author.avatar_url}
                alt={post.author.username}
                className="h-10 w-10 rounded-full border border-neon"
              />
              <div>
                <h3 className="text-white font-medium">{post.author.username}</h3>
                <p className="text-gray-400 text-sm flex items-center">
                  {post.author.role} • {new Date(post.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-2">
              <p className="text-gray-300">{post.content}</p>
            </div>

            {/* Post Media */}
            {post.media_url && post.media_type === 'image' && (
              <div className="mt-2">
                <img
                  src={post.media_url}
                  alt="Post content"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}
            
            {post.media_url && post.media_type === 'video' && (
              <div className="mt-2 relative video-container">
                <video
                  ref={post.id === 'post-2' ? videoRef : null}
                  className="w-full h-64 object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                >
                  <source src={post.media_url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute bottom-4 right-4 flex space-x-2">
                  <button 
                    onClick={togglePlay}
                    className="bg-black bg-opacity-70 p-2 rounded-full text-white hover:text-neon transition-colors"
                  >
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </button>
                  <button 
                    onClick={toggleMute}
                    className="bg-black bg-opacity-70 p-2 rounded-full text-white hover:text-neon transition-colors"
                  >
                    {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
                  </button>
                </div>
              </div>
            )}

            {/* Post Actions */}
            <div className="px-4 py-3 border-t border-gray-800 flex items-center justify-between">
              <button 
                onClick={() => handleLike(post.id)}
                className={`flex items-center space-x-2 transition-colors ${
                  likedPosts.has(post.id) ? 'text-neon' : 'text-gray-400 hover:text-neon'
                }`}
              >
                <ThumbsUp className={`h-5 w-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                <span>{post.likes_count + (likedPosts.has(post.id) ? 1 : 0)}</span>
              </button>
              <button 
                onClick={() => alert('Comments feature coming soon!')}
                className="flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors"
              >
                <MessageSquare className="h-5 w-5" />
                <span>{post.comments_count}</span>
              </button>
              <button 
                onClick={() => alert('Share feature coming soon!')}
                className="flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors"
              >
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
              <button 
                onClick={() => alert('Connect feature coming soon!')}
                className="flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors"
              >
                <Users className="h-5 w-5" />
                <span>Connect</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;