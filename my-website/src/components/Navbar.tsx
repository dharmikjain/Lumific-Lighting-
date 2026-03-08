"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, SignInButton, UserButton } from "@clerk/nextjs";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const { isLoaded, userId } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Hide main navbar on platform and architecture pages (they have their own nav)
  if (pathname.startsWith("/platform") || pathname === "/architecture") return null;

  const navLinks = [
    { label: "Products", href: "/products" },
    { label: "Segments", href: "/segments" },
    { label: "Projects", href: "/projects" },
    { label: "Franchise", href: "/franchise" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="main-nav">
        <Link href="/" className="nav-logo" onClick={() => setMobileOpen(false)}>
          Lumi<span>fic</span>
        </Link>
        <ul className={`nav-links ${mobileOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <li key={link.label}>
              <Link 
                href={link.href}
                className={pathname.startsWith(link.href) ? "active" : ""}
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="nav-right">
          <Link href="/chat-ai" className="nav-chat-pill" style={{ textDecoration: 'none' }}>
            <span className="chat-dot"></span>
            Chat with AI
          </Link>
          {isLoaded && userId ? (
            <>
              <Link href="/dashboard" className="nav-btn" style={{ textDecoration: 'none', padding: '10px 16px' }}>
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : isLoaded ? (
            <>
              <SignInButton mode="modal">
                <button className="nav-btn" style={{ padding: '10px 16px' }}>
                  Sign In
                </button>
              </SignInButton>
              <Link href="/get-catalogue" className="nav-btn" style={{ textDecoration: 'none' }}>
                Get Catalogue
              </Link>
            </>
          ) : null}
          <button
            className="nav-hamburger"
            id="mobileMenuBtn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={mobileOpen ? "open" : ""} />
            <span className={mobileOpen ? "open" : ""} />
            <span className={mobileOpen ? "open" : ""} />
          </button>
        </div>
      </nav>

      <style jsx global>{`
        /* ═══════════════ NAV ═══════════════ */
        .main-nav {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          display: flex; align-items: center; justify-content: space-between;
          padding: 0 48px; height: 72px;
          background: rgba(6,6,6,0.88); backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-bottom: 1px solid rgba(201,168,53,0.12);
        }
        .main-nav .nav-logo { 
          font-family: 'Cormorant Garamond', serif; 
          font-size: 28px; 
          font-weight: 600; 
          letter-spacing: 3px; 
          color: var(--light, #f5f0e8); 
          text-transform: uppercase; 
          text-decoration: none; 
        }
        .main-nav .nav-logo span { color: var(--gold, #C9A835); }
        
        .main-nav .nav-links { display: flex; gap: 28px; list-style: none; margin: 0; padding: 0; }
        .main-nav .nav-links a { 
          text-decoration: none; color: #aaa; font-size: 11px; font-weight: 400; 
          letter-spacing: 1.5px; text-transform: uppercase; transition: color 0.3s; 
          position: relative; padding-bottom: 4px; font-family: 'DM Sans', sans-serif;
        }
        .main-nav .nav-links a::after { 
          content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; 
          background: var(--gold, #C9A835); transition: width 0.3s ease; 
        }
        .main-nav .nav-links a:hover { color: var(--gold, #C9A835); }
        .main-nav .nav-links a:hover::after { width: 100%; }
        .main-nav .nav-links a.active { color: var(--gold, #C9A835); }
        .main-nav .nav-links a.active::after { width: 100%; }
        
        /* Chat nav pill */
        .main-nav .nav-chat-pill {
          display: flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, rgba(201,168,53,0.15), rgba(201,168,53,0.08));
          border: 1px solid rgba(201,168,53,0.35);
          border-radius: 20px; padding: 5px 14px 5px 10px;
          color: var(--gold, #C9A835); font-size: 11px; letter-spacing: 1px; text-transform: uppercase;
          cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif;
        }
        .main-nav .nav-chat-pill:hover { 
          background: rgba(201,168,53,0.22); border-color: var(--gold, #C9A835); 
          box-shadow: 0 0 16px rgba(201,168,53,0.2); 
        }
        .main-nav .nav-chat-pill .chat-dot { 
          width: 7px; height: 7px; background: var(--gold, #C9A835); border-radius: 50%; 
          animation: chatDotPulse 2s ease-in-out infinite; 
        }
        @keyframes chatDotPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.7)} }
        
        .main-nav .nav-right { display: flex; gap: 12px; align-items: center; }
        .main-nav .nav-btn { 
          padding: 10px 26px; border: 1px solid var(--gold, #C9A835); background: transparent; 
          color: var(--gold, #C9A835); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; 
          cursor: pointer; transition: all 0.3s; font-family: 'DM Sans', sans-serif; 
        }
        .main-nav .nav-btn:hover { background: var(--gold, #C9A835); color: var(--dark, #060606); }
        
        /* Mobile hamburger */
        .main-nav .nav-hamburger { 
          display: none; flex-direction: column; gap: 5px; cursor: pointer; background: none; border: none; padding: 4px; justify-content: center;
        }
        .main-nav .nav-hamburger span { 
          display: block; width: 22px; height: 1.5px; background: var(--light, #f5f0e8); transition: all 0.3s; 
        }
        .main-nav .nav-hamburger span.open:nth-child(1) { transform: rotate(45deg) translate(4px, 5px); }
        .main-nav .nav-hamburger span.open:nth-child(2) { opacity: 0; }
        .main-nav .nav-hamburger span.open:nth-child(3) { transform: rotate(-45deg) translate(4px, -5px); }
        
        @media (max-width: 1024px) { 
          .main-nav { padding: 0 20px; }
          .main-nav .nav-hamburger { display: flex; } 
          .main-nav .nav-links { 
            display: none; 
            position: fixed;
            top: 72px;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(6, 6, 6, 0.96);
            backdrop-filter: blur(24px);
            flex-direction: column;
            align-items: center;
            padding: 3rem;
            gap: 2rem;
          }
          .main-nav .nav-links.open { display: flex; }
          .main-nav .nav-links a { font-size: 15px; }
        }
      `}</style>
    </>
  );
}
