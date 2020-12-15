import { OrderCollection } from '../data_access/types';
export default ({ orderCollection }: { orderCollection: OrderCollection }) => {
  return async ({ _id }: { _id: string }) => {
    return await orderCollection.getOrderById({ _id });
  };
};
