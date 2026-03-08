"use client";
import { useState } from "react";
import Link from "next/link";

const SECTIONS = [
  {
    id: "quotation",
    title: "Smart Quotation Engine",
    subtitle: "AI-Powered Instant Quotations",
    description: "Upload your project specs and get instant, accurate quotations with material costs, labor estimates, and competitive pricing analysis.",
    features: [
      "Upload project specifications",
      "AI-driven cost estimation",
      "Material & labor breakdown",
      "Competitive pricing analysis",
      "Export to PDF/Excel"
    ],
    icon: "💰",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50"
  },
  {
    id: "ai",
    title: "AI Integration Layer",
    subtitle: "Intelligent Lighting Assistant",
    description: "Advanced AI that understands lighting requirements, provides recommendations, and helps optimize your specifications.",
    features: [
      "Natural language queries",
      "Product recommendations",
      "Lux calculations",
      "Energy optimization",
      "Code compliance checking"
    ],
    icon: "🤖",
    color: "from-purple-500 to-pink-500",
    bgColor: "bg-gradient-to-br from-purple-50 to-pink-50"
  },
  {
    id: "layout",
    title: "Layout Engine",
    subtitle: "Automated Floor Plan Analysis",
    description: "Upload floor plans and get automated room detection, zone mapping, lux calculations, and complete BOQ generation.",
    features: [
      "PDF/DWG upload support",
      "AI room detection",
      "Automated zone mapping",
      "Lux level calculations",
      "Complete BOQ generation"
    ],
    icon: "📐",
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-gradient-to-br from-green-50 to-emerald-50"
  },
  {
    id: "products",
    title: "Product Catalog",
    subtitle: "Comprehensive Lighting Database",
    description: "Access our complete product catalog with detailed specifications, pricing, and compatibility information.",
    features: [
      "Complete product database",
      "Detailed specifications",
      "Multi-tier pricing",
      "Compatibility matrix",
      "Photometric data"
    ],
    icon: "📚",
    color: "from-orange-500 to-red-500",
    bgColor: "bg-gradient-to-br from-orange-50 to-red-50"
  },
  {
    id: "configurator",
    title: "Lumific Configurator",
    subtitle: "Custom Product Builder",
    description: "Build custom lighting solutions with our advanced configurator featuring finishes, optics, and control systems.",
    features: [
      "Custom configuration",
      "Finish selection",
      "Optical options",
      "Control system integration",
      "Real-time pricing"
    ],
    icon: "⚙️",
    color: "from-indigo-500 to-purple-500",
    bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50"
  }
];

export default function RedesignedSectionsPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-gray-900 to-slate-800 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-orange-500/20"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <span className="text-sm font-medium">✨ Redesigned Platform</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Lumific Platform
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Experience our redesigned platform sections with enhanced functionality,
              improved user experience, and cutting-edge lighting technology.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/platform"
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Explore Platform →
              </Link>
              <button className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200">
                Watch Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Sections Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Platform Sections
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover our comprehensive suite of tools designed to streamline your lighting projects
              from concept to completion.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SECTIONS.map((section) => (
              <div
                key={section.id}
                className={`group relative overflow-hidden rounded-2xl ${section.bgColor} border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer`}
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              >
                <div className="p-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-r ${section.color} text-white text-2xl mb-6 shadow-lg`}>
                    {section.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                    {section.title}
                  </h3>
                  <p className="text-lg font-medium text-gray-700 mb-4">
                    {section.subtitle}
                  </p>
                  <p className="text-gray-600 leading-relaxed">
                    {section.description}
                  </p>

                  {/* Features List */}
                  <div className="mt-6 space-y-2">
                    {section.features.slice(0, 3).map((feature, index) => (
                      <div key={index} className="flex items-center text-sm text-gray-600">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></div>
                        {feature}
                      </div>
                    ))}
                    {section.features.length > 3 && (
                      <div className="text-sm text-gray-500 font-medium">
                        +{section.features.length - 3} more features
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed View Modal */}
      {activeSection && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r ${SECTIONS.find(s => s.id === activeSection)?.color} text-white text-xl mr-4`}>
                    {SECTIONS.find(s => s.id === activeSection)?.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">
                      {SECTIONS.find(s => s.id === activeSection)?.title}
                    </h3>
                    <p className="text-gray-600">
                      {SECTIONS.find(s => s.id === activeSection)?.subtitle}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setActiveSection(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>

              <p className="text-gray-700 text-lg leading-relaxed mb-6">
                {SECTIONS.find(s => s.id === activeSection)?.description}
              </p>

              <div className="space-y-3 mb-8">
                <h4 className="font-semibold text-gray-900 text-lg">Key Features:</h4>
                {SECTIONS.find(s => s.id === activeSection)?.features.map((feature, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    <div className="w-2 h-2 bg-amber-500 rounded-full mr-3"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <div className="flex gap-4">
                <Link
                  href={`/platform?section=${activeSection}`}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200"
                >
                  Try It Now →
                </Link>
                <button
                  onClick={() => setActiveSection(null)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-slate-900 to-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Lighting Projects?
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Join thousands of architects, designers, and specifiers who trust Lumific
            for their lighting needs. Start your project today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/platform"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-lg hover:from-amber-600 hover:to-orange-600 transition-all duration-200 shadow-lg"
            >
              Access Platform →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-200"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}