import { EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

let payload: string;
let checked: string;
let send = [] as any;

console.log(send.length)

export const setCheck = async (newChecked: string) => {
    checked = newChecked
    send.push(checked)
}

export const setPayload = async (newPayload: string) => {
    payload = newPayload
    const resend = new Resend("re_epnRGCk7_8d75vXMuhc5kaBmwX8693EfK");
    
    if (send.length == 0) {
        await resend.emails.send({
            from: 'mishag.store <onboarding@resend.dev>',
            to: ['dimamabolo15@gmail.com'],
            subject: 'welcome to the store',
            react: EmailTemplate({ href: payload }),
        })
        
    }
}




