import { useState } from 'react';
import SmartTouchPanel from '../components/SmartTouchPanel';

export default function SmartControls() {
  const [activeTab, setActiveTab] = useState<'panel' | 'lighting' | 'integration'>('panel');
  const [lightingMode, setLightingMode] = useState('auto');
  const [brightness, setBrightness] = useState(75);
  const [colorTemp, setColorTemp] = useState(3500);

  const lightingModes = [
    { id: 'auto', label: 'Auto', desc: 'AI-optimized adaptive lighting' },
    { id: 'daylight', label: 'Daylight Harvest', desc: 'Sunlight-driven efficiency' },
    { id: 'occupancy', label: 'Occupancy-Aware', desc: 'Smart presence detection' },
    { id: 'manual', label: 'Manual', desc: 'Custom control' },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '80px 40px 40px',
        background: 'linear-gradient(135deg, #060606 0%, #0f0f0f 100%)',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px', maxWidth: '800px', margin: '0 auto 60px' }}>
        <h1
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '56px',
            fontWeight: 300,
            color: '#f5f0e8',
            marginBottom: '12px',
            letterSpacing: '-1px',
          }}
        >
          Smart <span style={{ color: '#C9A835' }}>Controls</span>
        </h1>
        <p style={{ color: '#999', fontSize: '15px', lineHeight: 1.7, maxWidth: '600px', margin: '0 auto' }}>
          Integrated smart home and lighting control with AI-powered automation, real-time monitoring, and intelligent
          energy optimization
        </p>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px', flexWrap: 'wrap' }}>
        {(['panel', 'lighting', 'integration'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '10px 24px',
              background: activeTab === tab ? '#C9A835' : 'rgba(201, 168, 53, 0.1)',
              border: `1px solid ${activeTab === tab ? '#C9A835' : 'rgba(201, 168, 53, 0.2)'}`,
              color: activeTab === tab ? '#000' : '#d4d4d8',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              transition: 'all 0.3s',
              fontFamily: '"DM Sans", sans-serif',
            }}
          >
            {tab === 'panel' && '📱 Touch Panel'}
            {tab === 'lighting' && '💡 Smart Lighting'}
            {tab === 'integration' && '🏢 Integration'}
          </button>
        ))}
      </div>

      {activeTab === 'panel' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', color: '#f5f0e8', marginBottom: '30px', textAlign: 'center' }}>
            Smart Touch Panel Control
          </h2>

          {/* Allieehomes Integration */}
          <div
            style={{
              background: 'rgba(15, 15, 15, 0.8)',
              border: '1px solid rgba(201, 168, 53, 0.15)',
              borderRadius: '12px',
              padding: '40px',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '24px', color: '#C9A835', marginBottom: '16px' }}>Allieehomes Application</h3>
                <p style={{ color: '#999', lineHeight: 1.8, marginBottom: '24px' }}>
                  Control your entire smart home environment from a unified, intuitive interface. The Allieehomes
                  application provides seamless control over all connected devices with voice commands, automated
                  scenes, and mobile accessibility.
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
                  {['Voice Control', 'Mobile App', 'Scene Presets', 'Real-time Monitoring'].map((feature) => (
                    <div
                      key={feature}
                      style={{
                        padding: '12px',
                        background: 'rgba(201, 168, 53, 0.05)',
                        border: '1px solid rgba(201, 168, 53, 0.1)',
                        borderRadius: '6px',
                        fontSize: '13px',
                        color: '#d4d4d8',
                      }}
                    >
                      ✓ {feature}
                    </div>
                  ))}
                </div>
                <a
                  href="https://allieehomes.com/application"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '12px 32px',
                    background: '#C9A835',
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e8c84a';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#C9A835';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Open Application →
                </a>
              </div>

              {/* Visual Control Panel */}
              <div
                style={{
                  background: 'rgba(201, 168, 53, 0.05)',
                  border: '1px solid rgba(201, 168, 53, 0.2)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '24px' }}>📱</div>
                <h4 style={{ color: '#C9A835', marginBottom: '16px', textAlign: 'center' }}>Touch Panel Features</h4>
                <ul style={{ color: '#999', fontSize: '13px', lineHeight: 2 }}>
                  <li>✓ Multi-zone lighting control</li>
                  <li>✓ Temperature & HVAC management</li>
                  <li>✓ Security system integration</li>
                  <li>✓ Entertainment center control</li>
                  <li>✓ Custom automation routines</li>
                  <li>✓ Energy consumption tracking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Interactive Smart Touch Panel Demo */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '20px', color: '#C9A835', marginBottom: '24px', textAlign: 'center', letterSpacing: '1px' }}>
              Interactive Touch Panel Demo
            </h3>
            <SmartTouchPanel />
          </div>
        </div>
      )}

      {activeTab === 'lighting' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', color: '#f5f0e8', marginBottom: '30px', textAlign: 'center' }}>
            AI-Powered Smart Lighting
          </h2>

          {/* Lytiva Integration */}
          <div
            style={{
              background: 'rgba(15, 15, 15, 0.8)',
              border: '1px solid rgba(201, 168, 53, 0.15)',
              borderRadius: '12px',
              padding: '40px',
              marginBottom: '30px',
              backdropFilter: 'blur(10px)',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'flex-start' }}>
              {/* Left: Info */}
              <div>
                <h3 style={{ fontSize: '24px', color: '#C9A835', marginBottom: '16px' }}>Lytiva Smart Lighting</h3>
                <p style={{ color: '#999', lineHeight: 1.8, marginBottom: '24px' }}>
                  Experience next-generation lighting powered by AI. Lytiva transforms your spaces with adaptive
                  daylight harvesting, occupancy-aware automation, and machine learning-driven energy optimization.
                </p>

                <h4 style={{ color: '#d4d4d8', fontSize: '14px', marginBottom: '16px', letterSpacing: '1px' }}>
                  KEY TECHNOLOGIES
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
                  {[
                    { label: 'Daylight Harvesting', desc: 'Sunlight-driven efficiency' },
                    { label: 'Occupancy Sensing', desc: 'Smart presence detection' },
                    { label: 'AI Automation', desc: 'Adaptive learning systems' },
                    { label: 'IoT Integration', desc: 'Connected ecosystem' },
                  ].map((tech) => (
                    <div
                      key={tech.label}
                      style={{
                        padding: '12px',
                        background: 'rgba(201, 168, 53, 0.05)',
                        border: '1px solid rgba(201, 168, 53, 0.1)',
                        borderRadius: '6px',
                      }}
                    >
                      <div style={{ color: '#C9A835', fontSize: '13px', fontWeight: 600 }}>{tech.label}</div>
                      <div style={{ color: '#777', fontSize: '11px' }}>{tech.desc}</div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://lytiva.com"
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    padding: '12px 32px',
                    background: '#C9A835',
                    color: '#000',
                    border: 'none',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: 600,
                    letterSpacing: '1px',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                    transition: 'all 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#e8c84a';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#C9A835';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  Explore Lytiva →
                </a>
              </div>

              {/* Right: Control Panel */}
              <div
                style={{
                  background: 'rgba(201, 168, 53, 0.05)',
                  border: '1px solid rgba(201, 168, 53, 0.2)',
                  borderRadius: '12px',
                  padding: '24px',
                }}
              >
                <h4 style={{ color: '#C9A835', marginBottom: '24px', textAlign: 'center' }}>Lighting Control</h4>

                {/* Lighting Mode Selection */}
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ color: '#999', fontSize: '12px', display: 'block', marginBottom: '12px' }}>
                    LIGHTING MODE
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
                    {lightingModes.map((mode) => (
                      <div
                        key={mode.id}
                        onClick={() => setLightingMode(mode.id)}
                        style={{
                          padding: '10px 12px',
                          background:
                            lightingMode === mode.id ? 'rgba(201, 168, 53, 0.2)' : 'rgba(201, 168, 53, 0.05)',
                          border:
                            lightingMode === mode.id
                              ? '1px solid rgba(201, 168, 53, 0.5)'
                              : '1px solid rgba(201, 168, 53, 0.1)',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                        }}
                      >
                        <div style={{ color: '#C9A835', fontSize: '13px', fontWeight: 600 }}>{mode.label}</div>
                        <div style={{ color: '#777', fontSize: '11px' }}>{mode.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Brightness Control */}
                <div style={{ marginBottom: '24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <label style={{ color: '#999', fontSize: '12px' }}>BRIGHTNESS</label>
                    <span style={{ color: '#C9A835', fontSize: '13px', fontWeight: 600 }}>{brightness}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={brightness}
                    onChange={(e) => setBrightness(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(201, 168, 53, 0.1)',
                      borderRadius: '3px',
                      outline: 'none',
                      cursor: 'pointer',
                      accentColor: '#C9A835',
                    }}
                  />
                </div>

                {/* Color Temperature */}
                <div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <label style={{ color: '#999', fontSize: '12px' }}>COLOR TEMPERATURE</label>
                    <span style={{ color: '#C9A835', fontSize: '13px', fontWeight: 600 }}>{colorTemp}K</span>
                  </div>
                  <input
                    type="range"
                    min="2700"
                    max="6500"
                    step="100"
                    value={colorTemp}
                    onChange={(e) => setColorTemp(parseInt(e.target.value))}
                    style={{
                      width: '100%',
                      height: '6px',
                      background: 'rgba(201, 168, 53, 0.1)',
                      borderRadius: '3px',
                      outline: 'none',
                      cursor: 'pointer',
                      accentColor: '#C9A835',
                    }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '11px' }}>
                    <span style={{ color: '#999' }}>Warm (2700K)</span>
                    <span style={{ color: '#999' }}>Cool (6500K)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'integration' && (
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '32px', color: '#f5f0e8', marginBottom: '30px', textAlign: 'center' }}>
            Building Integration & Services
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {[
              {
                icon: '🏢',
                title: 'Building Management System',
                features: [
                  'Centralized control dashboard',
                  'Multi-floor/multi-zone management',
                  'Real-time energy analytics',
                  'Automated reporting',
                ],
              },
              {
                icon: '⚡',
                title: 'Energy Management',
                features: [
                  'Peak load optimization',
                  'Demand response integration',
                  'Carbon footprint tracking',
                  'Cost analytics & savings',
                ],
              },
              {
                icon: '🔐',
                title: 'Security Integration',
                features: [
                  'Access control systems',
                  'Motion detection',
                  'Emergency lighting protocols',
                  'Audit trails & logging',
                ],
              },
              {
                icon: '📊',
                title: 'Data & Analytics',
                features: [
                  'Machine learning insights',
                  'Predictive optimization',
                  'Custom reporting tools',
                  'API integrations',
                ],
              },
              {
                icon: '🌱',
                title: 'Sustainability',
                features: [
                  'Net-zero building support',
                  'Renewable energy integration',
                  'Waste heat recovery',
                  'ESG compliance tracking',
                ],
              },
              {
                icon: '👥',
                title: 'Human-Centric',
                features: [
                  'Circadian rhythm optimization',
                  'Wellbeing-focused controls',
                  'User preference learning',
                  'Accessibility features',
                ],
              },
            ].map((service, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(15, 15, 15, 0.8)',
                  border: '1px solid rgba(201, 168, 53, 0.15)',
                  borderRadius: '12px',
                  padding: '24px',
                  backdropFilter: 'blur(10px)',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 168, 53, 0.4)';
                  e.currentTarget.style.background = 'rgba(15, 15, 15, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 168, 53, 0.15)';
                  e.currentTarget.style.background = 'rgba(15, 15, 15, 0.8)';
                }}
              >
                <div style={{ fontSize: '40px', marginBottom: '12px' }}>{service.icon}</div>
                <h3 style={{ color: '#C9A835', fontSize: '16px', marginBottom: '16px', fontWeight: 600 }}>
                  {service.title}
                </h3>
                <ul style={{ color: '#999', fontSize: '13px', lineHeight: 2 }}>
                  {service.features.map((feature) => (
                    <li key={feature}>✓ {feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
