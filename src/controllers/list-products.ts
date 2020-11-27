export default ({ listProducts, wrapError }: any) => {
  return async () => {
    try {
      const products = await listProducts();
      return { statusCode: 200, data: products };
    } catch (err) {
      return wrapError(err);
    }
  };
};
