import express from 'express';
import nodemailer from 'nodemailer';
import validator from 'validator';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    if (name.trim().length < 2 || name.trim().length > 60) {
      return res.status(400).json({ success: false, message: 'Name must be between 2 and 60 characters.' });
    }
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address.' });
    }
    if (subject.trim().length < 3 || subject.trim().length > 100) {
      return res.status(400).json({ success: false, message: 'Subject must be between 3 and 100 characters.' });
    }
    if (message.trim().length < 10 || message.trim().length > 2000) {
      return res.status(400).json({ success: false, message: 'Message must be between 10 and 2000 characters.' });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailToOwner = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `📬 New Message: ${subject}`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #e5e5e5; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: white;">New Portfolio Message</h1>
            <p style="margin: 8px 0 0; color: rgba(255,255,255,0.8);">Someone wants to connect!</p>
          </div>
          <div style="padding: 32px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; color: #888; width: 90px;">Name</td><td style="padding: 10px 0; font-weight: 600;">${validator.escape(name)}</td></tr>
              <tr><td style="padding: 10px 0; color: #888;">Email</td><td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #818cf8;">${validator.escape(email)}</a></td></tr>
              <tr><td style="padding: 10px 0; color: #888;">Subject</td><td style="padding: 10px 0;">${validator.escape(subject)}</td></tr>
            </table>
            <div style="margin-top: 20px; padding: 20px; background: #1a1a1a; border-radius: 8px; border-left: 3px solid #6366f1;">
              <p style="margin: 0; line-height: 1.7;">${validator.escape(message).replace(/\n/g, '<br>')}</p>
            </div>
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; margin-top: 24px; padding: 12px 28px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Reply Now →</a>
          </div>
        </div>
      `,
    };
    const mailToSender = {
      from: `"Sagar Vashist" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Thanks for reaching out, ${name.split(' ')[0]}! 👋`,
      html: `
        <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #e5e5e5; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 32px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px; color: white;">Hey ${name.split(' ')[0]}! 👋</h1>
          </div>
          <div style="padding: 32px;">
            <p style="line-height: 1.8;">Thanks for reaching out! I've received your message and will get back to you within <strong>24–48 hours</strong>.</p>
            <div style="padding: 20px; background: #1a1a1a; border-radius: 8px; border-left: 3px solid #6366f1; margin: 20px 0;">
              <p style="margin: 0; color: #888; font-size: 14px;">Your message:</p>
              <p style="margin: 8px 0 0; line-height: 1.7;">${validator.escape(message).replace(/\n/g, '<br>')}</p>
            </div>
            <p style="line-height: 1.8;">In the meantime, feel free to check out my work:</p>
            <a href="https://sagar-folio.netlify.app" style="display: inline-block; margin-top: 8px; padding: 12px 28px; background: #6366f1; color: white; text-decoration: none; border-radius: 8px; font-weight: 600;">Visit Portfolio →</a>
            <p style="margin-top: 32px; color: #666; font-size: 14px;">– Sagar Vashist<br>Full Stack Web Developer</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailToOwner);
    await transporter.sendMail(mailToSender);

    return res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
    });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' });
  }
});

export default router;