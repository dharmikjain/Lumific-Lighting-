// AI Chat Service for Lumific
// Provides intelligent responses about lighting products and services

const lightingFAQ: { [key: string]: string[] } = {
  'downlight': [
    'Our downlights feature precision-engineered optics with CRI 97+ for true colour rendering.',
    'Available in tunable white (2700K-6500K) with anti-glare UGR <16 optics.',
    'IP44 rated for bathroom and wet areas. Over 280+ product variations.',
  ],
  'track': [
    'Lumific track systems offer modular flexibility for commercial and residential spaces.',
    'Adjustable spotlights with advanced thermal management.',
    'Over 140+ configurations available for custom lighting designs.',
  ],
  'profile': [
    'Our profile lights are ideal for accent and architectural lighting.',
    'Use premium LED strips with minimal heat dissipation.',
    'Perfect for cove lighting, linear architecture, and facade applications.',
  ],
  'outdoor': [
    'Weather-resistant outdoor lighting with IP65+ rating.',
    'Spike lights, wall-mounted fixtures, and landscape options.',
    'Engineered for durability in harsh environmental conditions.',
  ],
  'smart': [
    'Smart bulbs with WiFi connectivity for remote control and scheduling.',
    'Compatible with popular smart home ecosystems.',
    'Energy-efficient with customizable colour temperature and brightness.',
  ],
  'quotation': [
    'Use our Quotation Builder to create professional product quotes.',
    'Export to PDF or Excel with automatic GST calculations.',
    'Save and load quotations for future reference.',
  ],
  'contact': [
    'Call us at +91 98765 43210 for direct sales support.',
    'Email: sales@lumific.in for bulk inquiries.',
    'Visit our experience centers across India.',
  ],
  'franchise': [
    'Become a Lumific franchise partner with low investment.',
    'Full stock support from our Bhiwandi warehouse.',
    'Comprehensive training and national marketing support.',
  ],
};

const defaultResponses = [
  'I\'d be happy to help! Could you tell me more about what type of lighting solution you\'re looking for?',
  'Are you interested in a specific product category? We offer downlights, track systems, profile lights, and much more.',
  'What is your use case? Are you looking for residential, commercial, hospitality, or outdoor lighting?',
  'I can help you with product information, quotations, or franchise opportunities. What interests you?',
];

export function getAIResponse(userMessage: string): Promise<string> {
  return new Promise((resolve) => {
    // Simulate API delay
    const delay = Math.random() * 800 + 400;
    
    setTimeout(() => {
      const message = userMessage.toLowerCase();
      let response = '';

      // Check for keywords in user message
      const keywords = Object.keys(lightingFAQ);
      const matchedKeyword = keywords.find(keyword => message.includes(keyword));

      if (matchedKeyword) {
        // Pick a random response from the matched category
        const responses = lightingFAQ[matchedKeyword];
        response = responses[Math.floor(Math.random() * responses.length)];
      } else if (message.includes('price') || message.includes('cost') || message.includes('rate')) {
        response = 'Pricing varies based on product specifications and order volume. I\'d be happy to provide a custom quotation using our Quotation Builder. Could you share the specific products you\'re interested in?';
      } else if (message.includes('install') || message.includes('installation')) {
        response = 'Our products come with comprehensive installation guides. For complex projects, we recommend consulting with a lighting professional. Would you like contact details for installation support?';
      } else if (message.includes('hello') || message.includes('hi')) {
        response = 'Hello! Welcome to Lumific. How can I assist you with our premium architectural lighting solutions today?';
      } else if (message.includes('thank')) {
        response = 'You\'re welcome! Feel free to ask any other questions about our products and services.';
      } else {
        // Return a default response
        response = defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
      }

      resolve(response);
    }, delay);
  });
}

export function getInitialGreeting(): string {
  const greetings = [
    'Hello! 👋 I\'m Lumific\'s AI Assistant. How can I help you explore our premium architectural lighting solutions today?',
    'Welcome to Lumific! 💡 I\'m here to assist you with product information, quotations, and more. What interests you?',
    'Hi there! 🌟 I can help you find the perfect lighting solution for your project. What type of space are you lighting?',
  ];
  return greetings[Math.floor(Math.random() * greetings.length)];
}
