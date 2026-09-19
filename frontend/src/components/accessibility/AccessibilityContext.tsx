"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export type AccessibilityProfile = "none" | "visual" | "adhd" | "dyslexia" | "motor";

export interface AccessibilitySettings {
  profile: AccessibilityProfile;
  // Visual & Text
  fontSize: "normal" | "medium" | "large" | "x-large"; // normal: 100%, medium: 115%, large: 130%, x-large: 145%
  highContrast: boolean; // WCAG AAA high contrast dark/light mode
  grayscale: boolean;
  invertColors: boolean;
  highlightLinks: boolean;
  headingUnderlines: boolean;
  // Cognitive & Reading
  dyslexicFont: boolean;
  readingGuide: boolean; // Horizontal reading ruler bar tracking cursor
  letterSpacing: "normal" | "wide" | "wider";
  lineHeight: "normal" | "relaxed" | "loose";
  // Motor & Focus
  bigCursor: boolean;
  stopAnimations: boolean;
  focusHighlight: boolean; // Bright neon high-visibility keyboard/mouse focus ring
}

const defaultSettings: AccessibilitySettings = {
  profile: "none",
  fontSize: "normal",
  highContrast: false,
  grayscale: false,
  invertColors: false,
  highlightLinks: false,
  headingUnderlines: false,
  dyslexicFont: false,
  readingGuide: false,
  letterSpacing: "normal",
  lineHeight: "normal",
  bigCursor: false,
  stopAnimations: false,
  focusHighlight: false,
};

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  setProfile: (profile: AccessibilityProfile) => void;
  updateSetting: <K extends keyof AccessibilitySettings>(key: K, value: AccessibilitySettings[K]) => void;
  resetAll: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [isOpen, setIsOpen] = useState(false);
  const [mouseY, setMouseY] = useState(0);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("discc_accessibility_settings");
      if (saved) {
        setSettings(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }

    const handleCustomOpen = () => setIsOpen(true);
    window.addEventListener("open-accessibility-toolbox", handleCustomOpen);
    return () => window.removeEventListener("open-accessibility-toolbox", handleCustomOpen);
  }, []);

  // Save and apply classes to HTML / Body
  useEffect(() => {
    try {
      localStorage.setItem("discc_accessibility_settings", JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }

    const html = document.documentElement;

    // Font size
    html.classList.remove("a11y-font-medium", "a11y-font-large", "a11y-font-xlarge");
    if (settings.fontSize === "medium") html.classList.add("a11y-font-medium");
    if (settings.fontSize === "large") html.classList.add("a11y-font-large");
    if (settings.fontSize === "x-large") html.classList.add("a11y-font-xlarge");

    // High Contrast
    if (settings.highContrast) html.classList.add("a11y-high-contrast");
    else html.classList.remove("a11y-high-contrast");

    // Grayscale
    if (settings.grayscale) html.classList.add("a11y-grayscale");
    else html.classList.remove("a11y-grayscale");

    // Invert
    if (settings.invertColors) html.classList.add("a11y-invert");
    else html.classList.remove("a11y-invert");

    // Dyslexic Font
    if (settings.dyslexicFont) html.classList.add("a11y-dyslexic");
    else html.classList.remove("a11y-dyslexic");

    // Highlight links
    if (settings.highlightLinks) html.classList.add("a11y-highlight-links");
    else html.classList.remove("a11y-highlight-links");

    // Heading Underlines
    if (settings.headingUnderlines) html.classList.add("a11y-heading-underlines");
    else html.classList.remove("a11y-heading-underlines");

    // Spacing
    html.classList.remove("a11y-letter-wide", "a11y-letter-wider");
    if (settings.letterSpacing === "wide") html.classList.add("a11y-letter-wide");
    if (settings.letterSpacing === "wider") html.classList.add("a11y-letter-wider");

    html.classList.remove("a11y-line-relaxed", "a11y-line-loose");
    if (settings.lineHeight === "relaxed") html.classList.add("a11y-line-relaxed");
    if (settings.lineHeight === "loose") html.classList.add("a11y-line-loose");

    // Big Cursor
    if (settings.bigCursor) html.classList.add("a11y-big-cursor");
    else html.classList.remove("a11y-big-cursor");

    // Stop Animations
    if (settings.stopAnimations) html.classList.add("a11y-stop-animations");
    else html.classList.remove("a11y-stop-animations");

    // Focus Highlight
    if (settings.focusHighlight) html.classList.add("a11y-focus-highlight");
    else html.classList.remove("a11y-focus-highlight");
  }, [settings]);

  // Track mouse Y for reading guide
  useEffect(() => {
    if (!settings.readingGuide) return;
    const handleMouseMove = (e: MouseEvent) => {
      setMouseY(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [settings.readingGuide]);

  const setProfile = (profile: AccessibilityProfile) => {
    if (profile === "none") {
      setSettings(defaultSettings);
      return;
    }

    if (profile === "visual") {
      setSettings({
        ...defaultSettings,
        profile: "visual",
        fontSize: "large", // +30%
        highContrast: true,
        highlightLinks: true,
        focusHighlight: true,
      });
    } else if (profile === "adhd") {
      setSettings({
        ...defaultSettings,
        profile: "adhd",
        fontSize: "medium", // +15%
        stopAnimations: true,
        highlightLinks: true,
        readingGuide: true,
      });
    } else if (profile === "dyslexia") {
      setSettings({
        ...defaultSettings,
        profile: "dyslexia",
        dyslexicFont: true,
        letterSpacing: "wide",
        lineHeight: "relaxed",
        readingGuide: true,
        headingUnderlines: true,
      });
    } else if (profile === "motor") {
      setSettings({
        ...defaultSettings,
        profile: "motor",
        bigCursor: true,
        focusHighlight: true,
        stopAnimations: true,
      });
    }
  };

  const updateSetting = <K extends keyof AccessibilitySettings>(
    key: K,
    value: AccessibilitySettings[K]
  ) => {
    setSettings((prev) => ({
      ...prev,
      profile: "none", // custom adjustment unsets preset badge
      [key]: value,
    }));
  };

  const resetAll = () => {
    setSettings(defaultSettings);
  };

  return (
    <AccessibilityContext.Provider
      value={{ settings, setProfile, updateSetting, resetAll, isOpen, setIsOpen }}
    >
      {children}

      {/* Reading Guide Horizontal Ruler Bar */}
      {settings.readingGuide && (
        <div
          className="pointer-events-none fixed left-0 right-0 z-[9999] h-8 bg-amber-400/25 border-y-2 border-amber-500/80 shadow-[0_0_20px_rgba(245,158,11,0.3)] transition-transform duration-75"
          style={{
            top: `${mouseY - 16}px`,
          }}
        />
      )}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error("useAccessibility must be used within an AccessibilityProvider");
  }
  return context;
}
