export default function Products() {
  return (
    <div style={{ minHeight: '100vh', padding: '40px', backgroundColor: '#f8fafc' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px' }}>Our Lighting Products</h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>
        Explore our comprehensive range of premium lighting solutions for every space and application.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {['Downlights', 'Track Systems', 'Profile Lights', 'Outdoor Lights', 'Smart Lighting'].map((product) => (
          <div
            key={product}
            style={{
              padding: '20px',
              borderRadius: '8px',
              backgroundColor: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}
          >
            <h3>{product}</h3>
            <p style={{ color: '#888', fontSize: '14px' }}>Premium quality lighting solution</p>
            <button
              style={{
                marginTop: '10px',
                padding: '8px 16px',
                backgroundColor: '#C9A835',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
