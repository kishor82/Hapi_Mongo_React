import { ProductCollection } from '../data_access/types';
export default ({ productCollection }: { productCollection: ProductCollection }) => {
  return async () => {
   return await productCollection.getAllProducts();
  };
};
