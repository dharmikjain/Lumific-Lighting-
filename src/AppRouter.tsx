import { useState } from 'react';
import WorkflowsDashboard from './components/WorkflowsDashboard';
import Products from './pages/Products';
import Segments from './pages/Segments';
import Projects from './pages/Projects';
import Chat from './pages/Chat';
import SmartControls from './pages/SmartControls';
import Franchise from './pages/Franchise';
import Contact from './pages/Contact';
import Architecture from './pages/Architecture';
import { Canvas } from '@react-three/fiber';
import Scene from './components/Scene';
import Cursor from './components/Cursor';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const pages: { [key: string]: React.ReactNode } = {
    home: <WorkflowsDashboard />,
    products: <Products />,
    segments: <Segments />,
    projects: <Projects />,
    chat: <Chat />,
    smartcontrols: <SmartControls />,
    architecture: <Architecture />,
    franchise: <Franchise />,
    contact: <Contact />,
  };

  const phoneNumber = '919876543210';
  const message = 'Hello! I am interested in Lumific lighting products.';

  return (
    <>
      {/* 3D Canvas Background */}
      <Canvas
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
        }}
        shadows
      >
        <Scene />
      </Canvas>

      <Cursor />

      {/* Navigation Bar */}
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          backgroundColor: 'rgba(8, 8, 8, 0.98)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(201, 168, 53, 0.3)',
          padding: '0 40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '72px',
        }}
      >
        <div
          onClick={() => setCurrentPage('home')}
          style={{
            cursor: 'pointer',
            fontSize: '20px',
            fontWeight: 600,
            letterSpacing: '3px',
            color: '#f5f0e8',
            textTransform: 'uppercase',
          }}
        >
          <span style={{ color: '#C9A835' }}>Lumi</span>fic
        </div>

        <div style={{ display: 'flex', gap: '30px', listStyle: 'none' }}>
          {[
            { label: 'Home', key: 'home' },
            { label: 'Products', key: 'products' },
            { label: 'Segments', key: 'segments' },
            { label: 'Projects', key: 'projects' },
            { label: 'Chat', key: 'chat' },
            { label: 'Smart Controls', key: 'smartcontrols' },
            { label: 'Architecture', key: 'architecture' },
            { label: 'Franchise', key: 'franchise' },
            { label: 'Contact', key: 'contact' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setCurrentPage(item.key)}
              style={{
                background: 'none',
                border: 'none',
                color: currentPage === item.key ? '#C9A835' : '#999',
                fontSize: '12px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'color 0.3s',
                fontWeight: 500,
                padding: '8px 4px',
              }}
              onMouseEnter={(e) => {
                if (currentPage !== item.key) {
                  e.currentTarget.style.color = '#C9A835';
                }
              }}
              onMouseLeave={(e) => {
                if (currentPage !== item.key) {
                  e.currentTarget.style.color = '#999';
                }
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Page Content */}
      <div style={{ 
        marginTop: '72px',
        backgroundColor: '#f8fafc', 
        minHeight: 'calc(100vh - 72px)',
        position: 'relative',
        zIndex: 1,
      }}>
        {pages[currentPage] || pages['home']}
      </div>

      {/* Floating WhatsApp Button */}
      <a
        href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textDecoration: 'none',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)',
          zIndex: 999,
          fontSize: '28px',
          transition: 'all 0.3s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(37, 211, 102, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 12px rgba(37, 211, 102, 0.4)';
        }}
        title="Chat with us on WhatsApp"
      >
        💬
      </a>
    </>
  );
}
