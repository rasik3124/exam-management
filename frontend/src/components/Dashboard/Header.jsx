import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../contexts/ThemeContext';
import GradientText from '../GradientText';

const Header = () => {
  const { isDark } = useTheme();  
  const title = "Exam Dashboard";
  
  return (
    <header className="header-section mb-12 py-8">
      <div className="text-center mb-8">
         
        
        <GradientText
          colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
          animationSpeed={4}>
          <h1 className="header-title text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
            {title}
          </h1>
        </GradientText>
        
        
        <GradientText
          colors={["#6366f1", "#8b5cf6", "#ec4899", "#8b5cf6", "#6366f1"]}
          animationSpeed={4}
          showBorder={false}
          className="subtitle text-xl md:text-2xl lg:text-3xl font-light max-w-4xl mx-auto leading-relaxed opacity-90"
        >
          Create and manage your exam allocations with precision and efficiency
        </GradientText>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
        {[
          { label: 'Active Exams', value: '12', icon: '📊' },
          { label: 'Total Rooms', value: '48', icon: '🏫' },
          { label: 'Students', value: '1.2K', icon: '👨‍🎓' },
          { label: 'Success Rate', value: '98%', icon: '🎯' }
        ].map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-2xl backdrop-blur-sm border-2 transition-all duration-300 hover:scale-105 ${
              isDark
                ? 'bg-gray-800/40 border-gray-700 hover:border-purple-500/50'
                : 'bg-white/60 border-gray-200 hover:border-purple-400/50'
            }`}
          >
            <div className="text-3xl mb-3">{stat.icon}</div>
            <div className={`text-2xl font-bold mb-1 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {stat.value}
            </div>
            <div className={`text-sm font-medium ${
              isDark ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </header>
  );
};

export default Header;