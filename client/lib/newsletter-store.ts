// Simple in-memory store for newsletter subscribers
// In production, this would be replaced with a database
class NewsletterStore {
  private subscribers = new Set<string>()

  addSubscriber(email: string): boolean {
    if (this.subscribers.has(email)) {
      return false // Already exists
    }
    this.subscribers.add(email)
    return true
  }

  removeSubscriber(email: string): boolean {
    return this.subscribers.delete(email)
  }

  hasSubscriber(email: string): boolean {
    return this.subscribers.has(email)
  }

  getSubscriberCount(): number {
    return this.subscribers.size
  }

  getAllSubscribers(): string[] {
    return Array.from(this.subscribers)
  }

  // For development/testing purposes
  clearAll(): void {
    this.subscribers.clear()
  }
}

// Export a singleton instance
export const newsletterStore = new NewsletterStore()
