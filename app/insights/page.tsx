import { client } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const revalidate = 60; // Revalidate every minute

interface Blog {
  id: string | number;
  title: string;
  category: string;
  image: string;
  date: string;
  excerpt: string;
}

async function getInsightsData(): Promise<Blog[] | null> {
  try {
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
      throw new Error("Sanity not configured");
    }
    
    const posts = await client.fetch(`*[_type == "post"] | order(publishedAt desc)`);
    
    return posts?.map((p: any) => {
      return {
        id: p._id,
        title: p.title,
        category: p.category || "Uncategorized",
        image: p.mainImage ? urlForImage(p.mainImage) : "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
        date: new Date(p.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        excerpt: p.excerpt || "",
      };
    }) || null;
  } catch (error) {
    console.warn("Failed to fetch Sanity data, using fallbacks.", error);
    return null;
  }
}

const defaultBlogs: Blog[] = [
  {
    id: 1,
    title: "The 2025 Guide to Open-Concept Luxury Kitchens",
    category: "Design Trends",
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
    date: "Oct 12, 2025",
    excerpt: "Discover the latest in high-end culinary spaces, from hidden pantries to dramatic marble waterfall islands.",
  },
  {
    id: 2,
    title: "Integrating Smart Tech into Historic Home Renovations",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
    date: "Sep 28, 2025",
    excerpt: "How to preserve architectural integrity while weaving in state-of-the-art automation and climate control.",
  },
  {
    id: 3,
    title: "The Rise of the Spa-Inspired Master En-Suite",
    category: "Bathroom Design",
    image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
    date: "Sep 15, 2025",
    excerpt: "Transforming standard bathrooms into personal wellness retreats using organic textures and European fixtures.",
  },
  {
    id: 4,
    title: "Navigating City Permits for Custom Home Builds",
    category: "Process & Planning",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop",
    date: "Aug 30, 2025",
    excerpt: "A comprehensive overview of zoning laws, architectural reviews, and streamlining the approval process.",
  },
  {
    id: 5,
    title: "Sustainable Materials in Luxury Construction",
    category: "Sustainability",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
    date: "Aug 14, 2025",
    excerpt: "Sourcing ethically harvested hardwoods and carbon-neutral concrete without compromising on aesthetics.",
  },
  {
    id: 6,
    title: "Maximizing Natural Light with Custom Glazing",
    category: "Architecture",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop",
    date: "Jul 22, 2025",
    excerpt: "Engineering floor-to-ceiling glass walls to blur the boundaries between indoor and outdoor luxury living.",
  },
];

export default async function Insights() {
  const cmsBlogs = await getInsightsData();
  const activeBlogs = cmsBlogs?.length ? cmsBlogs : defaultBlogs;

  return (
    <div className="min-h-screen pt-32 pb-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="font-heading text-5xl md:text-7xl font-bold mb-6 tracking-tight">Industry Insights & <br className="hidden md:block"/> Architectural Trends.</h1>
          <p className="text-secondary max-w-2xl mx-auto text-lg">
            Expert perspectives on luxury design, construction methodologies, and material innovations.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeBlogs.map((blog, i) => (
          <article
            key={blog.id}
            className="group cursor-pointer flex flex-col bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all animate-in fade-in slide-in-from-bottom-8 duration-1000 fill-mode-both"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="relative h-64 overflow-hidden">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-4 left-4 bg-[#111]/80 backdrop-blur-md border border-primary/30 px-3 py-1 rounded text-primary text-xs font-bold uppercase tracking-wider">
                {blog.category}
              </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <span className="text-secondary/60 text-sm mb-3">{blog.date}</span>
              <h3 className="font-heading text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors line-clamp-2">
                {blog.title}
              </h3>
              <p className="text-secondary text-sm leading-relaxed mb-6 line-clamp-3">
                {blog.excerpt}
              </p>
              <div className="mt-auto pt-4 border-t border-white/10 flex items-center text-primary text-sm font-bold uppercase tracking-wide group-hover:text-white transition-colors">
                Read Article <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
