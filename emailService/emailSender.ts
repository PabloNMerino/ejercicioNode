import nodemailer from 'nodemailer';
import { createRegistrationEmail } from "./emailTemplates"
import { minify } from 'html-minifier-terser';


  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
      },
  });


export const sendWelcomeEmail = async (recipientEmail: string, username: string) => {
  const htmlContent = createRegistrationEmail(username);
  const minifiedHtml = await minify(htmlContent, {
      collapseWhitespace: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true,
  });

  const mailOptions = {
      from: process.env.SMTP_USER,
      to: recipientEmail,
      subject: `¡Bienvenido a ${username}!`,
      html: minifiedHtml,
  };

  try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Correo enviado:', info.response);
  } catch (error) {
      console.error('Error enviando el correo:', error);
  }
};
