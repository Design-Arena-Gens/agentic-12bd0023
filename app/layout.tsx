import "@/styles/globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "ChatPT Atlas",
  description: "A lightweight atlas with a friendly chat UI"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">ChatPT Atlas</div>
            <nav className="nav">
              <a href="/" className="navLink">Home</a>
              <a href="https://agentic-12bd0023.vercel.app" className="navLink" target="_blank">Prod</a>
            </nav>
          </header>
          <main className="main">{children}</main>
          <footer className="footer">? {new Date().getFullYear()} ChatPT Atlas</footer>
        </div>
      </body>
    </html>
  );
}
