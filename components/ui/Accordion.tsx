"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What is the timeline for a luxury kitchen remodel in Premium City Area?",
    answer: "A standard luxury kitchen remodel typically spans 8 to 12 weeks from demolition to final walkthrough. This timeline accommodates custom cabinetry fabrication, intricate stonework, and precise installation of integrated high-end appliances.",
  },
  {
    question: "Do you handle architectural permits and city zoning approvals?",
    answer: "Yes, our dedicated compliance team handles all architectural permits, structural engineering reviews, and local zoning approvals. We ensure your custom home build or renovation is fully compliant with municipal regulations before breaking ground.",
  },
  {
    question: "What materials do you source for custom home builds?",
    answer: "We source globally, utilizing rare exotic marbles, sustainable reclaimed hardwoods, and commercial-grade structural steel. Every material is selected for superior durability and an immaculate architectural finish.",
  },
  {
    question: "How do you manage the budget during a large-scale renovation?",
    answer: "We operate on a transparent, milestone-based billing system. Prior to construction, you receive a comprehensive line-item estimate. Any scope changes are managed via formal change orders to ensure no unexpected financial surprises.",
  },
];

export function Accordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto w-full space-y-4">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div
            key={index}
            className="border border-white/10 rounded-lg bg-white/5 overflow-hidden backdrop-blur-sm"
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-primary"
              aria-expanded={isOpen}
            >
              <span className="font-heading text-lg font-semibold text-white">{faq.question}</span>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="flex-shrink-0 ml-4 text-primary"
              >
                <ChevronDown className="w-5 h-5" />
              </motion.div>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-secondary leading-relaxed">
                    <p>{faq.answer}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
