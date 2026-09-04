import './globals.css';
import './phase2b.css';

export const metadata = {
  title: 'Soukarya & Diksha | Reception Invitation',
  description: 'A Celebration of Two Cultures, One Beautiful Journey',
  robots: { index: false, follow: false },
  openGraph: {
    title: 'Soukarya & Diksha | Reception Invitation',
    description: 'A Celebration of Two Cultures, One Beautiful Journey',
    type: 'website',
    images: ['/themes/classic/front.png']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
