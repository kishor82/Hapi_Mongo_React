import { OrderCollection } from '../data_access/types';
export default ({ OrderCollection }: { OrderCollection: OrderCollection }) => {
  return async ({ _id, dataToUpdate }: any) => {
    return await OrderCollection.updateOrderById({ _id, dataToUpdate });
  };
};
