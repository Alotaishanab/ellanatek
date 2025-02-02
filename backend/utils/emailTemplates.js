// /utils/emailTemplates.js

// Outer container style (clean white background with subtle shadow)
const containerStyle = `
  background: #FFFFFF;
  border-radius: 12px;
  padding: 40px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  color: #333333;
  font-family: 'Inter', sans-serif;
  text-align: center;
`;

// Inner container style for subtle content separation
const innerContainerStyle = `
  border-radius: 10px;
  padding: 30px;
  text-align: center;
`;

// Unified button style (deep purple gradient)
// Note: Hover states generally don't work in inline email CSS,
//       but we've left it here in case your ESP supports embedded styles.
const buttonStyle = `
  display: inline-block;
  padding: 14px 28px;
  background: linear-gradient(135deg, #6A0DAD, #9F2BFF);
  color: #FFFFFF;
  font-weight: 700;
  font-size: 16px;
  border: none;
  border-radius: 30px;
  cursor: pointer;
  text-decoration: none;
  transition: background 0.3s ease;
`;

// Head section with Inter font and meta tags
const headSection = (title) => `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <!-- Inter Font -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet" />
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
    <body style="margin:0; padding:40px 0; background-color:#FFFFFF; font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <!-- Brand / Title -->
                <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 700; text-transform: uppercase;">
                  شكراً لتواصلكم مع ADMOTION
                </h1>
                
                <h2 style="margin: 0 0 30px; font-size: 22px; font-weight: 400;">
                  Thank You for Contacting us.
                </h2>
  
                <!-- Inquiry Message -->
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 20px; color: #555;">
                  عزيزي العميل،<br />
                  لقد استلمنا استفسارك وسيتواصل معك فريقنا قريباً.<br /><br />
                  Dear Customer,<br />
                  We have received your inquiry and will contact you shortly.
                </p>
  
                <!-- Call to Action Button -->
                <div style="margin-top: 30px;">
                  <a href="https://www.admotionsa.com" style="text-decoration: none;" target="_blank">
                    <button style="${buttonStyle}">
                      Visit Our Website
                    </button>
                  </a>
                </div>
  
                <!-- Footer -->
                <div style="margin-top: 30px; font-size: 14px; color: #888;">
                  © 2025 ADMOTION &bull; جميع الحقوق محفوظة<br/>
                  <a href="https://www.admotionsa.com" style="color:#6A0DAD; text-decoration:none;">
                    www.admotionsa.com
                  </a> &bull;
                  Email:
                  <a href="mailto:info@admotionsa.com" style="color:#6A0DAD; text-decoration:none;">
                    info@admotionsa.com
                  </a>
                </div>
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
    <body style="margin:0; padding:40px 0; background-color:#FFFFFF; font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}; text-align: left;">
                <!-- Brand / Title -->
                <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 700; text-transform: uppercase; text-align: center;">
                  ADMOTION
                </h1>
                <h2 style="margin: 0 0 30px; font-size: 22px; font-weight: 400; text-align: center;">
                  New Contact Form Submission
                </h2>
  
                <!-- Submission Details -->
                <p style="font-size: 16px; line-height: 1.6; margin: 0 0 10px; color: #555;">
                  <strong>Name:</strong> ${senderName}<br/>
                  <strong>Email:</strong> ${senderEmail}<br/>
                  <strong>Phone:</strong> ${senderPhone}<br/>
                  <strong>Business:</strong> ${businessName}<br/>
                  <strong>Inquiry Type:</strong> ${inquiryType}
                </p>
                <p style="font-size: 16px; line-height: 1.6; margin: 10px 0 0; color: #555;">
                  <strong>Message:</strong><br/>
                  ${message}
                </p>
              </div>
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
    <body style="margin:0; padding:40px 0; background-color:#FFFFFF; font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <!-- Brand / Title -->
                <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 700; text-transform: uppercase; color: #333;">
                  ADMOTION
                </h1>
                <h2 style="margin: 0 0 30px; font-size: 22px; font-weight: 400; color: #555;">
                  ${title || 'AdMotion Update'}
                </h2>
  
                <p style="font-size: 16px; line-height: 1.6; color: #555;">
                  ${message || 'We have an update for you!'}
                </p>
              </div>
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
    <body style="margin:0; padding:40px 0; background-color:#FFFFFF; font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <!-- Brand / Title -->
                <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 700; text-transform: uppercase; color: #333;">
                  ADMOTION
                </h1>
                <h2 style="margin: 0 0 30px; font-size: 22px; font-weight: 400; color: #555;">
                  Dear ${recipientName || 'Partner'},
                </h2>
  
                <p style="font-size: 16px; line-height: 1.6; color: #555;">
                  Thank you for your interest in our services. Below is a special proposal crafted just for you.
                  We look forward to discussing it further!
                </p>
              </div>
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
    <body style="margin:0; padding:40px 0; background-color:#FFFFFF; font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <!-- Brand / Title -->
                <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 700; text-transform: uppercase; color: #333;">
                  ADMOTION
                </h1>
                <h2 style="margin: 0 0 30px; font-size: 22px; font-weight: 400; color: #555;">
                  Hello ${clientName || 'Valued Client'},
                </h2>
  
                <p style="font-size: 16px; line-height: 1.6; color: #555;">
                  We have an exciting opportunity tailored just for you!
                  Reach out today and let’s get started on taking your advertising to the next level.
                </p>
              </div>
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
