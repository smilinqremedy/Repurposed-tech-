"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { soundEngine } from "./soundEngine";

interface AudioContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  ambientActive: boolean;
  toggleAmbient: () => void;
  activeSample: string | null;
  playClick: (variant?: "light" | "heavy" | "toggle") => void;
  playChime: () => void;
  playCrt: () => void;
  playHardwareSample: (type: "chiptune" | "wolfson" | "thock" | "shutter" | "cyberdeck" | "braun") => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ambientActive, setAmbientActive] = useState(false);
  const [activeSample, setActiveSample] = useState<string | null>(null);

  useEffect(() => {
    setSoundEnabled(soundEngine.isEnabled());
  }, []);

  const toggleSound = () => {
    const next = soundEngine.toggleEnabled();
    setSoundEnabled(next);
    if (!next) {
      setAmbientActive(false);
    }
  };

  const toggleAmbient = () => {
    const next = soundEngine.toggleAmbient();
    setAmbientActive(next);
  };

  const playClick = (variant?: "light" | "heavy" | "toggle") => {
    soundEngine.playClick(variant);
  };

  const playChime = () => {
    soundEngine.playCleanAmpChime();
  };

  const playCrt = () => {
    soundEngine.playCrtDeGauss();
  };

  const playHardwareSample = (type: "chiptune" | "wolfson" | "thock" | "shutter" | "cyberdeck" | "braun") => {
    soundEngine.playHardwareSample(type);
    setActiveSample(type);
    setTimeout(() => {
      setActiveSample(null);
    }, 1500);
  };

  return (
    <AudioContext.Provider
      value={{
        soundEnabled,
        toggleSound,
        ambientActive,
        toggleAmbient,
        activeSample,
        playClick,
        playChime,
        playCrt,
        playHardwareSample,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return ctx;
}
