# Rebuild — Learn with AI, rebuild it yourself

**Hackathon:** Hacktober HackDays 2026 · SheBuilds · Tech for Social Good  
**One-line idea:** Rebuild helps a student get unstuck with AI while checking whether they can use the same skill on a new task without AI.

---

## The Problem, in Simple Words

A student can ask AI to finish an assignment quickly. But a finished answer does not show whether the student could explain the idea or solve a similar problem alone. The student may only discover that gap later, during an exam, interview, or real task.

AI can be useful when it helps a learner understand and practise. The problem Rebuild focuses on is invisible dependence: the answer looks complete, while the skill is still uncertain.

## What Rebuild Does

Rebuild guides one short practice session:

1. **First Attempt:** The learner tries a task or indicates where they are stuck.
2. **Progressive Help:** Rebuild offers a small nudge before showing guided steps or worked explanations.
3. **Explain Back:** The learner explains the key idea in their own words (active retrieval reflection).
4. **Rebuild Independently:** Rebuild gives a similar transfer task with changed details and hides earlier help.
5. **Practice Outcome:** Rebuild reports what happened on this one task:
   - **Completed independently** (transfer solved without hints)
   - **Completed with a hint** (transfer solved after requesting a hint)
   - **Needs another practice attempt** (transfer answer incomplete or skipped)

The result is an honest practice note, not a grade, intelligence score, cheating verdict, or proof of broad mastery.

---

## Technical Architecture

- **Frontend:** Next.js (App Router), React, TypeScript, Vanilla CSS design system.
- **Client State:** Responsive multi-step state with `localStorage` persistence and restart capabilities.
- **Code Evaluation:** Transparent, deterministic client-side evaluation engine testing user solutions directly against test datasets.
- **Evidence Media & Cloudinary:**
  - Authenticated upload via server-side endpoint (`/api/cloudinary/upload`).
  - Signed delivery URL generation via Cloudinary server SDK (`cloudinary.url(..., { sign_url: true, type: 'authenticated' })`).
  - Secure deletion endpoint (`/api/cloudinary/delete`) to purge demo assets.
  - Zero client-side API secret exposure; credentials remain server-only in `.env.local`.

---

## Getting Started

### 1. Install Dependencies

```bash
npm --prefix app install
```

### 2. Environment Variables (Optional for Cloudinary)

Create a `.env.local` file inside `app/`:

```bash
CLOUDINARY_CLOUD_NAME=dkhi90k6e
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
CLOUDINARY_UPLOAD_PRESET=rebuild_student_evidence
```

*(If Cloudinary credentials are not set, the app runs smoothly with local preview and a built-in demo sample asset).*

### 3. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## What the MVP Does Not Do

- Detect AI use, cheating, authorship, or plagiarism.
- Grade students or make school, hiring, or disciplinary decisions.
- Claim that one short transfer task proves lasting learning.
- Record the screen, webcam, keystrokes, or browsing history.
- Collect real student work for the demo.
