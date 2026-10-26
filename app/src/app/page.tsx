'use client';

import React, { useState, useEffect } from 'react';
import { SessionState, MissionStep, HelpLevel, EvidenceAsset, TransferEvaluation } from '@/lib/types';
import { ORIGINAL_MISSION, TRANSFER_MISSION } from '@/lib/missionData';
import { Header } from '@/components/Header';
import { StepWelcome } from '@/components/StepWelcome';
import { StepAttempt } from '@/components/StepAttempt';
import { StepHelp } from '@/components/StepHelp';
import { StepExplain } from '@/components/StepExplain';
import { StepTransfer } from '@/components/StepTransfer';
import { StepResult } from '@/components/StepResult';

const STORAGE_KEY = 'rebuild_session_v1';

const INITIAL_STATE: SessionState = {
  currentStep: 'welcome',
  stuckSelected: false,
  initialCode: ORIGINAL_MISSION.starterCode,
  evidenceAsset: null,
  selectedHelpLevel: 'nudge',
  helpLevelsUnlocked: ['nudge'],
  explainBackText: '',
  transferCode: TRANSFER_MISSION.starterCode,
  transferHintRequested: false,
  transferEvaluation: null,
  outcome: null,
  startedAt: new Date().toISOString(),
};

export default function Home() {
  const [session, setSession] = useState<SessionState>(INITIAL_STATE);
  const [hydrated, setHydrated] = useState(false);

  // Load session from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSession(JSON.parse(saved));
      }
    } catch (e) {
      console.warn('Failed to parse saved session:', e);
    }
    setHydrated(true);
  }, []);

  // Save session to localStorage on update
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } catch (e) {
      console.warn('Failed to save session:', e);
    }
  }, [session, hydrated]);

  const handleRestart = () => {
    if (typeof window !== 'undefined' && window.confirm('Restart this practice mission from the beginning?')) {
      const resetState: SessionState = {
        ...INITIAL_STATE,
        startedAt: new Date().toISOString(),
      };
      setSession(resetState);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  const handleNavigateStep = (step: MissionStep) => {
    setSession((prev) => ({ ...prev, currentStep: step }));
  };

  return (
    <div className="main-wrapper">
      <Header
        currentStep={session.currentStep}
        onRestart={handleRestart}
        onNavigateStep={handleNavigateStep}
      />

      <main className="content-container">
        {session.currentStep === 'welcome' && (
          <StepWelcome
            onStart={() => setSession((prev) => ({ ...prev, currentStep: 'attempt' }))}
          />
        )}

        {session.currentStep === 'attempt' && (
          <StepAttempt
            initialCode={session.initialCode}
            onCodeChange={(code) => setSession((prev) => ({ ...prev, initialCode: code }))}
            stuckSelected={session.stuckSelected}
            onStuckToggle={(stuck) => setSession((prev) => ({ ...prev, stuckSelected: stuck }))}
            evidence={session.evidenceAsset}
            onEvidenceChange={(ev) => setSession((prev) => ({ ...prev, evidenceAsset: ev }))}
            onBack={() => setSession((prev) => ({ ...prev, currentStep: 'welcome' }))}
            onContinue={() => setSession((prev) => ({ ...prev, currentStep: 'help' }))}
          />
        )}

        {session.currentStep === 'help' && (
          <StepHelp
            selectedLevel={session.selectedHelpLevel}
            onSelectLevel={(lvl) => setSession((prev) => ({ ...prev, selectedHelpLevel: lvl }))}
            unlockedLevels={session.helpLevelsUnlocked}
            onUnlockLevel={(lvl) =>
              setSession((prev) => ({
                ...prev,
                helpLevelsUnlocked: Array.from(new Set([...prev.helpLevelsUnlocked, lvl])),
              }))
            }
            onBack={() => setSession((prev) => ({ ...prev, currentStep: 'attempt' }))}
            onContinue={() => setSession((prev) => ({ ...prev, currentStep: 'explain' }))}
          />
        )}

        {session.currentStep === 'explain' && (
          <StepExplain
            explainText={session.explainBackText}
            onExplainChange={(text) => setSession((prev) => ({ ...prev, explainBackText: text }))}
            onBack={() => setSession((prev) => ({ ...prev, currentStep: 'help' }))}
            onContinue={() => setSession((prev) => ({ ...prev, currentStep: 'transfer' }))}
          />
        )}

        {session.currentStep === 'transfer' && (
          <StepTransfer
            transferCode={session.transferCode}
            onCodeChange={(code) => setSession((prev) => ({ ...prev, transferCode: code }))}
            hintRequested={session.transferHintRequested}
            onRequestHint={() => setSession((prev) => ({ ...prev, transferHintRequested: true }))}
            evaluation={session.transferEvaluation}
            onEvaluationComplete={(evaluation) =>
              setSession((prev) => ({ ...prev, transferEvaluation: evaluation }))
            }
            onBack={() => setSession((prev) => ({ ...prev, currentStep: 'explain' }))}
            onContinue={() => setSession((prev) => ({ ...prev, currentStep: 'result' }))}
          />
        )}

        {session.currentStep === 'result' && (
          <StepResult
            session={session}
            onRestart={() => {
              setSession({ ...INITIAL_STATE, startedAt: new Date().toISOString() });
              localStorage.removeItem(STORAGE_KEY);
            }}
            onReviewStep={(step) => setSession((prev) => ({ ...prev, currentStep: step }))}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '1.25rem',
        textAlign: 'center',
        fontSize: '0.8rem',
        color: 'var(--text-muted)',
        background: 'rgba(10, 15, 29, 0.9)',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <span>Rebuild · SheBuilds Hacktober HackDays 2026 · Practice Prototype</span>
          <span>A practice signal, not surveillance or a grading engine.</span>
        </div>
      </footer>
    </div>
  );
}
