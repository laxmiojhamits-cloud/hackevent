"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Award, DollarSign } from "lucide-react";

const stats = [
  { icon: Users, value: "1200+", label: "Participants", color: "text-nh-accent" },
  { icon: Clock, value: "48H", label: "Non-Stop Hacking", color: "text-nh-accent3" },
  { icon: Award, value: "80+", label: "Expert Mentors", color: "text-nh-accent2" },
  { icon: DollarSign, value: "₹50K", label: "Total Prizes", color: "text-nh-accent" },
];

export default function About() {
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
      { threshold: 0.15 }
    );

    const revealEls = sectionRef.current?.querySelectorAll(".reveal");
    revealEls?.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-padding bg-nh-bg relative overflow-hidden">
      {/* Accent line */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-px h-1/2 bg-gradient-to-b from-transparent via-nh-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <div className="space-y-8">
            <div className="reveal">
              <p className="section-label mb-4">About NexusHack</p>
              <h2 className="font-display text-6xl md:text-7xl leading-none text-nh-text">
                WHERE IDEAS
                <br />
                <span className="gradient-text-accent">BECOME REALITY</span>
              </h2>
            </div>

            <div className="space-y-5 reveal reveal-delay-1">
              <p className="text-nh-muted text-lg leading-relaxed">
                NexusHack 2025 is more than a competition — it&apos;s a
                movement. We bring together the planet&apos;s most ambitious
                engineers, designers, and visionaries for 48 hours of relentless
                building, mentorship, and innovation.
              </p>
              <p className="text-nh-muted leading-relaxed">
                Whether you&apos;re training the next frontier model, engineering
                climate solutions, or reinventing healthcare — your breakthrough
                starts here. With world-class mentors, cutting-edge resources,
                and a community that doesn&apos;t sleep, NexusHack is where the
                future gets built.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 reveal reveal-delay-2">
              {["Open Source", "Cross-discipline", "Beginner Friendly", "Remote OK"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full border border-nh-accent/20 text-nh-accent font-mono-custom text-xs tracking-widest bg-nh-accent/5"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={stat.label}
                  className={`reveal reveal-delay-${i + 1} card-hover bg-nh-surface border border-black/5 neon-border group`}
                >
                  <CardContent className="p-6 flex flex-col gap-4">
                    <div className={`w-10 h-10 rounded-lg bg-nh-bg flex items-center justify-center ${stat.color} border border-current/20`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className={`font-display text-5xl ${stat.color} leading-none`}>
                        {stat.value}
                      </div>
                      <div className="text-nh-muted text-sm mt-2 font-mono-custom tracking-wide">
                        {stat.label}
                      </div>
                    </div>
                    {/* Hover corner accent */}
                    <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-nh-accent/5 to-transparent rounded-tr-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
