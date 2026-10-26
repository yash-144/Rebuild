'use client';

import React from 'react';
import { HINT_LADDER } from '@/lib/missionData';
import { HelpLevel } from '@/lib/types';
import { Lightbulb, Compass, Code, ChevronRight, Check, ArrowRight, ArrowLeft, Info } from 'lucide-react';

interface StepHelpProps {
  selectedLevel: HelpLevel;
  onSelectLevel: (level: HelpLevel) => void;
  unlockedLevels: HelpLevel[];
  onUnlockLevel: (level: HelpLevel) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const StepHelp: React.FC<StepHelpProps> = ({
  selectedLevel,
  onSelectLevel,
  unlockedLevels,
  onUnlockLevel,
  onBack,
  onContinue,
}) => {
  const levels: { id: HelpLevel; title: string; tag: string; icon: any }[] = [
    { id: 'nudge', title: HINT_LADDER.nudge.label, tag: 'Minimal Help', icon: Compass },
    { id: 'guided', title: HINT_LADDER.guided.label, tag: 'Algorithmic Guidance', icon: Lightbulb },
    { id: 'explanation', title: HINT_LADDER.explanation.label, tag: 'Full Explanation', icon: Code },
  ];

  const handleLevelClick = (lvl: HelpLevel) => {
    onSelectLevel(lvl);
    if (!unlockedLevels.includes(lvl)) {
      onUnlockLevel(lvl);
    }
  };

  const currentHint = HINT_LADDER[selectedLevel];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="badge badge-indigo">Step 2 of 5 · Progressive Support</span>
          <span className="badge badge-slate">Fixed Scripted Guidance</span>
        </div>

        <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.5rem' }}>
          Choose the smallest hint you need.
        </h2>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Research in generative learning shows that unearned solutions make skills fragile. Start with the <strong>Nudge</strong> first. Only escalate to deeper hints if you are truly stuck.
        </p>

        {/* Prototype disclosure note */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '0.75rem',
          padding: '0.5rem 0.75rem',
          background: 'rgba(255, 255, 255, 0.04)',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--border-subtle)',
          fontSize: '0.775rem',
          color: 'var(--text-muted)',
        }}>
          <Info size={14} color="#818cf8" />
          <span>Note: Prototype coaching content is scripted and deterministic. We never fabricate model responses.</span>
        </div>
      </div>

      {/* 3 Hint Ladder Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.75rem' }}>
        {levels.map((lvl) => {
          const isSelected = selectedLevel === lvl.id;
          const isUnlocked = unlockedLevels.includes(lvl.id);
          const Icon = lvl.icon;

          return (
            <button
              key={lvl.id}
              type="button"
              onClick={() => handleLevelClick(lvl.id)}
              className="glass-panel"
              style={{
                padding: '1rem',
                textAlign: 'left',
                cursor: 'pointer',
                borderColor: isSelected ? '#6366f1' : isUnlocked ? 'rgba(99, 102, 241, 0.3)' : 'var(--border-subtle)',
                background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-surface-glass)',
                boxShadow: isSelected ? '0 0 16px rgba(99, 102, 241, 0.25)' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: 'var(--radius-sm)',
                  background: isSelected ? '#6366f1' : 'rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}>
                  <Icon size={15} />
                </div>
                <span className={`badge ${isSelected ? 'badge-indigo' : 'badge-slate'}`} style={{ fontSize: '0.675rem' }}>
                  {lvl.tag}
                </span>
              </div>

              <div style={{ fontWeight: 650, fontSize: '0.9rem', color: isSelected ? '#ffffff' : '#e2e8f0', marginBottom: '0.25rem' }}>
                {lvl.title}
              </div>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {HINT_LADDER[lvl.id].summary}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Hint Detail Card */}
      <div className="glass-panel-elevated" style={{ padding: '1.5rem', borderLeft: '4px solid #6366f1' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <h3 style={{ fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>
            {currentHint.label}
          </h3>
          <span className="badge badge-indigo">Active Level</span>
        </div>

        {selectedLevel === 'explanation' ? (
          <div>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '0.75rem' }}>
              {currentHint.subtext}
            </p>
            <div className="code-container" style={{ padding: '0.85rem 1.15rem' }}>
              <pre style={{ margin: 0, color: '#e2e8f0', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', lineHeight: '1.6' }}>
                {currentHint.content}
              </pre>
            </div>
            {'disclaimer' in currentHint && currentHint.disclaimer && (
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem', fontStyle: 'italic' }}>
                {currentHint.disclaimer}
              </p>
            )}
          </div>
        ) : (
          <div>
            <div style={{
              fontSize: '1.1rem',
              fontWeight: 600,
              color: '#f8fafc',
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-subtle)',
              marginBottom: '0.75rem',
            }}>
              &ldquo;{currentHint.content}&rdquo;
            </div>
            <p style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5' }}>
              {currentHint.subtext}
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost"
        >
          <ArrowLeft size={16} />
          <span>Back to Attempt</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="btn btn-primary"
        >
          <span>Continue to Explain Back</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
