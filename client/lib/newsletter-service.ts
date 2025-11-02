export interface NewsletterResponse {
  message?: string
  error?: string
  email?: string
  timestamp?: string
  isSubscribed?: boolean
}

export interface NewsletterSubscription {
  email: string
  timestamp: string
}

class NewsletterService {
  private baseUrl = '/api/newsletter'

  async subscribe(email: string): Promise<NewsletterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/subscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Subscription failed')
      }

      return data
    } catch (error) {
      throw error
    }
  }

  async checkSubscription(email: string): Promise<NewsletterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/subscribe?email=${encodeURIComponent(email)}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to check subscription')
      }

      return data
    } catch (error) {
      throw error
    }
  }

  async unsubscribe(email: string): Promise<NewsletterResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/unsubscribe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Unsubscribe failed')
      }

      return data
    } catch (error) {
      throw error
    }
  }
}

export const newsletterService = new NewsletterService()
