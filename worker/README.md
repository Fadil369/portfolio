# Contact Form Worker Setup

This directory contains the Cloudflare Worker that handles contact form submissions from the portfolio site.

## Quick Start

1. **Deploy the Worker:**

   ```bash
   cd worker
   ./deploy.sh
   ```

2. **Set up secrets:**

   ```bash
   # Set your email service API key (using Resend as example)
   wrangler secret put RESEND_API_KEY

   # Set destination email
   wrangler secret put TO_EMAIL

   # Set from email (optional)
   wrangler secret put FROM_EMAIL
   ```

3. **Optional: Set up KV storage for rate limiting:**

   ```bash
   wrangler kv:namespace create CONTACT_FORM_KV
   # Update wrangler.toml with the returned namespace ID
   ```

## Environment Variables

| Variable | Required | Description | Default |
|----------|----------|-------------|---------|
| `RESEND_API_KEY` | Yes | API key for Resend email service | - |
| `TO_EMAIL` | No | Destination email address | `fadil@brainsait.com` |
| `FROM_EMAIL` | No | From email address | `noreply@brainsait.com` |

## Features

- ✅ Form validation (required fields, email format, length limits)
- ✅ Rate limiting (1 minute cooldown per IP)
- ✅ CORS support for cross-origin requests
- ✅ HTML email formatting with BrainSAIT branding
- ✅ XSS protection with HTML escaping
- ✅ Optional KV storage for submissions backup
- ✅ Detailed error handling and logging

## API Endpoint

**POST** `/api/contact`

**Request Body** (form-data):

- `name` (string, required, max 100 chars)
- `email` (string, required, valid email, max 254 chars)
- `message` (string, required, max 2000 chars)

**Response** (JSON):

```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

**Error Response**:

```json
{
  "success": false,
  "error": "Error description"
}
```

## Testing

✅ **Worker is deployed and functional at**: `https://contact-form.dr-mf-12298.workers.dev`

Test the deployed worker:

```bash
curl -X POST https://contact-form.dr-mf-12298.workers.dev/api/contact \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "name=Test User&email=test@example.com&message=This is a test message"
```

**Expected Response:**

```json
{"success":true,"message":"Message sent successfully"}
```

## Email Service Setup

### Using Resend (Recommended)

1. Sign up at [resend.com](https://resend.com)
2. Get your API key from the dashboard
3. Set the secret: `wrangler secret put RESEND_API_KEY`

### Using Other Services

You can modify the email sending code in `index.js` to use other services like:

- SendGrid
- Mailgun
- Postmark
- Gmail API

## Rate Limiting

The worker implements basic rate limiting:

- 1 submission per minute per IP address
- Uses KV storage (optional) to track submission times
- Returns 429 status for rate-limited requests

## Security Features

- CORS headers configured for your domain
- Input validation and sanitization
- HTML escaping to prevent XSS
- Rate limiting to prevent spam
- No sensitive data in logs

## Monitoring

- All errors are logged to Cloudflare Workers logs
- Submission data can be stored in KV for analytics
- Email delivery status is logged

## Custom Domain (Optional)

To use a custom domain like `contact.fadil.workers.dev`:

1. Add the route in `wrangler.toml`:

   ```toml
   [env.production.routes]
   pattern = "contact.fadil.workers.dev/*"
   ```

2. Update the CSP in your Pages `_headers` file
3. Update the form endpoint in `index.html`
