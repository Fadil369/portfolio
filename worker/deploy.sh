#!/bin/bash

# Cloudflare Worker Deployment Script
# This script deploys the contact form Worker to Cloudflare

echo "🚀 Deploying Contact Form Worker to Cloudflare..."

# Change to worker directory
cd "$(dirname "$0")" || exit 1

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check authentication
echo "🔐 Checking Cloudflare authentication..."
if ! wrangler whoami &> /dev/null; then
    echo "❌ Not authenticated with Cloudflare. Please run 'wrangler login' first."
    exit 1
fi

# Deploy the worker
echo "📦 Deploying Worker..."
wrangler deploy

echo "✅ Worker deployed successfully!"
echo ""
echo "🔧 Next steps:"
echo "1. Set up secrets (if not already done):"
echo "   wrangler secret put RESEND_API_KEY"
echo "   wrangler secret put TO_EMAIL"
echo "   wrangler secret put FROM_EMAIL"
echo ""
echo "2. Optional: Set up KV namespace for rate limiting:"
echo "   wrangler kv:namespace create CONTACT_FORM_KV"
echo "   Then update wrangler.toml with the namespace ID"
echo ""
echo "3. Test the endpoint:"
echo "   curl -X POST https://contact-form.YOUR_SUBDOMAIN.workers.dev/api/contact \\"
echo "     -H 'Content-Type: application/x-www-form-urlencoded' \\"
echo "     -d 'name=Test&email=test@example.com&message=Test message'"
echo ""
echo "🌐 Your Worker should be available at: https://contact-form.YOUR_SUBDOMAIN.workers.dev"
