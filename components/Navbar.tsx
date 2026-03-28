"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#tracks", label: "Tracks" },
  { href: "#timeline", label: "Timeline" },
  { href: "#prizes", label: "Prizes" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const sectionIds = ["about", "tracks", "timeline", "prizes", "faq", "register"];
    const observers: IntersectionObserver[] = [];

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { threshold: 0.3, rootMargin: "-80px 0px 0px 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 glass border-b border-nh-accent/10 shadow-[0_4px_30px_rgba(2,132,199,0.05)]"
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-nh-accent/10 border border-nh-accent/30 flex items-center justify-center group-hover:bg-nh-accent/20 transition-colors">
            <Zap className="w-4 h-4 text-nh-accent" />
          </div>
          <span className="font-display text-xl tracking-wider">
            <span className="text-nh-text">NEXUS</span>
            <span className="text-nh-accent">HACK</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const sectionId = link.href.replace("#", "");
            const isActive = activeSection === sectionId;
            return (
              <a
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-mono-custom tracking-wide transition-colors rounded-md ${
                  isActive
                    ? "text-nh-accent bg-nh-accent/10"
                    : "text-nh-muted hover:text-nh-text hover:bg-black/5"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="#register">
            <Button
              className="bg-nh-accent text-nh-bg font-mono-custom text-sm tracking-wider hover:bg-nh-accent/90 hover:shadow-[0_0_20px_rgba(2,132,199,0.4)] transition-all duration-300"
              size="sm"
            >
              Register Now
            </Button>
          </a>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger
            className="md:hidden"
            render={
              <Button variant="ghost" size="icon" className="text-nh-text hover:text-nh-accent hover:bg-nh-accent/10" />
            }
          >
            <Menu className="w-5 h-5" />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="bg-nh-surface border-l border-nh-accent/10 w-72 p-0"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 py-4 border-b border-nh-accent/10">
                <SheetClose render={<Link href="/" className="font-display text-xl" />}>
                  <span className="text-nh-text">NEXUS</span>
                  <span className="text-nh-accent">HACK</span>
                </SheetClose>
                <SheetClose render={<Button variant="ghost" size="icon" className="text-nh-muted hover:text-nh-text" />}>
                  <X className="w-4 h-4" />
                </SheetClose>
              </div>
              <div className="flex flex-col gap-1 px-4 py-6 flex-1">
                {navLinks.map((link) => (
                  <SheetClose 
                    key={link.href} 
                    render={
                      <a href={link.href} className="px-4 py-3 font-mono-custom text-sm text-nh-muted hover:text-nh-accent hover:bg-nh-accent/10 rounded-lg transition-colors tracking-wide" />
                    }
                  >
                    {link.label}
                  </SheetClose>
                ))}
              </div>
              <div className="px-4 pb-6">
                <SheetClose render={<a href="#register" className="block" />}>
                  <Button className="w-full bg-nh-accent text-nh-bg font-mono-custom text-sm tracking-wider hover:bg-nh-accent/90">
                    Register Now
                  </Button>
                </SheetClose>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
