// /utils/emailTemplates.js

// Modern gradient backgrounds inspired by Airbnb x Revolut
const modernGradient = `linear-gradient(135deg, #FF385C 0%, #E91E63 25%, #9C27B0 50%, #673AB7 75%, #3F51B5 100%)`;
const subtleGradient = `linear-gradient(135deg, #667eea 0%, #764ba2 100%)`;
const cleanGradient = `linear-gradient(135deg, #f093fb 0%, #f5576c 100%)`;

// Outer container style with modern aesthetic
const containerStyle = `
  background: linear-gradient(135deg, #fafafa 0%, #ffffff 100%);
  border-radius: 20px;
  padding: 48px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08), 0 8px 20px rgba(0, 0, 0, 0.04);
  color: #1a1a1a;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
`;

// Inner container with subtle glass morphism
const innerContainerStyle = `
  background: rgba(255, 255, 255, 0.7);
  border-radius: 16px;
  padding: 36px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(20px);
`;

// Sexy gradient button with hover effects
const buttonStyle = `
  display: inline-block;
  padding: 16px 32px;
  background: ${modernGradient};
  color: #FFFFFF;
  font-weight: 600;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 8px 32px rgba(255, 56, 92, 0.3);
  letter-spacing: 0.5px;
  text-transform: uppercase;
  position: relative;
  overflow: hidden;
`;

// Secondary button style
const secondaryButtonStyle = `
  display: inline-block;
  padding: 14px 28px;
  background: transparent;
  color: #667eea;
  font-weight: 600;
  font-size: 15px;
  border: 2px solid #667eea;
  border-radius: 50px;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  margin: 0 8px;
`;

// Modern header with enhanced typography
const headerStyle = `
  margin: 0 0 12px;
  font-size: 32px;
  font-weight: 800;
  background: ${modernGradient};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.5px;
  line-height: 1.2;
`;

// Subtitle style
const subtitleStyle = `
  margin: 0 0 32px;
  font-size: 18px;
  font-weight: 400;
  color: #6b7280;
  line-height: 1.5;
`;

// Enhanced head section with modern fonts
const headSection = (title) => `
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />
    <style>
      @media (max-width: 600px) {
        .container { padding: 24px !important; }
        .inner-container { padding: 24px !important; }
        .header { font-size: 28px !important; }
      }
    </style>
  </head>
`;

/* =========================================================================
   Contact Form Templates - Enhanced
   ========================================================================= */

function generateContactMeUserTemplate() {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('Thank You for Your Inquiry')}
    <body style="margin:0; padding:40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-family:'Inter', sans-serif; min-height: 100vh;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}" class="container">
              <div style="${innerContainerStyle}" class="inner-container">
                <!-- Modern Brand Header -->
                <div style="margin-bottom: 40px;">
                  <h1 style="${headerStyle}" class="header">ADMOTION</h1>
                  <div style="width: 60px; height: 4px; background: ${modernGradient}; margin: 16px auto; border-radius: 2px;"></div>
                </div>
  
                <!-- Bilingual Headlines -->
                <h2 style="margin: 0 0 8px; font-size: 24px; font-weight: 700; color: #1a1a1a;">
                  شكراً للتواصل معنا
                </h2>
                <h2 style="${subtitleStyle}">
                  Thank You for Reaching Out
                </h2>
  
                <!-- Enhanced Message -->
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 12px; padding: 24px; margin: 32px 0; border: 1px solid rgba(255, 255, 255, 0.4);">
                  <p style="font-size: 16px; line-height: 1.7; margin: 0 0 16px; color: #374151;">
                    <strong>عزيزي العميل،</strong><br />
                    لقد استلمنا استفسارك وسيتواصل معك فريقنا المختص خلال 24 ساعة.
                  </p>
                  <p style="font-size: 16px; line-height: 1.7; margin: 0; color: #374151;">
                    <strong>Dear Customer,</strong><br />
                    We've received your inquiry and our specialized team will contact you within 24 hours.
                  </p>
                </div>
  
                <!-- CTA Buttons -->
                <div style="margin: 40px 0;">
                  <a href="https://www.admotionsa.com" style="${buttonStyle}" target="_blank">
                    Visit Our Website
                  </a>
                  <br><br>
                  <a href="mailto:info@admotionsa.com" style="${secondaryButtonStyle}" target="_blank">
                    Contact Us Directly
                  </a>
                </div>
  
                <!-- Modern Footer -->
                <div style="margin-top: 48px; padding-top: 24px; border-top: 1px solid rgba(0,0,0,0.1);">
                  <p style="font-size: 14px; color: #6b7280; margin: 0 0 8px;">
                    © 2025 ADMOTION • جميع الحقوق محفوظة
                  </p>
                  <p style="font-size: 14px; margin: 0;">
                    <a href="https://www.admotionsa.com" style="color:#667eea; text-decoration:none; font-weight: 500;">
                      www.admotionsa.com
                    </a> • 
                    <a href="mailto:info@admotionsa.com" style="color:#667eea; text-decoration:none; font-weight: 500;">
                      info@admotionsa.com
                    </a>
                  </p>
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

