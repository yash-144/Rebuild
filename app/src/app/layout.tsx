import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Rebuild — Learn with AI, rebuild it yourself',
  description:
    'A polished practice prototype for SheBuilds Hacktober HackDays 2026. Get unstuck with progressive hints and verify you can transfer the skill independently.',
  keywords: ['learning', 'javascript', 'practice', 'hackathon', 'ai-learning', 'cloudinary'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body>{children}</body>
    </html>
  );
}
