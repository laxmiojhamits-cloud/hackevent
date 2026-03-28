"use client";

import { useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who is eligible to participate in NexusHack 2025?",
    a: "NexusHack 2025 is open to anyone 18+ who loves building things. Students, professionals, designers, data scientists, and domain experts from any country are welcome. No prior hackathon experience required — all skill levels encouraged.",
  },
  {
    q: "Can I participate remotely?",
    a: "Absolutely. NexusHack is a fully hybrid event. Remote participants have access to the same online collaboration tools, mentor sessions, workshops, and judging panels as in-person attendees at our Gwalior hub. Your timezone doesn't limit your chances.",
  },
  {
    q: "What is the team size requirement?",
    a: "Teams can be 1–4 members. Solo hackers are welcome and will be given the option to join our Team Formation event on Sep 22. We encourage cross-disciplinary teams — pair your engineering skills with design, business, or domain expertise.",
  },
  {
    q: "How are projects judged?",
    a: "Projects are evaluated on four criteria: (1) Innovation & Creativity (25%), (2) Technical Complexity & Execution (30%), (3) Real-World Impact & Feasibility (30%), and (4) Demo & Presentation Quality (15%). Judges are industry leaders, VCs, and domain experts.",
  },
  {
    q: "Do I need to have an idea before registering?",
    a: "No! You can register without an idea. Problem statements and datasets from our partners will be released at the opening ceremony on September 30. Many winning projects are conceived during the event itself.",
  },
  {
    q: "Are there workshops and mentorship sessions?",
    a: "Yes — extensively. We'll host 20+ live workshops covering AI/ML, cloud infrastructure, product design, pitch decks, and more. 80+ mentors from Google, Microsoft, Y Combinator, and top startups are available throughout the 48 hours.",
  },
  {
    q: "Is NexusHack free to attend?",
    a: "Yes, registration is completely free. In-person participants at the Gwalior hub receive meals, accommodation, and a hacker kit. Remote participants receive digital perks, credits, and exclusive access to sponsor resources.",
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="faq" ref={sectionRef} className="section-padding bg-nh-surface/20 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-nh-accent3/30 to-transparent" />

      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">Got Questions?</p>
          <h2 className="font-display text-6xl md:text-7xl text-nh-text leading-none">
            FREQUENTLY <br />
            <span className="gradient-text-accent3">ASKED</span>
          </h2>
        </div>

        {/* Accordion */}
        <div className="reveal reveal-delay-1">
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="bg-nh-surface border border-black/5 rounded-xl px-6 overflow-hidden data-[state=open]:border-nh-accent/20 data-[state=open]:bg-nh-surface transition-all duration-200"
              >
                <AccordionTrigger className="py-5 text-left font-body text-nh-text hover:text-nh-accent hover:no-underline transition-colors text-sm md:text-base leading-snug [&[data-state=open]]:text-nh-accent">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-nh-muted text-sm leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA below FAQ */}
        <div className="text-center mt-12 reveal reveal-delay-2">
          <p className="text-nh-muted mb-4 text-sm">Still have questions?</p>
          <a
            href="mailto:hello@nexushack.dev"
            className="font-mono-custom text-nh-accent text-sm tracking-wider hover:underline hover:text-nh-accent/80 transition-colors"
          >
            hello@nexushack.dev →
          </a>
        </div>
      </div>
    </section>
  );
}
