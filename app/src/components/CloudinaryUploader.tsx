'use client';

import React, { useState, useEffect, useRef } from 'react';
import { EvidenceAsset } from '@/lib/types';
import { Upload, Image as ImageIcon, Trash2, CheckCircle2, AlertCircle, Sparkles, Lock, ExternalLink } from 'lucide-react';

interface CloudinaryUploaderProps {
  evidence: EvidenceAsset | null;
  onEvidenceChange: (evidence: EvidenceAsset | null) => void;
}

interface CloudinaryStatus {
  configured: boolean;
  cloudName: string;
  uploadPreset: string;
  deliveryType: string;
  folder: string;
  instructions: string;
}

export const CloudinaryUploader: React.FC<CloudinaryUploaderProps> = ({
  evidence,
  onEvidenceChange,
}) => {
  const [status, setStatus] = useState<CloudinaryStatus | null>(null);
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch('/api/cloudinary/status')
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch((err) => {
        console.error('Failed to query Cloudinary server status:', err);
      });
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setErrorMessage(null);
    setUploading(true);

    try {
      if (status?.configured) {
        // Upload via Cloudinary server route
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('/api/cloudinary/upload', {
          method: 'POST',
          body: formData,
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Upload to Cloudinary failed.');
        }

        onEvidenceChange({
          publicId: data.publicId,
          previewUrl: data.previewUrl,
          filename: data.filename,
          source: 'cloudinary',
          uploadedAt: data.uploadedAt,
        });
      } else {
        // Local preview fallback when Cloudinary API secrets are not set in .env.local
        const reader = new FileReader();
        reader.onload = (event) => {
          onEvidenceChange({
            previewUrl: event.target?.result as string,
            filename: file.name,
            source: 'local',
            uploadedAt: new Date().toISOString(),
          });
        };
        reader.readAsDataURL(file);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Error uploading file.');
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleSelectDemoSample = () => {
    setErrorMessage(null);
    onEvidenceChange({
      previewUrl: '/demo-evidence.png',
      filename: 'sample_student_notebook.png',
      source: 'demo',
      uploadedAt: new Date().toISOString(),
    });
  };

  const handleDelete = async () => {
    if (!evidence) return;

    if (evidence.source === 'cloudinary' && evidence.publicId) {
      setDeleting(true);
      try {
        const res = await fetch('/api/cloudinary/delete', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ publicId: evidence.publicId }),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Failed to delete asset from Cloudinary.');
        }
      } catch (err: any) {
        setErrorMessage(err.message);
      } finally {
        setDeleting(false);
      }
    }

    onEvidenceChange(null);
  };

  return (
    <div className="glass-panel" style={{ padding: '1.25rem', marginTop: '1rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ImageIcon size={18} color="#38bdf8" />
          <h4 style={{ fontSize: '0.95rem', margin: 0 }}>Optional Evidence Photo</h4>
          <span className="badge badge-slate" style={{ fontSize: '0.7rem' }}>
            Handwritten / Scratchpad
          </span>
        </div>

        {/* Integration Status Badge */}
        {status ? (
          status.configured ? (
            <span className="badge badge-emerald" title="Signed preset: rebuild_student_evidence (authenticated)">
              <Lock size={11} />
              Cloudinary Authenticated: Connected
            </span>
          ) : (
            <span className="badge badge-amber" title="Add CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to .env.local">
              <Lock size={11} />
              Cloudinary: Ready to Connect (.env.local)
            </span>
          )
        ) : null}
      </div>

      <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: '1.5' }}>
        You can optionally attach a photo or scan of your handwritten notes. This prototype uses Cloudinary&apos;s 
        <strong> signed authenticated preset</strong> (<code>rebuild_student_evidence</code>) to ensure private student media.
      </p>

      {/* If evidence is already selected / uploaded */}
      {evidence ? (
        <div style={{
          background: 'rgba(0, 0, 0, 0.3)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.75rem',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} color="#10b981" />
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#f8fafc' }}>
                {evidence.filename}
              </span>
              <span className={`badge ${evidence.source === 'cloudinary' ? 'badge-emerald' : evidence.source === 'demo' ? 'badge-sky' : 'badge-slate'}`} style={{ fontSize: '0.675rem' }}>
                {evidence.source === 'cloudinary' ? 'Authenticated Cloudinary Asset' : evidence.source === 'demo' ? 'Team Demo Asset' : 'Local Preview'}
              </span>
            </div>

            <button
              type="button"
              onClick={handleDelete}
              disabled={deleting}
              className="btn btn-ghost"
              style={{ color: '#f87171', padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
            >
              <Trash2 size={13} />
              <span>{deleting ? 'Deleting...' : 'Remove Photo'}</span>
            </button>
          </div>

          {/* Evidence Preview */}
          <div style={{
            maxHeight: 280,
            overflow: 'hidden',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-subtle)',
            background: '#0a0f1d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={evidence.previewUrl}
              alt="Student work evidence"
              style={{ maxWidth: '100%', maxHeight: 280, objectFit: 'contain' }}
            />
          </div>

          {evidence.publicId && (
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
              Public ID: <code>{evidence.publicId}</code> · Secured under <code>rebuild/evidence/</code>
            </div>
          )}
        </div>
      ) : (
        /* Upload / Attach Options */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <div style={{
            border: '1px dashed var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.02)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
          }}>
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="evidence-upload-input"
            />
            
            <label
              htmlFor="evidence-upload-input"
              className="btn btn-secondary"
              style={{ cursor: uploading ? 'wait' : 'pointer' }}
            >
              <Upload size={15} />
              <span>{uploading ? 'Processing Image...' : 'Choose Image File'}</span>
            </label>

            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Supports PNG, JPG, or SVG photos (up to 8MB)
            </span>
          </div>

          {/* Fast Demo Sample Option */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem 0.75rem', background: 'rgba(56, 189, 248, 0.05)', borderRadius: 'var(--radius-sm)', border: '1px solid rgba(56, 189, 248, 0.15)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              <Sparkles size={14} color="#38bdf8" />
              <span>Don&apos;t have a photo handy? Use our team-created demo sample.</span>
            </div>
            <button
              type="button"
              onClick={handleSelectDemoSample}
              className="btn btn-ghost"
              style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem', color: '#38bdf8' }}
            >
              Load Demo Note
            </button>
          </div>
        </div>
      )}

      {errorMessage && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          marginTop: '0.75rem',
          padding: '0.5rem 0.75rem',
          borderRadius: 'var(--radius-sm)',
          background: 'rgba(244, 63, 94, 0.12)',
          border: '1px solid rgba(244, 63, 94, 0.3)',
          color: '#fda4af',
          fontSize: '0.8rem',
        }}>
          <AlertCircle size={14} />
          <span>{errorMessage}</span>
        </div>
      )}
    </div>
  );
};
