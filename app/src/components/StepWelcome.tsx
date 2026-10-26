'use client';

import React from 'react';
import { ORIGINAL_MISSION } from '@/lib/missionData';
import { ArrowRight, BookOpen, Layers, CheckCircle2, ShieldAlert, Sparkles, Terminal } from 'lucide-react';

interface StepWelcomeProps {
  onStart: () => void;
}

export const StepWelcome: React.FC<StepWelcomeProps> = ({ onStart }) => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Hero Card */}
      <div className="glass-panel-elevated" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: -20,
          right: -20,
          width: 140,
          height: 140,
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
        }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
          <span className="badge badge-indigo">SheBuilds · Tech for Social Good</span>
          <span className="badge badge-emerald">Practice Prototype</span>
        </div>

        <h1 style={{ fontSize: '2rem', lineHeight: '1.25', marginBottom: '0.75rem', color: '#ffffff' }}>
          Learn with AI, <span style={{ background: 'linear-gradient(135deg, #818cf8 0%, #38bdf8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>rebuild it yourself.</span>
        </h1>

        <p style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: 680, lineHeight: '1.6', marginBottom: '1.25rem' }}>
          A finished AI answer does not prove you have learned a skill. Rebuild gives you a safe learning loop: try a coding task, receive progressive hints, explain the mechanism, and immediately transfer the skill to a new problem on your own.
        </p>

        {/* Practice Not Grade Callout */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          padding: '0.875rem 1.15rem',
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-md)',
          marginBottom: '1.5rem',
        }}>
          <ShieldAlert size={18} color="#818cf8" style={{ marginTop: 2, flexShrink: 0 }} />
          <div style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
            <strong style={{ color: '#fff' }}>This is practice, not an exam or AI detector.</strong>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
              We do not judge your intelligence, grade your answers, or rank you. The goal is personal clarity: knowing when you can solve a problem without AI.
            </p>
          </div>
        </div>

        {/* Start Action */}
        <button
          type="button"
          onClick={onStart}
          className="btn btn-primary"
          style={{ fontSize: '1rem', padding: '0.8rem 1.75rem' }}
        >
          <span>Start Practice Mission</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Selected Mission Card */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Terminal size={18} color="#818cf8" />
            <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Mission 1: {ORIGINAL_MISSION.title}</h3>
          </div>
          <span className="badge badge-sky">JavaScript · Core Data Structures</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600 }}>
              Learning Objective
            </span>
            <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: '#f1f5f9', fontWeight: 500 }}>
              {ORIGINAL_MISSION.learningObjective}
            </p>
          </div>

          <div style={{ background: 'rgba(0, 0, 0, 0.25)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 600 }}>
              The Challenge
            </span>
            <p style={{ marginTop: '0.25rem', fontSize: '0.9rem', color: '#f1f5f9' }}>
              &ldquo;{ORIGINAL_MISSION.taskPrompt}&rdquo;
            </p>
          </div>
        </div>
      </div>

      {/* The 5-Step Loop Overview */}
      <div style={{ padding: '0.5rem 0' }}>
        <h3 style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '0.75rem', fontWeight: 600 }}>
          How Rebuild Works:
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
          {[
            { step: '1. First Attempt', desc: 'Try writing code or note where you feel stuck.' },
            { step: '2. Progressive Hints', desc: 'Unlock a nudge first before seeing worked code.' },
            { step: '3. Explain Back', desc: 'Put the accumulator concept into your own words.' },
            { step: '4. Transfer Task', desc: 'Rebuild the logic on a brand new dataset alone.' },
            { step: '5. Practice Note', desc: 'See an honest report of what you achieved today.' },
          ].map((item, i) => (
            <div key={i} className="glass-panel" style={{ padding: '0.85rem' }}>
              <div style={{ fontSize: '0.825rem', fontWeight: 600, color: '#818cf8', marginBottom: '0.25rem' }}>
                {item.step}
              </div>
              <div style={{ fontSize: '0.775rem', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
