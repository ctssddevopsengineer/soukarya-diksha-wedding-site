import './globals.css';

export const metadata = {
  title: 'Soukarya & Diksha | Wedding Reception',
  description: 'A celebration of two cultures, one beautiful journey.',
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
