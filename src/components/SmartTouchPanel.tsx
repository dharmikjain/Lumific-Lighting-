import { useState } from 'react';
import { SmartLightingService, smartPanelFeatures } from '../utils/smartLightingService';

export default function SmartTouchPanel() {
  const [selectedZone, setSelectedZone] = useState<string>('living-room');
  const [activePage, setActivePage] = useState<'lighting' | 'climate' | 'security' | 'entertainment' | 'energy' | 'automation'>('lighting');

  const zones = [
    { id: 'living-room', name: 'Living Room', icon: '🛋️' },
    { id: 'bedroom', name: 'Bedroom', icon: '🛏️' },
    { id: 'kitchen', name: 'Kitchen', icon: '🍳' },
    { id: 'office', name: 'Office', icon: '💻' },
    { id: 'bathroom', name: 'Bathroom', icon: '🚿' },
  ];

  const recommendation = SmartLightingService.getAIRecommendation(
    75,
    3,
    350
  );

  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #1a1a1a 0%, #0f0f0f 100%)',
        borderRadius: '20px',
        padding: '24px',
        minHeight: '600px',
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        gap: '24px',
        border: '2px solid rgba(201, 168, 53, 0.2)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
    >
      {/* Left: Zone Selection */}
      <div>
        <h3 style={{ color: '#C9A835', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
          Zones
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px' }}>
          {zones.map((zone) => (
            <button
              key={zone.id}
              onClick={() => setSelectedZone(zone.id)}
              style={{
                padding: '12px 16px',
                background: selectedZone === zone.id ? 'rgba(201, 168, 53, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                border: selectedZone === zone.id ? '1px solid rgba(201, 168, 53, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                color: selectedZone === zone.id ? '#C9A835' : '#999',
                cursor: 'pointer',
                transition: 'all 0.2s',
                fontSize: '13px',
                textAlign: 'left',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => {
                if (selectedZone !== zone.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.borderColor = 'rgba(201, 168, 53, 0.3)';
                }
              }}
              onMouseLeave={(e) => {
                if (selectedZone !== zone.id) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                }
              }}
            >
              <span style={{ fontSize: '16px' }}>{zone.icon}</span>
              <div>
                <div style={{ fontWeight: 600 }}>{zone.name}</div>
                <div style={{ fontSize: '11px', opacity: 0.7 }}>Zone Control</div>
              </div>
            </button>
          ))}
        </div>

        {/* Control Pages */}
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ color: '#C9A835', fontSize: '14px', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Controls
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '6px' }}>
            {(Object.entries(smartPanelFeatures) as Array<[keyof typeof smartPanelFeatures, any]>).map(([key, feature]) => (
              <button
                key={key}
                onClick={() => setActivePage(key as any)}
                style={{
                  padding: '10px 12px',
                  background: activePage === key ? 'rgba(201, 168, 53, 0.15)' : 'transparent',
                  border: activePage === key ? '1px solid rgba(201, 168, 53, 0.4)' : '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '6px',
                  color: activePage === key ? '#C9A835' : '#999',
                  cursor: 'pointer',
                  fontSize: '12px',
                  textAlign: 'left',
                  transition: 'all 0.2s',
                }}
              >
                {feature.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: Control Panel */}
      <div style={{ overflowY: 'auto', paddingRight: '12px' }}>
        {activePage === 'lighting' && (
          <div>
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ color: '#f5f0e8', fontSize: '20px', marginBottom: '8px' }}>Intelligent Lighting</h2>
              <p style={{ color: '#999', fontSize: '13px' }}>AI-powered adaptive control for {selectedZone.replace('-', ' ')}</p>
            </div>

            {/* AI Recommendation Card */}
            <div
              style={{
                background: 'rgba(201, 168, 53, 0.08)',
                border: '1px solid rgba(201, 168, 53, 0.2)',
                borderRadius: '12px',
                padding: '16px',
                marginBottom: '24px',
              }}
            >
              <div style={{ color: '#C9A835', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                🤖 AI RECOMMENDATION
              </div>
              <div style={{ color: '#d4d4d8', fontSize: '13px', lineHeight: 1.6 }}>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>{recommendation.action}</div>
                <div style={{ color: '#999', fontSize: '12px' }}>{recommendation.reason}</div>
              </div>
            </div>

            {/* Brightness Control */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ color: '#999', fontSize: '12px', fontWeight: 600 }}>BRIGHTNESS</label>
                <span style={{ color: '#C9A835', fontSize: '13px', fontWeight: 600 }}>{recommendation.targetBrightness}%</span>
              </div>
              <div
                style={{
                  height: '8px',
                  background: 'rgba(201, 168, 53, 0.1)',
                  borderRadius: '4px',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div
                  style={{
                    height: '100%',
                    width: `${recommendation.targetBrightness}%`,
                    background: 'linear-gradient(90deg, #C9A835, #e8c84a)',
                    borderRadius: '4px',
                    transition: 'width 0.5s ease',
                  }}
                />
              </div>
            </div>

            {/* Color Temperature */}
            <div style={{ marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ color: '#999', fontSize: '12px', fontWeight: 600 }}>COLOR TEMPERATURE</label>
                <span style={{ color: '#C9A835', fontSize: '13px', fontWeight: 600 }}>{recommendation.targetColorTemp}K</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {[
                  { temp: 2700, label: '2700K', color: '#ff8c42' },
                  { temp: 3500, label: '3500K', color: '#ffa500' },
                  { temp: 4500, label: '4500K', color: '#ffcc00' },
                  { temp: 6500, label: '6500K', color: '#87ceeb' },
                ].map((preset) => (
                  <button
                    key={preset.temp}
                    style={{
                      padding: '10px 8px',
                      background:
                        recommendation.targetColorTemp === preset.temp
                          ? `rgba(${parseInt(preset.color.slice(1, 3), 16)}, ${parseInt(preset.color.slice(3, 5), 16)}, ${parseInt(preset.color.slice(5, 7), 16)}, 0.2)`
                          : 'rgba(255, 255, 255, 0.05)',
                      border:
                        recommendation.targetColorTemp === preset.temp
                          ? `2px solid ${preset.color}`
                          : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: preset.color,
                      fontSize: '11px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Lighting Modes */}
            <div>
              <label style={{ color: '#999', fontSize: '12px', fontWeight: 600, display: 'block', marginBottom: '8px' }}>
                LIGHTING MODE
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {['Auto', 'Manual', 'Circadian', 'Daylight'].map((mode) => (
                  <button
                    key={mode}
                    style={{
                      padding: '10px 8px',
                      background: mode === 'Auto' ? 'rgba(201, 168, 53, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                      border: mode === 'Auto' ? '1px solid rgba(201, 168, 53, 0.4)' : '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '6px',
                      color: mode === 'Auto' ? '#C9A835' : '#999',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Other Pages - Placeholder */}
        {activePage !== 'lighting' && (
          <div style={{ textAlign: 'center', color: '#999', paddingTop: '40px' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>
              {activePage === 'climate' && '❄️'}
              {activePage === 'security' && '🔐'}
              {activePage === 'entertainment' && '🎬'}
              {activePage === 'energy' && '⚡'}
              {activePage === 'automation' && '⚙️'}
            </div>
            <h3 style={{ color: '#f5f0e8', marginBottom: '8px' }}>
              {smartPanelFeatures[activePage as keyof typeof smartPanelFeatures].label}
            </h3>
            <p style={{ fontSize: '13px' }}>
              {smartPanelFeatures[activePage as keyof typeof smartPanelFeatures].description}
            </p>
            <div style={{ marginTop: '16px', fontSize: '12px', opacity: 0.6 }}>
              Advanced controls available in Allieehomes app
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
