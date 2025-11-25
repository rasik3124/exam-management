import React from 'react';

const GradientText = ({
  children,
  className = '',
  colors = ['#6366f1', '#8b5cf6', '#ec4899', '#8b5cf6', '#6366f1'],
  animationSpeed = 4,
  showBorder = false
}) => {
  const gradientStyle = {
    backgroundImage: `linear-gradient(135deg, ${colors.join(', ')})`,
    animationDuration: `${animationSpeed}s`,
    backgroundSize: '300% 300%'
  };

  return (
    <div className={`relative inline-flex ${className}`}>
      {showBorder && (
        <div
          className="absolute inset-0 rounded-2xl animate-gradient z-0"
          style={gradientStyle}
        >
          <div className="absolute inset-[2px] bg-slate-900 rounded-2xl"></div>
        </div>
      )}
      
      <div
        className="relative z-10 text-transparent bg-clip-text animate-gradient font-semibold"
        style={gradientStyle}
      >
        {children}
      </div>
    </div>
  );
};

export default GradientText;