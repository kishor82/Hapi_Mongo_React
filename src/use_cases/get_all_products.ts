import { ProductCollection } from '../data_access/types';
export default ({ productCollection }: { productCollection: ProductCollection }) => {
  return async ({ query }: any) => {
    return await productCollection.getAllProducts({ query });
  };
};
