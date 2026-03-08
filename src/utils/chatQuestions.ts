// Quick question suggestions for chat interface
// Helps users discover what they can ask

export const quickQuestions = [
  {
    label: 'Downlights Info',
    query: 'Tell me about downlights',
  },
  {
    label: 'Track Systems',
    query: 'What are your track systems?',
  },
  {
    label: 'Product Pricing',
    query: 'How much do your products cost?',
  },
  {
    label: 'Custom Quotation',
    query: 'I need a quotation for my project',
  },
  {
    label: 'Installation Help',
    query: 'How do I install these lights?',
  },
  {
    label: 'Franchise Info',
    query: 'Tell me about franchise opportunities',
  },
  {
    label: 'Contact Support',
    query: 'How can I contact your team?',
  },
  {
    label: 'Smart Lighting',
    query: 'Tell me about smart lighting products',
  },
];

export const chatCategories = {
  products: [
    'downlight',
    'downlights',
    'track',
    'track system',
    'track systems',
    'profile',
    'profile lights',
    'outdoor',
    'outdoor lights',
    'smart',
    'smart lights',
    'smart bulb',
    'smart bulbs',
    'pendant',
    'sconce',
    'wall',
  ],
  pricing: [
    'price',
    'cost',
    'rate',
    'rates',
    'expensive',
    'affordable',
    'discount',
    'budget',
    'quote',
    'quotation',
  ],
  technical: [
    'cri',
    'lumen',
    'watt',
    'kelvin',
    'spec',
    'specification',
    'colour',
    'color',
    'temperature',
    'dimmable',
    'brightness',
  ],
  installation: [
    'install',
    'installation',
    'setup',
    'wire',
    'wiring',
    'electrical',
    'cable',
    'connector',
  ],
  business: [
    'franchise',
    'dealer',
    'distributor',
    'partner',
    'bulk',
    'wholesale',
    'business',
    'reseller',
  ],
  support: [
    'help',
    'support',
    'issue',
    'problem',
    'warranty',
    'service',
    'complaint',
    'return',
  ],
};

export function categorizeQuestion(question: string): string {
  const lowerQuestion = question.toLowerCase();

  for (const [category, keywords] of Object.entries(chatCategories)) {
    if (keywords.some((keyword) => lowerQuestion.includes(keyword))) {
      return category;
    }
  }

  return 'general';
}
