export default ({ getTopProducts, wrapError }: any) => {
  return async () => {
    try {
      const topLimit = 3;
      const products = await getTopProducts({ topLimit });
      return { statusCode: 200, data: products };
    } catch (err) {
      return wrapError(err);
    }
  };
};