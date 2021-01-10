import { ProductCollection } from '../data_access/types';
export default ({ productCollection }: { productCollection: ProductCollection }) => {
  return async ({ productData }: any) => {
    return await productCollection.addNewProduct({ productData });
  };
};
