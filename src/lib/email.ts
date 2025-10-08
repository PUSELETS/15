import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import nodemailer, { Transporter } from 'nodemailer';

let payload: string;
let checked: string;
let send = [] as any;

export const setCheck = async (newChecked: string) => {
    checked = newChecked
    send.push(checked)
}

export const setPayload = async (newPayload: string) => {
    payload = newPayload

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: 'dimamabolo15@gmail.com',
        to: 'dimamabolo15@gmail.com',
        subject: 'welcome to the store',
        html: `
          <h1>Hello World</h1>
          <p>Is Nodemailer useful?</p>
        `
    };

    try {
        const result = await  transporter.sendMail(mailOptions);
        console.log('Email sent:', result.response);
        return { message: 'Email sent successfully', result: result.response };
    } catch (error) {
        console.error('Email send error:', error);
        throw new Error('Failed to send email: ' + (error as Error).message);
    }

}

// Nodemailer transporter





