import type { Sport, UserType } from '../types';

export interface MockUser {
  id: string;
  username: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  sport: Sport;
  user_type: UserType;
  bio?: string;
  location?: string;
  website?: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created_at: string;
}

export interface MockPost {
  id: string;
  user_id: string;
  content: string;
  media_url?: string;
  media_type?: 'image' | 'video';
  likes_count: number;
  comments_count: number;
  created_at: string;
  author: {
    username: string;
    avatar_url: string;
    role: string;
  };
}

export interface MockTeam {
  id: string;
  name: string;
  city: string;
  members: number;
  wins: number;
  losses: number;
  logo: string;
  description: string;
  achievements: string[];
}

export interface MockTournament {
  id: string;
  name: string;
  format: string;
  teams: number;
  startDate: string;
  venue: string;
  status: 'upcoming' | 'ongoing' | 'completed';
  description: string;
  prize: string;
  registrationOpen: boolean;
  image: string;
}

export interface MockMatch {
  id: string;
  team1: {
    name: string;
    score: string;
    logo: string;
  };
  team2: {
    name: string;
    score: string;
    logo: string;
  };
  date: string;
  time: string;
  venue: string;
  format: string;
  status: 'completed' | 'upcoming';
  result?: string;
}

// Mock Users
export const mockUsers: Record<string, MockUser> = {
  'user-1': {
    id: 'user-1',
    username: 'cricketpro',
    email: 'cricketpro@example.com',
    full_name: 'Cricket Pro',
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&auto=format',
    sport: 'Cricket',
    user_type: 'Player',
    bio: 'Professional cricket player with 10+ years experience',
    location: 'Mumbai, India',
    followers_count: 15200,
    following_count: 482,
    posts_count: 245,
    created_at: '2024-01-15T10:00:00Z'
  },
  'user-2': {
    id: 'user-2',
    username: 'footballstar',
    email: 'footballstar@example.com',
    full_name: 'Football Star',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
    sport: 'Football',
    user_type: 'Player',
    bio: 'Midfielder with passion for the beautiful game',
    location: 'London, UK',
    followers_count: 8500,
    following_count: 320,
    posts_count: 156,
    created_at: '2024-02-20T14:30:00Z'
  },
  'user-3': {
    id: 'user-3',
    username: 'basketballace',
    email: 'basketballace@example.com',
    full_name: 'Basketball Ace',
    avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&auto=format',
    sport: 'Basketball',
    user_type: 'Player',
    bio: 'Point guard with killer crossover',
    location: 'Los Angeles, USA',
    followers_count: 12800,
    following_count: 650,
    posts_count: 189,
    created_at: '2024-01-08T09:15:00Z'
  }
};

