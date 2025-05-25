import "./globals.css";

export const metadata = {
  title: 'Next.js TVmaze',
  description: 'TVmaze aplikacija u Next.js uz App Router',
};

export default function RootLayout({ children }) {
  return (
    <html lang="hr">
      <body>
        {children}
      </body>
    </html>
  );
}
