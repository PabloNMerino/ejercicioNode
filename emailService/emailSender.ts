import nodemailer from 'nodemailer';

export const sendEmail = async (to: string, subject: string, text: string) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com', // Puedes cambiar esto según el servicio SMTP que utilices
            port: 587, // Puerto SMTP
            secure: false, // true para puerto 465, falso para otros puertos
            auth: {
              user: process.env.SMTP_USER, // Tu correo electrónico
              pass: process.env.SMTP_PASSWORD, // Tu contraseña o App Password
            },
          })


        const mailOptions = {
            from: process.env.SMTP_USER, // Dirección de envío
            to, // Destinatario
            subject, // Asunto del correo
            text, // Cuerpo del correo en formato de texto plano
          };

        const info = await transporter.sendMail(mailOptions);

          console.log('Correo enviado: %s', info.messageId);
        } catch (error) {
          console.error('Error enviando el correo: ', error);
        }
}
