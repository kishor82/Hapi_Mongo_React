import { ProductCollection } from '../data-access/types';
export default ({ productCollection }: { productCollection: ProductCollection }) => {
  return async () => {
   return await productCollection.getAllProducts();
  };
};