function generateContactMeCompanyTemplate({ senderName, senderEmail, senderPhone, businessName, inquiryType, message }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('New Contact Form Submission')}
    <body style="margin:0; padding:40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}; text-align: left;">
                <!-- Header -->
                <div style="text-align: center; margin-bottom: 32px;">
                  <h1 style="${headerStyle}">ADMOTION</h1>
                  <h2 style="margin: 0; font-size: 20px; font-weight: 600; color: #374151;">
                    New Contact Form Submission
                  </h2>
                </div>
  
                <!-- Contact Details Card -->
                <div style="background: rgba(255, 255, 255, 0.9); border-radius: 12px; padding: 24px; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.5);">
                  <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 18px; font-weight: 600;">Contact Information</h3>
                  <div style="display: grid; gap: 8px;">
                    <p style="font-size: 15px; margin: 0; color: #374151;"><strong>Name:</strong> ${senderName}</p>
                    <p style="font-size: 15px; margin: 0; color: #374151;"><strong>Email:</strong> <a href="mailto:${senderEmail}" style="color: #667eea;">${senderEmail}</a></p>
                    <p style="font-size: 15px; margin: 0; color: #374151;"><strong>Phone:</strong> <a href="tel:${senderPhone}" style="color: #667eea;">${senderPhone}</a></p>
                    <p style="font-size: 15px; margin: 0; color: #374151;"><strong>Business:</strong> ${businessName}</p>
                    <p style="font-size: 15px; margin: 0; color: #374151;"><strong>Inquiry Type:</strong> <span style="background: ${subtleGradient}; color: white; padding: 4px 12px; border-radius: 20px; font-size: 13px;">${inquiryType}</span></p>
                  </div>
                </div>
  
                <!-- Message Card -->
                <div style="background: rgba(255, 255, 255, 0.9); border-radius: 12px; padding: 24px; border: 1px solid rgba(255, 255, 255, 0.5);">
                  <h3 style="margin: 0 0 16px; color: #1f2937; font-size: 18px; font-weight: 600;">Message</h3>
                  <p style="font-size: 15px; line-height: 1.6; margin: 0; color: #374151; background: #f9fafb; padding: 16px; border-radius: 8px; border-left: 4px solid #667eea;">
                    ${message}
                  </p>
                </div>
  
                <!-- Action Buttons -->
                <div style="text-align: center; margin-top: 32px;">
                  <a href="mailto:${senderEmail}" style="${buttonStyle}">
                    Reply to ${senderName}
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

/* =========================================================================
   Enhanced Marketing Email Templates
   ========================================================================= */

function generateEmailTemplate({ title, message }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('AdMotion Update')}
    <body style="margin:0; padding:40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <h1 style="${headerStyle}">ADMOTION</h1>
                <h2 style="${subtitleStyle}">${title || 'Important Update'}</h2>
  
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 12px; padding: 24px; margin: 24px 0;">
                  <p style="font-size: 16px; line-height: 1.7; color: #374151; margin: 0;">
                    ${message || 'We have an exciting update to share with you!'}
                  </p>
                </div>
  
                <a href="https://www.admotionsa.com" style="${buttonStyle}" target="_blank">
                  Learn More
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

