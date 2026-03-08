export default function Projects() {
  const projects = [
    { city: 'Mumbai, India', name: 'The Grand Meridian Hotel', category: '🏨' },
    { city: 'Bangalore, India', name: 'Tech Campus HQ', category: '🏢' },
    { city: 'Delhi, India', name: 'Luxury Retail Mall', category: '🛍️' },
    { city: 'Pune, India', name: 'Residential High-Rise', category: '🏠' },
  ];

  return (
    <div style={{ minHeight: '100vh', padding: '40px', backgroundColor: '#f8fafc' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px' }}>Featured Projects</h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>
        Lighting designs that transform spaces and create memorable experiences.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {projects.map((proj) => (
          <div
            key={proj.name}
            style={{
              padding: '24px',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>{proj.category}</div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{proj.name}</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '16px' }}>{proj.city}</p>
            <button
              style={{
                padding: '8px 16px',
                backgroundColor: '#C9A835',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              View Case Study
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
