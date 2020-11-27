import { ProductCollection } from '../data-access/types';
export default ({ productCollection }: { productCollection: ProductCollection }) => {
  return async ({ _id }: any) => {
    return await productCollection.getProductById({ _id });
  };
};
