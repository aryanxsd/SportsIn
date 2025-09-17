import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Trophy, Users, Shield, Target, Award, TrendingUp, Globe, Zap } from 'lucide-react';

function About() {
  const videoRef = useRef<HTMLVideoElement>(null);
  
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay prevented:", error);
      });
    }
  }, []);

  const features = [
    {
      icon: <Trophy className="w-12 h-12 text-neon" />,
      title: "Professional Tournament Management",
      description: "Organize and manage tournaments with advanced scheduling, real-time scoring, and comprehensive statistics tracking."
    },
    {
      icon: <Users className="w-12 h-12 text-neon" />,
      title: "Team Management",
      description: "Build and manage your dream team with detailed player profiles, performance analytics, and team statistics."
    },
    {
      icon: <Shield className="w-12 h-12 text-neon" />,
      title: "Academy Management",
      description: "Run your sports academy efficiently with student tracking, curriculum management, and progress monitoring."
    },
    {
      icon: <Target className="w-12 h-12 text-neon" />,
      title: "Performance Analytics",
      description: "Get detailed insights into player and team performance with advanced analytics and visualization tools."
    }
  ];

  const benefits = [
    {
      icon: <Award className="w-8 h-8 text-neon" />,
      title: "Professional Growth",
      description: "Track your progress and improve your game with personalized insights and recommendations."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-neon" />,
      title: "Career Development",
      description: "Connect with scouts, academies, and teams to advance your sports career."
    },
    {
      icon: <Globe className="w-8 h-8 text-neon" />,
      title: "Global Network",
      description: "Join a community of players, coaches, and sports enthusiasts from around the world."
    },
    {
      icon: <Zap className="w-8 h-8 text-neon" />,
      title: "Real-time Updates",
      description: "Stay updated with live match scores, tournament updates, and community news."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Video Background */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 z-0 bg-black">
          <div className="video-container h-full w-full">
            <video 
              ref={videoRef}
              className="w-full h-full object-cover opacity-40"
              autoPlay 
              muted 
              loop 
              playsInline
            >
              <source src="https://assets.mixkit.co/videos/preview/mixkit-cricket-player-hitting-the-ball-40317-large.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block">Transform Your Sports Journey</span>
              <span className="block text-neon text-shadow-neon">With SportsIn</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Join thousands of athletes, coaches, and sports enthusiasts in revolutionizing how sports are managed and played.
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/signup"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-neon hover:bg-opacity-90 md:py-4 md:text-lg md:px-10 animate-glow"
                >
                  Get Started Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-900 bg-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Comprehensive Sports Management
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Everything you need to excel in your sports journey
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="relative group animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-neon to-green-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative px-7 py-6 bg-black ring-1 ring-gray-700 rounded-lg leading-none flex items-top justify-start space-x-6">
                    <div className="space-y-4">
                      <div>{feature.icon}</div>
                      <h3 className="text-xl font-semibold text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Video Section */}
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:flex lg:items-center lg:space-x-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-extrabold text-white">
                See SportsIn.in <span className="text-neon">in Action</span>
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Watch how our platform transforms sports management and connects athletes, coaches, and academies in a seamless digital ecosystem.
              </p>
              <div className="mt-8">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-black bg-neon hover:bg-opacity-90"
                >
                  Join Now
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <div className="video-container rounded-lg overflow-hidden border-2 border-neon shadow-lg shadow-neon/20">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay 
                  muted 
                  loop 
                  playsInline
                >
                  <source src="https://assets.mixkit.co/videos/preview/mixkit-cricket-player-hitting-the-ball-40317-large.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-24 bg-gradient-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Why Choose <span className="text-neon">SportsIn.in</span>?
            </h2>
            <p className="mt-4 text-lg text-gray-300">
              Unlock your potential with our comprehensive platform
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 transform transition-all duration-300 hover:translate-x-2">
                  <div className="flex-shrink-0 bg-gray-800 p-3 rounded-lg">
                    {benefit.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">
                      {benefit.title}
                    </h3>
                    <p className="mt-2 text-gray-300">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-white">
              What Our Users Say
            </h2>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                quote: "SportsIn.in transformed how I manage my cricket academy. The platform streamlines everything from player registrations to performance tracking.",
                author: "Rahul Sharma",
                role: "Academy Director",
                avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format"
              },
              {
                quote: "As a player, I've connected with top coaches and academies through SportsIn.in. The performance analytics have helped me improve my game significantly.",
                author: "Priya Patel",
                role: "Professional Cricketer",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format"
              },
              {
                quote: "Organizing tournaments used to be a nightmare. With SportsIn.in, we can manage everything from team registrations to live scoring seamlessly.",
                author: "Michael Rodriguez",
                role: "Tournament Organizer",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gray-900 p-6 rounded-lg border border-gray-800 hover:border-neon transition-all duration-300">
                <div className="flex items-start mb-4">
                  <div className="text-4xl text-neon">"</div>
                </div>
                <p className="text-gray-300 mb-6">{testimonial.quote}</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover border-2 border-neon"
                  />
                  <div className="ml-3">
                    <h4 className="text-white font-medium">{testimonial.author}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-neon text-shadow-neon">Join SportsIn.in today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-neon hover:bg-opacity-90 animate-pulse-neon"
              >
                Sign up now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;