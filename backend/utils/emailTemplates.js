// /utils/emailTemplates.js

// A unified container style (Revolut-inspired)
// Uses a bold linear gradient, refined rounded corners, subtle shadow, and crisp white text.
const containerStyle = `
  background: linear-gradient(135deg, #6a1b9a, #8e24aa);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  color: #FFFFFF;
  font-family: 'Jost', Arial, sans-serif;
`;

// A helper constant for the common head section (including meta viewport for responsiveness)
const headSection = (title) => `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@700&family=Jost:wght@400;600&display=swap" rel="stylesheet" />
  </head>
`;

/* =========================================================================
   Contact Form Templates
   ========================================================================= */

// Template for the user (customer) "Thank You" email
function generateContactMeUserTemplate() {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('Thank You for Your Inquiry')}
    <body style="margin:0; padding:40px 0; background-color:#F4F4F4; font-family:'Jost', Arial, sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <!-- Brand / Title -->
              <h1 style="
                margin: 0 0 20px;
                font-size: 28px;
                font-family: 'JetBrains Mono', monospace;
                text-align: center;
                text-transform: uppercase;
              ">
                شكراً لتواصلكم مع ADMOTION
              </h1>
              <h2 style="
                margin: 0 0 30px;
                font-size: 20px;
                text-align: center;
                font-weight: 400;
              ">
                Thank You for Contacting ADMOTION
              </h2>
  
              <!-- Inquiry Message -->
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px; text-align: center;">
                عزيزي العميل،<br />
                لقد استلمنا استفسارك وسيتواصل معك فريقنا قريباً.<br /><br />
                Dear Customer,<br />
                We have received your inquiry and will contact you shortly.
              </p>
  
              <!-- Call to Action Button -->
              <div style="text-align: center; margin-top: 30px;">
                <a href="https://www.admotionsa.com" 
                   style="
                     display: inline-block;
                     padding: 12px 30px;
                     background: linear-gradient(135deg, #FFFFFF, #e0e0e0);
                     color: #7B1FA2;
                     font-weight: 600;
                     text-decoration: none;
                     border-radius: 6px;
                     transition: background 0.3s ease;
                   ">
                  Visit Our Website
                </a>
              </div>
  
              <!-- Footer -->
              <div style="margin-top: 30px; text-align: center; font-size: 14px;">
                © 2025 ADMOTION &bull; جميع الحقوق محفوظة<br/>
                <a href="https://www.admotionsa.com" style="color:#FFFFFF; text-decoration:none;">
                  www.admotionsa.com
                </a> &bull;
                Email:
                <a href="mailto:info@admotionsa.com" style="color:#FFFFFF; text-decoration:none;">
                  info@admotionsa.com
                </a>
              </div>
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>
  `;
}

// Template for the company notification (detailed inquiry)
function generateContactMeCompanyTemplate({ senderName, senderEmail, senderPhone, businessName, inquiryType, message }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('New Contact Form Submission')}
    <body style="margin:0; padding:40px 0; background-color:#F4F4F4; font-family:'Jost', Arial, sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <!-- Brand / Title -->
              <h1 style="
                margin: 0 0 20px;
                font-size: 28px;
                font-family: 'JetBrains Mono', monospace;
                text-align: center;
                text-transform: uppercase;
              ">
                ADMOTION
              </h1>
              <h2 style="
                margin: 0 0 30px;
                font-size: 20px;
                text-align: center;
                font-weight: 400;
              ">
                New Contact Form Submission
              </h2>
  
              <!-- Submission Details -->
              <p style="font-size: 16px; line-height: 1.6; margin: 0 0 10px;">
                <strong>Name:</strong> ${senderName}<br/>
                <strong>Email:</strong> ${senderEmail}<br/>
                <strong>Phone:</strong> ${senderPhone}<br/>
                <strong>Business:</strong> ${businessName}<br/>
                <strong>Inquiry Type:</strong> ${inquiryType}
              </p>
              <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 0;">
                <strong>Message:</strong><br/>
                ${message}
              </p>
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>
  `;
}

/* =========================================================================
   General & Marketing Email Templates
   ========================================================================= */

// Generic email template (for updates or general messages)
function generateEmailTemplate({ title, message }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('AdMotion Update')}
    <body style="margin:0; padding:40px 0; background-color:#F4F4F4; font-family:'Jost', Arial, sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <!-- Brand / Title -->
              <h1 style="
                margin: 0 0 20px;
                font-size: 28px;
                font-family: 'JetBrains Mono', monospace;
                text-align: center;
                text-transform: uppercase;
              ">
                ADMOTION
              </h1>
              <h2 style="
                margin: 0 0 30px;
                font-size: 20px;
                text-align: center;
                font-weight: 400;
              ">
                ${title || 'AdMotion Update'}
              </h2>
  
              <p style="font-size: 16px; line-height: 1.6; text-align: center;">
                ${message || 'We have an update for you!'}
              </p>
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>
  `;
}

// Proposal email template
function generateProposalTemplate(recipientName) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('AdMotion Proposal')}
    <body style="margin:0; padding:40px 0; background-color:#F4F4F4; font-family:'Jost', Arial, sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <!-- Brand / Title -->
              <h1 style="
                margin: 0 0 20px;
                font-size: 28px;
                font-family: 'JetBrains Mono', monospace;
                text-align: center;
                text-transform: uppercase;
              ">
                ADMOTION
              </h1>
              <h2 style="
                margin: 0 0 30px;
                font-size: 20px;
                text-align: center;
                font-weight: 400;
              ">
                Dear ${recipientName || 'Partner'},
              </h2>
  
              <p style="font-size: 16px; line-height: 1.6; text-align: center;">
                Thank you for your interest in our services. Below is a special proposal crafted just for you.
                We look forward to discussing it further!
              </p>
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>
  `;
}

// Client outreach email template
function generateEmailClientsTemplate(clientName) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('Exclusive Opportunity')}
    <body style="margin:0; padding:40px 0; background-color:#F4F4F4; font-family:'Jost', Arial, sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <!-- Brand / Title -->
              <h1 style="
                margin: 0 0 20px;
                font-size: 28px;
                font-family: 'JetBrains Mono', monospace;
                text-align: center;
                text-transform: uppercase;
              ">
                ADMOTION
              </h1>
              <h2 style="
                margin: 0 0 30px;
                font-size: 20px;
                text-align: center;
                font-weight: 400;
              ">
                Hello ${clientName || 'Valued Client'},
              </h2>
  
              <p style="font-size: 16px; line-height: 1.6; text-align: center;">
                We have an exciting opportunity tailored just for you!
                Reach out today and let’s get started on taking your advertising to the next level.
              </p>
            </td>
          </tr>
        </table>
      </center>
    </body>
  </html>
  `;
}
  
module.exports = {
  generateEmailTemplate,
  generateProposalTemplate,
  generateEmailClientsTemplate,
  generateContactMeUserTemplate,
  generateContactMeCompanyTemplate,
};
