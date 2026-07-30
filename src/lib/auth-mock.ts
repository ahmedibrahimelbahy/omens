"use client";

/**
 * Client-side mock auth. Persists the "logged-in user" in localStorage
 * until we wire Supabase. The shape mirrors what we'll get from a real
 * profiles table so the swap is trivial.
 */

export type Role = "landlord" | "tenant";

export type MockUser = {
  id: string;
  role: Role;
  name: string;
  nameAr: string;
  initials: string;
  email: string;
  whatsapp: string;
  joinedAt: string; // ISO
  /** Landlord-only stats. */
  units?: number;
  monthlyRevenue?: number;
  trustScore?: number;
  /** Tenant-only stats. */
  omensScore?: number;
  streakMonths?: number;
  savedThisYear?: number;
  currentUnit?: string;
  currentUnitAr?: string;
};

export const DEMO_USERS: Record<string, MockUser> = {
  farida: {
    id: "farida",
    role: "landlord",
    name: "Farida Mansour",
    nameAr: "فريدة منصور",
    initials: "FM",
    email: "farida.m@omens.eg",
    whatsapp: "+20 10 1234 5678",
    joinedAt: "2026-01-12",
    units: 4,
    monthlyRevenue: 18400,
    trustScore: 96,
  },
  mostafa: {
    id: "mostafa",
    role: "tenant",
    name: "Mostafa Abdelrahman",
    nameAr: "مصطفى عبدالرحمن",
    initials: "MA",
    email: "mostafa.a@omens.eg",
    whatsapp: "+20 10 9876 5432",
    joinedAt: "2026-01-20",
    omensScore: 92,
    streakMonths: 4,
    savedThisYear: 840,
    currentUnit: "Apt 12 · Heliopolis · Korba",
    currentUnitAr: "شقة ١٢ · هليوبوليس · كوربا",
  },
};

const STORAGE_KEY = "omens.auth.user";

export function getCurrentUser(): MockUser | null {
  if (typeof window === "undefined") return null;
  try {
    const id = window.localStorage.getItem(STORAGE_KEY);
    if (!id) return null;
    return DEMO_USERS[id] ?? null;
  } catch {
    return null;
  }
}

export function signIn(userId: keyof typeof DEMO_USERS) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, userId);
  // Notify same-tab listeners
  window.dispatchEvent(new Event("omens:auth"));
}

export function signOut() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(STORAGE_KEY);
  window.dispatchEvent(new Event("omens:auth"));
}

/** React hook helper — re-renders on auth changes. */
import { useEffect, useState } from "react";

export function useCurrentUser() {
  const [user, setUser] = useState<MockUser | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setUser(getCurrentUser());
    setHydrated(true);
    const handler = () => setUser(getCurrentUser());
    window.addEventListener("omens:auth", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("omens:auth", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  return { user, hydrated };
}
