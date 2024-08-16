const dotenv = require('dotenv');
dotenv.config();

module.exports = {
    companyEmail: process.env.COMPANY_EMAIL,
    recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
    oauthClientId: process.env.OAUTH_CLIENT_ID,
    oauthClientSecret: process.env.OAUTH_CLIENT_SECRET,
    oauthRedirectUri: process.env.OAUTH_REDIRECT_URI,
    oauthRefreshToken: process.env.OAUTH_REFRESH_TOKEN
};
