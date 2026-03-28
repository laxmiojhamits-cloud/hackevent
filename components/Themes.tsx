"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const tracks = [
  {
    emoji: "🤖",
    number: "01",
    title: "AI & Machine Learning",
    description:
      "Push the boundaries of intelligent systems. Build LLM-powered apps, computer vision tools, generative models, or autonomous agents that reshape how we interact with machines.",
    tags: ["LLMs", "Computer Vision", "Agents", "MLOps"],
    accent: "nh-accent",
    glow: "rgba(2,132,199,0.15)",
  },
  {
    emoji: "🌍",
    number: "02",
    title: "Climate & Sustainability",
    description:
      "Engineer our planet's future. From carbon tracking to smart grids and precision agriculture — your code could be the turning point in the climate crisis.",
    tags: ["Clean Energy", "Carbon Tech", "AgriTech", "IoT"],
    accent: "green-400",
    glow: "rgba(74,222,128,0.15)",
  },
  {
    emoji: "🧬",
    number: "03",
    title: "Health & BioTech",
    description:
      "Hack the human condition. Build diagnostic tools, genomic platforms, mental health apps, or medical imaging systems that democratize access to quality care.",
    tags: ["Genomics", "Diagnostics", "Mental Health", "MedTech"],
    accent: "nh-accent2",
    glow: "rgba(3,105,161,0.15)",
  },
  {
    emoji: "⛓️",
    number: "04",
    title: "Web3 & Decentralized",
    description:
      "Rebuild the internet from first principles. Smart contracts, DeFi infrastructure, decentralized identity, or NFT ecosystems — the trustless future starts here.",
    tags: ["DeFi", "Smart Contracts", "DAOs", "NFTs"],
    accent: "purple-400",
    glow: "rgba(192,132,252,0.15)",
  },
  {
    emoji: "🏙️",
    number: "05",
    title: "Smart Cities",
    description:
      "Design the infrastructure of tomorrow. Traffic optimization, public safety systems, civic tech, or connected transit — make cities smarter for everyone.",
    tags: ["Urban Mobility", "Civic Tech", "Safety", "IoT"],
    accent: "blue-400",
    glow: "rgba(96,165,250,0.15)",
  },
  {
    emoji: "🚀",
    number: "06",
    title: "Open Innovation",
    description:
      "No constraints. No categories. If it's transformative and you can ship it in 48 hours, it belongs here. The most audacious ideas live in the open track.",
    tags: ["Any Domain", "Wild Card", "X-Factor"],
    accent: "yellow-400",
    glow: "rgba(250,204,21,0.15)",
  },
];

export default function Themes() {
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
    <section id="tracks" ref={sectionRef} className="section-padding bg-nh-surface/30 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 reveal">
          <p className="section-label mb-4">Competition Tracks</p>
          <h2 className="font-display text-6xl md:text-7xl text-nh-text leading-none mb-6">
            CHOOSE YOUR <br />
            <span className="gradient-text-accent2">BATTLEGROUND</span>
          </h2>
          <p className="text-nh-muted max-w-xl mx-auto leading-relaxed">
            Six tracks. Infinite possibilities. Pick your domain and build
            something the world hasn&apos;t seen yet.
          </p>
        </div>

        {/* Theme Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tracks.map((track, i) => (
            <Card
              key={track.number}
              className={`reveal reveal-delay-${(i % 3) + 1} group relative bg-nh-surface border border-black/5 cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-2`}
              style={{
                "--glow": track.glow,
              } as React.CSSProperties}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ boxShadow: `inset 0 0 40px ${track.glow}` }}
              />
              <div
                className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(90deg, transparent, ${track.glow.replace("0.15", "0.8")}, transparent)` }}
              />
              <CardContent className="p-6 space-y-4 relative z-10">
                {/* Header row */}
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{track.emoji}</span>
                  <Badge
                    variant="outline"
                    className="font-mono-custom text-xs border-black/10 text-nh-muted tracking-widest"
                  >
                    {track.number}
                  </Badge>
                </div>

                <h3 className="font-display text-2xl text-nh-text group-hover:text-nh-accent transition-colors">
                  {track.title}
                </h3>

                <p className="text-nh-muted text-sm leading-relaxed">
                  {track.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {track.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="bg-nh-bg/80 text-nh-muted border border-black/5 font-mono-custom text-xs px-2 py-0.5 hover:border-nh-accent/20 hover:text-nh-accent transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
