"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Send, Mail, MapPin, ExternalLink, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  university: z.string().min(2, "Institution name is required"),
  yearOfStudy: z.string().min(1, "Please select your year / level"),
  track: z.string().min(1, "Please select a track"),
  mode: z.string().min(1, "Please select participation mode"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
});

type FormData = z.infer<typeof schema>;

const tracks = [
  "AI & Machine Learning",
  "Climate & Sustainability",
  "Health & BioTech",
  "Web3 & Decentralized",
  "Smart Cities",
  "Open Innovation",
];

const years = [
  "1st Year Undergraduate",
  "2nd Year Undergraduate",
  "3rd Year Undergraduate",
  "4th Year Undergraduate",
  "Postgraduate (Masters)",
  "PhD / Research",
  "Working Professional",
  "Other",
];

export default function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const watchTrack = watch("track");
  const watchYear = watch("yearOfStudy");
  const watchMode = watch("mode");
  const watchBio = watch("bio") ?? "";

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        setIsSubmitted(true);
        toast.success("🎉 Registration successful!", {
          description: "Welcome to NexusHack 2025! Check your email for confirmation.",
          duration: 5000,
        });
        reset();
      } else if (res.status === 409) {
        toast.error("Already registered", {
          description: "This email is already registered. Contact us if this is an error.",
        });
      } else {
        toast.error("Registration failed", {
          description: json.message || "Something went wrong. Please try again.",
        });
      }
    } catch {
      toast.error("Network error", {
        description: "Could not reach the server. Please check your connection.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="register" className="section-padding bg-nh-bg relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-nh-accent/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="section-label mb-4">Join the Movement</p>
          <h2 className="font-display text-6xl md:text-8xl text-nh-text leading-none mb-6">
            REGISTER <span className="gradient-text-accent">NOW</span>
          </h2>
          <p className="text-nh-muted max-w-xl mx-auto">
            Spots are limited. Secure your place in one of the world&apos;s most
            ambitious hackathons before they&apos;re gone.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Form / Success View */}
          <div className="lg:col-span-2">
            {isSubmitted ? (
              <div className="bg-nh-surface border border-nh-accent/20 rounded-2xl p-12 text-center space-y-6 neon-border reveal flex flex-col items-center justify-center min-h-[500px]">
                <div className="w-20 h-20 rounded-full bg-nh-accent/10 border border-nh-accent/30 flex items-center justify-center mb-4">
                  <CheckCircle className="w-10 h-10 text-nh-accent animate-pulse-glow rounded-full" />
                </div>
                <h3 className="font-display text-4xl text-nh-text uppercase tracking-tight">
                  Registration <span className="gradient-text-accent">Confirmed</span>
                </h3>
                <p className="text-nh-muted max-w-sm mx-auto leading-relaxed">
                  You&apos;re officially on the list! We&apos;ve sent a confirmation email with next steps and a link to join our Discord community.
                </p>
                <div className="pt-6">
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-nh-accent/20 text-nh-accent hover:bg-nh-accent/10 font-mono-custom tracking-wider"
                  >
                    Register Another Team
                  </Button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-nh-surface border border-black/5 rounded-2xl p-8 space-y-6 neon-border"
              >
              <div className="grid sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-mono-custom text-xs tracking-widest text-nh-muted">
                    FULL NAME *
                  </Label>
                  <Input
                    id="name"
                    {...register("name")}
                    placeholder="Alex Johnson"
                    className="bg-nh-bg border-black/10 text-nh-text placeholder:text-nh-muted/50 focus:border-nh-accent/50 focus:ring-nh-accent/20 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-nh-accent2 text-xs font-mono-custom">{errors.name.message}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-mono-custom text-xs tracking-widest text-nh-muted">
                    EMAIL ADDRESS *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="you@example.com"
                    className="bg-nh-bg border-black/10 text-nh-text placeholder:text-nh-muted/50 focus:border-nh-accent/50 focus:ring-nh-accent/20 transition-colors"
                  />
                  {errors.email && (
                    <p className="text-nh-accent2 text-xs font-mono-custom">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* University */}
              <div className="space-y-2">
                <Label htmlFor="university" className="font-mono-custom text-xs tracking-widest text-nh-muted">
                  UNIVERSITY / INSTITUTION *
                </Label>
                <Input
                  id="university"
                  {...register("university")}
                  placeholder="MIT, IIT Bombay, Stanford..."
                  className="bg-nh-bg border-black/10 text-nh-text placeholder:text-nh-muted/50 focus:border-nh-accent/50 focus:ring-nh-accent/20 transition-colors"
                />
                {errors.university && (
                  <p className="text-nh-accent2 text-xs font-mono-custom">{errors.university.message}</p>
                )}
              </div>

              <div className="grid sm:grid-cols-3 gap-6">
                {/* Year of Study */}
                <div className="space-y-2">
                  <Label className="font-mono-custom text-xs tracking-widest text-nh-muted">
                    YEAR / LEVEL *
                  </Label>
                  <Select
                    value={watchYear || ""}
                    onValueChange={(v) => setValue("yearOfStudy", v || "", { shouldValidate: true })}>

                    <SelectTrigger
                      id="yearOfStudy"
                      className="bg-nh-bg border-black/10 text-nh-text focus:ring-nh-accent/20 focus:border-nh-accent/50"
                    >
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent className="bg-nh-surface border-nh-accent/10">
                      {years.map((y) => (
                        <SelectItem key={y} value={y} className="text-nh-text focus:bg-nh-accent/10 focus:text-nh-accent">
                          {y}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.yearOfStudy && (
                    <p className="text-nh-accent2 text-xs font-mono-custom">{errors.yearOfStudy.message}</p>
                  )}
                </div>

                {/* Track */}
                <div className="space-y-2">
                  <Label className="font-mono-custom text-xs tracking-widest text-nh-muted">
                    TRACK *
                  </Label>
                  <Select
                    value={watchTrack || ""}
                    onValueChange={(v) => setValue("track", v || "", { shouldValidate: true })}>

                    <SelectTrigger
                      id="track"
                      className="bg-nh-bg border-black/10 text-nh-text focus:ring-nh-accent/20 focus:border-nh-accent/50"
                    >
                      <SelectValue placeholder="Select track" />
                    </SelectTrigger>
                    <SelectContent className="bg-nh-surface border-nh-accent/10">
                      {tracks.map((t) => (
                        <SelectItem key={t} value={t} className="text-nh-text focus:bg-nh-accent/10 focus:text-nh-accent">
                          {t}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.track && (
                    <p className="text-nh-accent2 text-xs font-mono-custom">{errors.track.message}</p>
                  )}
                </div>

                {/* Mode */}
                <div className="space-y-2">
                  <Label className="font-mono-custom text-xs tracking-widest text-nh-muted">
                    MODE *
                  </Label>
                  <Select
                    value={watchMode || ""}
                    onValueChange={(v) => setValue("mode", v || "", { shouldValidate: true })}>

                    <SelectTrigger
                      id="mode"
                      className="bg-nh-bg border-black/10 text-nh-text focus:ring-nh-accent/20 focus:border-nh-accent/50"
                    >
                      <SelectValue placeholder="Select mode" />
                    </SelectTrigger>
                    <SelectContent className="bg-nh-surface border-nh-accent/10">
                      <SelectItem value="In-Person" className="text-nh-text focus:bg-nh-accent/10 focus:text-nh-accent">
                        In-Person (Gwalior)
                      </SelectItem>
                      <SelectItem value="Remote" className="text-nh-text focus:bg-nh-accent/10 focus:text-nh-accent">
                        Remote
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.mode && (
                    <p className="text-nh-accent2 text-xs font-mono-custom">{errors.mode.message}</p>
                  )}
                </div>
              </div>

              {/* Bio */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="bio" className="font-mono-custom text-xs tracking-widest text-nh-muted">
                    SHORT BIO <span className="text-nh-muted/50">(optional)</span>
                  </Label>
                  <span className="font-mono-custom text-xs text-nh-muted/50">
                    {watchBio.length}/500
                  </span>
                </div>
                <Textarea
                  id="bio"
                  {...register("bio")}
                  placeholder="Tell us about yourself, what you build, and what excites you about NexusHack..."
                  rows={4}
                  className="bg-nh-bg border-black/10 text-nh-text placeholder:text-nh-muted/50 focus:border-nh-accent/50 focus:ring-nh-accent/20 resize-none transition-colors"
                />
                {errors.bio && (
                  <p className="text-nh-accent2 text-xs font-mono-custom">{errors.bio.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-nh-accent text-nh-bg font-mono-custom text-sm tracking-wider py-6 hover:bg-nh-accent/90 hover:shadow-[0_0_30px_rgba(2,132,199,0.4)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Registering...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Secure My Spot
                  </>
                )}
              </Button>

              <p className="text-center text-nh-muted/50 text-xs font-mono-custom">
                By registering, you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
            )}
          </div>

          {/* Contact Info sidebar */}
          <div className="space-y-6">
            <div className="bg-nh-surface border border-black/5 rounded-2xl p-6 space-y-6 neon-border">
              <h3 className="font-display text-2xl text-nh-text">Get in Touch</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-nh-accent/10 border border-nh-accent/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4 text-nh-accent" />
                  </div>
                  <div>
                    <p className="font-mono-custom text-xs text-nh-muted tracking-wide mb-1">EMAIL</p>
                    <a href="mailto:hello@nexushack.dev" className="text-nh-text text-sm hover:text-nh-accent transition-colors">
                      hello@nexushack.dev
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-nh-accent3/10 border border-nh-accent3/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-nh-accent3" />
                  </div>
                  <div>
                    <p className="font-mono-custom text-xs text-nh-muted tracking-wide mb-1">VENUE</p>
                    <p className="text-nh-text text-sm">MITS, Gole ka Mandir, Race Course Road<br />Gwalior, Madhya Pradesh 474005, India</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-black/5 pt-4">
                <p className="font-mono-custom text-xs text-nh-muted tracking-widest mb-4">FOLLOW US</p>
                <div className="flex gap-3">
                  {[
                    { label: "Twitter / X", href: "https://twitter.com" },
                    { label: "GitHub", href: "https://github.com" },
                    { label: "LinkedIn", href: "https://linkedin.com" },
                  ].map(({ label, href }) => (
                    <a
                      key={label}
                      href={href}
                      className="w-9 h-9 rounded-lg bg-nh-bg border border-black/5 flex items-center justify-center text-nh-muted hover:text-nh-accent hover:border-nh-accent/30 transition-all"
                      title={label}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Info box */}
            <div className="bg-nh-accent/5 border border-nh-accent/20 rounded-2xl p-6 space-y-3">
              <p className="font-mono-custom text-xs text-nh-accent tracking-widest">QUICK FACTS</p>
              {[
                ["📅", "Sept 30 – Oct 1, 2025"],
                ["⏱️", "48 hours of hacking"],
                ["💰", "₹50K+ in prizes"],
                ["👥", "Teams of 1–4"],
                ["🌍", "In-person + Remote"],
                ["🎟️", "100% FREE"],
              ].map(([emoji, fact]) => (
                <div key={fact} className="flex items-center gap-3 text-sm text-nh-muted">
                  <span>{emoji}</span>
                  <span>{fact}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
