"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Michael & Sarah T.",
    role: "First Home Buyers",
    location: "Sydney, NSW",
    quote:
      "Baset Finance made the entire first home buying experience seamless. They explained every step clearly and secured us a rate we couldn't find on our own. Couldn't recommend them more highly.",
    rating: 5,
  },
  {
    name: "David C.",
    role: "Property Investor",
    location: "Melbourne, VIC",
    quote:
      "As an investor with multiple properties, I needed a broker who truly understood portfolio lending. Baset Finance delivered exceptional service and helped me expand my portfolio with confidence.",
    rating: 5,
  },
  {
    name: "Priya M.",
    role: "Refinancing Client",
    location: "Brisbane, QLD",
    quote:
      "I was paying too much on my existing mortgage. Baset Finance reviewed my situation and refinanced me to a much better rate, saving me over $400 per month. Incredible service.",
    rating: 5,
  },
  {
    name: "James & Emma L.",
    role: "Home Loan Clients",
    location: "Perth, WA",
    quote:
      "The team at Baset Finance went above and beyond. They were available whenever we had questions and kept us informed throughout the entire process. True professionals.",
    rating: 5,
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c === 0 ? testimonials.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === testimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-white section-padding relative overflow-hidden">
      {/* Background text */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-playfair text-[180px] text-gold/3 font-bold select-none pointer-events-none whitespace-nowrap">
        TESTIMONIALS
      </div>

      <div className="container-luxury relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="font-inter text-xs tracking-[0.25em] uppercase text-gold mb-4">
            Client Stories
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl text-charcoal font-semibold mb-4">
            What Our Clients Say
          </h2>
          <div className="w-14 h-px bg-gold mx-auto" />
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-marble-100 border border-marble-300 p-10 md:p-14 relative"
              >
                {/* Quote mark */}
                <Quote
                  size={40}
                  className="text-gold/20 absolute top-8 left-8"
                  fill="currentColor"
                />

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {Array.from({ length: testimonials[current].rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-gold fill-gold" />
                  ))}
                </div>

                <p className="font-playfair text-xl md:text-2xl text-charcoal italic leading-relaxed mb-8">
                  "{testimonials[current].quote}"
                </p>

                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
                    <span className="font-playfair text-gold font-semibold text-sm">
                      {testimonials[current].name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="font-inter font-semibold text-charcoal text-sm">
                      {testimonials[current].name}
                    </div>
                    <div className="font-inter text-xs text-charcoal/50">
                      {testimonials[current].role} · {testimonials[current].location}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-6">
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`transition-all duration-300 ${
                      i === current
                        ? "w-8 h-1 bg-gold"
                        : "w-4 h-1 bg-marble-300 hover:bg-gold/50"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-10 h-10 border border-marble-300 flex items-center justify-center text-charcoal/50 hover:border-gold hover:text-gold transition-all duration-200"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={next}
                  className="w-10 h-10 border border-marble-300 flex items-center justify-center text-charcoal/50 hover:border-gold hover:text-gold transition-all duration-200"
                  aria-label="Next testimonial"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
