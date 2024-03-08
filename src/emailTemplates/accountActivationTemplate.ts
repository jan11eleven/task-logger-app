import getConfig from 'next/config';

const { publicRuntimeConfig } = getConfig();

export default function accountActivationTemplate(
  email: string,
  token: string
) {
  return {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data:
            'Click the link to verify your email: ' +
            publicRuntimeConfig.BASE_URL +
            '/users/activate/' +
            token,
        },
      },
      Subject: {
        Data: 'Activate your account',
      },
    },
    Source: '2.janelevensalvador@gmail.com',
  };
}
