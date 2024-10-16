export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
};

import '@/app/login/login.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      className="w-full max-w-screen-xl h-screen mx-auto p-4 text-white text-opacity-80"
      lang="en"
    >
      <body className="h-full">{children}</body>
    </html>
  );
}
