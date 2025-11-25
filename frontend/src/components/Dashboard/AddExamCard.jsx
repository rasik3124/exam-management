import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../contexts/ThemeContext'
import { Plus } from 'lucide-react';

const AddExamCard = ({ onAddExam }) => {
  const cardRef = useRef();
  const { isDark } = useTheme();

  const handleMouseEnter = () => {
    gsap.to(cardRef.current, {
      scale: 1.02,
      y: -5,
      rotation: 1,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      rotation: 0,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
  };

  const handleClick = () => {
    const tl = gsap.timeline();
    tl.to(cardRef.current, {
      scale: 0.95,
      duration: 0.1,
      ease: 'power2.in'
    })
    .to(cardRef.current, {
      scale: 1.05,
      duration: 0.2,
      ease: 'back.out(1.7)'
    })
    .to(cardRef.current, {
      scale: 1,
      duration: 0.1,
      onComplete: onAddExam
    });
  };

  return (
    <div
      ref={cardRef}
      className={`exam-card group relative rounded-2xl p-6 cursor-pointer border-2 border-dashed transition-all duration-300 backdrop-blur-sm ${
        isDark
          ? 'border-gray-600 hover:border-green-400/50 bg-gray-800/40 hover:bg-gray-750/60 shadow-2xl'
          : 'border-gray-300 hover:border-green-400/50 bg-white/60 hover:bg-white shadow-xl'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className={`w-16 h-16 mb-4 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-12 ${
          isDark
            ? 'bg-green-500/20 group-hover:bg-green-500/30'
            : 'bg-green-100/80 group-hover:bg-green-200/80'
        }`}>
          <Plus className={`w-8 h-8 ${
            isDark ? 'text-green-400' : 'text-green-600'
          }`} />
        </div>
        
        <h3 className={`font-bold text-xl mb-3 tracking-tight ${
          isDark ? 'text-gray-100' : 'text-gray-900'
        }`}>
          Create New Exam
        </h3>
        
        <p className={`text-sm leading-relaxed ${
          isDark ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Start a new examination project with advanced allocation features
        </p>

        {/* Animated Plus Pattern */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-green-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
      </div>
    </div>
  );
};

export default AddExamCard;