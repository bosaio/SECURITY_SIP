# 🚀 Vercel Deployment Guide for Security SIP Blog

## 📋 **Pre-Deployment Checklist**

### ✅ **Environment Variables Setup**

Create a `.env.local` file in your `client` directory with:

```bash
# Sanity Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-08-27

# Sanity Studio URL (for production, use your deployed Studio URL)
# For local development, this defaults to http://localhost:3333
NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-domain.sanity.studio

# Optional: Sanity API Token (only needed for write operations)
# SANITY_API_TOKEN=your_token_here

# Next.js Configuration
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### ✅ **Production Build Test**

Test your production build locally:

```bash
cd client
npm run build
npm start
```

### ✅ **Sanity Studio Deployment**

Your Sanity Studio is already configured for production deployment.

## 🚀 **Vercel Deployment Steps**

### 1. **Connect Your Repository**

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub/GitLab/Bitbucket
3. Click "New Project"
4. Import your `SECURITY_SIP` repository
5. Select the `client` folder as the root directory

### 2. **Configure Build Settings**

**Framework Preset**: Next.js
**Root Directory**: `client` ⚠️ **CRITICAL: Set this to `client` in Vercel dashboard**
**Build Command**: `npm run build` (auto-detected)
**Output Directory**: `.next` (auto-detected)
**Install Command**: `npm install --legacy-peer-deps` (handles dependency conflicts)

**Important**: The `vercel.json` file in the root has been configured to handle peer dependency conflicts. Make sure the Root Directory is set to `client` in your Vercel project settings.

### 3. **Environment Variables in Vercel**

Add these environment variables in your Vercel project settings:

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `your_sanity_project_id_here` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Your Sanity dataset |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2024-08-27` | Sanity API version |
| `NEXT_PUBLIC_SANITY_STUDIO_URL` | `https://your-studio-domain.sanity.studio` | Your deployed Sanity Studio URL |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Your Vercel domain |

### 4. **Deploy**

Click "Deploy" and wait for the build to complete!

## 🔧 **Post-Deployment Configuration**

### 1. **Update Sanity Studio Links**

After deployment, configure your Sanity Studio URL:

1. **Deploy your Sanity Studio** (if not already deployed):
   ```bash
   cd security-sip
   npm run deploy
   ```
   This will give you a URL like `https://your-project.sanity.studio`

2. **Add the Studio URL to Vercel Environment Variables**:
   - Go to your Vercel project settings
   - Navigate to "Environment Variables"
   - Add `NEXT_PUBLIC_SANITY_STUDIO_URL` with your Studio URL
   - Value: `https://your-project.sanity.studio`
   - Redeploy your application

3. **Update CORS settings in Sanity** (if needed):
   - Go to your Sanity project settings
   - Add your Vercel domain to allowed origins

### 2. **Custom Domain (Optional)**

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Update DNS settings with your domain provider

### 3. **Update Environment Variables**

Update `NEXT_PUBLIC_SITE_URL` with your actual domain.

## 📱 **Mobile & Performance Optimization**

### 1. **Image Optimization**

Your blog already includes:
- ✅ Next.js Image optimization
- ✅ Sanity image URL builder
- ✅ Responsive design

### 2. **Performance Monitoring**

Vercel provides:
- ✅ Real-time performance metrics
- ✅ Core Web Vitals tracking
- ✅ Automatic performance optimization

## 🔒 **Security Considerations**

### 1. **Environment Variables**
- ✅ All sensitive data is in environment variables
- ✅ No hardcoded secrets in code
- ✅ Sanity project ID is public (safe to expose)

### 2. **CORS Configuration**
- ✅ Sanity Studio handles CORS
- ✅ API endpoints are properly secured

## 📊 **Analytics & Monitoring**

### 1. **Vercel Analytics**
- Enable Vercel Analytics in your project settings
- Track page views, performance, and user behavior

### 2. **Google Analytics (Optional)**
Add Google Analytics to track blog engagement.

## 🚨 **Troubleshooting Common Issues**

### 1. **Dependency Conflict Errors (ERESOLVE)**

If you see errors like:
```
npm error ERESOLVE could not resolve
npm error peer @sanity/icons@"^2.8" from next-sanity@7.1.4
```

**Solution:**
- ✅ **Root Directory MUST be set to `client`** in Vercel project settings
- ✅ The `client/.npmrc` file with `legacy-peer-deps=true` handles this
- ✅ The `client/vercel.json` has `installCommand: "npm install --legacy-peer-deps"`
- ⚠️ If Root Directory is NOT set to `client`, Vercel will try to install from root and fail

**To fix in Vercel:**
1. Go to Project Settings → General
2. Under "Root Directory", click "Edit"
3. Set it to `client`
4. Save and redeploy

### 2. **Build Failures**
```bash
# Check for TypeScript errors
cd client
npm run build

# Check for linting errors
npm run lint

# Clear Next.js cache
rm -rf .next
npm run build
```

### 3. **Environment Variable Issues**
- Ensure all variables start with `NEXT_PUBLIC_` for client-side access
- Check Vercel environment variable settings
- Verify variable names match exactly

### 4. **Sanity Connection Issues**
- Verify project ID and dataset are correct
- Check CORS settings in Sanity
- Ensure API version is current

### 5. **Performance Issues**
- Enable Vercel Edge Functions
- Optimize images and assets
- Use Next.js Image component

## 🎯 **Post-Deployment Checklist**

- [ ] Website loads correctly
- [ ] Blog posts display properly
- [ ] Sanity Studio links work
- [ ] Mobile responsiveness works
- [ ] Performance is acceptable
- [ ] Custom domain configured (if applicable)
- [ ] Analytics enabled
- [ ] Error monitoring set up

## 🔄 **Continuous Deployment**

### 1. **Automatic Deployments**
- Vercel automatically deploys on every push to main branch
- Preview deployments for pull requests

### 2. **Deployment Protection**
- Enable deployment protection rules
- Require approval for production deployments

## 📈 **Scaling Considerations**

### 1. **Traffic Handling**
- Vercel automatically scales based on traffic
- Edge functions for global performance
- CDN for static assets

### 2. **Database Scaling**
- Sanity handles database scaling automatically
- Consider upgrading plan for high traffic

## 🎉 **Success Metrics**

Your deployment is successful when:
- ✅ Website loads in under 3 seconds
- ✅ All pages render correctly
- ✅ Blog posts display with proper formatting
- ✅ Mobile experience is smooth
- ✅ Sanity Studio integration works
- ✅ Performance scores are 90+ on Lighthouse

## 🆘 **Need Help?**

If you encounter issues:
1. Check Vercel build logs
2. Verify environment variables
3. Test locally with `npm run build`
4. Check Sanity project settings
5. Review this guide again

---

**Happy Deploying! 🚀**

Your cybersecurity blog is ready for the world!
