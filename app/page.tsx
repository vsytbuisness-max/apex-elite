import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { BentoGrid } from "@/components/ui/BentoGrid";
import { Marquee } from "@/components/ui/Marquee";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { motion } from "framer-motion";

export const revalidate = 60; // Revalidate every minute

async function getHomePageData() {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error("Sanity not configured");
    }
    
    const settings = await client.fetch(`*[_type == "siteSettings"][0]`);
    const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc) [0...5]`);
    
    return {
      heroHeadline: settings?.heroHeadline || null,
      heroSubtext: settings?.heroSubtext || null,
      projects: projects?.map((p: any) => ({
        id: p._id,
        name: p.title,
        image: p.mainImage ? urlForImage(p.mainImage) : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      })) || null,
    };
  } catch (error) {
    console.warn("Failed to fetch Sanity data, using fallbacks.", error);
    return { heroHeadline: null, heroSubtext: null, projects: null };
  }
}

export default async function Home() {
  const data = await getHomePageData();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Section 1: Hero (The Hook) */}
      <section className="relative w-full h-screen min-h-[800px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop")' }}
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#111111]/80 via-[#111111]/60 to-[#111111] pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl mx-auto mt-20">
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <h1 className="font-heading text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white mb-6 leading-[1.1]" dangerouslySetInnerHTML={{ __html: data.heroHeadline || 'Architectural Perfection.<br /><span class="text-primary italic font-light">Engineered for You.</span>' }} />
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both text-lg md:text-2xl text-secondary mb-12 max-w-3xl font-light tracking-wide">
            {data.heroSubtext || "Award-winning luxury remodeling and custom home builds."}
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link href="#contact" className="w-full sm:w-auto">
              <Button variant="primary" className="w-full text-lg h-14 px-10">
                Request Estimate
              </Button>
            </Link>
            <Link href="/portfolio" className="w-full sm:w-auto">
              <Button variant="secondary" className="w-full text-lg h-14 px-10">
                Explore Portfolio
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-in fade-in duration-1000 delay-1000 fill-mode-both">
          <span className="text-secondary/50 text-xs tracking-[0.2em] uppercase mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </section>

      {/* Section 2: The SEO Authority Grid */}
      <section className="py-24 bg-[#111111] relative">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Mastery in Every Detail</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            We specialize in high-end structural transformations that redefine luxury living.
          </p>
        </div>
        <BentoGrid />
      </section>

      {/* Section 3: Featured Projects (Teaser) */}
      <section className="py-24 bg-[#0a0a0a] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 flex justify-between items-end">
          <div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">Featured Projects</h2>
            <p className="text-secondary max-w-xl">
              A glimpse into our recent architectural triumphs.
            </p>
          </div>
          <Link href="/portfolio" className="hidden md:inline-flex items-center text-primary font-bold hover:text-white transition-colors">
            View All Work &rarr;
          </Link>
        </div>
        <Marquee projects={data.projects || undefined} />
      </section>

      {/* Section 4: The GEO / FAQ Core */}
      <section className="py-32 bg-[#111111] relative">
        {/* Decorative background element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-start">
          <div className="w-full lg:w-1/3 sticky top-32">
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-6">Process & <br className="hidden lg:block"/> Expectations</h2>
            <p className="text-secondary mb-8">
              Transparency and precision are the cornerstones of our client relationships. Find answers to our most common inquiries regarding timelines, budgets, and permits.
            </p>
          </div>
          <div className="w-full lg:w-2/3">
            <Accordion />
          </div>
        </div>
      </section>
    </div>
  );
}
