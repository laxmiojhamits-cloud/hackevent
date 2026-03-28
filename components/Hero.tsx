"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, MapPin, Calendar, Users, Wifi } from "lucide-react";

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return timeLeft;
}

function CountdownBlock({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl bg-nh-surface border border-nh-accent/20 flex items-center justify-center neon-border relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-b from-nh-accent/5 to-transparent" />
        <span className="font-display text-4xl md:text-5xl text-nh-accent relative z-10">
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span className="font-mono-custom text-xs text-nh-muted tracking-widest uppercase">{label}</span>
    </div>
  );
}

export default function Hero() {
  const targetDate = new Date("2025-09-30T09:00:00");
  const timeLeft = useCountdown(targetDate);
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-nh-bg" />
      <div className="absolute inset-0 grid-bg opacity-100" />
      <div className="absolute inset-0 bg-hero-radial" />
      <div className="absolute inset-0 bg-hero-radial2" />
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-nh-accent/5 blur-[120px] animate-float" style={{ animationDelay: "0s" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-nh-accent3/8 blur-[100px] animate-float" style={{ animationDelay: "1.5s" }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-nh-accent2/4 blur-[80px]" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center flex flex-col items-center gap-8 pt-20">
        {/* Animated badge */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <Badge className="bg-nh-accent/10 border border-nh-accent/30 text-nh-accent font-mono-custom text-xs tracking-widest px-4 py-1.5 hover:bg-nh-accent/20 transition-colors animate-pulse-glow">
            <span className="w-2 h-2 rounded-full bg-nh-accent mr-2 inline-block animate-flicker" />
            Applications Open — Sept 30, 2025
          </Badge>
        </div>

        {/* Main headline */}
        <div className="animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <h1 className="font-display text-[5rem] sm:text-[7rem] md:text-[9rem] lg:text-[11rem] leading-none tracking-wide">
            <span className="text-nh-text block">BUILD THE</span>
            <span className="gradient-text-accent block">IMPOSSIBLE</span>
          </h1>
        </div>

        {/* Subheading */}
        <p
          className="text-nh-muted text-lg md:text-xl max-w-2xl leading-relaxed animate-fade-in-up"
          style={{ animationDelay: "0.35s" }}
        >
          48 hours. 1200+ builders. ₹50K in prizes. The world&apos;s most
          ambitious hackathon challenges you to ship what the world says
          can&apos;t be built.
        </p>

        {/* Meta info chips */}
        <div
          className="flex flex-wrap justify-center gap-4 text-sm animate-fade-in-up"
          style={{ animationDelay: "0.45s" }}
        >
          {[
            { icon: Calendar, text: "Sept 30 – Oct 1, 2025" },
            { icon: MapPin, text: "Global + Gwalior Hub" },
            { icon: Wifi, text: "In-person & Remote" },
            { icon: Users, text: "1200+ Participants" },
          ].map(({ icon: Icon, text }) => (
            <div
              key={text}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-nh-surface/80 border border-black/5 text-nh-muted neon-border"
            >
              <Icon className="w-3.5 h-3.5 text-nh-accent" />
              <span className="font-mono-custom text-xs tracking-wide">{text}</span>
            </div>
          ))}
        </div>

        {/* CTA Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 animate-fade-in-up"
          style={{ animationDelay: "0.55s" }}
        >
          <a href="#register">
            <Button
              size="lg"
              className="bg-nh-accent text-nh-bg font-mono-custom tracking-wider text-sm px-8 py-6 hover:bg-nh-accent/90 hover:shadow-[0_0_30px_rgba(2,132,199,0.5)] transition-all duration-300 rounded-xl"
            >
              Register Now →
            </Button>
          </a>
          <a href="#about">
            <Button
              size="lg"
              variant="ghost"
              className="border border-black/10 text-nh-text font-mono-custom tracking-wider text-sm px-8 py-6 hover:bg-black/5 hover:border-nh-accent/30 transition-all duration-300 rounded-xl"
            >
              Learn More
            </Button>
          </a>
        </div>

        {/* Countdown Timer */}
        <div
          className="flex flex-col items-center gap-6 animate-fade-in-up"
          style={{ animationDelay: "0.65s" }}
        >
          <p className="section-label text-nh-muted">Hackathon starts in</p>
          <div className="flex items-center gap-3 md:gap-5">
            <CountdownBlock value={timeLeft.days} label="Days" />
            <span className="font-display text-4xl text-nh-accent/40 mb-6">:</span>
            <CountdownBlock value={timeLeft.hours} label="Hours" />
            <span className="font-display text-4xl text-nh-accent/40 mb-6">:</span>
            <CountdownBlock value={timeLeft.minutes} label="Mins" />
            <span className="font-display text-4xl text-nh-accent/40 mb-6">:</span>
            <CountdownBlock value={timeLeft.seconds} label="Secs" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-nh-muted/50 animate-bounce">
        <span className="font-mono-custom text-xs tracking-widest">SCROLL</span>
        <ArrowDown className="w-4 h-4" />
      </div>
    </section>
  );
}
