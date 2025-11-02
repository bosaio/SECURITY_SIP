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

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account Settings
   - Security → 2-Step Verification → App passwords
   - Generate password for "Mail"
3. **Update Environment Variables**:

```bash
# In client/.env.local
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
EMAIL_SERVICE=gmail
```

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

### **1. Test Connection**
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

### **2. Test Email Sending**
```bash
curl -X POST http://localhost:3000/api/newsletter/test-email \
  -H "Content-Type: application/json" \
  -d '{"testEmail":"your_email@example.com"}'
```

### **3. Test Newsletter Subscription**
```bash
curl -X POST http://localhost:3000/api/newsletter/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com"}'
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

2. **"Authentication failed"**
   - Use App Password instead of regular password
   - Check if account allows "less secure apps"
   - Verify SMTP settings

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
