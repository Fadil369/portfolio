#!/bin/bash

echo "🔍 Validating Cloudflare deployment readiness..."
echo ""

# Check required files
echo "📁 Checking required files:"
files=("index.html" "package.json" "wrangler.toml" "_headers" "_redirects" "robots.txt" "sitemap.xml" "manifest.json")

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (missing)"
    fi
done
echo ""

# Check HTML structure
echo "🏗️ Checking HTML structure:"
if grep -q "<!DOCTYPE html>" index.html; then
    echo "✅ Valid HTML5 DOCTYPE"
else
    echo "❌ Missing HTML5 DOCTYPE"
fi

if grep -q "viewport" index.html; then
    echo "✅ Viewport meta tag present"
else
    echo "❌ Missing viewport meta tag"
fi

if grep -q "manifest.json" index.html; then
    echo "✅ Web manifest linked"
else
    echo "❌ Web manifest not linked"
fi
echo ""

# Check CSS and JS files
echo "📄 Checking assets:"
if [ -f "styles.css" ]; then
    echo "✅ CSS file present"
else
    echo "❌ CSS file missing"
fi

if [ -f "script.js" ]; then
    echo "✅ JavaScript file present"
else
    echo "❌ JavaScript file missing"
fi

if [ -f "sw.js" ]; then
    echo "✅ Service worker present"
else
    echo "❌ Service worker missing"
fi
echo ""

# Check Cloudflare configurations
echo "☁️ Checking Cloudflare configurations:"
if grep -q "name.*portfolio" wrangler.toml; then
    echo "✅ Wrangler project name configured"
else
    echo "❌ Wrangler project name not configured"
fi

if grep -q "Cache-Control" _headers; then
    echo "✅ Cache headers configured"
else
    echo "❌ Cache headers not configured"
fi

if grep -q "Content-Security-Policy" _headers; then
    echo "✅ Security headers configured"
else
    echo "❌ Security headers not configured"
fi
echo ""

# Check GitHub Actions
echo "🚀 Checking deployment workflows:"
if [ -d ".github/workflows" ]; then
    echo "✅ GitHub workflows directory present"
    if [ -f ".github/workflows/deploy.yml" ]; then
        echo "✅ Cloudflare Pages deployment workflow"
    else
        echo "❌ Cloudflare Pages deployment workflow missing"
    fi
    if [ -f ".github/workflows/pages.yml" ]; then
        echo "✅ GitHub Pages deployment workflow"
    else
        echo "❌ GitHub Pages deployment workflow missing"
    fi
else
    echo "❌ GitHub workflows directory missing"
fi
echo ""

# Check SEO essentials
echo "📈 Checking SEO essentials:"
if grep -q "description" index.html; then
    echo "✅ Meta description present"
else
    echo "❌ Meta description missing"
fi

if grep -q "og:" index.html; then
    echo "✅ Open Graph tags present"
else
    echo "❌ Open Graph tags missing"
fi

if [ -f "robots.txt" ]; then
    echo "✅ robots.txt present"
else
    echo "❌ robots.txt missing"
fi

if [ -f "sitemap.xml" ]; then
    echo "✅ sitemap.xml present"
else
    echo "❌ sitemap.xml missing"
fi
echo ""

echo "🎉 Validation complete!"
echo ""
echo "📝 Next steps for deployment:"
echo "1. Push to GitHub repository"
echo "2. Set up Cloudflare Pages project"
echo "3. Connect GitHub repository to Cloudflare Pages"
echo "4. Configure custom domain (optional)"
echo "5. Set up environment variables if needed"