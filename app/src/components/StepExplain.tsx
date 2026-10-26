'use client';

import React from 'react';
import { EXPLAIN_BACK } from '@/lib/missionData';
import { MessageSquare, ArrowRight, ArrowLeft, HeartHandshake, CheckCircle } from 'lucide-react';

interface StepExplainProps {
  explainText: string;
  onExplainChange: (text: string) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const StepExplain: React.FC<StepExplainProps> = ({
  explainText,
  onExplainChange,
  onBack,
  onContinue,
}) => {
  const hasContent = explainText.trim().length > 5;

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="badge badge-indigo">Step 3 of 5 · Explain Back</span>
          <span className="badge badge-sky">Active Retrieval Reflection</span>
        </div>

        <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.5rem' }}>
          Put the idea into your own words.
        </h2>

        <p style={{ fontSize: '0.9rem', color: '#f8fafc', fontWeight: 550, margin: '0.75rem 0' }}>
          &ldquo;{EXPLAIN_BACK.prompt}&rdquo;
        </p>

        {/* Supportive Reassurance Callout */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '0.65rem',
          padding: '0.75rem 1rem',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.25)',
          borderRadius: 'var(--radius-md)',
          marginTop: '0.5rem',
        }}>
          <HeartHandshake size={18} color="#10b981" style={{ marginTop: 2, flexShrink: 0 }} />
          <p style={{ fontSize: '0.825rem', color: '#cbd5e1', margin: 0, lineHeight: '1.5' }}>
            {EXPLAIN_BACK.reassurance}
          </p>
        </div>
      </div>

      {/* Explanation Input Area */}
      <div className="glass-panel-elevated" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <label htmlFor="explain-input" style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f1f5f9' }}>
            Your Explanation
          </label>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {explainText.trim().length} characters
          </span>
        </div>

        <textarea
          id="explain-input"
          value={explainText}
          onChange={(e) => onExplainChange(e.target.value)}
          placeholder={EXPLAIN_BACK.examplePlaceholder}
          rows={4}
          style={{
            width: '100%',
            padding: '0.85rem 1rem',
            background: '#090d16',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            color: '#f8fafc',
            fontFamily: 'inherit',
            fontSize: '0.925rem',
            lineHeight: '1.6',
            resize: 'vertical',
            outline: 'none',
          }}
        />

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.75rem', fontSize: '0.775rem', color: 'var(--text-muted)' }}>
          <CheckCircle size={14} color={hasContent ? '#10b981' : '#64748b'} />
          <span>
            {hasContent ? 'Reflection noted. Ready to rebuild on the transfer task!' : 'Type a sentence or two summarizing how you think about updating the category totals.'}
          </span>
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost"
        >
          <ArrowLeft size={16} />
          <span>Back to Hints</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="btn btn-primary"
        >
          <span>Try Transfer Task (No Hints)</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
