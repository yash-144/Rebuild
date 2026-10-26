'use client';

import React from 'react';
import { ORIGINAL_MISSION } from '@/lib/missionData';
import { EvidenceAsset } from '@/lib/types';
import { CodeEditor } from './CodeEditor';
import { CloudinaryUploader } from './CloudinaryUploader';
import { HelpCircle, ArrowRight, ArrowLeft, Lightbulb, Code } from 'lucide-react';

interface StepAttemptProps {
  initialCode: string;
  onCodeChange: (code: string) => void;
  stuckSelected: boolean;
  onStuckToggle: (stuck: boolean) => void;
  evidence: EvidenceAsset | null;
  onEvidenceChange: (evidence: EvidenceAsset | null) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const StepAttempt: React.FC<StepAttemptProps> = ({
  initialCode,
  onCodeChange,
  stuckSelected,
  onStuckToggle,
  evidence,
  onEvidenceChange,
  onBack,
  onContinue,
}) => {
  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Task Header Card */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span className="badge badge-indigo">Step 1 of 5 · First Attempt</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Practice attempt before hints
          </span>
        </div>

        <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.5rem' }}>
          {ORIGINAL_MISSION.taskPrompt}
        </h2>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          Take an honest swing at this problem. You do not need to write working code right away. If you feel stuck, select <em>&ldquo;I&apos;m not sure where to start&rdquo;</em> to jump right into the hint ladder.
        </p>

        {/* Input / Output Spec */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 650 }}>
              Sample Input
            </span>
            <pre style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#7dd3fc', fontFamily: 'var(--font-mono)' }}>
              {JSON.stringify(ORIGINAL_MISSION.sampleInput, null, 2)}
            </pre>
          </div>

          <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 650 }}>
              Expected Output
            </span>
            <pre style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#86efac', fontFamily: 'var(--font-mono)' }}>
              {JSON.stringify(ORIGINAL_MISSION.expectedOutput, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Attempt Input Mode Selection */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
        <button
          type="button"
          onClick={() => onStuckToggle(false)}
          className={`btn ${!stuckSelected ? 'btn-secondary' : 'btn-ghost'}`}
          style={{
            borderColor: !stuckSelected ? '#6366f1' : undefined,
            background: !stuckSelected ? 'rgba(99, 102, 241, 0.15)' : undefined,
            color: !stuckSelected ? '#fff' : undefined,
          }}
        >
          <Code size={15} />
          <span>Write Code or Scratchpad</span>
        </button>

        <button
          type="button"
          onClick={() => onStuckToggle(true)}
          className={`btn ${stuckSelected ? 'btn-amber' : 'btn-ghost'}`}
        >
          <HelpCircle size={15} />
          <span>I&apos;m not sure where to start (Get Help)</span>
        </button>
      </div>

      {/* Code Editor */}
      {!stuckSelected ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <CodeEditor
            code={initialCode}
            onChange={onCodeChange}
            placeholder="// Give it a try... even a partial for-loop or rough thoughts help!"
            title="Your Initial Attempt"
          />
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '1.25rem', borderLeft: '3px solid #f59e0b' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Lightbulb size={18} color="#f59e0b" />
            <h4 style={{ fontSize: '0.95rem', color: '#fbbf24', margin: 0 }}>
              Stuck? That is completely normal.
            </h4>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            In learning science, identifying where you are stuck is the most valuable point of the learning process. Click &ldquo;Explore Progressive Hints&rdquo; below to see the smallest helpful nudge.
          </p>
        </div>
      )}

      {/* Cloudinary Evidence Photo Upload (Optional) */}
      <CloudinaryUploader
        evidence={evidence}
        onEvidenceChange={onEvidenceChange}
      />

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost"
        >
          <ArrowLeft size={16} />
          <span>Back to Overview</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="btn btn-primary"
        >
          <span>Explore Progressive Hints</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
