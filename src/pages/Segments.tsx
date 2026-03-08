export default function Segments() {
  const segments = [
    { name: 'Residential', icon: '🏠', desc: 'Homes & Villas' },
    { name: 'Commercial', icon: '🏢', desc: 'Office & Corporate' },
    { name: 'Hospitality', icon: '🏨', desc: 'Hotels & Restaurants' },
    { name: 'Retail', icon: '🛍️', desc: 'Showrooms & Stores' },
    { name: 'Healthcare', icon: '💼', desc: 'Hospitals & Clinics' },
    { name: 'Outdoor', icon: '🌳', desc: 'Landscape & Architecture' },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '40px', backgroundColor: '#f8fafc' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px' }}>Industry Segments</h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>
        Tailored lighting solutions for every market segment and application.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {segments.map((seg) => (
          <div
            key={seg.name}
            style={{
              padding: '30px',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>{seg.icon}</div>
            <h3 style={{ fontSize: '22px', marginBottom: '8px' }}>{seg.name}</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>{seg.desc}</p>
            <button
              style={{
                marginTop: '16px',
                padding: '8px 16px',
                backgroundColor: '#C9A835',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Learn More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