// Mock Posts by Sport
export const mockPosts: Record<Sport, MockPost[]> = {
  Cricket: [
    {
      id: 'post-1',
      user_id: 'user-1',
      content: 'Looking for cricket players for weekend practice sessions. All skill levels welcome! Location: Central Sports Complex',
      media_url: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&h=400&fit=crop&auto=format',
      media_type: 'image',
      likes_count: 24,
      comments_count: 8,
      created_at: '2025-01-15T10:00:00Z',
      author: {
        username: 'Sarah Johnson',
        avatar_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&auto=format',
        role: 'Cricket Coach'
      }
    },
    {
      id: 'post-2',
      user_id: 'user-1',
      content: 'New batting techniques workshop this weekend. Limited spots available!',
      media_url: 'https://assets.mixkit.co/videos/preview/mixkit-cricket-player-hitting-the-ball-40317-large.mp4',
      media_type: 'video',
      likes_count: 45,
      comments_count: 12,
      created_at: '2025-01-14T15:30:00Z',
      author: {
        username: 'Cricket Academy Pro',
        avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&auto=format',
        role: 'Professional Academy'
      }
    }
  ],
  Football: [
    {
      id: 'post-3',
      user_id: 'user-2',
      content: 'Seeking players for our amateur football league. Training sessions every Tuesday and Thursday.',
      media_url: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&h=400&fit=crop&auto=format',
      media_type: 'image',
      likes_count: 32,
      comments_count: 15,
      created_at: '2025-01-15T12:00:00Z',
      author: {
        username: 'Mike Wilson',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&auto=format',
        role: 'Football Coach'
      }
    },
    {
      id: 'post-4',
      user_id: 'user-2',
      content: 'Check out our new training facilities! Open house this weekend for all interested players.',
      media_url: 'https://assets.mixkit.co/videos/preview/mixkit-soccer-player-dribbling-a-ball-40377-large.mp4',
      media_type: 'video',
      likes_count: 67,
      comments_count: 23,
      created_at: '2025-01-14T09:45:00Z',
      author: {
        username: 'Football Academy Elite',
        avatar_url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&auto=format',
        role: 'Professional Academy'
      }
    }
  ],
  Basketball: [
    {
      id: 'post-5',
      user_id: 'user-3',
      content: 'Join our summer basketball camp! Improve your skills with professional coaches.',
      media_url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop&auto=format',
      media_type: 'image',
      likes_count: 56,
      comments_count: 23,
      created_at: '2025-01-15T16:20:00Z',
      author: {
        username: 'Basketball Elite',
        avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=100&h=100&fit=crop&auto=format',
        role: 'Professional Academy'
      }
    },
    {
      id: 'post-6',
      user_id: 'user-3',
      content: 'New advanced dribbling techniques workshop starting next week. Limited spots available!',
      media_url: 'https://assets.mixkit.co/videos/preview/mixkit-basketball-player-dribbling-then-dunking-40659-large.mp4',
      media_type: 'video',
      likes_count: 42,
      comments_count: 18,
      created_at: '2025-01-14T11:10:00Z',
      author: {
        username: 'Hoops Academy',
        avatar_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=100&h=100&fit=crop&auto=format',
        role: 'Basketball Training Center'
      }
    }
  ]
};

// Mock Teams by Sport
export const mockTeams: Record<Sport, MockTeam[]> = {
  Cricket: [
    {
      id: 'team-1',
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
      id: 'team-2',
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
      id: 'team-3',
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
      id: 'team-4',
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
      id: 'team-5',
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
      id: 'team-6',
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
      id: 'team-7',
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
      id: 'team-8',
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
      id: 'team-9',
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

// Mock Tournaments by Sport
export const mockTournaments: Record<Sport, MockTournament[]> = {
  Cricket: [
    {
      id: 'tournament-1',
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
      id: 'tournament-2',
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
      id: 'tournament-3',
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
      id: 'tournament-4',
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
      id: 'tournament-5',
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
      id: 'tournament-6',
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
      id: 'tournament-7',
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
      id: 'tournament-8',
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
      id: 'tournament-9',
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

// Mock Matches
export const mockMatches: MockMatch[] = [
  {
    id: 'match-1',
    team1: {
      name: 'Thunder Kings',
      score: '186/4',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=100&h=100&q=80',
    },
    team2: {
      name: 'Royal Challengers',
      score: '184/7',
      logo: 'https://images.unsplash.com/photo-1584714268709-c3dd9c92b378?auto=format&fit=crop&w=100&h=100&q=80',
    },
    date: 'March 15, 2025',
    time: '14:30',
    venue: 'Central Stadium',
    format: 'T20',
    status: 'completed',
    result: 'Thunder Kings won by 2 runs',
  },
  {
    id: 'match-2',
    team1: {
      name: 'Phoenix Warriors',
      score: '-',
      logo: 'https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&w=100&h=100&q=80',
    },
    team2: {
      name: 'Thunder Kings',
      score: '-',
      logo: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=100&h=100&q=80',
    },
    date: 'March 20, 2025',
    time: '15:00',
    venue: 'Sports Complex',
    format: 'ODI',
    status: 'upcoming',
  },
];

// Default current user
export const defaultUser: MockUser = mockUsers['user-1'];

// Local storage keys
export const STORAGE_KEYS = {
  CURRENT_USER: 'sportsin_current_user',
  USER_POSTS: 'sportsin_user_posts',
  LIKED_POSTS: 'sportsin_liked_posts',
  FOLLOWED_USERS: 'sportsin_followed_users'
};