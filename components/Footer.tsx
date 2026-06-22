"use client";

import { Button } from "./ui/Button";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0a0a0a] border-t border-white/5 pt-24 pb-12 relative overflow-hidden">
      {/* Background Accent */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        {/* Left: Lead Capture Form */}
        <div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Start Your Project.</h2>
          <p className="text-secondary mb-8 max-w-md">
            Ready to engineer your architectural perfection? Fill out the form below and our lead designer will be in touch.
          </p>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all"
              />
            </div>
            <select className="bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all appearance-none">
              <option value="" className="bg-[#111] text-secondary">Select Budget</option>
              <option value="100k-250k" className="bg-[#111]">$100k - $250k</option>
              <option value="250k-500k" className="bg-[#111]">$250k - $500k</option>
              <option value="500k+" className="bg-[#111]">$500k+</option>
            </select>
            <textarea
              placeholder="Project Scope & Vision"
              rows={4}
              className="bg-white/5 border border-white/10 rounded-md px-4 py-3 text-white placeholder:text-secondary/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none"
            />
            <Button type="submit" variant="primary" className="w-full sm:w-auto self-start mt-2">
              Request Estimate
            </Button>
          </form>
        </div>

        {/* Right: Info & Links */}
        <div className="flex flex-col justify-between lg:pl-12">
          <div className="grid grid-cols-2 gap-8 mb-12 lg:mb-0">
            <div>
              <h3 className="font-heading text-lg font-semibold text-white mb-4">Company</h3>
              <ul className="flex flex-col gap-2 text-secondary">
                <li><a href="/portfolio" className="hover:text-primary transition-colors">Portfolio</a></li>
                <li><a href="/insights" className="hover:text-primary transition-colors">Insights</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-heading text-lg font-semibold text-white mb-4">Contact</h3>
              <ul className="flex flex-col gap-2 text-secondary">
                <li>800-555-0199</li>
                <li>hello@apexelite.com</li>
                <li className="mt-4 text-white">Headquarters</li>
                <li>100 Architectural Way</li>
                <li>Premium City Area, CA 90210</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center border-t border-white/10 pt-8 mt-12 lg:mt-0 text-sm text-secondary/60">
            <p>&copy; {new Date().getFullYear()} Apex Elite Remodeling. All rights reserved.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
