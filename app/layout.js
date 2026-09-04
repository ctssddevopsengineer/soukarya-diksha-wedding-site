import './globals.css';

export const metadata = {
  title: 'Soukarya & Diksha | Reception Invitation',
  description: 'A Celebration of Two Cultures, One Beautiful Journey',
  robots: { index: false, follow: false }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
