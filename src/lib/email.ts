import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';


let payload: string;
let checked: string;
let send = [] as any;

export const setCheck = async (newChecked: string) => {
    checked = newChecked
    send.push(checked)
}


export const setPayload = async (newPayload: string) => {
    payload = newPayload

    const resend = new Resend('re_ZehTqohJ_LjS2KiTTw4etb9Z4p34x3Nhi');

    await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: ['dimamabolo15@gmail.com'],
        subject: 'hello world',
        html: '<p>it works!</p>',
    });

}

// Nodemailer transporter





