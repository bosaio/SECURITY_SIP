import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the Sanity Studio URL from environment variable or default to localhost
 * Set NEXT_PUBLIC_SANITY_STUDIO_URL in Vercel for production
 */
export function getStudioUrl(): string {
  return process.env.NEXT_PUBLIC_SANITY_STUDIO_URL || 'http://localhost:3333'
}
