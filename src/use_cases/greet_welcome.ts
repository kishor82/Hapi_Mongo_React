export default () => {
  return () => {
    return `Welcome ${process.env.USER}`;
  };
};
