export type MissionStep = 
  | 'welcome' 
  | 'attempt' 
  | 'help' 
  | 'explain' 
  | 'transfer' 
  | 'result';

export type HelpLevel = 'nudge' | 'guided' | 'explanation';

export interface EvidenceAsset {
  publicId?: string;
  previewUrl: string;
  filename: string;
  source: 'cloudinary' | 'demo' | 'local';
  uploadedAt: string;
}

export interface TransferEvaluation {
  passed: boolean;
  actualOutput?: Record<string, number> | null;
  expectedOutput: Record<string, number>;
  errorMessage?: string;
}

export type BoundedOutcome = 
  | 'completed_independently' 
  | 'completed_with_hint' 
  | 'needs_practice';

export interface SessionState {
  currentStep: MissionStep;
  stuckSelected: boolean;
  initialCode: string;
  evidenceAsset: EvidenceAsset | null;
  selectedHelpLevel: HelpLevel;
  helpLevelsUnlocked: HelpLevel[];
  explainBackText: string;
  transferCode: string;
  transferHintRequested: boolean;
  transferEvaluation: TransferEvaluation | null;
  outcome: BoundedOutcome | null;
  startedAt: string;
}
