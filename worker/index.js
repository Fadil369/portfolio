/**
 * Cloudflare Worker for Contact Form Backend
 * Handles form submissions from fadil.brainsait.com
 */

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Handle preflight CORS requests
    if (request.method === 'OPTIONS') {
      return handleCORS();
    }

    // Only handle POST requests to /api/contact
    if (request.method !== 'POST' || url.pathname !== '/api/contact') {
      return new Response('Not Found', { status: 404 });
    }

    try {
      // Parse form data
      const formData = await request.formData();
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      // Validate required fields
      if (!name || !email || !message) {
        return corsResponse({
          success: false,
          error: 'All fields are required'
        }, 400);
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return corsResponse({
          success: false,
          error: 'Invalid email address'
        }, 400);
      }

      // Content validation
      if (name.length > 100 || email.length > 254 || message.length > 2000) {
        return corsResponse({
          success: false,
          error: 'Field content too long'
        }, 400);
      }

      // Rate limiting check (simple implementation)
      const clientIP = request.headers.get('CF-Connecting-IP') || request.headers.get('X-Forwarded-For') || 'unknown';
      const rateLimitKey = `rate_limit:${clientIP}`;

      // Check rate limit using KV store (if available)
      if (env.CONTACT_FORM_KV) {
        const lastSubmission = await env.CONTACT_FORM_KV.get(rateLimitKey);
        const now = Date.now();

        if (lastSubmission && (now - parseInt(lastSubmission)) < 60000) { // 1 minute cooldown
          return corsResponse({
            success: false,
            error: 'Please wait before submitting another message'
          }, 429);
        }

        // Store current submission time
        await env.CONTACT_FORM_KV.put(rateLimitKey, now.toString(), { expirationTtl: 300 }); // 5 minute TTL
      }

      // Prepare email data
      const emailData = {
        from: {
          email: env.FROM_EMAIL || 'noreply@brainsait.com',
          name: 'Portfolio Contact Form'
        },
        to: [{
          email: env.TO_EMAIL || 'fadil@brainsait.com',
          name: 'Dr. Mohamed El Fadil'
        }],
        subject: `Portfolio Contact: ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #1e293b 0%, #334155 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0;">
              <h2 style="margin: 0; color: #38bdf8;">New Contact Form Submission</h2>
              <p style="margin: 5px 0 0 0; opacity: 0.8;">from fadil.brainsait.com</p>
            </div>
            <div style="background: #f8fafc; padding: 20px; border-radius: 0 0 8px 8px;">
              <div style="margin-bottom: 15px;">
                <strong style="color: #1e293b;">Name:</strong><br>
                <span style="color: #374151;">${escapeHtml(name)}</span>
              </div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #1e293b;">Email:</strong><br>
                <a href="mailto:${escapeHtml(email)}" style="color: #38bdf8;">${escapeHtml(email)}</a>
              </div>
              <div style="margin-bottom: 15px;">
                <strong style="color: #1e293b;">Message:</strong><br>
                <div style="background: white; padding: 15px; border-radius: 4px; border-left: 4px solid #38bdf8; margin-top: 8px;">
                  ${escapeHtml(message).replace(/\n/g, '<br>')}
                </div>
              </div>
              <div style="margin-top: 20px; padding-top: 15px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280;">
                <p>Submitted on: ${new Date().toLocaleString()}</p>
                <p>IP Address: ${clientIP}</p>
              </div>
            </div>
          </div>
        `,
        text: `
New contact form submission from fadil.brainsait.com

Name: ${name}
Email: ${email}
Message: ${message}

Submitted on: ${new Date().toLocaleString()}
IP Address: ${clientIP}
        `.trim()
      };

      // Send email using Resend API (you can replace with your preferred service)
      if (env.RESEND_API_KEY) {
        const response = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${env.RESEND_API_KEY}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
        });

        if (!response.ok) {
          console.error('Email sending failed:', await response.text());
          throw new Error('Email sending failed');
        }
      }

      // Store submission in KV for backup/analytics (optional)
      if (env.CONTACT_FORM_KV) {
        const submissionId = `submission_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await env.CONTACT_FORM_KV.put(submissionId, JSON.stringify({
          name,
          email,
          message,
          timestamp: new Date().toISOString(),
          ip: clientIP
        }), { expirationTtl: 86400 * 30 }); // Keep for 30 days
      }

      // Return success response
      return corsResponse({
        success: true,
        message: 'Message sent successfully'
      });

    } catch (error) {
      console.error('Contact form error:', error);
      return corsResponse({
        success: false,
        error: 'Internal server error'
      }, 500);
    }
  }
};

// CORS handling
function handleCORS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept',
      'Access-Control-Max-Age': '86400'
    }
  });
}

// Create CORS-enabled response
function corsResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Accept'
    }
  });
}

// HTML escape function to prevent XSS
function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