function generateEmailClientsTemplate(clientName) {
  return `
  <!DOCTYPE html>
  <html>
    ${headSection('Transform Your Brand with AdMotion')}
    <body style="margin:0; padding:40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:700px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <!-- Hero Header -->
                <div style="margin-bottom: 48px;">
                  <h1 style="${headerStyle}">ADMOTION</h1>
                  <div style="width: 80px; height: 4px; background: ${modernGradient}; margin: 20px auto; border-radius: 2px;"></div>
                </div>
 
                <!-- Arabic Section with Modern Cards -->
                <div style="direction: rtl; text-align: right; margin-bottom: 60px;">
                  <div style="background: rgba(255, 255, 255, 0.9); border-radius: 16px; padding: 32px; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.5);">
                    <h2 style="margin: 0 0 20px; font-size: 28px; color: #1a1a1a; font-weight: 700;">اجعل علامتك التجارية تصل إلى كل شارع وكل منزل</h2>
                    
                    <p style="font-size: 17px; line-height: 1.8; color: #374151; margin: 0;">
                      تخيل علامتك التجارية تجذب كل نظرة - تلفت الأنظار في كل زاوية شارع وتضيء المنازل في جميع أنحاء المملكة العربية السعودية. في AdMotion، نقوم بتحويل الإعلانات من خلال دمج الإبداع مع التنقل.
                    </p>
                  </div>
 
                  <!-- Feature Cards -->
                  <div style="display: grid; gap: 16px; margin: 32px 0;">
                    <div style="background: ${subtleGradient}; color: white; border-radius: 12px; padding: 20px;">
                      <h3 style="color: white; margin: 0 0 12px; font-size: 20px;">لماذا الإعلان مع AdMotion؟</h3>
                      <p style="font-size: 16px; line-height: 1.7; margin: 0; opacity: 0.95;">
                        تحول صناديق LED المبتكرة لدينا دراجات التوصيل العادية إلى لوحات إعلانية متحركة نابضة بالحياة.
                      </p>
                    </div>
 
                    <div style="background: ${cleanGradient}; color: white; border-radius: 12px; padding: 20px;">
                      <h3 style="color: white; margin: 0 0 12px; font-size: 20px;">رسالتك، بطريقتك</h3>
                      <ul style="padding-right: 0; margin: 0; list-style: none;">
                        <li style="margin-bottom: 8px;">✨ صور وفيديوهات مذهلة</li>
                        <li style="margin-bottom: 8px;">📱 رموز QR تفاعلية</li>
                        <li style="margin-bottom: 8px;">⏰ عروض خاصة محددة زمنياً</li>
                        <li>🎯 فعاليات ديناميكية</li>
                      </ul>
                    </div>
                  </div>
                </div>
 
                <!-- English Section with Modern Design -->
                <div style="text-align: left; margin-bottom: 48px;">
                  <div style="background: rgba(255, 255, 255, 0.9); border-radius: 16px; padding: 32px; margin-bottom: 24px; border: 1px solid rgba(255, 255, 255, 0.5);">
                    <h2 style="margin: 0 0 20px; font-size: 28px; color: #1a1a1a; font-weight: 700;">Drive Your Brand to Every Street</h2>
 
                    <p style="font-size: 17px; line-height: 1.8; color: #374151; margin: 0;">
                      Imagine your brand capturing every eye—turning heads on every street corner and lighting up homes across Saudi Arabia. At AdMotion, we're transforming advertising by merging creativity with mobility.
                    </p>
                  </div>
 
                  <!-- Benefits Grid -->
                  <div style="display: grid; gap: 16px; margin: 32px 0;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 20px;">
                      <h3 style="color: white; margin: 0 0 12px; font-size: 20px;">Maximum Visibility</h3>
                      <p style="font-size: 16px; line-height: 1.7; margin: 0; opacity: 0.95;">
                        Our bikes navigate high‑traffic areas—reaching diverse audiences across neighborhoods, streets, and homes.
                      </p>
                    </div>
 
                    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 20px;">
                      <h3 style="color: white; margin: 0 0 12px; font-size: 20px;">Enhanced Brand Recall</h3>
                      <p style="font-size: 16px; line-height: 1.7; margin: 0; opacity: 0.95;">
                        Stand out with a dynamic mobile presence that keeps your business top‑of‑mind.
                      </p>
                    </div>
                  </div>
                </div>
 
                <!-- Dual CTA Buttons -->
                <div style="margin: 48px 0; text-align: center;">
                  <a href="mailto:info@admotionsa.com" style="${buttonStyle}">
                    Get Started Today
                  </a>
                  <br><br>
                  <a href="https://www.admotionsa.com" style="${secondaryButtonStyle}" target="_blank">
                    View Our Portfolio
                  </a>
                </div>
 
                <!-- Enhanced Footer -->
                <div style="margin-top: 48px; padding: 24px; background: rgba(255, 255, 255, 0.6); border-radius: 12px; text-align: center;">
                  <div style="margin-bottom: 16px;">
                    <a href="mailto:info@admotionsa.com" style="color: #667eea; text-decoration: none; font-weight: 600; margin: 0 16px;">📧 info@admotionsa.com</a>
                    <a href="https://www.admotionsa.com" style="color: #667eea; text-decoration: none; font-weight: 600; margin: 0 16px;">🌐 www.admotionsa.com</a>
                  </div>
                  <p style="font-size: 14px; color: #6b7280; margin: 0;">
                    © 2025 ADMOTION • Business Development Team • فريق تطوير الأعمال
                  </p>
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

function generateProposalTemplate(recipientName) {
  return `
  <!DOCTYPE html>
  <html>
    ${headSection('Strategic Partnership Proposal - AdMotion')}
    <body style="margin:0; padding:40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:700px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <!-- Modern Header -->
                <div style="margin-bottom: 48px; text-align: center;">
                  <h1 style="${headerStyle}">ADMOTION</h1>
                  <div style="width: 100px; height: 4px; background: ${modernGradient}; margin: 20px auto; border-radius: 2px;"></div>
                  <p style="font-size: 18px; color: #6b7280; margin: 0; font-weight: 500;">Strategic Partnership Proposal</p>
                </div>

                <!-- Arabic Partnership Section -->
                <div style="direction: rtl; text-align: right; margin-bottom: 60px;">
                  <!-- Introduction Card -->
                  <div style="background: ${subtleGradient}; color: white; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
                    <h2 style="color: white; margin: 0 0 16px; font-size: 24px; font-weight: 700;">شراكة استراتيجية مع AdMotion</h2>
                    <p style="font-size: 17px; line-height: 1.8; margin: 0; opacity: 0.95;">
                      نحن AdMotion، شركة سعودية ناشئة تُحدث نقلة نوعية في عالم الإعلانات الخارجية من خلال حل إبداعي يواكب سرعة وتطور عالم توصيل الطعام.
                    </p>
                  </div>

                  <!-- What We Offer -->
                  <div style="background: rgba(255, 255, 255, 0.9); border-radius: 16px; padding: 28px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.5);">
                    <h3 style="color: #1a1a1a; margin: 0 0 16px; font-size: 22px; font-weight: 700;">ما نقدمه</h3>
                    <p style="font-size: 16px; line-height: 1.8; color: #374151; margin: 0;">
                      تتميز صناديق التوصيل الخاصة بنا بثلاث شاشات LED عالية الوضوح تعرض الإعلانات بشكل ديناميكي ومستمر، مما يضمن وصول علامتك التجارية إلى شريحة واسعة من الجمهور.
                    </p>
                  </div>

                  <!-- Partnership Benefits -->
                  <div style="background: ${cleanGradient}; color: white; border-radius: 16px; padding: 28px; margin-bottom: 20px;">
                    <h3 style="color: white; margin: 0 0 20px; font-size: 22px; font-weight: 700;">مزايا الشراكة</h3>
                    <div style="display: grid; gap: 12px;">
                      <div style="background: rgba(255, 255, 255, 0.2); padding: 16px; border-radius: 8px;">
                        <strong>💰 عائد ربحي:</strong> نسبة 15٪ من عوائد الإعلانات (قابلة للتفاوض)
                      </div>
                      <div style="background: rgba(255, 255, 255, 0.2); padding: 16px; border-radius: 8px;">
                        <strong>🎯 ترويج مجاني:</strong> مساحة إعلانية 10 ثوانٍ مجانًا في كل دورة
                      </div>
                      <div style="background: rgba(255, 255, 255, 0.2); padding: 16px; border-radius: 8px;">
                        <strong>🚀 رؤية فريدة:</strong> وصول لأماكن لا تصلها الإعلانات التقليدية
                      </div>
                    </div>
                  </div>

                  <!-- System Overview -->
                  <div style="background: rgba(255, 255, 255, 0.9); border-radius: 16px; padding: 28px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.5);">
                    <h3 style="color: #1a1a1a; margin: 0 0 16px; font-size: 22px; font-weight: 700;">نظامنا المتطور</h3>
                    <p style="font-size: 16px; line-height: 1.8; color: #374151; margin: 0;">
                      يُعرض كل إعلان لمدة 10 ثوانٍ ويتم تكراره في دورة مدتها 90 ثانية، مما يضمن توزيعًا عادلًا ووصولاً أمثل لجميع المُعلنين.
                    </p>
                  </div>
                </div>

                <!-- English Partnership Section -->
                <div style="text-align: left; margin-bottom: 48px;">
                  <!-- Partnership Value -->
                  <div style="background: ${subtleGradient}; color: white; border-radius: 16px; padding: 32px; margin-bottom: 24px;">
                    <h2 style="color: white; margin: 0 0 16px; font-size: 24px; font-weight: 700;">Strategic Partnership Opportunity</h2>
                    <p style="font-size: 17px; line-height: 1.8; margin: 0; opacity: 0.95;">
                      We are AdMotion, a Saudi startup redefining outdoor advertising with a creative, high-impact solution that blends seamlessly with the fast-paced world of food delivery.
                    </p>
                  </div>

                  <!-- Partnership Model -->
                  <div style="background: rgba(255, 255, 255, 0.9); border-radius: 16px; padding: 28px; margin-bottom: 20px; border: 1px solid rgba(255, 255, 255, 0.5);">
                    <h3 style="color: #1a1a1a; margin: 0 0 16px; font-size: 22px; font-weight: 700;">Our Partnership Model</h3>
                    <p style="font-size: 16px; line-height: 1.8; color: #374151; margin: 0;">
                      We propose a partnership where AdMotion equips your delivery motorcycles with our LED display boxes. AdMotion handles client acquisition and ad management, while your company benefits from additional revenue streams and increased brand awareness.
                    </p>
                  </div>

                  <!-- Benefits Grid -->
                  <div style="display: grid; gap: 16px; margin: 24px 0;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; padding: 20px;">
                      <h4 style="color: white; margin: 0 0 8px; font-size: 18px;">🎯 Unmatched Exposure</h4>
                      <p style="font-size: 15px; line-height: 1.6; margin: 0; opacity: 0.95;">Moving advertisements reach areas and audiences that traditional billboards miss.</p>
                    </div>
                    <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; border-radius: 12px; padding: 20px;">
                      <h4 style="color: white; margin: 0 0 8px; font-size: 18px;">💰 Revenue Opportunity</h4>
                      <p style="font-size: 15px; line-height: 1.6; margin: 0; opacity: 0.95;">Earn a negotiable 15% share of advertising revenues with minimal effort.</p>
                    </div>
                  </div>

                  <!-- Call to Action -->
                  <div style="background: rgba(255, 255, 255, 0.9); border-radius: 16px; padding: 28px; text-align: center; border: 1px solid rgba(255, 255, 255, 0.5);">
                    <h3 style="color: #1a1a1a; margin: 0 0 16px; font-size: 22px; font-weight: 700;">Let's Move Forward Together</h3>
                    <p style="font-size: 16px; line-height: 1.8; color: #374151; margin: 0 0 24px;">
                      We'd love to discuss this partnership opportunity and explore how we can create mutual success.
                    </p>
                  </div>
                </div>

                <!-- Dual CTA Section -->
                <div style="margin: 48px 0; text-align: center;">
                  <a href="mailto:info@admotionsa.com" style="${buttonStyle}">
                    Let's Collaborate
                  </a>
                  <br><br>
                  <a href="https://calendly.com/admotionsa" style="${secondaryButtonStyle}" target="_blank">
                    Schedule a Meeting
                  </a>
                </div>

                <!-- Enhanced Footer -->
                <div style="margin-top: 48px; padding: 24px; background: rgba(255, 255, 255, 0.6); border-radius: 12px; text-align: center;">
                  <div style="margin-bottom: 16px;">
                    <a href="mailto:info@admotionsa.com" style="color: #667eea; text-decoration: none; font-weight: 600; margin: 0 16px;">📧 info@admotionsa.com</a>
                    <a href="https://www.admotionsa.com" style="color: #667eea; text-decoration: none; font-weight: 600; margin: 0 16px;">🌐 www.admotionsa.com</a>
                  </div>
                  <p style="font-size: 14px; color: #6b7280; margin: 0;">
                    © 2025 ADMOTION • Business Development Team • فريق تطوير الأعمال
                  </p>
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

/* =========================================================================
   Enhanced Ad Status Templates
   ========================================================================= */

// Ad pending review template
function generateAdPendingTemplate(user, file) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('Ad Submitted for Review')}
    <body style="margin:0; padding:40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <h1 style="${headerStyle}">ADMOTION</h1>
                <div style="width: 60px; height: 4px; background: ${modernGradient}; margin: 16px auto 32px; border-radius: 2px;"></div>
                
                <div style="background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%); color: white; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                  <h2 style="color: white; margin: 0 0 12px; font-size: 22px; font-weight: 700;">⏳ Under Review</h2>
                  <p style="font-size: 16px; line-height: 1.7; margin: 0; opacity: 0.95;">
                    Hi ${user}, your creative <strong>${file}</strong> has been successfully uploaded and is currently pending review.
                  </p>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 12px; padding: 20px; margin-bottom: 32px;">
                  <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0;">
                    📋 Our team will review your submission within 24 hours<br>
                    ✅ You'll receive an email notification once it's approved<br>
                    🚀 Then you can schedule your campaign to go live
                  </p>
                </div>
                
                <a href="https://dashboard.admotionsa.com" style="${secondaryButtonStyle}" target="_blank">
                  View Dashboard
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

