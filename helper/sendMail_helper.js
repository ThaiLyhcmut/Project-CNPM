const nodemailer = require('nodemailer');

module.exports.sendMail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    host: 's129d209.emailserver.vn',
    port: 465,
    secure: true, // use false for STARTTLS; true for SSL on port 465
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    }
  });
  

  const otpHtml = `
  <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f7f8fa;
        }
        .container {
          max-width: 600px;
          margin: 50px auto;
          background-color: #fff;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          color: #333;
          font-size: 24px;
          margin-bottom: 20px;
        }
        .otp-box {
          font-size: 32px;
          font-weight: bold;
          letter-spacing: 5px;
          background-color: #f3f4f6;
          padding: 10px;
          border-radius: 5px;
          text-align: center;
          color: #333;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
          margin: 20px 0;
        }
        .footer {
          text-align: center;
          font-size: 14px;
          color: #777;
          margin-top: 30px;
        }
        .contact-footer {
          text-align: center;
          font-size: 12px;
          color: #888;
          margin-top: 30px;
        }
        .contact-footer p {
          margin: 5px 0;
        }
        .contact-footer a {
          color: #007bff;
          text-decoration: none;
        }
        .contact-footer a:hover {
          text-decoration: underline;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>Đây là mã OTP của bạn</h2>
        </div>
        <div class="otp-box">
          ${text}
        </div>
        <div class="footer">
          <p>Đây là mã OTP duy nhất và có hiệu lực trong 5 phút.</p>
          <p>Chúc bạn thành công!</p>
        </div>
      </div>
      <div class="contact-footer">
        <p>Thiết kế bởi <strong>ThaiLy</strong></p>
        <p>Liên hệ với chúng tôi qua email: <a href="mailto:admin@thaily.id.vn">admin@thaily.id.vn</a></p>
      </div>
    </body>
  </html>
`;

  // Configure the mailoptions object
  const mailOptions = {
    from: `"ThaiLy" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: subject,
    html: otpHtml
  };
  // Send the email
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log('Error:', error);
    } else {
      console.log('Email sent: ', info.response);
    }
  });
}