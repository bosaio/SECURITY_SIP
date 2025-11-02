"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { newsletterService } from "@/lib/newsletter-service"

export function NewsletterSubscription() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      setStatus("error")
      setMessage("Please enter your email address")
      return
    }

    if (!validateEmail(email)) {
      setStatus("error")
      setMessage("Please enter a valid email address")
      return
    }

    setStatus("loading")
    setMessage("")

    try {
      const data = await newsletterService.subscribe(email)

      setStatus("success")
      setMessage(data.message || "Thank you for subscribing! Check your email for confirmation.")
      setEmail("")
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setStatus("idle")
        setMessage("")
      }, 5000)
      
    } catch (error) {
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.")
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-600" />
      case "loading":
        return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
      default:
        return <Mail className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusColor = () => {
    switch (status) {
      case "success":
        return "text-green-600"
      case "error":
        return "text-red-600"
      case "loading":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <Card className="bg-white border-2 border-gray-200">
      <CardHeader className="text-center pb-4">
        <CardTitle className="text-2xl font-bold text-gray-900">
          Stay updated on my journey
        </CardTitle>
        <CardDescription className="text-gray-600">
          Subscribe to the mailing list for exclusive insights and updates
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center pb-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
              disabled={status === "loading"}
              required
            />
            <Button 
              type="submit"
              className="bg-gray-700 hover:bg-gray-800 text-white px-8 disabled:opacity-50"
              disabled={status === "loading"}
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Subscribing...
                </>
              ) : (
                "SUBSCRIBE"
              )}
            </Button>
          </div>
          
          {/* Status Message */}
          {message && (
            <div className={`flex items-center justify-center gap-2 text-sm ${getStatusColor()}`}>
              {getStatusIcon()}
              {message}
            </div>
          )}
          
          {/* Privacy Notice */}
          <p className="text-xs text-gray-500 max-w-md mx-auto">
            We respect your privacy. Unsubscribe at any time. No spam, ever.
          </p>
        </form>
      </CardContent>
    </Card>
  )
}
