require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('better-sqlite3');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Basic Rate-Limiting to Prevent DDoS
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.',
});
app.use(limiter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// SQLite Database Setup
const db = sqlite3('contacts.db');

// Create contacts table if it doesn't exist
db.prepare(`
  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT,
    lastName TEXT,
    email TEXT,
    phoneNumber TEXT,
    businessName TEXT,
    inquiryType TEXT,
    message TEXT,
    isUnsubscribed INTEGER DEFAULT 0,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`).run();

// Add 'isUnsubscribed' column if it doesn't exist
try {
  db.prepare(`
    ALTER TABLE contacts 
    ADD COLUMN isUnsubscribed INTEGER DEFAULT 0
  `).run();
} catch (err) {
  if (!err.message.includes('duplicate column name')) {
    throw err;
  }
}

// OAuth2 Configuration
const oAuth2Client = new google.auth.OAuth2(
  process.env.OAUTH_CLIENT_ID,
  process.env.OAUTH_CLIENT_SECRET,
  process.env.OAUTH_REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: process.env.OAUTH_REFRESH_TOKEN });

// Create nodemailer transporter
async function createTransporter() {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    return nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.COMPANY_EMAIL,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });
  } catch (error) {
    console.error('Error creating transporter:', error);
    throw error;
  }
}

// JWT Authentication Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'Access token missing' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid access token' });
    }
    req.user = user;
    next();
  });
}

