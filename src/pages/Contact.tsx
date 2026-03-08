export default function Contact() {
  const phoneNumber = '919876543210'; // India WhatsApp number format
  const message = 'Hello! I am interested in Lumific lighting products.';

  return (
    <div style={{ minHeight: '100vh', padding: '40px', backgroundColor: '#f8fafc' }}>
      <h1 style={{ fontSize: '48px', fontWeight: 700, marginBottom: '20px' }}>Contact Us</h1>
      <div style={{ maxWidth: '900px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
        {/* Contact Info */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Get in Touch</h2>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>📍 Address</h3>
            <p style={{ color: '#666' }}>Lumific Headquarters<br />Mumbai, India</p>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>📞 Phone</h3>
            <p style={{ color: '#666' }}>+91-XXXX-XXXX-XXXX</p>
          </div>
          <div style={{ marginBottom: '24px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px' }}>✉️ Email</h3>
            <p style={{ color: '#666' }}>info@lumific.com</p>
          </div>

          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              padding: '12px 24px',
              backgroundColor: '#25D366',
              color: '#fff',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: 600,
              marginTop: '20px',
            }}
          >
            💬 WhatsApp Us
          </a>
        </div>

        {/* Contact Form */}
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 600, marginBottom: '20px' }}>Send us a Message</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }} onSubmit={(e) => { e.preventDefault(); alert('Thank you for contacting us!'); }}>
            <input
              type="text"
              placeholder="Your Name"
              style={{
                padding: '10px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              required
            />
            <input
              type="email"
              placeholder="Your Email"
              style={{
                padding: '10px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
              }}
              required
            />
            <textarea
              placeholder="Your Message"
              rows={5}
              style={{
                padding: '10px 12px',
                border: '1px solid #ccc',
                borderRadius: '4px',
                fontSize: '14px',
                fontFamily: 'inherit',
              }}
              required
            />
            <button
              type="submit"
              style={{
                padding: '12px 24px',
                backgroundColor: '#C9A835',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '16px',
                fontWeight: 600,
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
