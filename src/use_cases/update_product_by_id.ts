import { ProductCollection } from '../data_access/types';
export default ({ productCollection }: { productCollection: ProductCollection }) => {
  return async ({ _id, dataToUpdate }: any) => {
    return await productCollection.updateProductById({ _id, dataToUpdate });
  };
};
