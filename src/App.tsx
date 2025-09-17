import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import SignIn from './pages/auth/SignIn';
import SignUp from './pages/auth/SignUp';
import AcademySetup from './pages/academy/AcademySetup';
import PlayerProfile from './pages/player/PlayerProfile';
import Discover from './pages/Discover';
import Teams from './pages/Teams';
import Tournaments from './pages/Tournaments';
import Community from './pages/Community';
import Chat from './pages/Chat';
import Dashboard from './pages/Dashboard';
import Matches from './pages/Matches';
import { useEffect } from 'react';
import { supabase } from './lib/supabase';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-neon text-xl">Loading...</p>
        </div>
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/signin" />;
}

function App() {
  const { user } = useAuth();

  useEffect(() => {
    // Handle email verification redirect
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (data.session?.user && !user) {
        // User just verified email, create profile if needed
        const userId = data.session.user.id;
        const metadata = data.session.user.user_metadata;
        
        if (metadata.username && metadata.sport && metadata.user_type) {
          try {
            // Check if profile already exists
            const { data: existingProfile } = await supabase
              .from('users')
              .select('id')
              .eq('id', userId)
              .single();

            if (!existingProfile) {
              // Create user profile
              await supabase.from('users').insert([
                {
                  id: userId,
                  username: metadata.username,
                  sport: metadata.sport,
                  user_type: metadata.user_type,
                  avatar_url: `https://ui-avatars.com/api/?name=${metadata.username}&background=39FF14&color=000000`,
                },
              ]);

              // Create initial player stats
              await supabase.from('player_stats').insert([
                {
                  user_id: userId,
                },
              ]);
            }
          } catch (error) {
            console.error('Error creating user profile after verification:', error);
          }
        }
      }
    };

    handleAuthCallback();
  }, [user]);

  return (
    <Router>
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={user ? <Navigate to="/home" /> : <About />} />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={user ? <Navigate to="/home" /> : <SignIn />} />
          <Route path="/signup" element={user ? <Navigate to="/home" /> : <SignUp />} />

          {/* Protected Routes */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/discover" element={<PrivateRoute><Discover results={[]} /></PrivateRoute>} />
          <Route path="/teams" element={<PrivateRoute><Teams /></PrivateRoute>} />
          <Route path="/tournaments" element={<PrivateRoute><Tournaments /></PrivateRoute>} />
          <Route path="/matches" element={<PrivateRoute><Matches /></PrivateRoute>} />
          <Route path="/community" element={<PrivateRoute><Community /></PrivateRoute>} />
          <Route path="/chat/:userId" element={<PrivateRoute><Chat /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><PlayerProfile /></PrivateRoute>} />
          <Route path="/academy-setup" element={<PrivateRoute><AcademySetup /></PrivateRoute>} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;