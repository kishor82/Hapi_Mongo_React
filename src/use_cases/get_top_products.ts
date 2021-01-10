import { ProductCollection } from '../data_access/types';
export default ({ productCollection }: { productCollection: ProductCollection }) => {
  return async ({ topLimit }: any) => {
    return await productCollection.getTopProducts({ topLimit });
  };
};
