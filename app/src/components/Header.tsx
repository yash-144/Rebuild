'use client';

import React from 'react';
import { MissionStep } from '@/lib/types';
import { RotateCcw, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

interface HeaderProps {
  currentStep: MissionStep;
  onRestart: () => void;
  onNavigateStep?: (step: MissionStep) => void;
}

const STEPS: { id: MissionStep; label: string; number: number }[] = [
  { id: 'welcome', label: 'Mission', number: 1 },
  { id: 'attempt', label: 'First Attempt', number: 2 },
  { id: 'help', label: 'Progressive Help', number: 3 },
  { id: 'explain', label: 'Explain Back', number: 4 },
  { id: 'transfer', label: 'Rebuild', number: 5 },
  { id: 'result', label: 'Practice Outcome', number: 6 },
];

export const Header: React.FC<HeaderProps> = ({ currentStep, onRestart, onNavigateStep }) => {
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);

  return (
    <header style={{
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(10, 15, 29, 0.85)',
      backdropFilter: 'blur(12px)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
    }}>
      <div style={{
        maxWidth: 1040,
        margin: '0 auto',
        padding: '0.875rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: 36,
            height: 36,
            borderRadius: 'var(--radius-md)',
            background: 'linear-gradient(135deg, #6366f1 0%, #38bdf8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
            boxShadow: '0 2px 8px rgba(99, 102, 241, 0.4)'
          }}>
            <Compass size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ fontWeight: 700, fontSize: '1.1rem', letterSpacing: '-0.02em', color: '#fff' }}>
                Rebuild
              </span>
              <span className="badge badge-indigo" style={{ fontSize: '0.7rem', padding: '0.15rem 0.5rem' }}>
                HackDays 2026
              </span>
            </div>
            <p style={{ fontSize: '0.775rem', color: 'var(--text-muted)', margin: 0 }}>
              Learn with AI, rebuild it yourself
            </p>
          </div>
        </div>

        {/* Action: Restart Session */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            type="button" 
            onClick={onRestart}
            className="btn btn-ghost" 
            style={{ fontSize: '0.825rem', padding: '0.45rem 0.85rem' }}
            title="Start session from beginning"
          >
            <RotateCcw size={14} />
            <span>Restart Mission</span>
          </button>
        </div>
      </div>

      {/* Progress Stepper Bar */}
      <div style={{
        maxWidth: 1040,
        margin: '0 auto',
        padding: '0 1.25rem 0.65rem 1.25rem',
        overflowX: 'auto',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          minWidth: 540,
          position: 'relative',
        }}>
          {/* Background track line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 20,
            right: 20,
            height: 2,
            background: 'rgba(255, 255, 255, 0.08)',
            transform: 'translateY(-50%)',
            zIndex: 0,
          }} />

          {/* Active track line */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: 20,
            width: `${(currentStepIndex / (STEPS.length - 1)) * 95}%`,
            height: 2,
            background: 'linear-gradient(90deg, #6366f1, #38bdf8)',
            transform: 'translateY(-50%)',
            zIndex: 1,
            transition: 'width 0.3s ease',
          }} />

          {STEPS.map((step, idx) => {
            const isCompleted = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            
            return (
              <div 
                key={step.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.25rem',
                  zIndex: 2,
                  position: 'relative',
                  cursor: isCompleted ? 'pointer' : 'default',
                }}
                onClick={() => {
                  if (isCompleted && onNavigateStep) {
                    onNavigateStep(step.id);
                  }
                }}
              >
                <div style={{
                  width: 26,
                  height: 26,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 650,
                  transition: 'all 0.2s ease',
                  background: isCurrent 
                    ? '#6366f1' 
                    : isCompleted 
                    ? '#10b981' 
                    : 'var(--bg-surface-elevated)',
                  color: isCurrent || isCompleted ? '#ffffff' : 'var(--text-muted)',
                  border: isCurrent 
                    ? '2px solid rgba(255, 255, 255, 0.8)' 
                    : '1px solid var(--border-default)',
                  boxShadow: isCurrent ? '0 0 12px rgba(99, 102, 241, 0.6)' : 'none',
                }}>
                  {isCompleted ? <CheckCircle2 size={14} /> : step.number}
                </div>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: isCurrent ? 600 : 500,
                  color: isCurrent ? '#f8fafc' : isCompleted ? '#cbd5e1' : 'var(--text-muted)',
                  whiteSpace: 'nowrap',
                }}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};
