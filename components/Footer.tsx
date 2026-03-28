import Link from "next/link";
import { Zap, Mail, ArrowUpRight, ExternalLink } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Event: [
    { label: "About", href: "#about" },
    { label: "Tracks", href: "#tracks" },
    { label: "Timeline", href: "#timeline" },
    { label: "Prizes", href: "#prizes" },
    { label: "FAQ", href: "#faq" },
  ],
  Participate: [
    { label: "Register", href: "#register" },
    { label: "Team Formation", href: "#" },
    { label: "Mentor Program", href: "#" },
    { label: "Sponsorship", href: "#" },
  ],
  Resources: [
    { label: "Code of Conduct", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "Press Kit", href: "#" },
  ],
};

const socials = [
  { icon: ExternalLink, href: "https://twitter.com", label: "Twitter / X" },
  { icon: ExternalLink, href: "https://github.com", label: "GitHub" },
  { icon: ExternalLink, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Mail, href: "mailto:hello@nexushack.dev", label: "Email" },
];

export default function Footer() {
  return (
    <footer className="bg-nh-surface/30 border-t border-black/5 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-20" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-nh-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Top CTA Banner */}
        <div className="py-16 flex flex-col md:flex-row items-center justify-between gap-6 border-b border-black/5">
          <div>
            <p className="font-display text-4xl md:text-5xl text-nh-text leading-none mb-2">
              READY TO <span className="text-nh-accent">BUILD?</span>
            </p>
            <p className="text-nh-muted font-mono-custom text-sm tracking-wide">
              Spots are limited. Register before Sept 28.
            </p>
          </div>
          <a href="#register" className="flex-shrink-0">
            <button className="flex items-center gap-2 bg-nh-accent text-nh-bg font-mono-custom text-sm tracking-wider px-8 py-4 rounded-xl hover:bg-nh-accent/90 hover:shadow-[0_0_30px_rgba(2,132,199,0.4)] transition-all duration-300">
              Register Now
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </a>
        </div>

        {/* Footer Links Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo + tagline */}
          <div className="col-span-2 md:col-span-1 space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-nh-accent/10 border border-nh-accent/30 flex items-center justify-center">
                <Zap className="w-4 h-4 text-nh-accent" />
              </div>
              <span className="font-display text-xl tracking-wider">
                <span className="text-nh-text">NEXUS</span>
                <span className="text-nh-accent">HACK</span>
              </span>
            </Link>
            <p className="text-nh-muted text-sm leading-relaxed max-w-xs">
              The world&apos;s most ambitious hackathon. 48 hours to build
              what the world says can&apos;t be built.
            </p>
            <div className="flex gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  title={label}
                  className="w-9 h-9 rounded-lg bg-nh-bg border border-black/5 flex items-center justify-center text-nh-muted hover:text-nh-accent hover:border-nh-accent/30 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group} className="space-y-4">
              <p className="font-mono-custom text-xs tracking-widest text-nh-muted uppercase">
                {group}
              </p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-nh-muted/70 text-sm hover:text-nh-accent transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-black/5" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-nh-muted/50 font-mono-custom text-xs tracking-wide">
            © 2025 NexusHack. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-nh-muted/30 font-mono-custom text-xs">
            <span>Built with</span>
            <span className="text-nh-accent">♥</span>
            <span>on Next.js 14</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
