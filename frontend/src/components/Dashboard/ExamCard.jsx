import React, { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../contexts/ThemeContext';
import { FileText, Edit3, Trash2, Calendar, Users, Clock, Check, X } from 'lucide-react';

const ExamCard = ({ exam, onClick, onDelete, onRename }) => {
  const cardRef = useRef();
  const deleteBtnRef = useRef();
  const editBtnRef = useRef();
  const { isDark } = useTheme();

  // Local state for editing
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(exam.name);

  // Reset local name if prop changes
  useEffect(() => {
    setEditedName(exam.name);
  }, [exam.name]);

  const handleMouseEnter = () => {
    if (isEditing) return; // Don't animate if editing
    gsap.to(cardRef.current, {
      scale: 1.02,
      y: -5,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
    
    gsap.to([deleteBtnRef.current, editBtnRef.current], {
      opacity: 1,
      scale: 1,
      duration: 0.2,
      stagger: 0.05
    });
  };

  const handleMouseLeave = () => {
    if (isEditing) return;
    gsap.to(cardRef.current, {
      scale: 1,
      y: 0,
      duration: 0.3,
      ease: 'back.out(1.7)'
    });
    
    gsap.to([deleteBtnRef.current, editBtnRef.current], {
      opacity: 0,
      scale: 0.8,
      duration: 0.15
    });
  };

  const handleClick = (e) => {
    // Prevent navigation if we are editing or clicking buttons
    if (isEditing || e.target.closest('button') || e.target.closest('input')) return;
    onClick(exam.id);
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    
    // Enhanced delete animation
    const tl = gsap.timeline();
    tl.to(cardRef.current, {
      scale: 0.8,
      opacity: 0,
      rotation: -5,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => onDelete && onDelete(exam.id)
    });
  };

  const startEditing = (e) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const cancelEditing = (e) => {
    e.stopPropagation();
    setEditedName(exam.name);
    setIsEditing(false);
  };

  const saveEditing = (e) => {
    e.stopPropagation();
    if (onRename && editedName.trim() !== "") {
      onRename(exam.id, editedName);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') saveEditing(e);
    if (e.key === 'Escape') cancelEditing(e);
  };

  // Mock data for demo (keeping consistent)
  const studentCount = React.useMemo(() => Math.floor(Math.random() * 500) + 100, []);
  const duration = React.useMemo(() => `${Math.floor(Math.random() * 3) + 1}h ${Math.floor(Math.random() * 60)}m`, []);

  return (
    <div
      id={`exam-${exam.id}`}
      ref={cardRef}
      className={`bento-card exam-card group relative rounded-2xl p-6 cursor-pointer transition-all duration-300 border-2 backdrop-blur-sm ${
        isDark
          ? 'bg-gray-800/60 border-gray-700 hover:border-blue-500/50 hover:bg-gray-750/80 shadow-2xl'
          : 'bg-white/80 border-gray-200 hover:border-blue-400/50 hover:bg-white shadow-xl'
      } ${isEditing ? 'ring-2 ring-blue-500 border-blue-500 scale-105 z-30' : ''}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      {/* Action Buttons */}
      <div className={`absolute top-4 right-4 flex gap-2 z-20 transition-opacity duration-200 ${isEditing ? 'opacity-100' : ''}`}>
        {isEditing ? (
          <>
             <button
              className="p-2 bg-green-500/20 rounded-xl hover:bg-green-500/30 text-green-500 backdrop-blur-sm transition-all hover:scale-110"
              onClick={saveEditing}
            >
              <Check className="w-4 h-4" />
            </button>
            <button
              className="p-2 bg-red-500/20 rounded-xl hover:bg-red-500/30 text-red-500 backdrop-blur-sm transition-all hover:scale-110"
              onClick={cancelEditing}
            >
              <X className="w-4 h-4" />
            </button>
          </>
        ) : (
          <>
            <button
              ref={editBtnRef}
              className={`opacity-0 scale-80 p-2 rounded-xl transition-all duration-200 backdrop-blur-sm hover:scale-110 ${
                isDark ? 'bg-gray-700/80 hover:bg-gray-600/80' : 'bg-white/80 hover:bg-gray-100/80 shadow-sm'
              }`}
              onClick={startEditing}
            >
              <Edit3 className={`w-4 h-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`} />
            </button>
            <button
              ref={deleteBtnRef}
              className="opacity-0 scale-80 p-2 bg-red-500/20 rounded-xl hover:bg-red-500/30 transition-all duration-200 backdrop-blur-sm hover:scale-110"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
          </>
        )}
      </div>

      {/* Card Content */}
      <div className="flex flex-col h-full">
        {/* Icon */}
        <div className={`w-14 h-14 mb-4 rounded-2xl flex items-center justify-center transition-transform duration-300 ${!isEditing && 'group-hover:scale-110'} ${
          isDark ? 'bg-blue-500/20' : 'bg-blue-100/80'
        }`}>
          <FileText className={`w-7 h-7 ${
            isDark ? 'text-blue-400' : 'text-blue-600'
          }`} />
        </div>
        
        {/* Title Area - Swaps between Text and Input */}
        <div className="mb-3 relative min-h-[32px]">
          {isEditing ? (
            <input
              autoFocus
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
              onKeyDown={handleKeyDown}
              onClick={(e) => e.stopPropagation()}
              className={`w-full bg-transparent font-bold text-xl outline-none border-b-2 ${
                isDark ? 'text-white border-blue-500 placeholder-gray-500' : 'text-gray-900 border-blue-500 placeholder-gray-400'
              }`}
              placeholder="Exam Name"
            />
          ) : (
            <h3 className={`font-bold text-xl tracking-tight line-clamp-2 ${
              isDark ? 'text-gray-100' : 'text-gray-900'
            }`}>
              {exam.name}
            </h3>
          )}
        </div>
        
        {/* Stats */}
        <div className="space-y-2 mb-4">
          <div className={`flex items-center gap-2 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Users className="w-4 h-4" />
            <span>{studentCount.toLocaleString()} students</span>
          </div>
          <div className={`flex items-center gap-2 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <Clock className="w-4 h-4" />
            <span>{duration}</span>
          </div>
        </div>

        {/* Date & Footer */}
        <div className="mt-auto pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <div className={`flex items-center gap-2 text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`}>
            <Calendar className="w-4 h-4" />
            <span>Created {new Date(exam.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>
    </div>
  );
};

export default ExamCard;