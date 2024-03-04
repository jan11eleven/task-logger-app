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
          Data: 'Here is the token: ' + token,
        },
      },
      Subject: {
        Data: 'Activate your account',
      },
    },
    Source: '2.janelevensalvador@gmail.com',
  };
}
