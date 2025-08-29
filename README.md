# Security SIP - Cybersecurity Blog

A modern cybersecurity blog built with Next.js 15, Tailwind CSS, and Sanity CMS.

## 🚀 Features

- **Modern Tech Stack**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Headless CMS**: Sanity.io for content management
- **Responsive Design**: Mobile-first design with shadcn/ui components
- **Real-time Updates**: Content changes appear instantly
- **Image Optimization**: Built-in media handling with Sanity
- **SEO Ready**: Meta tags, structured data, and performance optimized

## 🏗️ Project Structure

```
SECURITY_SIP/
├── client/                    # Next.js frontend application
│   ├── app/                  # App Router pages
│   ├── components/           # Reusable UI components
│   ├── lib/                  # Utilities and Sanity client
│   ├── sanity/               # Sanity schemas and configuration
│   └── schemaTypes/          # Sanity content schemas
├── security-sip/             # Sanity Studio project
└── README.md                 # This file
```

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS 3.4.17, shadcn/ui
- **CMS**: Sanity.io
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd SECURITY_SIP
   ```

2. **Install dependencies**
   ```bash
   cd client
   npm install
   ```

3. **Set up environment variables**
   Create `client/.env.local`:
   ```env
   NEXT_PUBLIC_SANITY_PROJECT_ID=rb9cpc3o
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start Sanity Studio** (in a new terminal)
   ```bash
   cd security-sip
   npm run dev
   ```

## 🌐 Access Points

- **Frontend**: http://localhost:3000
- **Sanity Studio**: http://localhost:3333 or http://localhost:3000/studio

## 📝 Content Management

### Creating Content

1. Navigate to `/studio` in your browser
2. Use Sanity Studio to create:
   - **Posts**: Blog articles with rich content
   - **Categories**: Post categorization
   - **Tags**: Content tagging system
   - **Users**: Author profiles

### Content Types

- **Post**: Title, slug, content, excerpt, author, category, tags, status
- **Category**: Name, description, color, icon
- **User**: Name, email, bio, role, social links
- **Tag**: Name, description, color

## 🚀 Deployment

### Vercel Deployment

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
4. Deploy!

### Environment Variables

- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Your Sanity project ID
- `NEXT_PUBLIC_SANITY_DATASET`: Dataset name (usually 'production')

## 🔧 Development

### Available Scripts

```bash
# Client
npm run dev          # Start Next.js development server
npm run build        # Build for production
npm run start        # Start production server

# Sanity Studio
cd security-sip
npm run dev          # Start Sanity Studio
npm run build        # Build Sanity Studio
npm run deploy       # Deploy Sanity Studio
```

### Project Structure

- **`/`**: Homepage with latest posts
- **`/blog`**: Blog listing page
- **`/blog/[slug]`**: Individual blog post
- **`/about`**: About page
- **`/studio`**: Sanity Studio embedded

## 📚 Content Schemas

### Post Schema
- Rich text content with Portable Text
- Image support with optimization
- SEO fields (title, description, excerpt)
- Publishing workflow (draft, published)
- Reading time estimation
- Featured post support

### Category Schema
- Color-coded categories
- Icon support
- Post count tracking

## 🎨 Customization

### Styling
- Tailwind CSS classes for consistent design
- shadcn/ui components for UI elements
- Custom color schemes and typography

### Components
- Reusable UI components in `components/ui/`
- Layout components in `components/`
- Page-specific components in `app/`

## 🔍 SEO & Performance

- Meta tags and Open Graph support
- Structured data for blog posts
- Image optimization with Sanity
- Fast loading with Next.js optimizations
- Mobile-responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For questions or issues:
1. Check the [Sanity documentation](https://www.sanity.io/docs)
2. Review [Next.js documentation](https://nextjs.org/docs)
3. Open an issue in this repository

---

**Built with ❤️ using Next.js and Sanity**