// Admin notification template
function generateAdminPendingTemplate(file, uploader) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('New Ad Awaiting Approval')}
    <body style="margin:0; padding:40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <h1 style="${headerStyle}">ADMOTION</h1>
                <h2 style="margin: 0 0 32px; font-size: 20px; font-weight: 600; color: #6b7280;">Admin Notification</h2>
                
                <div style="background: ${modernGradient}; color: white; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                  <h3 style="color: white; margin: 0 0 12px; font-size: 22px; font-weight: 700;">🔔 New Submission</h3>
                  <p style="font-size: 16px; line-height: 1.7; margin: 0; opacity: 0.95;">
                    A new ad (<strong>${file}</strong>) from <em>${uploader}</em> is awaiting your approval.
                  </p>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 12px; padding: 20px; margin-bottom: 32px;">
                  <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0;">
                    📁 <strong>File:</strong> ${file}<br>
                    👤 <strong>Uploaded by:</strong> ${uploader}<br>
                    🕐 <strong>Submitted:</strong> ${new Date().toLocaleString()}
                  </p>
                </div>
                
                <a href="https://admin.admotionsa.com/review" style="${buttonStyle}" target="_blank">
                  Review Now
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

// Ad approved template
function generateAdApprovedTemplate(user, file) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('Ad Approved - Ready to Launch!')}
    <body style="margin:0; padding:40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <h1 style="${headerStyle}">ADMOTION</h1>
                <div style="width: 60px; height: 4px; background: ${modernGradient}; margin: 16px auto 32px; border-radius: 2px;"></div>
                
                <div style="background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                  <h2 style="color: white; margin: 0 0 12px; font-size: 22px; font-weight: 700;">🎉 Approved!</h2>
                  <p style="font-size: 16px; line-height: 1.7; margin: 0; opacity: 0.95;">
                    Excellent news, ${user}! Your ad <strong>${file}</strong> has been approved and is ready to be scheduled.
                  </p>
                </div>
                
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 12px; padding: 20px; margin-bottom: 32px;">
                  <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0;">
                    ✅ Quality check passed<br>
                    📅 Ready for campaign scheduling<br>
                    🚀 Launch whenever you're ready
                  </p>
                </div>
                
                <div style="text-align: center;">
                  <a href="https://dashboard.admotionsa.com/schedule" style="${buttonStyle}" target="_blank">
                    Schedule Campaign
                  </a>
                  <br><br>
                  <a href="https://dashboard.admotionsa.com" style="${secondaryButtonStyle}" target="_blank">
                    View Dashboard
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

