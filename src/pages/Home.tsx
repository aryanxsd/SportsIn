import React, { useRef, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { MessageSquare, ThumbsUp, Share2, Users, Play, Pause, Volume2, VolumeX } from 'lucide-react';

function Home() {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.addEventListener('play', () => setIsPlaying(true));
      videoRef.current.addEventListener('pause', () => setIsPlaying(false));
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

  // Mock data for posts based on sport
  const posts = {
    Cricket: [
      {
        id: 1,
        author: "Sarah Johnson",
        role: "Cricket Coach",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format",
        content: "Looking for cricket players for weekend practice sessions. All skill levels welcome! Location: Central Sports Complex",
        image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop&auto=format",
        likes: 24,
        comments: 8,
        time: "2 hours ago"
      },
      {
        id: 2,
        author: "Cricket Academy Pro",
        role: "Professional Academy",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&auto=format",
        content: "New batting techniques workshop this weekend. Limited spots available!",
        video: "https://assets.mixkit.co/videos/preview/mixkit-cricket-player-hitting-the-ball-40317-large.mp4",
        likes: 45,
        comments: 12,
        time: "5 hours ago"
      }
    ],
    Football: [
      {
        id: 1,
        author: "Mike Wilson",
        role: "Football Coach",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format",
        content: "Seeking players for our amateur football league. Training sessions every Tuesday and Thursday.",
        image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop&auto=format",
        likes: 32,
        comments: 15,
        time: "3 hours ago"
      },
      {
        id: 2,
        author: "Football Academy Elite",
        role: "Professional Academy",
        avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&auto=format",
        content: "Check out our new training facilities! Open house this weekend for all interested players.",
        video: "https://assets.mixkit.co/videos/preview/mixkit-soccer-player-dribbling-a-ball-40377-large.mp4",
        likes: 67,
        comments: 23,
        time: "1 day ago"
      }
    ],
    Basketball: [
      {
        id: 1,
        author: "Basketball Elite",
        role: "Professional Academy",
        avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&auto=format",
        content: "Join our summer basketball camp! Improve your skills with professional coaches.",
        image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop&auto=format",
        likes: 56,
        comments: 23,
        time: "1 hour ago"
      },
      {
        id: 2,
        author: "Hoops Academy",
        role: "Basketball Training Center",
        avatar: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&h=100&fit=crop&auto=format",
        content: "New advanced dribbling techniques workshop starting next week. Limited spots available!",
        video: "https://assets.mixkit.co/videos/preview/mixkit-basketball-player-dribbling-then-dunking-40659-large.mp4",
        likes: 42,
        comments: 18,
        time: "5 hours ago"
      }
    ]
  };

  const userSport = user?.sport || 'Cricket';
  const relevantPosts = posts[userSport] || [];

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
                src={post.avatar}
                alt={post.author}
                className="h-10 w-10 rounded-full border border-neon"
              />
              <div>
                <h3 className="text-white font-medium">{post.author}</h3>
                <p className="text-gray-400 text-sm flex items-center">
                  {post.role} • {post.time}
                </p>
              </div>
            </div>

            {/* Post Content */}
            <div className="px-4 pb-2">
              <p className="text-gray-300">{post.content}</p>
            </div>

            {/* Post Image or Video */}
            {post.image && (
              <div className="mt-2">
                <img
                  src={post.image}
                  alt="Post content"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}
            
            {post.video && (
              <div className="mt-2 relative video-container">
                <video
                  ref={post.id === 2 ? videoRef : null}
                  className="w-full h-64 object-cover"
                  loop
                  muted={isMuted}
                  playsInline
                >
                  <source src={post.video} type="video/mp4" />
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
              <button className="flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors">
                <ThumbsUp className="h-5 w-5" />
                <span>{post.likes}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors">
                <MessageSquare className="h-5 w-5" />
                <span>{post.comments}</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors">
                <Share2 className="h-5 w-5" />
                <span>Share</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-400 hover:text-neon transition-colors">
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