import React from 'react';
import { BarChart2, TrendingUp, Users2, Trophy, Activity } from 'lucide-react';

function Dashboard() {
  const stats = [
    {
      name: 'Total Matches',
      value: '24',
      change: '+12%',
      icon: <Activity className="h-6 w-6 text-neon" />,
    },
    {
      name: 'Win Rate',
      value: '68%',
      change: '+4%',
      icon: <TrendingUp className="h-6 w-6 text-neon" />,
    },
    {
      name: 'Team Members',
      value: '15',
      change: '+2',
      icon: <Users2 className="h-6 w-6 text-neon" />,
    },
    {
      name: 'Tournaments',
      value: '3',
      change: '+1',
      icon: <Trophy className="h-6 w-6 text-neon" />,
    },
  ];

  const recentMatches = [
    {
      id: 1,
      opponent: 'Thunder Kings',
      result: 'Won',
      score: '186/4 vs 182/8',
      date: 'Mar 10, 2025',
    },
    {
      id: 2,
      opponent: 'Phoenix Warriors',
      result: 'Lost',
      score: '145/8 vs 148/3',
      date: 'Mar 5, 2025',
    },
    {
      id: 3,
      opponent: 'Royal Challengers',
      result: 'Won',
      score: '192/6 vs 175/9',
      date: 'Feb 28, 2025',
    },
  ];

  const upcomingMatches = [
    {
      id: 1,
      opponent: 'Super Kings',
      date: 'Mar 15, 2025',
      time: '14:30',
      venue: 'Central Stadium',
    },
    {
      id: 2,
      opponent: 'Royal Strikers',
      date: 'Mar 20, 2025',
      time: '15:00',
      venue: 'Sports Complex',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl">
            Dashboard
          </h2>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-gray-800 overflow-hidden rounded-lg shadow border border-gray-700 hover:border-neon transition-colors"
          >
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">{stat.icon}</div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-400 truncate">
                      {stat.name}
                    </dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-white">
                        {stat.value}
                      </div>
                      <div className="ml-2 flex items-baseline text-sm font-semibold text-green-400">
                        {stat.change}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Recent Matches */}
        <div className="bg-gray-800 rounded-lg shadow border border-gray-700">
          <div className="p-6">
            <h3 className="text-lg font-medium text-white">Recent Matches</h3>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-700">
                {recentMatches.map((match) => (
                  <li key={match.id} className="py-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">
                          vs {match.opponent}
                        </p>
                        <p className="text-sm text-gray-400">{match.score}</p>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            match.result === 'Won'
                              ? 'bg-green-900 text-green-200'
                              : 'bg-red-900 text-red-200'
                          }`}
                        >
                          {match.result}
                        </span>
                        <p className="ml-4 text-sm text-gray-400">{match.date}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Upcoming Matches */}
        <div className="bg-gray-800 rounded-lg shadow border border-gray-700">
          <div className="p-6">
            <h3 className="text-lg font-medium text-white">Upcoming Matches</h3>
            <div className="mt-6 flow-root">
              <ul className="-my-5 divide-y divide-gray-700">
                {upcomingMatches.map((match) => (
                  <li key={match.id} className="py-5">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white">
                          vs {match.opponent}
                        </p>
                        <p className="text-sm text-gray-400">{match.venue}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-white">
                          {match.date}
                        </p>
                        <p className="text-sm text-gray-400">{match.time}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;