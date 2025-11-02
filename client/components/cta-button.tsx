"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Download, Mail, BookOpen, Shield, Zap } from "lucide-react"
import Link from "next/link"

interface CTAButtonProps {
  text: string
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary" | "accent" | "outline"
  size?: "sm" | "default" | "lg"
  icon?: "arrow" | "download" | "mail" | "book" | "shield" | "zap" | "none"
  className?: string
  fullWidth?: boolean
}

const iconMap = {
  arrow: ArrowRight,
  download: Download,
  mail: Mail,
  book: BookOpen,
  shield: Shield,
  zap: Zap,
  none: null,
}

export function CTAButton({
  text,
  href,
  onClick,
  variant = "primary",
  size = "lg",
  icon = "arrow",
  className = "",
  fullWidth = false,
}: CTAButtonProps) {
  const IconComponent = iconMap[icon]
  
  const baseClasses = "font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
  const variantClasses = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg",
    secondary: "bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white shadow-lg",
    accent: "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white shadow-lg",
  }
  
  const widthClass = fullWidth ? "w-full" : ""
  
  const buttonContent = (
    <>
      {text}
      {IconComponent && <IconComponent className="ml-2 h-5 w-5" />}
    </>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        <Button
          className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
          size={size}
          onClick={onClick}
        >
          {buttonContent}
        </Button>
      </Link>
    )
  }

  return (
    <Button
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
      size={size}
      onClick={onClick}
    >
      {buttonContent}
    </Button>
  )
}

// Specialized CTA buttons for common use cases
export function NewsletterCTA() {
  return (
    <CTAButton
      text="Subscribe to Newsletter"
      href="/newsletter"
      variant="primary"
      icon="mail"
      size="lg"
      className="px-8 py-4"
    />
  )
}

export function BlogCTA() {
  return (
    <CTAButton
      text="Read Latest Posts"
      href="/blog"
      variant="secondary"
      icon="book"
      size="lg"
      className="px-8 py-4"
    />
  )
}

export function SecurityGuideCTA() {
  return (
    <CTAButton
      text="Get Security Guide"
      href="/security-guide"
      variant="accent"
      icon="shield"
      size="lg"
      className="px-8 py-4"
    />
  )
}

export function ContactCTA() {
  return (
    <CTAButton
      text="Get in Touch"
      href="/contact"
      variant="outline"
      icon="mail"
      size="lg"
      className="px-8 py-4"
    />
  )
}
