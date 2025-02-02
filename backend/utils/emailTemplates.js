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

// Client outreach email template
function generateEmailClientsTemplate(clientName) {
  return `
  <!DOCTYPE html>
  <html>
    ${headSection('AdMotion Marketing')}
    <body style="margin:0; padding:40px 0; background-color:#FFFFFF; font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 700; text-transform: uppercase; color: #333; text-align: center;">
                  ADMOTION
                </h1>
 
                <!-- Arabic Section -->
                <div style="direction: rtl; text-align: right; margin-bottom: 40px;">
                  <h2 style="margin: 0 0 20px; font-size: 24px; color: #333;">اجعل علامتك التجارية تصل إلى كل شارع وكل منزل مع AdMotion</h2>
                  
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    تخيل علامتك التجارية تجذب كل نظرة - تلفت الأنظار في كل زاوية شارع وتضيء المنازل في جميع أنحاء المملكة العربية السعودية. في AdMotion، نقوم بتحويل الإعلانات من خلال دمج الإبداع مع التنقل. صناديق إعلانات الدراجات LED المتطورة لدينا تضمن وصول رسالتك إلى العملاء أينما كانوا.
                  </p>
 
                  <h3 style="color: #6A0DAD; margin: 20px 0;">لماذا الإعلان مع AdMotion؟</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    تحول صناديق LED المبتكرة لدينا دراجات التوصيل العادية إلى لوحات إعلانية متحركة نابضة بالحياة. سواء كنت تطلق منتجًا جديدًا، أو تروج لعرض خاص، أو تعزز تواجد علامتك التجارية، توفر AdMotion تعرضًا ومشاركة لا مثيل لهما.
                  </p>
 
                  <h3 style="color: #6A0DAD; margin: 20px 0;">رسالتك، بطريقتك</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">شاشات LED عالية الدقة مصممة لعرض:</p>
                  <ul style="padding-right: 20px; color: #555;">
                    <li>صور وفيديوهات مذهلة: اجذب الجماهير بمحتوى بصري مميز</li>
                    <li>رموز QR تفاعلية: اربط العملاء بعالمك الرقمي بسلاسة</li>
                    <li>عروض خاصة محددة زمنياً: حفز العمل الفوري من خلال العروض الحصرية</li>
                    <li>فعاليات ديناميكية: ابني الحماس لفعالياتك القادمة</li>
                  </ul>
 
                  <h3 style="color: #6A0DAD; margin: 20px 0;">المزايا التي ستستمتع بها</h3>
                  <ul style="padding-right: 20px; color: #555;">
                    <li>أقصى قدر من الرؤية: تتنقل دراجاتنا في المناطق عالية الحركة - للوصول إلى جماهير متنوعة عبر الأحياء والشوارع والمنازل</li>
                    <li>تعزيز تذكر العلامة التجارية: تميز بوجود متحرك يبقي نشاطك التجاري في ذهن العملاء</li>
                    <li>نمو سريع في الإيرادات: حفز المشاركة والتحويلات من خلال إعلانات جذابة متنقلة</li>
                    <li>وصول مستهدف: دراجات موجهة استراتيجياً توصل رسالتك مباشرة إلى جمهورك المستهدف</li>
                  </ul>
 
                  <h3 style="color: #6A0DAD; margin: 20px 0;">اجعل كل شارع منصة لعلامتك التجارية</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    مع AdMotion، علامتك التجارية لا تظهر فقط - بل تترك بصمة. تخيل عروضك الترويجية تنير الأحياء، تثير المحادثات، وتترك انطباعاً دائماً أينما ذهبت. هذا ليس مجرد إعلان؛ إنها حركة تعيد تعريف مشاركة العلامة التجارية.
                  </p>
                </div>
 
                <!-- English Section -->
                <div style="text-align: left;">
                  <h2 style="margin: 0 0 20px; font-size: 24px; color: #333;">Drive Your Brand to Every Street and Every Home with AdMotion</h2>
 
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    Imagine your brand capturing every eye—turning heads on every street corner and lighting up homes across Saudi Arabia. At AdMotion, we're transforming advertising by merging creativity with mobility. Our state‑of‑the‑art LED delivery bike ad boxes ensure your message reaches customers wherever they are.
                  </p>
 
                  <h3 style="color: #6A0DAD; margin: 20px 0;">Why Advertise with AdMotion?</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    Our innovative LED ad boxes convert ordinary delivery bikes into vibrant, mobile billboards. Whether you're launching a new product, promoting a special offer, or enhancing your brand's presence, AdMotion delivers unrivaled exposure and engagement.
                  </p>
 
                  <h3 style="color: #6A0DAD; margin: 20px 0;">Your Message, Your Way</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">Our high‑definition LED screens are designed to showcase:</p>
                  <ul style="padding-left: 20px; color: #555;">
                    <li>Stunning Photos & Videos: Captivate audiences with visually striking content</li>
                    <li>Interactive QR Codes: Seamlessly connect customers to your digital world</li>
                    <li>Time‑Sensitive Special Offers: Instantly drive action with exclusive promotions</li>
                    <li>Dynamic Event Highlights: Build excitement for your upcoming events</li>
                  </ul>
 
                  <h3 style="color: #6A0DAD; margin: 20px 0;">The Benefits You'll Enjoy</h3>
                  <ul style="padding-left: 20px; color: #555;">
                    <li>Maximum Visibility: Our bikes navigate high‑traffic areas—reaching diverse audiences across neighborhoods, streets, and homes</li>
                    <li>Enhanced Brand Recall: Stand out with a dynamic mobile presence that keeps your business top‑of‑mind</li>
                    <li>Accelerated Revenue Growth: Drive engagement and conversions with compelling on‑the‑go advertising</li>
                    <li>Targeted Reach: Strategically routed bikes deliver your message directly to your ideal audience</li>
                  </ul>
 
                  <h3 style="color: #6A0DAD; margin: 20px 0;">Make Every Street a Stage for Your Brand</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    With AdMotion, your brand doesn't just appear—it makes a statement. Visualize your promotions illuminating neighborhoods, sparking conversations, and leaving a lasting impression wherever they go. This isn't just advertising; it's a movement that redefines brand engagement.
                  </p>
                </div>
 
                <!-- CTA Button -->
                <div style="margin-top: 30px; text-align: center;">
                  <a href="mailto:info@admotionsa.com" style="${buttonStyle}">
                    Get Started Today / ابدأ اليوم
                  </a>
                </div>
 
                <!-- Footer -->
                <div style="margin-top: 30px; text-align: center; font-size: 14px; color: #888;">
                  Email: info@admotionsa.com<br>
                  Website: www.admotionsa.com<br>
                  © 2025 ADMOTION<br>
                  Business Development Team<br>
                  فريق تطوير الأعمال
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

// Proposal email template
function generateProposalTemplate(recipientName) {
  return `
  <!DOCTYPE html>
  <html>
    ${headSection('AdMotion Proposal')}
    <body style="margin:0; padding:40px 0; background-color:#FFFFFF; font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <!-- Logo -->
                <h1 style="margin: 0 0 20px; font-size: 28px; font-weight: 700; text-transform: uppercase; color: #333; text-align: center;">
                  ADMOTION
                </h1>

                <!-- Arabic Section -->
                <div style="direction: rtl; text-align: right; margin-bottom: 40px;">
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    نحن AdMotion، شركة سعودية ناشئة تُحدث نقلة نوعية في عالم الإعلانات الخارجية من خلال حل إبداعي يواكب سرعة وتطور عالم توصيل الطعام.
                  </p>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">ما نقدمه</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    تتميز صناديق التوصيل الخاصة بنا بثلاث شاشات LED عالية الوضوح تعرض الإعلانات بشكل ديناميكي ومستمر، مما يضمن وصول علامتك التجارية إلى شريحة واسعة من الجمهور.
                  </p>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">لماذا الشراكة مع AdMotion؟</h3>
                  <ul style="padding-right: 20px; color: #555;">
                    <li>رؤية فريدة: تصل إعلاناتك إلى أماكن وجماهير لا تصلها اللوحات الإعلانية التقليدية.</li>
                    <li>فرصة ربحية: ستحصل شركتكم على نسبة 15٪ (قابلة للتفاوض) من عوائد الإعلانات.</li>
                    <li>ترويج مجاني: نوفر لكم مساحة إعلانية مدتها 10 ثوانٍ مجانًا في كل دورة عرض.</li>
                    <li>حملات ديناميكية: يمكن تحديث الإعلانات بسهولة بما يتناسب مع العروض الموسمية أو الترويجية.</li>
                  </ul>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">نظامنا</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    يُعرض كل إعلان لمدة 10 ثوانٍ ويتم تكراره في دورة مدتها 90 ثانية، مما يضمن توزيعًا عادلًا لجميع المُعلنين.
                  </p>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">كيفية التعاون</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    نقترح شراكة يتم من خلالها تركيب صناديقنا على دراجاتكم النارية للتوصيل. تتولى AdMotion عملية استقطاب العملاء وإدارة الإعلانات، بينما تستفيد شركتكم من عوائد إضافية وزيادة انتشار العلامة التجارية.
                  </p>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">دعنا ننطلق معًا نحو النجاح</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    نتطلع لمناقشة فرص الشراكة وكيفية تحقيق أهداف مشتركة.
                  </p>
                </div>

                <!-- English Section -->
                <div style="text-align: left;">
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    We are AdMotion, a Saudi startup redefining outdoor advertising with a creative, high-impact solution that blends seamlessly with the fast-paced world of food delivery.
                  </p>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">What We Offer</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    Our innovative delivery boxes feature three high-definition LED screens that loop targeted advertisements, ensuring your brand gains unmatched visibility across city streets.
                  </p>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">Why Partner with AdMotion?</h3>
                  <ul style="padding-left: 20px; color: #555;">
                    <li>Unmatched Exposure: Advertisements on moving delivery motorcycles reach areas and audiences that traditional billboards miss.</li>
                    <li>Revenue Opportunity: Your company earns a negotiable 15% share of advertising revenues.</li>
                    <li>Brand Promotion: A complimentary 10-second advertising slot is included for your brand on every loop.</li>
                    <li>Dynamic Campaigns: Easily update advertisements to match ongoing promotions or seasonal themes.</li>
                  </ul>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">Our System</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    Each advertisement runs for 10 seconds, looping every 90 seconds, ensuring all nine advertisers receive equal exposure throughout the campaign.
                  </p>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">How We Collaborate</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    We propose a partnership where AdMotion equips your delivery motorcycles with our LED display boxes. AdMotion handles client acquisition and ad management, while your company benefits from additional revenue and increased brand awareness.
                  </p>

                  <h3 style="color: #6A0DAD; margin: 20px 0;">Let's Move Your Brand Forward Together</h3>
                  <p style="font-size: 16px; line-height: 1.8; color: #555;">
                    We'd love to discuss this further and explore how we can create a win-win collaboration.
                  </p>
                </div>

                <!-- CTA Button -->
                <div style="margin-top: 30px; text-align: center;">
                  <a href="mailto:info@admotionsa.com" style="${buttonStyle}">
                    Let's Collaborate / لنتعاون معاً
                  </a>
                </div>

                <!-- Footer -->
                <div style="margin-top: 30px; text-align: center; font-size: 14px; color: #888;">
                  Email: info@admotionsa.com<br>
                  Website: www.admotionsa.com<br>
                  © 2025 ADMOTION<br>
                  Business Development Team<br>
                  فريق تطوير الأعمال
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

module.exports = {
  generateEmailTemplate,
  generateProposalTemplate,
  generateEmailClientsTemplate,
  generateContactMeUserTemplate,
  generateContactMeCompanyTemplate,
};
