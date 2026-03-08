import { Check } from "lucide-react";

export default function PricingPage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-4">Pricing Plans</h1>
      <p className="text-lg text-slate-400 text-center max-w-2xl mb-12">
        Simple, transparent pricing. No hidden fees.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        {/* Basic Plan */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Basic</h3>
          <p className="text-3xl font-bold mb-6">$9<span className="text-lg text-slate-500 font-normal">/mo</span></p>
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> 1 Project</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> Basic Analytics</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> 24-hour support response</li>
          </ul>
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-colors">
            Get Started
          </button>
        </div>

        {/* Pro Plan */}
        <div className="bg-slate-800 border-2 border-indigo-500 rounded-2xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl shadow-indigo-500/10">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-indigo-500 text-white px-3 py-1 text-xs font-bold rounded-full">
            MOST POPULAR
          </div>
          <h3 className="text-xl font-semibold mb-2">Pro</h3>
          <p className="text-3xl font-bold mb-6">$29<span className="text-lg text-slate-400 font-normal">/mo</span></p>
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> Unlimited Projects</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> Advanced Analytics</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> 1-hour support response</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> Custom Domains</li>
          </ul>
          <button className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium text-white transition-colors">
            Start Free Trial
          </button>
        </div>

        {/* Enterprise Plan */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col">
          <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
          <p className="text-3xl font-bold mb-6">$99<span className="text-lg text-slate-500 font-normal">/mo</span></p>
          <ul className="space-y-3 mb-8 flex-1">
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> Everything in Pro</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> Dedicated Account Manager</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> Single Sign-On (SSO)</li>
            <li className="flex items-center gap-2"><Check className="w-5 h-5 text-indigo-400" /> SLA Guarantee</li>
          </ul>
          <button className="w-full py-2 bg-slate-800 hover:bg-slate-700 rounded-lg font-medium transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </main>
  );
}
