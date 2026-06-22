"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Hammer, Home, Bath } from "lucide-react";

const items = [
  {
    title: "Custom Home Builds",
    description: "From architectural blueprint to final walkthrough, we construct legacy homes designed for the modern elite. Experience unparalleled structural integrity.",
    icon: Home,
    colSpan: "md:col-span-2",
  },
  {
    title: "Luxury Kitchen Remodeling",
    description: "Chef-inspired culinary spaces featuring premium stonework and state-of-the-art integrated appliances.",
    icon: Hammer,
    colSpan: "md:col-span-1",
  },
  {
    title: "Architectural Bathroom Design",
    description: "Transform your master en-suite into a private spa. We source the finest European fixtures and exotic marbles.",
    icon: Bath,
    colSpan: "md:col-span-3",
  },
];

export function BentoGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-6">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          whileHover={{ y: -5 }}
          className={cn(
            "group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20",
            item.colSpan
          )}
        >
          <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
            <item.icon className="w-24 h-24 text-primary" />
          </div>
          <div className="relative z-10 flex flex-col h-full justify-end min-h-[160px]">
            <h3 className="font-heading text-2xl font-bold text-white mb-3">{item.title}</h3>
            <p className="text-secondary leading-relaxed max-w-xl">{item.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
