import { OrderCollection } from '../data_access/types';
export default ({ orderCollection }: { orderCollection: OrderCollection }) => {
  return async ({ userId }: { userId: string }) => {
    return await orderCollection.findOrderByUserId({ userId });
  };
};
