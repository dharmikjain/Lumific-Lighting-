export default function Franchise() {
  return (
    <div style={{ minHeight: '100vh', padding: '40px', backgroundColor: '#f8fafc' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px' }}>Franchise Opportunities</h1>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>
        Join our growing network of partners and grow your business with Lumific.
      </p>

      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Why Partner with Lumific?</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', marginBottom: '30px' }}>
            <li>✓ 20+ years of industry expertise</li>
            <li>✓ Premium product portfolio</li>
            <li>✓ Comprehensive training & support</li>
            <li>✓ Competitive margins</li>
            <li>✓ Marketing & co-branding assistance</li>
            <li>✓ Dedicated account management</li>
          </ul>

          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Eligibility Criteria</h2>
          <ul style={{ lineHeight: '1.8', color: '#555', marginBottom: '30px' }}>
            <li>• Registered business entity</li>
            <li>• Minimum 2 years in lighting/electrical sector</li>
            <li>• Retail space (min 500 sq ft)</li>
            <li>• Strong local network</li>
          </ul>

          <button
            style={{
              padding: '12px 30px',
              backgroundColor: '#C9A835',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 600,
            }}
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
}
