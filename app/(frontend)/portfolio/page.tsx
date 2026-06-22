import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { MasonryGrid } from "@/components/ui/MasonryGrid";

export const revalidate = 60; // Revalidate every minute

async function getPortfolioData() {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error("Sanity not configured");
    }
    
    const pageSettings = await client.fetch(`*[_type == "portfolioPage"][0]`);
    const projects = await client.fetch(`*[_type == "project"] | order(_createdAt desc)`);
    
    return {
      pageSettings: {
        title: pageSettings?.pageTitle || null,
        subtitle: pageSettings?.pageSubtitle || null,
      },
      projects: projects?.map((p: any) => ({
        id: p._id,
        title: p.title,
        category: p.category,
        image: p.mainImage ? urlForImage(p.mainImage) : "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
        details: p.description,
        span: p.span || "col-span-1 row-span-1",
      })) || null
    };
  } catch (error) {
    console.warn("Failed to fetch Sanity data, using fallbacks.", error);
    return { pageSettings: null, projects: null };
  }
}

export default async function Portfolio() {
  const { pageSettings, projects } = await getPortfolioData();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            {pageSettings?.title || "Our Masterpieces."}
          </h1>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            {pageSettings?.subtitle || "Explore our curated gallery of custom home builds, luxury kitchen renovations, and architectural bathroom designs."}
          </p>
        </div>
      </div>

      <MasonryGrid projects={projects || undefined} />
    </div>
  );
}
