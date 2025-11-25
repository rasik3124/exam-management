import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../../contexts/ThemeContext'
import { X, FileText, Sparkles } from 'lucide-react';

const AddExamModal = ({ isOpen, onClose, onAddExam }) => {
  const [examName, setExamName] = useState('');
  const modalRef = useRef();
  const overlayRef = useRef();
  const formRef = useRef();
  const { isDark } = useTheme();

  useEffect(() => {
    if (isOpen) {
      const tl = gsap.timeline();
      tl.set(modalRef.current, { display: 'flex' })
        .fromTo(overlayRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        )
        .fromTo(modalRef.current,
          { opacity: 0, scale: 0.8, y: 50, rotationX: 15 },
          { opacity: 1, scale: 1, y: 0, rotationX: 0, duration: 0.5, ease: 'back.out(1.7)' },
          '-=0.2'
        )
        .fromTo(formRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4 },
          '-=0.2'
        );
    }
  }, [isOpen]);

  const handleClose = () => {
    const tl = gsap.timeline();
    tl.to(modalRef.current, {
      opacity: 0,
      scale: 0.9,
      y: 30,
      duration: 0.3,
      ease: 'power2.in'
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        onClose();
        setExamName('');
      }
    }, '-=0.2');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (examName.trim()) {
      // Submit animation
      const tl = gsap.timeline();
      tl.to(formRef.current, {
        scale: 0.95,
        duration: 0.1
      })
      .to(formRef.current, {
        scale: 1,
        duration: 0.2,
        ease: 'back.out(1.7)',
        onComplete: () => {
          onAddExam(examName.trim());
          handleClose();
        }
      });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-black/60 backdrop-blur-lg z-50"
        onClick={handleClose}
      />
      
      <div
        ref={modalRef}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={handleClose}
      >
        <div
          className={`rounded-3xl p-8 max-w-md w-full shadow-2xl border-2 backdrop-blur-lg ${
            isDark
              ? 'bg-gray-800/90 border-gray-700'
              : 'bg-white/95 border-gray-200'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className={`p-3 rounded-2xl ${
              isDark ? 'bg-blue-500/20' : 'bg-blue-100'
            }`}>
              <FileText className={`w-6 h-6 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`} />
            </div>
            <div className="flex-1">
              <h2 className={`text-2xl font-bold ${
                isDark ? 'text-gray-100' : 'text-gray-900'
              }`}>
                Create New Exam
              </h2>
              <p className={`text-sm mt-1 ${
                isDark ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Start organizing your examination process
              </p>
            </div>
            <button
              onClick={handleClose}
              className={`p-3 rounded-2xl transition-all duration-200 hover:scale-110 ${
                isDark
                  ? 'hover:bg-gray-700 text-gray-400'
                  : 'hover:bg-gray-100 text-gray-500'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className={`block text-sm font-semibold mb-3 ${
                isDark ? 'text-gray-300' : 'text-gray-700'
              }`}>
                Exam Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={examName}
                  onChange={(e) => setExamName(e.target.value)}
                  placeholder="e.g., Final Examinations 2024"
                  className={`w-full px-4 py-4 rounded-2xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-blue-500/30 ${
                    isDark
                      ? 'bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500'
                      : 'bg-white/80 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
                  }`}
                  autoFocus
                />
                {examName && (
                  <Sparkles className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-yellow-500" />
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={handleClose}
                className={`flex-1 px-6 py-4 rounded-2xl font-semibold transition-all duration-200 hover:scale-105 ${
                  isDark
                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!examName.trim()}
                className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Create Exam
              </button>
            </div>
          </form>

          {/* Background Effects */}
          <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 -z-10`}></div>
        </div>
      </div>
    </>
  );
};

export default AddExamModal;