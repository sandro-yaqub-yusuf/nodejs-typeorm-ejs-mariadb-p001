import nodemailer from 'nodemailer';

interface IContactInstance {
    name: string;
    email: string;
    message: string;
}

class HomeService {
    public async sendEmail(contactData: IContactInstance): Promise<boolean | undefined> {
        if (!process.env.EMAIL_SMTP) return false;

        const transport = nodemailer.createTransport({
            host: process.env.EMAIL_SMTP,
            port: parseInt(process.env.EMAIL_PORT as string),
            auth: {
                user: process.env.EMAIL_AUTH_USER,
                pass: process.env.EMAIL_AUTH_PWD
            }
        });

        transport.sendMail({
            from: `${contactData.name} <${contactData.email}>`,
            to: process.env.EMAIL_AUTH_USER,
            subject: 'FALE CONOSCO',
            html: contactData.message
        }).then(() => {
            return true;
        }).catch(error => {
            throw new Error(error);
        });
    }
}

export default new HomeService();
