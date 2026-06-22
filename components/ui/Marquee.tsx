"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export function Marquee({ projects: cmsProjects }: { projects?: { id: string | number, name: string, image: string }[] }) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultProjects = [
    { id: 1, name: "The Horizon Estate", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" },
    { id: 2, name: "Summit Modern", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" },
    { id: 3, name: "Oak Creek Villa", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" },
    { id: 4, name: "Lakeside Retreat", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
    { id: 5, name: "Urban Glasshouse", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop" },
  ];

  const activeProjects = cmsProjects?.length ? cmsProjects : defaultProjects;

  // Duplicate items for seamless looping
  const marqueeItems = [...activeProjects, ...activeProjects];

  return (
    <div className="relative w-full overflow-hidden py-10 bg-[#0a0a0a]">
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#111] via-transparent to-[#111] w-full" />
      
      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: isHovered ? 0 : "-50%" }} // Simple trick to pause logic; actual infinite loop requires a bit more fine-tuning, but we'll use a continuous keyframe approach here
        initial={{ x: "0%" }}
        transition={
          isHovered
            ? { type: "tween", duration: 0 } // Stop immediately
            : { repeat: Infinity, ease: "linear", duration: 40 }
        }
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ x: isHovered ? undefined : 0 }}
      >
        <div className="flex gap-6 animate-[scroll_40s_linear_infinite] hover:[animation-play-state:paused]">
            {marqueeItems.map((project, index) => (
            <div
                key={`${project.id}-${index}`}
                className="relative group w-[400px] h-[300px] sm:w-[500px] sm:h-[350px] overflow-hidden rounded-xl flex-shrink-0 cursor-pointer"
            >
                <img
                    src={project.image}
                    alt={project.name}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <h3 className="text-primary font-heading text-2xl font-bold translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {project.name}
                    </h3>
                </div>
            </div>
            ))}
        </div>
      </motion.div>
    </div>
  );
}
