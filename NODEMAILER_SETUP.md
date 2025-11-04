# 📧 Nodemailer Setup Guide for Newsletter Subscriptions

## 🎯 **What We've Implemented**

Your newsletter subscription system now uses **Nodemailer** to handle email functionality:

- ✅ **Newsletter Subscription API** - `/api/newsletter/subscribe`
- ✅ **Email Service** - Using Nodemailer with multiple email providers
- ✅ **Welcome Email Templates** - Beautiful HTML and text versions
- ✅ **Development Mode** - Console logging when not configured
- ✅ **Production Ready** - Real email sending when configured

## 🚀 **How to Enable Real Email Sending**

### **Option 1: Gmail (Recommended for Testing)**

**⚠️ IMPORTANT: Gmail requires an App Password, NOT your regular Gmail password!**

If you see the error: `"534-5.7.9 Application-specific password required"`, you need to:

1. **Enable 2-Factor Authentication** on your Gmail account
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Click "2-Step Verification" and enable it

2. **Generate App Password**:
   - Go to [Google Account → App Passwords](https://myaccount.google.com/apppasswords)
   - Or: Google Account → Security → 2-Step Verification → App passwords
   - Select "Mail" as the app and "Other" as the device
   - Name it "Security SIP Newsletter" (or any name you prefer)
   - Click "Generate"
   - **Copy the 16-character password** (it will look like: `abcd efgh ijkl mnop`)

3. **Update Environment Variables** in `client/.env.local`:

```bash
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=abcdefghijklmnop  # Use the 16-char app password (no spaces)
EMAIL_SERVICE=gmail
```

**Note:** The app password will be 16 characters without spaces. Use it exactly as shown.

### **Option 2: Outlook/Hotmail**

```bash
# In client/.env.local
EMAIL_USER=your_email@outlook.com
EMAIL_PASSWORD=your_password
EMAIL_SERVICE=outlook
```

### **Option 3: Yahoo**

```bash
# In client/.env.local
EMAIL_USER=your_email@yahoo.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=yahoo
```

### **Option 4: Custom SMTP Server**

```bash
# In client/.env.local
EMAIL_USER=your_email@domain.com
EMAIL_PASSWORD=your_password
EMAIL_SERVICE=custom
SMTP_HOST=smtp.yourdomain.com
SMTP_PORT=587
SMTP_SECURE=false
```

## 🔧 **Testing Your Email Configuration**

Make sure your dev server is running (`npm run dev` in the `client` folder) before running these tests.

### **1. Check Configuration Status**
```bash
curl http://localhost:3000/api/newsletter/debug
```

**Expected Response:**
```json
{
  "status": "success",
  "message": "Nodemailer service debug information",
  "timestamp": "2025-08-31T16:11:20.686Z",
  "environment": {
    "EMAIL_USER": "Set",
    "EMAIL_PASSWORD": "Set",
    "EMAIL_SERVICE": "gmail",
    "NODE_ENV": "development"
  },
  "service": {
    "isConfigured": true,
    "hasTransporter": true
  }
}
```

### **2. Test Email Connection**
```bash
curl http://localhost:3000/api/newsletter/test-email
```

**Expected Response (Success):**
```json
{
  "status": "success",
  "message": "Email connection verified successfully",
  "timestamp": "2025-08-31T16:11:20.686Z"
}
```

**Expected Response (Error - if credentials are wrong):**
```json
{
  "status": "error",
  "message": "Email connection test failed",
  "timestamp": "2025-08-31T16:11:20.686Z"
}
```

### **3. Test Email Sending**
Send a test welcome email to your email address:

```bash
curl -X POST http://localhost:3000/api/newsletter/test-email \
  -H "Content-Type: application/json" \
  -d '{"testEmail":"orobosa@gmail.com"}'
```

**Expected Response (Success):**
```json
{
  "status": "success",
  "message": "Test email sent successfully",
  "email": "your_email@example.com",
  "timestamp": "2025-08-31T16:11:20.686Z"
}
```

### **4. Test Newsletter Subscription**
Test the full newsletter subscription flow:

```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
```

**Expected Response (Success):**
```json
{
  "message": "Successfully subscribed to newsletter! Check your email for confirmation.",
  "email": "test@example.com",
  "timestamp": "2025-08-31T16:11:20.686Z"
}
```

### **5. Quick Test Script**
Create a file `test-email.sh` in your project root:

```bash
#!/bin/bash

echo "🧪 Testing Nodemailer Configuration..."
echo ""

echo "1️⃣ Checking configuration..."
curl -s http://localhost:3000/api/newsletter/debug | jq '.'
echo ""

echo "2️⃣ Testing connection..."
curl -s http://localhost:3000/api/newsletter/test-email | jq '.'
echo ""

echo "3️⃣ Sending test email..."
read -p "Enter your email address: " email
curl -s -X POST http://localhost:3000/api/newsletter/test-email \
  -H "Content-Type: application/json" \
  -d "{\"testEmail\":\"$email\"}" | jq '.'
echo ""

echo "✅ Test complete! Check your inbox."
```

Make it executable and run:
```bash
chmod +x test-email.sh
./test-email.sh
```

## 📋 **Current Environment Variables**

Your `.env.local` file should include:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=rb9cpc3o
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token_here

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5000

# JWT Configuration
JWT_SECRET=your_jwt_secret_here

# Nodemailer Configuration
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
EMAIL_SERVICE=gmail
```

## 🌟 **What Happens When Someone Subscribes**

### **Development Mode (No Email Credentials):**
1. ✅ Email validated and stored
2. 📧 Email content logged to console
3. ✅ Success message shown to user
4. ⚠️ No actual email sent

### **Production Mode (With Email Credentials):**
1. ✅ Email validated and stored
2. 📧 Real welcome email sent via SMTP
3. ✅ Email delivery confirmation logged
4. ✅ Success message shown to user

## 🚨 **Security Notes**

- **Never commit** `.env.local` to version control
- **Use App Passwords** instead of regular passwords for Gmail
- **Consider using** environment-specific credentials
- **Monitor email logs** for any delivery issues

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **"Email connection test failed"**
   - Check EMAIL_USER and EMAIL_PASSWORD
   - Verify email service configuration
   - Check if 2FA is enabled (Gmail)

2. **"Authentication failed" or "Application-specific password required"**
   - ✅ **You MUST use a Gmail App Password, not your regular password**
   - Go to [Google App Passwords](https://myaccount.google.com/apppasswords) to generate one
   - Make sure 2-Factor Authentication is enabled first
   - Use the 16-character app password (remove spaces if present)
   - The error `534-5.7.9 Application-specific password required` means you're using your regular password

3. **"Connection timeout"**
   - Check firewall settings
   - Verify SMTP port and host
   - Try different email service

## 📚 **Next Steps**

Once email is working:

1. **Test with real email addresses**
2. **Customize email templates**
3. **Add email analytics tracking**
4. **Implement unsubscribe functionality**
5. **Set up email scheduling**

## 🎉 **You're All Set!**

Your newsletter subscription system is now fully functional with:
- ✅ **Real API endpoints**
- ✅ **Email service integration**
- ✅ **Beautiful email templates**
- ✅ **Multiple email provider support**
- ✅ **Development and production modes**

**Happy emailing! 🚀**
