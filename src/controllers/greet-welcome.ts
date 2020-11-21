export default ({ greetWelcome }: any) => {
  return async (_request: any) => {
    const message = greetWelcome();
    return { statusCode: 200, data: { message } };
  };
};
