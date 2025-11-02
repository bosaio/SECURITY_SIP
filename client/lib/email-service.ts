export interface EmailData {
  to: string
  subject: string
  html: string
  text?: string
}

export interface NewsletterConfirmation {
  email: string
  timestamp: string
}

class EmailService {
  private sendgridApiKey = process.env.SENDGRID_API_KEY
  private fromEmail = process.env.FROM_EMAIL || 'noreply@yourdomain.com'
  private isProduction = process.env.NODE_ENV === 'production'

  async sendNewsletterConfirmation(email: string): Promise<boolean> {
    try {
      const emailData: EmailData = {
        to: email,
        subject: 'Welcome to Security SIP Newsletter! 🛡️',
        html: this.getNewsletterWelcomeHTML(email),
        text: this.getNewsletterWelcomeText(email)
      }

      if (this.isProduction && this.sendgridApiKey) {
        return await this.sendWithSendGrid(emailData)
      } else {
        // Development mode - log to console
        console.log('📧 [DEV MODE] Newsletter confirmation email:')
        console.log('To:', emailData.to)
        console.log('Subject:', emailData.subject)
        console.log('Content preview:', emailData.text?.substring(0, 100) + '...')
        return true
      }
    } catch (error) {
      console.error('Failed to send newsletter confirmation:', error)
      return false
    }
  }

  async sendNewsletterToSubscribers(subject: string, content: string): Promise<boolean> {
    try {
      // This would be implemented to send to all subscribers
      // For now, just log the action
      console.log('📧 Newsletter broadcast:', { subject, contentLength: content.length })
      return true
    } catch (error) {
      console.error('Failed to send newsletter broadcast:', error)
      return false
    }
  }

  private async sendWithSendGrid(emailData: EmailData): Promise<boolean> {
    if (!this.sendgridApiKey) {
      throw new Error('SendGrid API key not configured')
    }

    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.sendgridApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: emailData.to }] }],
        from: { email: this.fromEmail },
        subject: emailData.subject,
        content: [
          { type: 'text/html', value: emailData.html },
          { type: 'text/plain', value: emailData.text || emailData.html }
        ]
      })
    })

    return response.ok
  }

  private getNewsletterWelcomeHTML(email: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Security SIP Newsletter</title>
      </head>
      <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px; margin-bottom: 30px;">
          <h1 style="color: white; margin: 0; font-size: 28px;">🛡️ Welcome to Security SIP!</h1>
          <p style="color: white; margin: 10px 0 0 0; opacity: 0.9;">Your cybersecurity journey starts here</p>
        </div>
        
        <h2 style="color: #2d3748; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Welcome aboard, ${email.split('@')[0]}!</h2>
        
        <p>Thank you for subscribing to the Security SIP newsletter! You're now part of a community dedicated to learning and growing in cybersecurity.</p>
        
        <div style="background: #f7fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #4a5568;">What you'll receive:</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>🔒 Latest cybersecurity insights and trends</li>
            <li>💡 Practical security tips for developers</li>
            <li>📚 In-depth analysis of security breaches</li>
            <li>🚀 Career advice for security professionals</li>
            <li>🎯 Exclusive content not published elsewhere</li>
          </ul>
        </div>
        
        <p>Stay tuned for our next newsletter, where we'll dive deep into the latest security challenges and solutions.</p>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="http://localhost:3000" style="background: #4299e1; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Visit Our Blog</a>
        </div>
        
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;">
        <p style="font-size: 14px; color: #718096; text-align: center;">
          You can unsubscribe at any time by clicking the link below.<br>
          <a href="http://localhost:3000/api/newsletter/unsubscribe" style="color: #4299e1;">Unsubscribe</a>
        </p>
      </body>
      </html>
    `
  }

  private getNewsletterWelcomeText(email: string): string {
    return `
Welcome to Security SIP Newsletter! 🛡️

Hi ${email.split('@')[0]},

Thank you for subscribing to the Security SIP newsletter! You're now part of a community dedicated to learning and growing in cybersecurity.

What you'll receive:
- Latest cybersecurity insights and trends
- Practical security tips for developers
- In-depth analysis of security breaches
- Career advice for security professionals
- Exclusive content not published elsewhere

Stay tuned for our next newsletter, where we'll dive deep into the latest security challenges and solutions.

Visit our blog: http://localhost:3000

---
You can unsubscribe at any time: http://localhost:3000/api/newsletter/unsubscribe
    `.trim()
  }
}

export const emailService = new EmailService()