// Ad rejected template
function generateAdRejectedTemplate(user, file, reason = '') {
  return `
  <!DOCTYPE html>
  <html lang="en">
    ${headSection('Ad Review Update')}
    <body style="margin:0; padding:40px 20px; background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%); font-family:'Inter', sans-serif;">
      <center>
        <table width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;">
          <tr>
            <td style="${containerStyle}">
              <div style="${innerContainerStyle}">
                <h1 style="${headerStyle}">ADMOTION</h1>
                <div style="width: 60px; height: 4px; background: ${modernGradient}; margin: 16px auto 32px; border-radius: 2px;"></div>
                
                <div style="background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); color: white; border-radius: 16px; padding: 24px; margin-bottom: 24px;">
                  <h2 style="color: white; margin: 0 0 12px; font-size: 22px; font-weight: 700;">⚠️ Revision Needed</h2>
                  <p style="font-size: 16px; line-height: 1.7; margin: 0; opacity: 0.95;">
                    Hi ${user}, your ad <strong>${file}</strong> requires some adjustments before it can be approved.
                  </p>
                </div>
                
                ${reason ? `
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 12px; padding: 20px; margin-bottom: 24px; border-left: 4px solid #ef4444;">
                  <h3 style="margin: 0 0 8px; color: #1f2937; font-size: 16px; font-weight: 600;">Reason for Revision:</h3>
                  <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0;">${reason}</p>
                </div>
                ` : ''}
                
                <div style="background: rgba(255, 255, 255, 0.8); border-radius: 12px; padding: 20px; margin-bottom: 32px;">
                  <p style="font-size: 15px; line-height: 1.6; color: #374151; margin: 0;">
                    📝 Please make the necessary adjustments<br>
                    🔄 Re-upload your revised creative<br>
                    💬 Contact support if you need assistance
                  </p>
                </div>
                
                <div style="text-align: center;">
                  <a href="https://dashboard.admotionsa.com/upload" style="${buttonStyle}" target="_blank">
                    Upload Revised Ad
                  </a>
                  <br><br>
                  <a href="mailto:support@admotionsa.com" style="${secondaryButtonStyle}" target="_blank">
                    Contact Support
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

/* =========================================================================
   Module Exports
   ========================================================================= */

module.exports = {
  // Core templates
  generateEmailTemplate,
  generateProposalTemplate,
  generateEmailClientsTemplate,
  generateContactMeUserTemplate,
  generateContactMeCompanyTemplate,
  
  // Enhanced ad status templates
  generateAdPendingTemplate,
  generateAdminPendingTemplate,
  generateAdApprovedTemplate,
  generateAdRejectedTemplate,
  
  // Legacy template functions for backward compatibility
  adPending: (user, file) => generateAdPendingTemplate(user, file),
  adminPending: (file, uploader) => generateAdminPendingTemplate(file, uploader),
  adApproved: (user, file) => generateAdApprovedTemplate(user, file),
  adRejected: (user, file, reason) => generateAdRejectedTemplate(user, file, reason)
};