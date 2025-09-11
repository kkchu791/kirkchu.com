import Navbar from "./_components/Navbar";
import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "kirkchu.com",
  description: "my personal website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className="antialiased" suppressHydrationWarning={true}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
