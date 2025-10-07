import nodemailer from "nodemailer";
import { emailTemplate } from "./contactEmailTemplate";

const { GOOGLE_APP_PASS, SENDER_EMAIL_ADDRESS, RECIVER_EMAIL_ADDRESS } = process.env;

interface Contact {
  name: string;
  phone: string;
  vehicle: string;
  date: string;
  additional?: string;
}

export const sendContactEmail = async (subject: string, data: Contact): Promise<void> => {
  if (!SENDER_EMAIL_ADDRESS || !GOOGLE_APP_PASS || !RECIVER_EMAIL_ADDRESS) {
    throw new Error("Missing required environment variables");
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: SENDER_EMAIL_ADDRESS,
      pass: GOOGLE_APP_PASS,
    },
  });

  const mailOptions = {
    from: {
      name: "EHD Detailing Website",
      address: SENDER_EMAIL_ADDRESS,
    },
    to: RECIVER_EMAIL_ADDRESS.split(",").map((email) => email.trim()).join(","),
    subject: subject.toString(),
    html: emailTemplate(data),
  };

  await transporter.sendMail(mailOptions as nodemailer.SendMailOptions);
};