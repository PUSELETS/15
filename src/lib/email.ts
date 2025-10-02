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
            user: 'dimamabolo15@gmail.com',
            pass: 'auaexnmptialivld',
        },
    });

    const html = `
    <h1>hello world</h1>
    <p>is nodemailer usefull</p>
`;

    await transporter.sendMail({
        from: 'dimamabolo15@gmail.com',
        to: 'dimamabolo15@gmail.com',
        subject: 'welcome to the store',
        html: payload && html
    })

}

// Nodemailer transporter





