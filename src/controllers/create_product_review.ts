import { Request } from '@hapi/hapi';
export default ({ updateProductById, getProduct, generateCustomError, wrapError }: any) => {
  return async (request: Request) => {
    try {
      const { id: _id } = request.params;
      const { _id: userId, name } = request.auth.credentials;
      const { rating, comment } = request.payload as any;
      const product = await getProduct({ _id: request.params.id });
      if (!product) {
        throw generateCustomError('Product not found', 404);
      }
      const alreadyReviewed = product.reviews.find((r: any) => r.user.toString() === (userId as any).toString());

      if (alreadyReviewed) {
        throw generateCustomError('Product already reviewed', 400);
      }

      const NewReviews = [
        {
          name,
          rating: Number(rating),
          comment,
          user: userId,
        },
        ...product.reviews,
      ];

      await updateProductById({
        _id,
        dataToUpdate: {
          user: userId,
          reviews: NewReviews,
          numReviews: NewReviews.length,
          rating: NewReviews.reduce((acc, item) => item.rating + acc, 0) / NewReviews.length,
        },
      });

      return {
        statusCode: 200,
        data: { message: 'Review added successfully.' },
      };
    } catch (err) {
      throw wrapError(err);
    }
  };
};
