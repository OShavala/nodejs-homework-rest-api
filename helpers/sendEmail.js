
const elasticemail = require('elasticemail');
require('dotenv').config();

const { ELASTICEMAIL_API_KEY } = process.env;

const client = elasticemail.createClient({
  apiKey: ELASTICEMAIL_API_KEY,
});

const sendEmail = async (data) => {
  const { to, subject, html } = data;

  try {
    const emailParams = {
      to: to,
      subject: subject,
      bodyHtml: html,
      isTransactional: true, 
    };

    const result = await client.email.send(emailParams);

    if (result.success) {
      console.log('Email sent successfully');
      return true;
    } else {
      console.error('Error sending email:', result.error);
      return false;
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
};

module.exports = sendEmail;