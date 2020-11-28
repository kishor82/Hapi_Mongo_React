import { ProductCollection } from '../data_access/types';
export default ({ productCollection }: { productCollection: ProductCollection }) => {
  return async ({ _id }: any) => {
    return await productCollection.getProductById({ _id });
  };
};
