import React from "react";
import Link from "next/link";
import { ArrowUpRight, Github, PenTool } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="relative overflow-hidden border-t border-[#3B82F6]/20 bg-gradient-to-b from-white via-[#DBEAFE]/20 to-white">
      <div className="pointer-events-none absolute -top-20 right-0 h-80 w-80 rounded-full bg-[#60A5FA]/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-[#3B82F6]/20 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-3xl border border-[#3B82F6]/20 bg-white/80 p-6 shadow-2xl shadow-[#3B82F6]/10 backdrop-blur-xl md:p-8">
          <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full border border-[#3B82F6]/20 bg-gradient-to-r from-white via-[#DBEAFE]/40 to-[#60A5FA]/20 px-4 py-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#60A5FA] to-[#3B82F6] text-white shadow-lg shadow-[#3B82F6]/30">
                  <PenTool size={16} strokeWidth={2.5} />
                </div>
                <span className="text-sm font-semibold text-stone-900">Scribly</span>
              </div>

              <div className="max-w-xl">
                <h3 className="text-2xl font-bold tracking-tight text-stone-900 md:text-3xl">
                  Sketch, share, and ship ideas faster.
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600 md:text-base">
                  A collaborative whiteboard for teams that think visually. Start a room, draw in real time, and keep
                  your work persistent across sessions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/canvas"
                  className="group relative inline-flex items-center"
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#60A5FA] opacity-80 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#60A5FA] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#3B82F6]/30 transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-xl group-hover:shadow-[#3B82F6]/40">
                    Start Drawing
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </Link>
                <p className="text-xs font-medium tracking-wide text-slate-500">Built for fast visual collaboration</p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <a
                href="https://github.com/0xsushanta/Scribbly"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3B82F6]/30 hover:shadow-lg hover:shadow-[#3B82F6]/15"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">GitHub</p>
                    <p className="mt-1 text-xs text-slate-600">Explore the codebase</p>
                  </div>
                  <Github size={18} className="text-slate-700 transition-colors group-hover:text-[#2563EB]" />
                </div>
              </a>

              <a
                href="https://x.com/0xsushanta"
                target="_blank"
                rel="noreferrer"
                className="group rounded-2xl border border-slate-200 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#3B82F6]/30 hover:shadow-lg hover:shadow-[#3B82F6]/15"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">X</p>
                    <p className="mt-1 text-xs text-slate-600">Follow updates</p>
                  </div>
                  <span className="text-sm font-semibold text-slate-700 transition-colors group-hover:text-[#2563EB]">
                    X
                  </span>
                </div>
              </a>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-5 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
            <p>&copy; {new Date().getFullYear()} Scribly. Built for real-time collaboration.</p>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              <span>Live sync active</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
