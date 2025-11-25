import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import { ParticleCard } from '../MagicBento';
import ExamCard from './ExamCard';

const ExamGrid = ({ 
  exams, 
  onExamClick, 
  onAddExam, 
  onDeleteExam,
  onRenameExam
}) => {

  const { isDark } = useTheme();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

      {/* Add Exam Card */}
      <ParticleCard
        enableTilt={true}
        clickEffect={true}
        enableBorderGlow={true}
        particleCount={4}
        className="w-full"
      >
        <div
          className={`exam-card p-6 rounded-2xl border-2 border-dashed transition-all duration-300 cursor-pointer group backdrop-blur-sm h-full flex flex-col items-center justify-center min-h-[200px] ${
            isDark
              ? 'bg-gray-800/40 border-gray-600 hover:border-blue-500/50 hover:bg-gray-700/60 shadow-2xl'
              : 'bg-white/60 border-gray-300 hover:border-blue-400/50 hover:bg-white/80 shadow-lg'
          }`}
          onClick={onAddExam}
        >
          <div className={`p-4 rounded-full mb-4 transition-all duration-300 group-hover:scale-110 ${
            isDark ? 'bg-blue-500/20' : 'bg-blue-100'
          }`}>
            <svg className={`w-8 h-8 ${isDark ? 'text-blue-400' : 'text-blue-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h3 className={`text-xl font-semibold text-center ${
            isDark ? 'text-gray-100' : 'text-gray-900'
          }`}>
            New Exam
          </h3>
          <p className={`text-sm text-center mt-2 ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Create a new examination
          </p>
        </div>
      </ParticleCard>

      {/* Render Actual Exams */}
      {exams.map((exam) => (
        <ParticleCard
          key={exam.id}
          enableTilt={false} 
          clickEffect={true}
          enableBorderGlow={true}
          particleCount={4}
          className="w-full"
        >
          <ExamCard 
            exam={exam}
            onClick={onExamClick}
            onDelete={onDeleteExam}
            onRename={onRenameExam}
          />
        </ParticleCard>
      ))}
    </div>
  );
};

export default ExamGrid;
