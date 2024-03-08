// Example usage in a Next.js page or component

import { sendEmail } from '../lib/aws-ses';
import { SES } from 'aws-sdk';
import accountActivationTemplate from '../emailTemplates/accountActivationTemplate';

export default async function sendActivationEmailToUser(
  email: string,
  token: string
) {
  const params: SES.SendEmailRequest = accountActivationTemplate(email, token);

  try {
    await sendEmail(params);
  } catch (error) {
    throw new Error('Error in sending email');
  }
}
