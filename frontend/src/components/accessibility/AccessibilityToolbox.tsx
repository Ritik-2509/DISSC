"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  RotateCcw,
  Eye,
  Brain,
  BookOpen,
  MousePointer,
  Check,
  Type,
  Contrast,
  Sun,
  Palette,
  Sparkles,
  Link2,
  HelpCircle,
  Sliders,
  Maximize2,
  Accessibility as AccessibilityIcon,
  ShieldCheck,
} from "lucide-react";
import {
  useAccessibility,
  AccessibilityProfile,
} from "./AccessibilityContext";

export function AccessibilityToolbox() {
  const { settings, setProfile, updateSetting, resetAll, isOpen, setIsOpen } =
    useAccessibility();
  const [activeTab, setActiveTab] = useState<"profiles" | "controls" | "guide">(
    "profiles"
  );

  return (
    <>
      {/* Floating Accessibility Trigger Button on Bottom-Right */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open Accessibility Toolbox"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-full bg-[#0F172A] text-white shadow-2xl hover:bg-[#1E293B] border-2 border-white/30 transition-all cursor-pointer group"
      >
        <div className="w-6 h-6 rounded-full bg-emerald-500/25 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
          <AccessibilityIcon className="w-4 h-4 text-emerald-400" />
        </div>
        <span className="text-xs font-bold font-sans tracking-wide text-white pr-1">
          Accessibility
        </span>
      </motion.button>

      {/* Accessibility Modal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center sm:items-end sm:justify-end p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              role="dialog"
              aria-modal="true"
              aria-label="Accessibility Toolbox"
              className="relative w-full max-w-lg bg-[#071328] text-white rounded-3xl border border-white/15 shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
            >
              {/* Header */}
              <div className="p-5 sm:p-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-secondary/80 to-[#071328]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-accent/20 flex items-center justify-center text-accent border border-accent/30 shadow-inner">
                    <AccessibilityIcon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-display font-black text-lg text-white">
                        Accessibility Toolbox
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                        WCAG 2.2 AA/AAA
                      </span>
                    </div>
                    <p className="text-xs text-white/70">
                      Customize your visual, reading, and cognitive experience
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close Toolbox"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10 bg-[#060F20] text-xs font-bold">
                <button
                  onClick={() => setActiveTab("profiles")}
                  className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-colors ${
                    activeTab === "profiles"
                      ? "border-accent text-accent bg-white/5"
                      : "border-transparent text-white/60 hover:text-white"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Profiles</span>
                </button>
                <button
                  onClick={() => setActiveTab("controls")}
                  className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-colors ${
                    activeTab === "controls"
                      ? "border-accent text-accent bg-white/5"
                      : "border-transparent text-white/60 hover:text-white"
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Custom Controls</span>
                </button>
                <button
                  onClick={() => setActiveTab("guide")}
                  className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 border-b-2 transition-colors ${
                    activeTab === "guide"
                      ? "border-accent text-accent bg-white/5"
                      : "border-transparent text-white/60 hover:text-white"
                  }`}
                >
                  <HelpCircle className="w-3.5 h-3.5" />
                  <span>Guide</span>
                </button>
              </div>

              {/* Content Panels */}
              <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6 text-sm">
                {/* 1. PROFILES TAB */}
                {activeTab === "profiles" && (
                  <div className="space-y-4">
                    <p className="text-xs text-white/70">
                      Select a curated profile designed for specific accessibility needs, or adjust settings independently in Custom Controls:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {/* Visual Impairment */}
                      <button
                        onClick={() =>
                          setProfile(settings.profile === "visual" ? "none" : "visual")
                        }
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 relative group cursor-pointer ${
                          settings.profile === "visual"
                            ? "bg-accent/15 border-accent text-white shadow-lg shadow-accent/10"
                            : "bg-[#0c1b35] hover:bg-[#102446] border-white/10 text-white/90"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-cyan-400 flex items-center justify-center">
                            <Eye className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-400">
                            PROFILE
                          </span>
                        </div>
                        <div className="font-bold text-base text-white">Visual Impairment</div>
                        <p className="text-xs text-white/70 mt-1 leading-relaxed">
                          Large text (+30%), High Contrast theme, prominent links & focus highlights.
                        </p>
                      </button>

                      {/* Cognitive & ADHD */}
                      <button
                        onClick={() =>
                          setProfile(settings.profile === "adhd" ? "none" : "adhd")
                        }
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 relative group cursor-pointer ${
                          settings.profile === "adhd"
                            ? "bg-accent/15 border-accent text-white shadow-lg shadow-accent/10"
                            : "bg-[#0c1b35] hover:bg-[#102446] border-white/10 text-white/90"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                            <Brain className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-purple-400">
                            PROFILE
                          </span>
                        </div>
                        <div className="font-bold text-base text-white">Cognitive & ADHD</div>
                        <p className="text-xs text-white/70 mt-1 leading-relaxed">
                          Medium text (+15%), Reading Guide bar, paused animations, clear links.
                        </p>
                      </button>

                      {/* Dyslexia & Reading */}
                      <button
                        onClick={() =>
                          setProfile(settings.profile === "dyslexia" ? "none" : "dyslexia")
                        }
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 relative group cursor-pointer ${
                          settings.profile === "dyslexia"
                            ? "bg-accent/15 border-accent text-white shadow-lg shadow-accent/10"
                            : "bg-[#0c1b35] hover:bg-[#102446] border-white/10 text-white/90"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                            <BookOpen className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                            PROFILE
                          </span>
                        </div>
                        <div className="font-bold text-base text-white">Dyslexia & Reading</div>
                        <p className="text-xs text-white/70 mt-1 leading-relaxed">
                          Dyslexia-friendly typography, tracking Reading Guide bar, heading underlines.
                        </p>
                      </button>

                      {/* Motor Difficulty */}
                      <button
                        onClick={() =>
                          setProfile(settings.profile === "motor" ? "none" : "motor")
                        }
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 relative group cursor-pointer ${
                          settings.profile === "motor"
                            ? "bg-accent/15 border-accent text-white shadow-lg shadow-accent/10"
                            : "bg-[#0c1b35] hover:bg-[#102446] border-white/10 text-white/90"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <MousePointer className="w-4 h-4" />
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                            PROFILE
                          </span>
                        </div>
                        <div className="font-bold text-base text-white">Motor Difficulty</div>
                        <p className="text-xs text-white/70 mt-1 leading-relaxed">
                          Big mouse cursor, bright high-visibility focus ring, frozen animations.
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. CUSTOM CONTROLS TAB */}
                {activeTab === "controls" && (
                  <div className="space-y-5">
                    {/* Font Scaling */}
                    <div className="p-4 rounded-2xl bg-[#0c1b35] border border-white/10 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Type className="w-4 h-4 text-accent" />
                          <span className="font-bold text-white">Text Size Scaling</span>
                        </div>
                        <span className="text-xs text-accent font-mono font-bold uppercase">
                          {settings.fontSize === "normal" && "Default (100%)"}
                          {settings.fontSize === "medium" && "+15% (Medium)"}
                          {settings.fontSize === "large" && "+30% (Large)"}
                          {settings.fontSize === "x-large" && "+45% (X-Large)"}
                        </span>
                      </div>
                      <div className="grid grid-cols-4 gap-2">
                        {(["normal", "medium", "large", "x-large"] as const).map((size) => (
                          <button
                            key={size}
                            onClick={() => updateSetting("fontSize", size)}
                            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                              settings.fontSize === size
                                ? "bg-accent text-secondary"
                                : "bg-white/10 text-white/80 hover:bg-white/20"
                            }`}
                          >
                            {size === "normal" && "100%"}
                            {size === "medium" && "115%"}
                            {size === "large" && "130%"}
                            {size === "x-large" && "145%"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Visual Contrast & Filters */}
                    <div className="p-4 rounded-2xl bg-[#0c1b35] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2">
                        <Contrast className="w-4 h-4 text-accent" />
                        <span className="font-bold text-white">Color & Contrast Controls</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          onClick={() =>
                            updateSetting("highContrast", !settings.highContrast)
                          }
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.highContrast
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>High Contrast</span>
                          {settings.highContrast && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() => updateSetting("grayscale", !settings.grayscale)}
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.grayscale
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>Grayscale</span>
                          {settings.grayscale && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() =>
                            updateSetting("invertColors", !settings.invertColors)
                          }
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.invertColors
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>Invert Colors</span>
                          {settings.invertColors && <Check className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Reading & Cognition Tools */}
                    <div className="p-4 rounded-2xl bg-[#0c1b35] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2">
                        <BookOpen className="w-4 h-4 text-accent" />
                        <span className="font-bold text-white">Reading & Content Helpers</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          onClick={() =>
                            updateSetting("readingGuide", !settings.readingGuide)
                          }
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.readingGuide
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>Reading Guide Bar</span>
                          {settings.readingGuide && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() =>
                            updateSetting("dyslexicFont", !settings.dyslexicFont)
                          }
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.dyslexicFont
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>Dyslexia-Friendly Font</span>
                          {settings.dyslexicFont && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() =>
                            updateSetting("highlightLinks", !settings.highlightLinks)
                          }
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.highlightLinks
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>Highlight All Links</span>
                          {settings.highlightLinks && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() =>
                            updateSetting(
                              "headingUnderlines",
                              !settings.headingUnderlines
                            )
                          }
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.headingUnderlines
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>Underline Headings</span>
                          {settings.headingUnderlines && <Check className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Motor & Motion Controls */}
                    <div className="p-4 rounded-2xl bg-[#0c1b35] border border-white/10 space-y-3">
                      <div className="flex items-center gap-2">
                        <MousePointer className="w-4 h-4 text-accent" />
                        <span className="font-bold text-white">Motion & Interaction</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <button
                          onClick={() =>
                            updateSetting("stopAnimations", !settings.stopAnimations)
                          }
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.stopAnimations
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>Stop Animations</span>
                          {settings.stopAnimations && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() =>
                            updateSetting("bigCursor", !settings.bigCursor)
                          }
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.bigCursor
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>Big Cursor</span>
                          {settings.bigCursor && <Check className="w-4 h-4" />}
                        </button>
                        <button
                          onClick={() =>
                            updateSetting("focusHighlight", !settings.focusHighlight)
                          }
                          className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between border transition-all cursor-pointer ${
                            settings.focusHighlight
                              ? "bg-accent/20 border-accent text-accent"
                              : "bg-white/5 border-white/10 text-white/80 hover:bg-white/10"
                          }`}
                        >
                          <span>Focus Ring Highlight</span>
                          {settings.focusHighlight && <Check className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. GUIDE TAB */}
                {activeTab === "guide" && (
                  <div className="space-y-4 text-xs text-white/80 leading-relaxed">
                    <div className="p-4 rounded-2xl bg-[#0c1b35] border border-white/10 space-y-2">
                      <span className="font-bold text-white text-sm block">
                        Our Commitment to Inclusivity
                      </span>
                      <p>
                        As an organization dedicated since 1991 to children with autism, cerebral palsy, intellectual disabilities, and neurodivergence, DISCC prioritizes barrier-free digital access under Indian Divyangjan norms and WCAG 2.2 international guidelines.
                      </p>
                    </div>

                    <div className="space-y-2 pt-1">
                      <span className="font-bold text-white block">Keyboard Navigation Shortcuts:</span>
                      <ul className="space-y-1.5 list-disc pl-4 text-white/70">
                        <li><strong className="text-white">Tab / Shift+Tab:</strong> Navigate across interactive links and buttons</li>
                        <li><strong className="text-white">Enter / Space:</strong> Activate highlighted buttons or toggle options</li>
                        <li><strong className="text-white">Escape:</strong> Instantly close modals and this Accessibility Toolbox</li>
                      </ul>
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-emerald-300">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                      <span>All accessibility preferences are automatically saved in your browser for your next visit.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-white/10 bg-[#060F20] flex items-center justify-between gap-3">
                <button
                  onClick={resetAll}
                  className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Defaults</span>
                </button>

                <button
                  onClick={() => setIsOpen(false)}
                  className="px-7 py-2.5 rounded-xl bg-[#0066FF] hover:bg-[#0052CC] text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
