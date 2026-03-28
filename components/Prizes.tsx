"use client";

import { useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award } from "lucide-react";

const specialPrizes = [
  { title: "Best AI Deploy", amount: "₹2,500", icon: "🤖", desc: "Most impactful AI/ML integration" },
  { title: "Climate Champion", amount: "₹2,000", icon: "🌍", desc: "Best climate solution" },
  { title: "Best Solo Hack", amount: "₹1,500", icon: "⚡", desc: "Top individual hacker" },
  { title: "Community Choice", amount: "₹1,000", icon: "❤️", desc: "Voted by all participants" },
];

export default function Prizes() {
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
    <section id="prizes" ref={sectionRef} className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-nh-surface/20 via-nh-bg to-nh-bg" />
      <div className="absolute inset-0 grid-bg opacity-30" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-20 reveal">
          <p className="section-label mb-4">Prize Pool</p>
          <h2 className="font-display text-6xl md:text-8xl text-nh-text leading-none mb-4">
            WIN <span className="gradient-text-accent">₹50,000</span>
          </h2>
          <p className="text-nh-muted max-w-xl mx-auto">
            Cash prizes, cloud credits, accelerator interviews, and global
            recognition await the builders who go furthest.
          </p>
        </div>

        {/* Podium — 2nd | 1st | 3rd */}
        <div className="flex flex-col md:flex-row items-end justify-center gap-6 mb-16">
          {/* 2nd Place */}
          <div className="reveal reveal-delay-2 w-full md:w-72">
            <Card className="bg-nh-surface border border-black/10 overflow-hidden group hover:border-black/20 transition-all">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-black/10 border border-black/20 flex items-center justify-center mx-auto">
                  <Trophy className="w-6 h-6 text-gray-300" />
                </div>
                <Badge className="bg-black/10 text-gray-300 border-black/20 font-mono-custom tracking-widest text-xs">
                  2ND PLACE
                </Badge>
                <div className="font-display text-6xl text-black/80 leading-none">₹10K</div>
                <div className="space-y-2 text-sm text-left">
                  {["Cash prize", "100k cloud credits", "Mentor sessions", "Global showcase"].map((perk) => (
                    <div key={perk} className="flex items-center gap-2 text-nh-muted">
                      <span className="text-nh-accent/60 text-xs">✓</span>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 1st Place — Elevated */}
          <div className="reveal reveal-delay-1 w-full md:w-80 md:-translate-y-8 relative">
            {/* Glow backdrop */}
            <div className="absolute -inset-2 rounded-2xl bg-nh-accent/10 blur-xl" />
            <Card className="relative bg-gradient-to-b from-nh-surface to-nh-bg border border-nh-accent/40 overflow-hidden shadow-[0_0_60px_rgba(2,132,199,0.2)] animate-pulse-glow">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nh-accent to-transparent" />
              <CardContent className="p-8 text-center space-y-5">
                <div className="w-16 h-16 rounded-full bg-nh-accent/20 border border-nh-accent/50 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(2,132,199,0.3)]">
                  <Star className="w-8 h-8 text-nh-accent fill-nh-accent" />
                </div>
                <Badge className="bg-nh-accent/20 text-nh-accent border-nh-accent/50 font-mono-custom tracking-widest text-xs">
                  🏆 1ST PLACE
                </Badge>
                <div className="font-display text-7xl text-nh-accent leading-none drop-shadow-[0_0_30px_rgba(2,132,199,0.5)]">
                  ₹25K
                </div>
                <div className="space-y-2 text-sm text-left">
                  {[
                    "Cash prize",
                    "500k cloud credits",
                    "VC pitch opportunity",
                    "6-month accelerator",
                    "Global media feature",
                    "Trophy + swag kit",
                  ].map((perk) => (
                    <div key={perk} className="flex items-center gap-2 text-nh-muted">
                      <span className="text-nh-accent text-xs font-bold">✓</span>
                      <span className="text-nh-text/80">{perk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3rd Place */}
          <div className="reveal reveal-delay-3 w-full md:w-72">
            <Card className="bg-nh-surface border border-black/10 overflow-hidden group hover:border-black/20 transition-all">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-amber-900/30 border border-amber-700/40 flex items-center justify-center mx-auto">
                  <Award className="w-6 h-6 text-amber-500" />
                </div>
                <Badge className="bg-amber-900/30 text-amber-500 border-amber-700/40 font-mono-custom tracking-widest text-xs">
                  3RD PLACE
                </Badge>
                <div className="font-display text-6xl text-amber-700/80 leading-none">₹5K</div>
                <div className="space-y-2 text-sm text-left">
                  {["Cash prize", "50k cloud credits", "Partner deals", "Certificate"].map((perk) => (
                    <div key={perk} className="flex items-center gap-2 text-nh-muted">
                      <span className="text-amber-500/60 text-xs">✓</span>
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Special Prizes */}
        <div className="reveal reveal-delay-2">
          <p className="text-center section-label mb-8">Special Awards</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {specialPrizes.map((prize) => (
              <Card
                key={prize.title}
                className="card-hover bg-nh-surface border border-black/5 neon-border group"
              >
                <CardContent className="p-5 space-y-3">
                  <div className="text-3xl">{prize.icon}</div>
                  <div className="font-display text-3xl text-nh-accent3">{prize.amount}</div>
                  <div className="font-mono-custom text-sm text-nh-text tracking-wide">{prize.title}</div>
                  <p className="text-nh-muted text-xs">{prize.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
