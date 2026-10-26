'use client';

import React from 'react';
import { BoundedOutcome, SessionState } from '@/lib/types';
import { CheckCircle2, AlertTriangle, RotateCcw, ShieldCheck, ArrowRight, Lightbulb, ExternalLink, Compass } from 'lucide-react';

interface StepResultProps {
  session: SessionState;
  onRestart: () => void;
  onReviewStep: (step: SessionState['currentStep']) => void;
}

export const StepResult: React.FC<StepResultProps> = ({
  session,
  onRestart,
  onReviewStep,
}) => {
  // Determine bounded outcome state
  let outcome: BoundedOutcome = 'needs_practice';
  if (session.transferEvaluation?.passed) {
    outcome = session.transferHintRequested ? 'completed_with_hint' : 'completed_independently';
  }

  const outcomeConfig = {
    completed_independently: {
      badge: 'Completed Independently',
      badgeClass: 'badge-emerald',
      title: 'Transfer Task Solved Without Hints',
      desc: 'You used the accumulator concept on a brand new dataset without needing additional hints during the transfer phase.',
      accentColor: '#10b981',
      nextPractice: 'Try grouping with an initial value or sorting categories by total amount in descending order.',
    },
    completed_with_hint: {
      badge: 'Completed With a Hint',
      badgeClass: 'badge-amber',
      title: 'Transfer Task Solved With Scripted Support',
      desc: 'You solved the transfer problem after reviewing the single transfer hint. You are bridging the mental model!',
      accentColor: '#f59e0b',
      nextPractice: 'Try solving the problem again from scratch tomorrow without opening the hint ladder.',
    },
    needs_practice: {
      badge: 'Needs Another Practice Attempt',
      badgeClass: 'badge-slate',
      title: 'Practice Attempt Incomplete',
      desc: 'The transfer answer did not yet pass the expected result check or was skipped. That is a normal part of mastering loops and maps.',
      accentColor: '#64748b',
      nextPractice: 'Review the Guided Step again, trace the values with a pencil on paper, then retry the transfer task.',
    },
  }[outcome];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Primary Outcome Card */}
      <div
        className="glass-panel-elevated"
        style={{
          padding: '2rem',
          borderLeft: `5px solid ${outcomeConfig.accentColor}`,
          position: 'relative',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className={`badge ${outcomeConfig.badgeClass}`} style={{ fontSize: '0.825rem', padding: '0.35rem 0.8rem' }}>
            {outcomeConfig.badge}
          </span>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Session Complete
          </span>
        </div>

        <h2 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.5rem' }}>
          {outcomeConfig.title}
        </h2>

        <p style={{ fontSize: '0.95rem', color: '#cbd5e1', lineHeight: '1.6', marginBottom: '1.25rem' }}>
          {outcomeConfig.desc}
        </p>

        {/* Mandatory Ethical Non-Grading Limitation Disclosure */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.75rem',
          padding: '0.875rem 1.15rem',
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.25)',
          borderRadius: 'var(--radius-md)',
        }}>
          <ShieldCheck size={20} color="#818cf8" style={{ marginTop: 2, flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: '#cbd5e1', lineHeight: '1.5' }}>
            <strong style={{ color: '#fff' }}>Boundary Notice:</strong>
            <p style={{ margin: '0.2rem 0 0 0', color: 'var(--text-secondary)' }}>
              This describes one short task in this specific session. It is <strong>not</strong> a grade, intelligence score, cheating verdict, or proof of overall ability.
            </p>
          </div>
        </div>
      </div>

      {/* Concrete Next Practice Step */}
      <div className="glass-panel" style={{ padding: '1.5rem', border: '1px solid var(--border-accent)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
          <Lightbulb size={18} color="#fbbf24" />
          <h3 style={{ fontSize: '1.05rem', color: '#ffffff', margin: 0 }}>
            Recommended Next Step
          </h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: '#e2e8f0', lineHeight: '1.6' }}>
          {outcomeConfig.nextPractice}
        </p>
      </div>

      {/* Session Evidence Log */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1rem', color: '#f8fafc', marginBottom: '1rem' }}>
          Observed Session Evidence
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 650 }}>
              1. First Attempt Mode
            </span>
            <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#f1f5f9', fontWeight: 550 }}>
              {session.stuckSelected ? '“Not sure where to start” (Stuck)' : 'Typed Code / Scratchpad'}
            </div>
            {session.evidenceAsset && (
              <div style={{ marginTop: '0.35rem', fontSize: '0.75rem', color: '#38bdf8' }}>
                Attached: {session.evidenceAsset.filename} ({session.evidenceAsset.source})
              </div>
            )}
          </div>

          <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 650 }}>
              2. Help Ladder Level
            </span>
            <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: '#f1f5f9', fontWeight: 550 }}>
              Level: {session.selectedHelpLevel.toUpperCase()}
            </div>
            <div style={{ marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Unlocked: {session.helpLevelsUnlocked.join(', ')}
            </div>
          </div>

          <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 650 }}>
              3. Explain Back Text
            </span>
            <div style={{ marginTop: '0.25rem', fontSize: '0.825rem', color: '#cbd5e1', fontStyle: 'italic', maxHeight: 60, overflow: 'hidden', textOverflow: 'ellipsis' }}>
              &ldquo;{session.explainBackText.trim() || 'No text entered'}&rdquo;
            </div>
          </div>

          <div style={{ background: '#090d16', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 650 }}>
              4. Transfer Evaluation
            </span>
            <div style={{ marginTop: '0.25rem', fontSize: '0.875rem', color: session.transferEvaluation?.passed ? '#6ee7b7' : '#fda4af', fontWeight: 550 }}>
              {session.transferEvaluation?.passed ? 'Passed Test Dataset' : 'Incomplete / Not Passed'}
            </div>
            <div style={{ marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Transfer Hint: {session.transferHintRequested ? 'Requested' : 'Not used'}
            </div>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          type="button"
          onClick={() => onReviewStep('transfer')}
          className="btn btn-secondary"
        >
          <span>Review Transfer Attempt</span>
        </button>

        <button
          type="button"
          onClick={onRestart}
          className="btn btn-primary"
        >
          <RotateCcw size={16} />
          <span>Restart Mission From Beginning</span>
        </button>
      </div>
    </div>
  );
};
