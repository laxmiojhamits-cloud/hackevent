"use client";

import { useState, useEffect, useCallback } from "react";

import { signIn, signOut, useSession } from "next-auth/react";
import { Loader2, LogOut, Users, BarChart3, RefreshCw, Zap, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";

interface Registration {
  id: number;
  name: string;
  email: string;
  university: string;
  yearOfStudy: string;
  track: string;
  mode: string;
  createdAt: string;
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError("Invalid credentials. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-nh-bg flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-nh-accent/5 blur-[120px] rounded-full" />

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-nh-accent/10 border border-nh-accent/30 flex items-center justify-center mx-auto mb-4">
            <Zap className="w-6 h-6 text-nh-accent" />
          </div>
          <h1 className="font-display text-4xl text-nh-text mb-2">
            NEXUS<span className="text-nh-accent">HACK</span>
          </h1>
          <p className="font-mono-custom text-xs text-nh-muted tracking-widest">
            {/* ADMIN DASHBOARD */}
            ADMIN DASHBOARD
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-nh-surface border border-black/5 rounded-2xl p-8 space-y-5 neon-border"
        >
          <div className="space-y-2">
            <label className="font-mono-custom text-xs text-nh-muted tracking-widest">
              EMAIL ADDRESS
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@nexushack.dev"
              required
              className="bg-nh-bg border-black/10 text-nh-text placeholder:text-nh-muted/40 focus:border-nh-accent/50"
            />
          </div>
          <div className="space-y-2">
            <label className="font-mono-custom text-xs text-nh-muted tracking-widest">
              PASSWORD
            </label>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="bg-nh-bg border-black/10 text-nh-text placeholder:text-nh-muted/40 focus:border-nh-accent/50"
            />
          </div>
          {error && (
            <p className="text-nh-accent2 text-xs font-mono-custom bg-nh-accent2/10 border border-nh-accent2/20 rounded-lg px-3 py-2">
              {error}
            </p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-nh-accent text-nh-bg font-mono-custom tracking-wider hover:bg-nh-accent/90 hover:shadow-[0_0_20px_rgba(2,132,199,0.3)] transition-all"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : null}
            Access Dashboard
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function AdminPage() {
  const { data: session, status } = useSession();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchRegistrations = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/registrations");
      if (res.ok) {
        const data = await res.json();
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === "authenticated") {
      fetchRegistrations();
    }
  }, [status, fetchRegistrations]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-nh-bg flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-nh-accent animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <LoginForm />;
  }

  // Track breakdown
  const trackCounts = registrations.reduce(
    (acc: Record<string, number>, reg) => {
      acc[reg.track] = (acc[reg.track] || 0) + 1;
      return acc;
    },
    {}
  );

  const modeCounts = {
    "In-Person": registrations.filter((r) => r.mode === "In-Person").length,
    Remote: registrations.filter((r) => r.mode === "Remote").length,
  };

  const filtered = registrations.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.email.toLowerCase().includes(search.toLowerCase()) ||
      r.university.toLowerCase().includes(search.toLowerCase()) ||
      r.track.toLowerCase().includes(search.toLowerCase())
  );

  const exportCSV = () => {
    const headers = ["ID", "Name", "Email", "University", "Year", "Track", "Mode", "Date"];
    const rows = registrations.map((r) => [
      r.id,
      r.name,
      r.email,
      r.university,
      r.yearOfStudy,
      r.track,
      r.mode,
      new Date(r.createdAt).toLocaleDateString(),
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "nexushack-registrations.csv";
    a.click();
  };

  return (
    <div className="min-h-screen bg-nh-bg">
      {/* Topbar */}
      <header className="glass border-b border-nh-accent/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Zap className="w-4 h-4 text-nh-accent" />
            <span className="font-display text-lg text-nh-text">
              NEXUS<span className="text-nh-accent">HACK</span>
            </span>
            <span className="font-mono-custom text-xs text-nh-muted tracking-widest hidden sm:block">
              {/* ADMIN */}
              ADMIN
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-nh-muted text-sm hidden sm:block">
              {session.user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/admin" })}
              className="text-nh-muted hover:text-nh-accent2 hover:bg-nh-accent2/10 font-mono-custom text-xs tracking-wide"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Page title */}
        <div>
          <h1 className="font-display text-5xl text-nh-text">REGISTRATIONS</h1>
          <p className="text-nh-muted font-mono-custom text-sm tracking-wide mt-1">
            Live overview of all hackathon applicants
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-nh-surface border border-black/5 neon-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-nh-accent/10 border border-nh-accent/20 flex items-center justify-center">
                  <Users className="w-4 h-4 text-nh-accent" />
                </div>
                <span className="font-mono-custom text-xs text-nh-muted tracking-wide">TOTAL</span>
              </div>
              <div className="font-display text-4xl text-nh-accent">{registrations.length}</div>
              <p className="text-nh-muted text-xs mt-1">Registrants</p>
            </CardContent>
          </Card>

          <Card className="bg-nh-surface border border-black/5 neon-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-nh-accent3/10 border border-nh-accent3/20 flex items-center justify-center">
                  <BarChart3 className="w-4 h-4 text-nh-accent3" />
                </div>
                <span className="font-mono-custom text-xs text-nh-muted tracking-wide">TRACKS</span>
              </div>
              <div className="font-display text-4xl text-nh-accent3">{Object.keys(trackCounts).length}</div>
              <p className="text-nh-muted text-xs mt-1">Active tracks</p>
            </CardContent>
          </Card>

          <Card className="bg-nh-surface border border-black/5 neon-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <span className="text-green-400 text-xs">🏢</span>
                </div>
                <span className="font-mono-custom text-xs text-nh-muted tracking-wide">IN-PERSON</span>
              </div>
              <div className="font-display text-4xl text-green-400">{modeCounts["In-Person"]}</div>
              <p className="text-nh-muted text-xs mt-1">Mumbai hub</p>
            </CardContent>
          </Card>

          <Card className="bg-nh-surface border border-black/5 neon-border">
            <CardContent className="p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                  <span className="text-blue-400 text-xs">🌐</span>
                </div>
                <span className="font-mono-custom text-xs text-nh-muted tracking-wide">REMOTE</span>
              </div>
              <div className="font-display text-4xl text-blue-400">{modeCounts["Remote"]}</div>
              <p className="text-nh-muted text-xs mt-1">Online participants</p>
            </CardContent>
          </Card>
        </div>

        {/* Track Breakdown */}
        {Object.keys(trackCounts).length > 0 && (
          <Card className="bg-nh-surface border border-black/5">
            <CardHeader className="pb-3">
              <CardTitle className="font-mono-custom text-sm text-nh-muted tracking-widest">
                TRACK BREAKDOWN
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3">
                {Object.entries(trackCounts)
                  .sort((a, b) => b[1] - a[1])
                  .map(([track, count]) => (
                    <div
                      key={track}
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-nh-bg border border-black/5"
                    >
                      <span className="text-nh-text text-sm">{track}</span>
                      <Badge className="bg-nh-accent/10 text-nh-accent border-nh-accent/20 font-mono-custom text-xs">
                        {count}
                      </Badge>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Table Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <Input
            placeholder="Search by name, email, university, or track..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-nh-surface border-black/10 text-nh-text placeholder:text-nh-muted/50 focus:border-nh-accent/40 max-w-sm"
          />
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchRegistrations}
              className="font-mono-custom text-xs text-nh-muted hover:text-nh-accent hover:bg-nh-accent/10 tracking-wide"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Refresh
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={exportCSV}
              className="font-mono-custom text-xs text-nh-muted hover:text-nh-accent hover:bg-nh-accent/10 tracking-wide"
              disabled={registrations.length === 0}
            >
              <Download className="w-3.5 h-3.5 mr-1.5" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Registrations Table */}
        <Card className="bg-nh-surface border border-black/5 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-6 h-6 text-nh-accent animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-nh-muted">
              <Users className="w-8 h-8 mb-3 opacity-40" />
              <p className="font-mono-custom text-sm">
                {search ? "No results found" : "No registrations yet"}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="border-b border-black/5 hover:bg-transparent">
                    {["ID", "Name", "Email", "University", "Year", "Track", "Mode", "Date"].map(
                      (h) => (
                        <TableHead
                          key={h}
                          className="font-mono-custom text-xs text-nh-muted tracking-widest uppercase py-4"
                        >
                          {h}
                        </TableHead>
                      )
                    )}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((reg) => (
                    <TableRow
                      key={reg.id}
                      className="border-b border-black/5 hover:bg-nh-accent/5 transition-colors"
                    >
                      <TableCell className="font-mono-custom text-xs text-nh-muted py-4">
                        #{reg.id}
                      </TableCell>
                      <TableCell className="text-nh-text text-sm font-medium py-4">
                        {reg.name}
                      </TableCell>
                      <TableCell className="text-nh-muted text-sm py-4">{reg.email}</TableCell>
                      <TableCell className="text-nh-muted text-sm py-4 max-w-xs truncate">
                        {reg.university}
                      </TableCell>
                      <TableCell className="text-nh-muted text-xs py-4 max-w-[120px] truncate">
                        {reg.yearOfStudy}
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge className="bg-nh-accent3/10 text-nh-accent3 border-nh-accent3/20 font-mono-custom text-xs whitespace-nowrap">
                          {reg.track.split("&")[0].trim()}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge
                          className={`font-mono-custom text-xs ${
                            reg.mode === "In-Person"
                              ? "bg-green-500/10 text-green-400 border-green-500/20"
                              : "bg-blue-500/10 text-blue-400 border-blue-500/20"
                          }`}
                        >
                          {reg.mode}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono-custom text-xs text-nh-muted py-4">
                        {new Date(reg.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="px-4 py-3 border-t border-black/5">
                <p className="font-mono-custom text-xs text-nh-muted">
                  Showing {filtered.length} of {registrations.length} registrations
                </p>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
