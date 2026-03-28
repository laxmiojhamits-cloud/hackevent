"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

const milestones = [
  {
    date: "Mar 01, 2026",
    title: "Applications Open",
    description: "Registration portal goes live. Early applicants get priority review and exclusive swag.",
    accent: "nh-accent",
    done: true,
  },
  {
    date: "Mar 15, 2026",
    title: "Early Bird Deadline",
    description: "Submit your application for early acceptance. Teams registered by this date receive a dedicated mentor match.",
    accent: "nh-accent",
    done: true,
  },
  {
    date: "Mar 22, 2026",
    title: "Team Formation Day",
    description: "Join our online mixer to find collaborators. All solo applicants are matched into teams of 2–4.",
    accent: "nh-accent3",
    done: false,
  },
  {
    date: "Mar 27, 2026",
    title: "Final Registration Closes",
    description: "Last chance to register and form teams. All accepted participants receive their hacker kits.",
    accent: "nh-accent3",
    done: false,
  },
  {
    date: "Mar 28, 2026",
    title: "🚀 Hackathon Kicks Off",
    description: "Opening ceremony at 9:00 AM IST. The 48-hour clock starts. Problem statements revealed. Build begins.",
    accent: "nh-accent2",
    done: false,
    highlight: true,
  },
  {
    date: "Mar 29, 2026",
    title: "Submissions Due",
    description: "All projects submitted by 9:00 AM IST. Judging panel reviews demos, code, and presentations.",
    accent: "nh-accent3",
    done: false,
  },
  {
    date: "Mar 30 – Apr 10, 2026",
    title: "Winners Announced",
    description: "Top teams present at closing ceremony. Prize distribution, spotlight features, and accelerator referrals.",
    accent: "nh-accent",
    done: false,
  },
];

export default function Timeline() {
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
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    sectionRef.current?.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="section-padding bg-nh-bg relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">Event Schedule</p>
          <h2 className="font-display text-6xl md:text-7xl text-nh-text leading-none">
            THE <span className="gradient-text-accent">TIMELINE</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative pl-8 md:pl-12">
          {/* Vertical line */}
          <div className="absolute left-0 md:left-4 top-0 bottom-0 w-px bg-gradient-to-b from-nh-accent/40 via-nh-accent/20 to-transparent" />

          <div className="space-y-0">
            {milestones.map((item, i) => (
              <div
                key={item.title}
                className={`reveal reveal-delay-${(i % 5) + 1} relative pb-10 last:pb-0 group`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {/* Dot */}
                <div
                  className={`absolute -left-8 md:-left-12 top-1 w-4 h-4 rounded-full border-2 transition-all duration-300 group-hover:scale-125 ${
                    item.highlight
                      ? "bg-nh-accent2 border-nh-accent2 shadow-[0_0_20px_rgba(3,105,161,0.5)]"
                      : item.done
                      ? "bg-nh-accent border-nh-accent"
                      : "bg-nh-surface border-nh-accent/30 group-hover:border-nh-accent"
                  }`}
                />
                {item.done && !item.highlight && (
                  <CheckCircle2 className="absolute -left-[34px] md:-left-[46px] top-0.5 w-3 h-3 text-nh-accent" />
                )}

                {/* Content */}
                <div
                  className={`ml-2 p-5 rounded-xl border transition-all duration-300 ${
                    item.highlight
                      ? "bg-nh-accent2/10 border-nh-accent2/30 shadow-[0_0_30px_rgba(3,105,161,0.1)]"
                      : "bg-nh-surface/30 border-black/5 group-hover:bg-nh-surface/60 group-hover:border-nh-accent/10"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2">
                    <span
                      className={`font-mono-custom text-xs tracking-widest ${
                        item.highlight ? "text-nh-accent2" : "text-nh-accent"
                      }`}
                    >
                      {item.date}
                    </span>
                    {item.highlight && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-nh-accent2/20 border border-nh-accent2/30 text-nh-accent2 font-mono-custom text-xs">
                        LIVE EVENT
                      </span>
                    )}
                  </div>
                  <h3
                    className={`font-display text-xl mb-2 ${
                      item.highlight ? "text-nh-accent2" : "text-nh-text"
                    }`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-nh-muted text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
