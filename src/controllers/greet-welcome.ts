export default ({ greetWelcome }: any) => {
  return async () => {
    const message = greetWelcome();
    return { statusCode: 200, data: { message } };
  };
};
