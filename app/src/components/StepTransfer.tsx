'use client';

import React, { useState } from 'react';
import { TRANSFER_MISSION, evaluateTransferCode } from '@/lib/missionData';
import { TransferEvaluation } from '@/lib/types';
import { CodeEditor } from './CodeEditor';
import { ShieldCheck, HelpCircle, Play, ArrowRight, ArrowLeft, CheckCircle2, XCircle, Sparkles, RefreshCw } from 'lucide-react';

interface StepTransferProps {
  transferCode: string;
  onCodeChange: (code: string) => void;
  hintRequested: boolean;
  onRequestHint: () => void;
  evaluation: TransferEvaluation | null;
  onEvaluationComplete: (evalResult: TransferEvaluation) => void;
  onBack: () => void;
  onContinue: () => void;
}

export const StepTransfer: React.FC<StepTransferProps> = ({
  transferCode,
  onCodeChange,
  hintRequested,
  onRequestHint,
  evaluation,
  onEvaluationComplete,
  onBack,
  onContinue,
}) => {
  const [running, setRunning] = useState(false);

  const handleRunEvaluation = () => {
    setRunning(true);
    setTimeout(() => {
      const res = evaluateTransferCode(transferCode);
      onEvaluationComplete(res);
      setRunning(false);
    }, 150);
  };

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      {/* Header */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span className="badge badge-emerald">Step 4 of 5 · Transfer Task</span>
            <span className="badge badge-indigo">
              <ShieldCheck size={12} />
              {TRANSFER_MISSION.badge}
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Earlier hints are hidden
          </span>
        </div>

        <h2 style={{ fontSize: '1.35rem', color: '#ffffff', marginBottom: '0.5rem' }}>
          {TRANSFER_MISSION.taskPrompt}
        </h2>

        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
          {TRANSFER_MISSION.instructions}
        </p>

        {/* Input / Expected Dataset */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '0.75rem' }}>
          <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 650 }}>
              Transfer Input (Reading Records)
            </span>
            <pre style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#7dd3fc', fontFamily: 'var(--font-mono)' }}>
              {JSON.stringify(TRANSFER_MISSION.sampleInput, null, 2)}
            </pre>
          </div>

          <div style={{ background: '#090d16', padding: '0.75rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 650 }}>
              Expected Return Object
            </span>
            <pre style={{ marginTop: '0.35rem', fontSize: '0.8rem', color: '#86efac', fontFamily: 'var(--font-mono)' }}>
              {JSON.stringify(TRANSFER_MISSION.expectedOutput, null, 2)}
            </pre>
          </div>
        </div>
      </div>

      {/* Optional Hint Option */}
      {!hintRequested ? (
        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
          <button
            type="button"
            onClick={onRequestHint}
            className="btn btn-ghost"
            style={{ fontSize: '0.825rem', color: 'var(--text-muted)', border: '1px dashed var(--border-default)' }}
          >
            <HelpCircle size={14} />
            <span>I need one hint for this transfer task</span>
          </button>
        </div>
      ) : (
        <div className="glass-panel" style={{ padding: '1rem', borderLeft: '3px solid #f59e0b', background: 'rgba(245, 158, 11, 0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginBottom: '0.25rem' }}>
            <Sparkles size={15} color="#fbbf24" />
            <strong style={{ fontSize: '0.85rem', color: '#fbbf24' }}>
              {TRANSFER_MISSION.emergencyHint.label}:
            </strong>
          </div>
          <p style={{ fontSize: '0.825rem', color: '#f8fafc', margin: 0, fontFamily: 'var(--font-mono)' }}>
            {TRANSFER_MISSION.emergencyHint.text}
          </p>
        </div>
      )}

      {/* Code Editor */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <CodeEditor
          code={transferCode}
          onChange={onCodeChange}
          placeholder="// Implement getTotalMinutesByDay(records)..."
          title="Transfer Solution (JavaScript)"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            type="button"
            onClick={handleRunEvaluation}
            disabled={running}
            className="btn btn-primary"
            style={{ padding: '0.65rem 1.4rem' }}
          >
            {running ? <RefreshCw size={15} className="animate-spin" /> : <Play size={15} />}
            <span>Run & Check Solution</span>
          </button>

          {evaluation && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Status evaluated deterministically against test dataset
            </span>
          )}
        </div>
      </div>

      {/* Evaluation Results Banner */}
      {evaluation && (
        <div
          className="glass-panel"
          style={{
            padding: '1.25rem',
            borderLeft: `4px solid ${evaluation.passed ? '#10b981' : '#f43f5e'}`,
            background: evaluation.passed ? 'rgba(16, 185, 129, 0.08)' : 'rgba(244, 63, 94, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            {evaluation.passed ? (
              <>
                <CheckCircle2 size={20} color="#10b981" />
                <h4 style={{ fontSize: '1rem', color: '#6ee7b7', margin: 0 }}>
                  Test Case Passed! {hintRequested ? '(Completed with hint)' : '(Completed independently)'}
                </h4>
              </>
            ) : (
              <>
                <XCircle size={20} color="#f43f5e" />
                <h4 style={{ fontSize: '1rem', color: '#fda4af', margin: 0 }}>
                  Solution Did Not Pass Test Case
                </h4>
              </>
            )}
          </div>

          {evaluation.errorMessage && (
            <p style={{ fontSize: '0.85rem', color: '#fecdd3', margin: '0.25rem 0 0.5rem 0' }}>
              {evaluation.errorMessage}
            </p>
          )}

          {evaluation.actualOutput && (
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
              Returned output: <code>{JSON.stringify(evaluation.actualOutput)}</code>
            </div>
          )}
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
        <button
          type="button"
          onClick={onBack}
          className="btn btn-ghost"
        >
          <ArrowLeft size={16} />
          <span>Back to Reflection</span>
        </button>

        <button
          type="button"
          onClick={onContinue}
          className="btn btn-secondary"
          style={{
            background: evaluation?.passed ? '#6366f1' : undefined,
            color: evaluation?.passed ? '#ffffff' : undefined,
          }}
        >
          <span>View Session Outcome</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
};
