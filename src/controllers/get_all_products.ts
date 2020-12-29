import { Request } from '@hapi/hapi';
export default ({ getAllProducts, countProducts, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const pageSize = 10;
      const { keyword, pageNumber } = request.query as any;

      const page = Number(pageNumber) || 1;

      const query = keyword
        ? {
            name: {
              $regex: keyword,
              $options: 'i',
            },
          }
        : {};
      const count = await countProducts({ query });
      const products = await getAllProducts({ query, pageSize, page });
      return { statusCode: 200, data: { products, page, pages: Math.ceil(count / pageSize) } };
    } catch (err) {
      return wrapError(err);
    }
  };
};
