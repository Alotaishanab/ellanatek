// /utils/emailTemplates.js

function generateEmailTemplate({ title, message }) {
    return `
      <!DOCTYPE html>
      <html lang="ar" dir="ltr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AdMotion Bilingual</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body style="margin:0; padding:0; background:#0F061F; font-family: 'Montserrat', Arial, sans-serif; color:#FFFFFF;">
        <center style="width: 100%;">
          <table width="100%" style="max-width:680px;">
            <tr>
              <td style="padding:50px 20px; text-align:center;">
                <h1>${title}</h1>
                <p>${message}</p>
              </td>
            </tr>
          </table>
        </center>
      </body>
      </html>`;
  }
  
  function generateProposalTemplate(recipientName) {
    return `
      <!DOCTYPE html>
      <html lang="ar" dir="ltr">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>AdMotion Proposal</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body style="margin:0; padding:0; background:#0F061F; font-family: 'Montserrat', Arial, sans-serif; color:#FFFFFF;">
        <center style="width: 100%;">
          <table width="100%" style="max-width:680px;">
            <tr>
              <td style="padding:50px 20px; text-align:center;">
                <h1>Dear ${recipientName},</h1>
                <p>We are excited to present our proposal...</p>
              </td>
            </tr>
          </table>
        </center>
      </body>
      </html>`;
  }
  
  function generateEmailClientsTemplate(clientName) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Exclusive Opportunity for You</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body style="margin:0; padding:0; background:#0F061F; font-family: 'Montserrat', Arial, sans-serif; color:#FFFFFF;">
        <center style="width: 100%;">
          <table width="100%" style="max-width:680px;">
            <tr>
              <td style="padding:50px 20px; text-align:center;">
                <h1>Hello ${clientName},</h1>
                <p>We have an exciting opportunity tailored just for you! Reach out today and let's get started.</p>
              </td>
            </tr>
          </table>
        </center>
      </body>
      </html>`;
  }
  
  /**
   * Generates an email template for a new "Contact Me" request.
   *
   * @param {Object} params - The parameters for the email.
   * @param {string} params.senderName - The name of the sender.
   * @param {string} params.senderEmail - The email address of the sender.
   * @param {string} params.senderPhone - The phone number of the sender.
   * @param {string} params.message - The message from the sender.
   * @returns {string} - The HTML email template.
   */
  function generateContactMeEmailTemplate({ senderName, senderEmail, senderPhone, message }) {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Request</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap" rel="stylesheet" />
      </head>
      <body style="margin:0; padding:0; background:#0F061F; font-family: 'Montserrat', Arial, sans-serif; color:#FFFFFF;">
        <center style="width: 100%;">
          <table width="100%" style="max-width:680px;">
            <tr>
              <td style="padding:50px 20px; text-align:center;">
                <h1>New Contact Request</h1>
                <p><strong>Name:</strong> ${senderName}</p>
                <p><strong>Email:</strong> ${senderEmail}</p>
                <p><strong>Phone:</strong> ${senderPhone}</p>
                <p><strong>Message:</strong><br />${message}</p>
              </td>
            </tr>
          </table>
        </center>
      </body>
      </html>`;
  }
  
  module.exports = { 
    generateEmailTemplate, 
    generateProposalTemplate, 
    generateEmailClientsTemplate,
    generateContactMeEmailTemplate 
  };
  