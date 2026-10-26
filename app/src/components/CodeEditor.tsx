'use client';

import React, { useState } from 'react';
import { Copy, Check, Code2 } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (value: string) => void;
  readOnly?: boolean;
  minHeight?: string;
  placeholder?: string;
  title?: string;
  language?: string;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  readOnly = false,
  minHeight = '180px',
  placeholder = '// Type your solution here...',
  title = 'JavaScript Solution',
  language = 'javascript',
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.target as HTMLTextAreaElement;
      const start = target.selectionStart;
      const end = target.selectionEnd;

      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);

      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const lineCount = Math.max(code.split('\n').length, 4);

  return (
    <div className="code-container" style={{ width: '100%', position: 'relative' }}>
      <div className="code-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <Code2 size={14} color="#818cf8" />
          <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{title}</span>
          <span className="badge badge-slate" style={{ fontSize: '0.675rem', padding: '0.1rem 0.4rem' }}>
            {language}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          className="btn btn-ghost"
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.72rem', height: 'auto' }}
          title="Copy code"
        >
          {copied ? (
            <>
              <Check size={12} color="#10b981" />
              <span style={{ color: '#10b981' }}>Copied</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      <div style={{ display: 'flex', minHeight }}>
        {/* Line Numbers */}
        <div
          style={{
            userSelect: 'none',
            padding: '0.75rem 0.5rem',
            textAlign: 'right',
            color: 'rgba(148, 163, 184, 0.4)',
            fontSize: '0.825rem',
            borderRight: '1px solid rgba(255, 255, 255, 0.06)',
            background: 'rgba(0, 0, 0, 0.25)',
            minWidth: '2.5rem',
          }}
        >
          {Array.from({ length: lineCount }).map((_, i) => (
            <div key={i} style={{ lineHeight: '1.6' }}>
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea or Pre */}
        <div style={{ flex: 1, position: 'relative' }}>
          <textarea
            value={code}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            readOnly={readOnly}
            placeholder={placeholder}
            spellCheck={false}
            style={{
              width: '100%',
              minHeight: '100%',
              height: '100%',
              padding: '0.75rem 1rem',
              background: 'transparent',
              color: '#e2e8f0',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              lineHeight: '1.6',
              border: 'none',
              outline: 'none',
              resize: 'vertical',
              whiteSpace: 'pre',
              overflowX: 'auto',
            }}
          />
        </div>
      </div>
    </div>
  );
};
