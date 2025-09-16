# Fadil's Portfolio

A modern, responsive portfolio website optimized for Cloudflare Workers and Pages deployment.

## 🚀 Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Performance Optimized**: Fast loading with efficient caching strategies
- **SEO Ready**: Proper meta tags and structured data
- **Progressive Web App**: Service worker for offline functionality
- **Cloudflare Ready**: Optimized for Cloudflare Workers and Pages deployment

## 🛠️ Technologies

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Deployment**: Cloudflare Pages & Workers
- **Performance**: Service Worker, lazy loading, optimized assets
- **Security**: Content Security Policy, security headers

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Fadil369/portfolio.git
cd portfolio
```

2. Install dependencies (optional, for Wrangler CLI):
```bash
npm install
```

3. Start local development server:
```bash
npm run dev
# or
python3 -m http.server 8000
```

4. Open http://localhost:8000 in your browser

## 🌐 Deployment

### Cloudflare Pages (Recommended)

1. **Connect to Git**:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Connect your GitHub repository
   - Select the `portfolio` repository

2. **Configure Build Settings**:
   - Build command: `echo "Static site - no build needed"`
   - Build output directory: `/` (root)
   - Root directory: `/` (root)

3. **Deploy**:
   - Click "Save and Deploy"
   - Your site will be available at `https://your-project.pages.dev`

### Cloudflare Workers (Alternative)

1. **Install Wrangler CLI**:
```bash
npm install -g wrangler
```

2. **Login to Cloudflare**:
```bash
wrangler login
```

3. **Deploy**:
```bash
npm run deploy
# or
wrangler pages deploy . --project-name=fadil-portfolio
```

### GitHub Pages (Fallback)

1. Go to repository Settings > Pages
2. Select source: Deploy from a branch
3. Select branch: `main` / `root`
4. Your site will be available at `https://fadil369.github.io/portfolio`

## 🔧 Configuration

### Custom Domain

To use a custom domain with Cloudflare Pages:

1. Add your domain in Cloudflare Pages dashboard
2. Update DNS records as instructed
3. Update `wrangler.toml` with your domain:

```toml
[[env.production.routes]]
pattern = "yourdomain.com/*"
zone_name = "yourdomain.com"
```

### Environment Variables

For production deployments, you can set environment variables in:
- Cloudflare Pages: Dashboard > Settings > Environment variables
- Cloudflare Workers: `wrangler.toml` or Dashboard

### Security Headers

The `_headers` file includes:
- Content Security Policy (CSP)
- X-Frame-Options
- X-Content-Type-Options
- Referrer Policy
- Permissions Policy

### Caching Strategy

The `_headers` file configures:
- Static assets: 1 year cache
- HTML files: 1 hour cache
- Proper cache busting for updates

## 📱 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Bundle Size**: Minimal JavaScript footprint
- **Loading Speed**: < 2s on 3G networks

## 🎨 Customization

### Colors
Update the CSS custom properties in `styles.css`:
```css
:root {
  --primary-color: #2563eb;
  --secondary-color: #fbbf24;
  --text-color: #333;
  --background-color: #fff;
}
```

### Content
Update the following files:
- `index.html`: Main content and structure
- `styles.css`: Styling and layout
- `script.js`: Interactive functionality

### Assets
Replace placeholder content:
- Add your own projects in the projects section
- Update social media links
- Add your professional photo
- Update contact information

## 🔒 Security

- Content Security Policy configured
- No inline scripts (except necessary ones marked as safe)
- Security headers for XSS protection
- HTTPS enforced through Cloudflare

## 📊 Analytics

The site is prepared for analytics integration:
- Google Analytics (add tracking code)
- Cloudflare Analytics (automatic with Pages)
- Custom event tracking implemented

## 🐛 Troubleshooting

### Common Issues

1. **Site not loading**: Check DNS propagation and Cloudflare settings
2. **Styles not applied**: Verify file paths and CDN caching
3. **JavaScript errors**: Check browser console for specific errors

### Development

1. **Local server issues**: Try different port with `python3 -m http.server 3000`
2. **File changes not reflected**: Hard refresh browser (Ctrl+F5)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📞 Contact

- **Email**: [Your Email]
- **GitHub**: [@Fadil369](https://github.com/Fadil369)
- **LinkedIn**: [Your LinkedIn]

---

**Live Demo**: [https://fadil369.github.io/portfolio](https://fadil369.github.io/portfolio)

Made with ❤️ by Fadil