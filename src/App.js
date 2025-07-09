import React, { useState, useEffect } from 'react';
import { CheckCircle, Award, Palette, Zap, ExternalLink, Trophy, Calendar, MessageCircle, Twitter, Clock, BarChart3 } from 'lucide-react';

const App = () => {
  const [completedSteps, setCompletedSteps] = useState(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const [currentDate] = useState(new Date());

  // Get today's date as string (YYYY-MM-DD format)
  const getTodayDateString = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Load progress from localStorage on component mount
  useEffect(() => {
    const todayDateString = getTodayDateString();
    const savedProgress = JSON.parse(localStorage.getItem('nativeProgress') || '{"steps": [], "date": ""}');

    // If the saved date is different from today, reset progress
    if (savedProgress.date !== todayDateString) {
      setCompletedSteps(new Set());
      // Save empty progress with today's date
      const newProgress = {
        steps: [],
        date: todayDateString
      };
      localStorage.setItem('nativeProgress', JSON.stringify(newProgress));
    } else {
      // Load existing progress if it's from today
      setCompletedSteps(new Set(savedProgress.steps));
    }
  }, []);

  // Save progress to localStorage with current date
  const saveProgress = (steps) => {
    const progress = {
      steps: Array.from(steps),
      date: getTodayDateString()
    };
    localStorage.setItem('nativeProgress', JSON.stringify(progress));
  };

  const toggleStep = (stepId) => {
    const newCompletedSteps = new Set(completedSteps);
    if (newCompletedSteps.has(stepId)) {
      newCompletedSteps.delete(stepId);
    } else {
      newCompletedSteps.add(stepId);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
    setCompletedSteps(newCompletedSteps);
    saveProgress(newCompletedSteps);
  };

  const dailyTasks = [
    {
      id: 'testnet-swap',
      title: 'Test Network Swaps',
      description: 'Swap SUI for nBTC and back on the Native testnet to help test the protocol.',
      link: 'https://byield.gonative.cc/',
      icon: <Zap className="w-5 h-5" />,
      streak: false,
      category: 'Testing'
    },
    {
      id: 'daily-claim',
      title: 'Daily Claim',
      description: 'Claim your daily rewards in Discord #bot-commands using /claim daily command to earn points.',
      link: 'https://discord.com/channels/1262723650424016946/1262758096032497735',
      icon: <Calendar className="w-5 h-5" />,
      streak: true,
      category: 'Discord'
    },
    {
      id: 'discord-activity',
      title: 'Discord Engagement',
      description: 'Stay active in Discord community - chat, react, and engage with other BeeLievers.',
      link: 'https://discord.com/channels/1262723650424016946/1262757322816753674',
      icon: <MessageCircle className="w-5 h-5" />,
      streak: true,
      category: 'Discord'
    },
    {
      id: 'twitter-engagement',
      title: 'Twitter Activity',
      description: 'Like, retweet, and comment on Native posts to support the community daily.',
      link: 'https://x.com/gonativecc',
      icon: <Twitter className="w-5 h-5" />,
      streak: true,
      category: 'Social'
    }
  ];

  const optionalRoles = [
    {
      id: 'artist',
      title: 'Bee Artist role',
      description: 'Create Native-themed artwork and share it with the community.',
      links: [
        { name: 'PicsArt Editor', url: 'https://picsart.com/create/editor' },
        { name: 'Online Photoshop', url: 'https://online-photoshop.org/edit/' },
        { name: 'Discord Art Channel', url: 'https://discord.com/channels/1262723650424016946/1350890512273379360' }
      ],
      icon: <Palette className="w-5 h-5" />,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'meme',
      title: 'Native LOLs role',
      description: 'Create and share memes about Native to spread the buzz.',
      links: [
        { name: 'ImgFlip Meme Generator', url: 'https://imgflip.com/memegenerator' },
        { name: 'ILoveImg', url: 'https://www.iloveimg.com/meme-generator' },
        { name: 'Discord Meme Channel', url: 'https://discord.com/channels/1262723650424016946/1350890512273379360' }
      ],
      icon: <Trophy className="w-5 h-5" />,
      color: 'from-orange-500 to-red-500'
    },
    {
      id: 'angel',
      title: 'Bee Angel role',
      description: 'Reach 1000 points through daily activities and unlock the Bee Angel role.',
      links: [
        { name: 'Discord Bot commands', url: 'https://discord.com/channels/1262723650424016946/1262758096032497735' },
        { name: 'Discord Engage', url: 'https://discord.com/channels/1262723650424016946/1358750604738035895'},
        { name: 'Discord Most Gaming', url: 'https://discord.com/channels/1262723650424016946/1350185075941179494' }
      ],
      icon: <Award className="w-5 h-5" />,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'tutorial',
      title: 'Native Tutorial',
      description: 'Learn about Native protocol through interactive tutorials and guides.',
      links: [
        { name: 'Start Tutorial', url: 'https://native-tutorial.vercel.app/' },
        { name: 'Discord Support', url: 'https://discord.com/channels/1262723650424016946/1262758069671297114' }
      ],
      icon: <div className="w-5 h-5 flex items-center justify-center text-sm font-bold">📚</div>,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: 'game',
      title: 'Native Game',
      description: 'Play the Native game beta and have fun while learning about the ecosystem.',
      links: [
        { name: 'Play Game', url: 'https://native-game-beta.vercel.app/' },
      ],
      icon: <div className="w-5 h-5 flex items-center justify-center text-sm font-bold">🎮</div>,
      color: 'from-green-500 to-emerald-600'
    },
  ];

  const completedDaily = dailyTasks.filter(task => completedSteps.has(task.id)).length;
  const isBeeLiever = completedDaily === 4;
  const progress = (completedDaily / dailyTasks.length) * 100;

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Celebration Animation */}
        {showCelebration && (
            <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
              <div className="bg-white rounded-full p-6 sm:p-8 shadow-2xl animate-bounce">
                <div className="text-3xl sm:text-4xl">🎉</div>
              </div>
            </div>
        )}

        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <img
                        src="https://cdn.prod.website-files.com/669384bb0581e8c6129231e2/67bf1112fc4903408ccf32bb_mascu1.png"
                        alt="Native Bee Mascot"
                        className="w-10 h-10 sm:w-14 sm:h-14"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
                    BeeLiever Diary
                  </h1>
                  <p className="text-gray-600 text-base sm:text-lg">
                    {formatDate(currentDate)}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between sm:justify-end space-x-2 sm:space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-2 sm:px-4">
                  <Clock className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-600">
                  {new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit'})}
                </span>
                </div>
                <div className="flex items-center space-x-2 bg-yellow-100 rounded-full px-3 py-2 sm:px-4">
                  <BarChart3 className="w-4 h-4 text-yellow-600" />
                  <span className="text-sm font-medium text-yellow-800">
                  {completedDaily}/{dailyTasks.length} completed
                </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
          {/* Progress Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0 mb-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Today's Progress</h2>
                <p className="text-gray-600">Keep up the great work, BeeLiever!</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-center sm:text-right">
                  <div className="text-2xl sm:text-3xl font-bold text-gray-900">{Math.round(progress)}%</div>
                  <div className="text-sm text-gray-600">Complete</div>
                </div>
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center">
                  <span className="text-xl sm:text-2xl">{isBeeLiever ? '🏆' : '🐝'}</span>
                </div>
              </div>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-6">
              <div
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 h-2 sm:h-3 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
              ></div>
            </div>

            {isBeeLiever && (
                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-4 sm:p-6 text-center">
                  <div className="text-xl sm:text-2xl mb-2">🎉</div>
                  <p className="text-base sm:text-lg font-semibold text-gray-900">
                    Congratulations! You're a true BeeLiever today!
                  </p>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base">
                    You've completed all of your daily activities
                  </p>
                </div>
            )}
          </div>

          {/* Daily Tasks */}
          <div className="mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Daily Activities</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Live tracking</span>
              </div>
            </div>

            <div className="grid gap-4 sm:gap-6 lg:grid-cols-2">
              {dailyTasks.map((task) => (
                  <div key={task.id} className="group">
                    <div className={`
                  bg-white rounded-2xl border-2 transition-all duration-300 p-4 sm:p-6 hover:shadow-lg
                  ${completedSteps.has(task.id)
                        ? 'border-green-200 bg-green-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }
                `}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start space-x-3 sm:space-x-4 flex-1">
                          <div className={`
                        w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-all duration-300 flex-shrink-0
                        ${completedSteps.has(task.id)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                          }
                      `}>
                            {completedSteps.has(task.id) ? (
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                            ) : (
                                task.icon
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-3 mb-2">
                              <h3 className="text-base sm:text-lg font-semibold text-gray-900">{task.title}</h3>
                              <div className="flex items-center space-x-2">
                                {task.streak && (
                                    <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full font-medium">
                                Daily
                              </span>
                                )}
                                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                              {task.category}
                            </span>
                              </div>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {task.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
                        <a
                            href={task.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                          <span>Open</span>
                        </a>

                        <button
                            onClick={() => toggleStep(task.id)}
                            className={`
                        w-full sm:w-auto px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm
                        ${completedSteps.has(task.id)
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }
                      `}
                        >
                          {completedSteps.has(task.id) ? 'Completed' : 'Mark Done'}
                        </button>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Optional Roles */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Optional Activities</h2>

            <div className="grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {optionalRoles.map((role) => (
                  <div key={role.id} className="bg-white rounded-2xl border border-gray-200 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex items-start space-x-3 sm:space-x-4 mb-4">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${role.color} flex items-center justify-center text-white flex-shrink-0`}>
                        {role.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">{role.title}</h3>
                        <p className="text-gray-600 text-sm">
                          {role.description}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {role.links.map((link, index) => (
                          <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors text-sm"
                          >
                            <ExternalLink className="w-4 h-4 flex-shrink-0" />
                            <span className="truncate">{link.name}</span>
                          </a>
                      ))}
                    </div>
                  </div>
              ))}
            </div>
          </div>

          {/* Stats Summary */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Daily Summary</h2>

            <div className="grid grid-cols-2 gap-4 sm:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">📊</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {completedDaily}
                </div>
                <p className="text-gray-600 text-sm sm:text-base">Tasks completed today</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <span className="text-xl sm:text-2xl">{isBeeLiever ? '🏆' : '🎯'}</span>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">
                  {isBeeLiever ? 'Achieved' : 'In Progress'}
                </div>
                <p className="text-gray-600 text-sm sm:text-base">BeeLiever status</p>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;
