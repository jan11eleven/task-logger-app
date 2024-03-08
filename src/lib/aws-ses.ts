// ses.ts

import { SES } from 'aws-sdk';

const ses = new SES({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export const sendEmail = async (params: SES.SendEmailRequest) => {
  try {
    const result = await ses.sendEmail(params).promise();
    console.log('Email sent successfully:', result);
    return result;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};
