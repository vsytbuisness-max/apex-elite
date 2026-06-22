"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  details: string;
  span: string; // Tailwind grid span classes
}

export function MasonryGrid({ projects: cmsProjects }: { projects?: Project[] }) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const defaultPortfolioData: Project[] = [
    {
      id: "p1",
      title: "The Horizon Estate",
      category: "Custom Home Build",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
      details: "The Horizon Estate - $2.5M Build - 14 Months. A cantilevered modern masterpiece featuring floor-to-ceiling glass and smart-home integration.",
      span: "col-span-1 md:col-span-2 row-span-2",
    },
    {
      id: "p2",
      title: "Oak Creek Villa",
      category: "Renovation",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop",
      details: "Oak Creek Villa - $850K Renovation - 6 Months. Complete interior gut and remodel focusing on organic textures and warm lighting.",
      span: "col-span-1 row-span-1",
    },
    {
      id: "p3",
      title: "Summit Modern",
      category: "Architectural Design",
      image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop",
      details: "Summit Modern - $4.2M Build - 18 Months. Geometric precision set against a mountainous backdrop with infinity pool.",
      span: "col-span-1 row-span-1",
    },
    {
      id: "p4",
      title: "Culinary Haven",
      category: "Kitchen Remodel",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=800&auto=format&fit=crop",
      details: "Culinary Haven - $150K Remodel - 8 Weeks. A chef's dream with double islands and custom Italian cabinetry.",
      span: "col-span-1 md:col-span-2 row-span-1",
    },
    {
      id: "p5",
      title: "Urban Glasshouse",
      category: "Custom Home Build",
      image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop",
      details: "Urban Glasshouse - $1.8M Build - 11 Months. Industrial chic meets luxury in the heart of the city.",
      span: "col-span-1 row-span-1",
    },
  ];

  const activeData = cmsProjects?.length ? cmsProjects : defaultPortfolioData;
  const selectedProject = activeData.find((p) => p.id === selectedId);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] grid-flow-dense gap-4 max-w-7xl mx-auto px-6">
        {activeData.map((project) => (
          <motion.div
            layoutId={`container-${project.id}`}
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className={`relative group cursor-pointer overflow-hidden rounded-xl bg-white/5 ${project.span}`}
          >
            <motion.img
              layoutId={`image-${project.id}`}
              src={project.image}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111]/90 via-[#111]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <motion.div
              layoutId={`title-container-${project.id}`}
              className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100"
            >
              <p className="text-primary text-sm font-bold uppercase tracking-wider mb-1">{project.category}</p>
              <h3 className="text-white font-heading text-2xl font-bold">{project.title}</h3>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-[#111]/90 backdrop-blur-sm cursor-pointer"
            />
            
            <motion.div
              layoutId={`container-${selectedProject.id}`}
              className="relative w-full max-w-5xl max-h-[90vh] bg-[#1a1a1a] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl shadow-black/50"
            >
              <button
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/80 backdrop-blur-md rounded-full flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <motion.div className="w-full md:w-2/3 h-[40vh] md:h-auto relative">
                <motion.img
                  layoutId={`image-${selectedProject.id}`}
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </motion.div>

              <div className="w-full md:w-1/3 p-8 md:p-12 flex flex-col justify-center">
                <motion.div layoutId={`title-container-${selectedProject.id}`}>
                  <p className="text-primary text-sm font-bold uppercase tracking-wider mb-2">{selectedProject.category}</p>
                  <h3 className="text-white font-heading text-3xl font-bold mb-6">{selectedProject.title}</h3>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-secondary leading-relaxed space-y-4"
                >
                  <p>{selectedProject.details}</p>
                  <div className="pt-6 border-t border-white/10">
                    <button className="text-white hover:text-primary transition-colors font-semibold tracking-wide uppercase text-sm border-b border-primary/50 pb-1">
                      Request Similar Build
                    </button>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
