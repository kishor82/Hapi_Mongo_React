import { OrderCollection } from '../data_access/types';
export default ({ orderCollection }: { orderCollection: OrderCollection }) => {
  return async ({ orderData }: any) => {
    return await orderCollection.createNewOrder({ orderData });
  };
};
