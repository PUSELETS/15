import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';
import nodemailer from 'nodemailer';

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

    const html = `
    <h1>hello world</h1>
    <p>is nodemailer usefull</p>
`;

    await transporter.sendMail({
        from: 'dimamabolo15@gmail.com',
        to: 'tumelo.g5900@gmail.com',
        subject: 'welcome to the store',
        html: payload && html
    })

}

// Nodemailer transporter