/*
  1) generateEmailTemplate (auto-response or simple update)
*/
function generateEmailTemplate({ title, message }) {
  return `
<!DOCTYPE html>
<html lang="ar" dir="ltr">
<head>
    <meta charset="UTF-8" />
    <title>AdMotion Bilingual</title>
</head>
<body style="margin:0; padding:0; background:#0F061F; font-family: 'Montserrat', Arial, sans-serif; color:#FFFFFF;">
    
    <!-- Main Container -->
    <center style="width: 100%;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:680px;">
            
            <!-- Hero Section -->
            <tr>
                <td style="padding:50px 20px; background:linear-gradient(135deg,#2A0948 0%,#1A0630 100%); text-align:center;">
                    <h1 style="margin:0; font-size:42px; font-weight:800; background:linear-gradient(90deg,#FF6BFF,#985BFF); -webkit-background-clip:text; -webkit-text-fill-color:transparent; letter-spacing:-1px;">
                        AdMotion
                    </h1>
                    <p style="color:#D0B4FF; font-size:18px; margin:20px 0 30px; line-height:1.4;">
                        Mobile Advertising Revolution /<br>ثورة في الإعلان المتحرك
                    </p>
                    <a href="mailto:info@admotionsa.com" style="display:inline-block; padding:16px 45px; background:linear-gradient(90deg,#985BFF 0%,#702B80 100%); color:#FFF; font-weight:600; border-radius:30px; text-decoration:none; box-shadow:0 8px 24px rgba(152,91,255,0.3); transition:transform 0.3s;">
                        Schedule Meeting / جدولة اجتماع
                    </a>
                </td>
            </tr>

            <!-- Arabic Content -->
            <tr>
                <td style="padding:50px 30px; direction:rtl; text-align:right; background:#160A25; border-bottom:1px solid #24133A;">
                    <div style="max-width:560px; margin:0 auto;">
                        <h2 style="color:#FFF; font-size:28px; margin:0 0 30px; padding-bottom:15px; border-bottom:2px solid #985BFF;">
                            مرحباً بك في AdMotion
                        </h2>
                        <div style="color:#E8E0FF; line-height:1.8; font-size:16px;">
                            <p style="margin:0 0 25px; color:#FFFFFF;">
                              <strong>مرحباً بك يا ${title.replace('Welcome, ', '').replace('!', '')}!</strong>
                            </p>
                            <p style="margin:0 0 25px; color:#FFFFFF;">
                              شكراً لتواصلك مع AdMotion. لقد تلقينا رسالتك وسنرد عليك قريباً.
                            </p>

                            <h3 style="color:#985BFF; font-size:20px; margin:25px 0 15px;">ما نقدمه</h3>
                            <p style="margin:0 0 25px; color:#FFFFFF;">
                                تتميز صناديق التوصيل الخاصة بنا بثلاث شاشات LED عالية الوضوح تعرض الإعلانات بشكل ديناميكي ومستمر، 
                                مما يضمن وصول علامتك التجارية إلى شريحة واسعة من الجمهور.
                            </p>
                        </div>
                    </div>
                </td>
            </tr>

            <!-- English Content -->
            <tr>
                <td style="padding:50px 30px; background:#1A0F2E;">
                    <div style="max-width:560px; margin:0 auto;">
                        <h2 style="color:#FFF; font-size:28px; margin:0 0 30px; padding-bottom:15px; border-bottom:2px solid #985BFF;">
                            Welcome to AdMotion
                        </h2>
                        <div style="color:#E8E0FF; line-height:1.8; font-size:16px;">
                            <p style="margin:0 0 25px; color:#FFFFFF;">
                              ${title} ${message}
                            </p>
                            
                            <h3 style="color:#985BFF; font-size:20px; margin:25px 0 15px;">What We Offer</h3>
                            <p style="margin:0 0 25px; color:#FFFFFF;">
                              Our innovative delivery boxes feature three high-definition LED screens that loop targeted advertisements, ensuring your brand gains unmatched visibility across city streets.
                            </p>
                        </div>
                    </div>
                </td>
            </tr>

            <!-- CTA Section -->
            <tr>
                <td style="padding:60px 20px; text-align:center; background:linear-gradient(135deg,#2A0948 0%,#1A0630 100%);">
                    <div style="max-width:560px; margin:0 auto;">
                        <h3 style="color:#FFF; font-size:24px; margin:0 0 20px;">Ready to Transform Your Advertising?</h3>
                        <p style="color:#D0B4FF; font-size:18px; margin:0 0 30px;">Contact us today to schedule a partnership meeting</p>
                        <a href="https://www.admotionsa.com" style="display:inline-block; padding:16px 45px; background:#FFFFFF; color:#702B80; font-weight:600; border-radius:30px; text-decoration:none; box-shadow:0 8px 24px rgba(255,255,255,0.2);">
                            Get Started Now
                        </a>
                    </div>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="padding:40px 20px; text-align:center; background:#0D0619;">
                    <div style="max-width:560px; margin:0 auto;">
                        <p style="color:#927FBF; font-size:14px; line-height:1.6; margin:0;">
                            © 2025 AdMotion • Khobar, Saudi Arabia<br>
                            <a href="mailto:info@admotionsa.com" style="color:#BFA3FF; text-decoration:none;">info@admotionsa.com</a><br>
                            www.admotionsa.com
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

/*
  2) generateProposalTemplate (for your bilingual proposal).
  You will call this from /send-email if user typed "Proposal" in subject 
  or any other condition you want.
*/
function generateProposalTemplate(recipientName) {
  // We'll insert the recipientName in the Arabic "عزيزي/عزيزتي" and in the English "Dear [Recipient's Name]"
  // The user typed the "Message" field in the dashboard with the name, 
  // so you can pass that string here as "recipientName".
  return `
<!DOCTYPE html>
<html lang="ar" dir="ltr">
<head>
    <meta charset="UTF-8" />
    <title>AdMotion Bilingual Proposal</title>
</head>
<body style="margin:0; padding:0; background:#0F061F; font-family: 'Montserrat', Arial, sans-serif; color:#FFFFFF;">
    
    <!-- Main Container -->
    <center style="width: 100%;">
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width:680px;">
            
            <!-- Hero Section -->
            <tr>
                <td style="padding:50px 20px; background:linear-gradient(135deg,#2A0948 0%,#1A0630 100%); text-align:center;">
                    <h1 style="margin:0; font-size:42px; font-weight:800; background:linear-gradient(90deg,#FF6BFF,#985BFF); -webkit-background-clip:text; -webkit-text-fill-color:transparent; letter-spacing:-1px;">
                        AdMotion
                    </h1>
                    <p style="color:#D0B4FF; font-size:18px; margin:20px 0 30px; line-height:1.4;">
                        Mobile Advertising Revolution /<br>ثورة في الإعلان المتحرك
                    </p>
                    <a href="mailto:info@admotionsa.com" style="display:inline-block; padding:16px 45px; background:linear-gradient(90deg,#985BFF 0%,#702B80 100%); color:#FFF; font-weight:600; border-radius:30px; text-decoration:none; box-shadow:0 8px 24px rgba(152,91,255,0.3); transition:transform 0.3s;">
                        Schedule Meeting / جدولة اجتماع
                    </a>
                </td>
            </tr>

            <!-- Arabic Content -->
            <tr>
                <td style="padding:50px 30px; direction:rtl; text-align:right; background:#160A25; border-bottom:1px solid #24133A;">
                    <div style="max-width:560px; margin:0 auto;">
                        <h2 style="color:#FFF; font-size:28px; margin:0 0 30px; padding-bottom:15px; border-bottom:2px solid #985BFF;">
‎                            ثورة جديدة في الإعلانات مع تقنية AdMotion المتطورة
                        </h2>
                        <div style="color:#E8E0FF; line-height:1.8; font-size:16px;">
                            <p style="margin:0 0 25px;">عزيزي/عزيزتي ${recipientName}،</p>
                            <p style="margin:0 0 25px;">نحن <strong style="color:#FF6BFF;">AdMotion</strong>، شركة سعودية ناشئة تُحدث نقلة نوعية في عالم الإعلانات الخارجية من خلال حل إبداعي يواكب سرعة وتطور عالم توصيل الطعام.</p>
                            
                            <h3 style="color:#985BFF; font-size:20px; margin:25px 0 15px;">ما نقدمه</h3>
                            <p style="margin:0 0 25px;">تتميز صناديق التوصيل الخاصة بنا بثلاث شاشات LED عالية الوضوح تعرض الإعلانات بشكل ديناميكي ومستمر، مما يضمن وصول علامتك التجارية إلى شريحة واسعة من الجمهور.</p>
                            
                            <h3 style="color:#985BFF; font-size:20px; margin:25px 0 15px;">لماذا الشراكة مع AdMotion؟</h3>
                            <ul style="list-style:none; padding:0; margin:0 0 25px;">
                                <li style="padding:12px 0; border-bottom:1px solid #24133A;">✓ رؤية فريدة: تصل إعلاناتك إلى أماكن وجماهير لا تصلها اللوحات الإعلانية التقليدية</li>
                                <li style="padding:12px 0; border-bottom:1px solid #24133A;">✓ فرصة ربحية: نسبة 15% (قابلة للتفاوض) من عوائد الإعلانات</li>
                                <li style="padding:12px 0; border-bottom:1px solid #24133A;">✓ ترويج مجاني: 10 ثوانٍ إعلانية مجانًا في كل دورة عرض</li>
                                <li style="padding:12px 0;">✓ حملات ديناميكية: تحديث الإعلانات حسب العروض الموسمية</li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>

            <!-- English Content -->
            <tr>
                <td style="padding:50px 30px; background:#1A0F2E;">
                    <div style="max-width:560px; margin:0 auto;">
                        <h2 style="color:#FFF; font-size:28px; margin:0 0 30px; padding-bottom:15px; border-bottom:2px solid #985BFF;">
                            Revolutionize Advertising with AdMotion
                        </h2>
                        <div style="color:#E8E0FF; line-height:1.8; font-size:16px;">
                            <p style="margin:0 0 25px;">Dear ${recipientName},</p>
                            <p style="margin:0 0 25px;">We are <strong style="color:#FF6BFF;">AdMotion</strong>, a Saudi startup redefining outdoor advertising with a creative, high-impact solution that blends seamlessly with the fast-paced world of food delivery.</p>
                            
                            <h3 style="color:#985BFF; font-size:20px; margin:25px 0 15px;">What We Offer</h3>
                            <p style="margin:0 0 25px;">Our innovative delivery boxes feature three high-definition LED screens that loop targeted advertisements, ensuring your brand gains unmatched visibility across city streets.</p>
                            
                            <h3 style="color:#985BFF; font-size:20px; margin:25px 0 15px;">Why Partner with AdMotion?</h3>
                            <ul style="list-style:none; padding:0; margin:0 0 25px;">
                                <li style="padding:12px 0; border-bottom:1px solid #24133A;">✓ Unmatched Exposure: Reach areas traditional billboards miss</li>
                                <li style="padding:12px 0; border-bottom:1px solid #24133A;">✓ Revenue Opportunity: 15% negotiable revenue share</li>
                                <li style="padding:12px 0; border-bottom:1px solid #24133A;">✓ Brand Promotion: Free 10-second ad slot per loop</li>
                                <li style="padding:12px 0;">✓ Dynamic Campaigns: Update ads for seasonal promotions</li>
                            </ul>
                        </div>
                    </div>
                </td>
            </tr>

            <!-- CTA Section -->
            <tr>
                <td style="padding:60px 20px; text-align:center; background:linear-gradient(135deg,#2A0948 0%,#1A0630 100%);">
                    <div style="max-width:560px; margin:0 auto;">
                        <h3 style="color:#FFF; font-size:24px; margin:0 0 20px;">Ready to Transform Your Advertising?</h3>
                        <p style="color:#D0B4FF; font-size:18px; margin:0 0 30px;">Contact us today to schedule a partnership meeting</p>
                        <a href="mailto:info@admotionsa.com" style="display:inline-block; padding:16px 45px; background:#FFFFFF; color:#702B80; font-weight:600; border-radius:30px; text-decoration:none; box-shadow:0 8px 24px rgba(255,255,255,0.2); transition:transform 0.3s;">
                            Get Started Now
                        </a>
                    </div>
                </td>
            </tr>

            <!-- Footer -->
            <tr>
                <td style="padding:40px 20px; text-align:center; background:#0D0619;">
                    <div style="max-width:560px; margin:0 auto;">
                        <p style="color:#927FBF; font-size:14px; line-height:1.6; margin:0;">
                            © 2024 AdMotion • Riyadh, Saudi Arabia<br>
                            <a href="mailto:info@admotionsa.com" style="color:#BFA3FF; text-decoration:none;">info@admotionsa.com</a><br>
                            +966 55 123 4567 • www.admotionsa.com
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

// Login Endpoint
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  // Basic validation
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  // Check username
  if (username !== process.env.ADMIN_USERNAME) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Check password vs hashed
  try {
    const match = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Create token
    const token = jwt.sign(
      { username: process.env.ADMIN_USERNAME },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    res.json({ token });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Contact Form Endpoint
app.post('/api/contact', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, businessName, inquiryType, message } = req.body;

  try {
    // Insert into DB
    db.prepare(`
      INSERT INTO contacts 
      (firstName, lastName, email, phoneNumber, businessName, inquiryType, message)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(firstName, lastName, email, phoneNumber, businessName, inquiryType, message);

    const transporter = await createTransporter();

    // Auto-response to user
    const userMailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: email,
      subject: 'Welcome to AdMotion',
      html: generateEmailTemplate({
        title: `Welcome, ${firstName}!`,
        message: "Thank you for reaching out to AdMotion. We've received your message and will respond shortly.",
      }),
    };

    // Notification to company
    const companyMailOptions = {
      from: process.env.COMPANY_EMAIL,
      to: process.env.COMPANY_EMAIL,
      subject: 'New Contact Form Submission',
      html: generateEmailTemplate({
        title: 'New Contact Submission',
        message: `
          <strong>Name:</strong> ${firstName} ${lastName}<br>
          <strong>Email:</strong> ${email}<br>
          <strong>Phone:</strong> ${phoneNumber}<br>
          <strong>Business:</strong> ${businessName}<br>
          <strong>Inquiry Type:</strong> ${inquiryType}<br>
          <strong>Message:</strong> ${message}
        `,
      }),
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(companyMailOptions);

    res.send('Message received and emails sent');
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal server error');
  }
});

// Protected routes
const protectedRoutes = express.Router();
protectedRoutes.use(authenticateToken);

// Get All Contacts w/ filtering
protectedRoutes.get('/contacts', (req, res) => {
  try {
    const { inquiryType, businessName } = req.query;
    let query = 'SELECT * FROM contacts WHERE 1=1';
    const params = [];

    if (inquiryType) {
      query += ' AND inquiryType = ?';
      params.push(inquiryType);
    }
    if (businessName) {
      query += ' AND businessName LIKE ?';
      params.push(`%${businessName}%`);
    }

    query += ' ORDER BY createdAt DESC';

    const contacts = db.prepare(query).all(...params);
    res.json(contacts);
  } catch (error) {
    console.error('Error fetching contacts:', error);
    res.status(500).send('Internal server error');
  }
});

// Unsubscribe endpoint
protectedRoutes.post('/unsubscribe', (req, res) => {
  const { clientId } = req.body;
  if (!clientId) {
    return res.status(400).json({ message: 'Client ID is required' });
  }

  try {
    const result = db.prepare('UPDATE contacts SET isUnsubscribed = 1 WHERE id = ?').run(clientId);
    if (result.changes === 0) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json({ message: 'Client unsubscribed successfully' });
  } catch (error) {
    console.error('Error unsubscribing client:', error);
    res.status(500).send('Internal server error');
  }
});

/*
   /send-email 
   We check if subject has "proposal" in it. 
   If yes => use generateProposalTemplate,
   passing the "message" field as the "recipientName" inside the function. 
   If no => default to generateEmailTemplate.
*/
protectedRoutes.post('/send-email', async (req, res) => {
  const { clientIds, emails, subject, customMessage } = req.body;

  // Must have either client IDs or direct emails
  if ((!clientIds || clientIds.length === 0) && (!emails || emails.length === 0)) {
    return res.status(400).json({ message: 'At least one clientId or email is required' });
  }

  try {
    const transporter = await createTransporter();

    let recipientEmails = [];

    // Gather from DB if clientIds exist
    if (clientIds && clientIds.length > 0) {
      const placeholders = clientIds.map(() => '?').join(',');
      const query = `SELECT email, firstName FROM contacts WHERE id IN (${placeholders}) AND isUnsubscribed = 0`;
      const clients = db.prepare(query).all(...clientIds);

      if (clients.length === 0) {
        return res.status(404).json({ message: 'No valid clients found or all unsubscribed' });
      }
      clients.forEach((c) =>
        recipientEmails.push({ email: c.email, firstName: c.firstName })
      );
    }

    // If direct emails were typed in
    if (emails && emails.length > 0) {
      emails.forEach((email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
          recipientEmails.push({ email, firstName: '' });
        }
      });
    }

    if (recipientEmails.length === 0) {
      return res.status(400).json({ message: 'No valid email addresses provided' });
    }

    // Remove duplicates
    recipientEmails = recipientEmails.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.email.toLowerCase() === item.email.toLowerCase())
    );

    // We'll interpret "customMessage" as the "recipientName" if it's a proposal
    const isProposal = subject && subject.toLowerCase().includes('proposal');

    // Send each
    const sendPromises = recipientEmails.map(async (r) => {
      let htmlContent;
      if (isProposal) {
        // Use the new proposal template
        // Pass the "customMessage" as the "recipientName" 
        // or fallback to r.firstName if customMessage is empty
        const nameToUse = customMessage || r.firstName || 'Partner';
        htmlContent = generateProposalTemplate(nameToUse);
      } else {
        // Default to existing template
        htmlContent = generateEmailTemplate({
          title: subject || 'AdMotion Update',
          message: customMessage || 'We have an update for you!',
        });
      }

      const mailOptions = {
        from: process.env.COMPANY_EMAIL,
        to: r.email,
        subject: subject || 'AdMotion Update',
        html: htmlContent,
      };

      await transporter.sendMail(mailOptions);
    });

    await Promise.all(sendPromises);
    res.send('Emails sent successfully');
  } catch (err) {
    console.error('Error sending emails:', err);
    res.status(500).send('Internal server error');
  }
});

// Use Protected Routes
app.use('/api', protectedRoutes);

// Start server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
