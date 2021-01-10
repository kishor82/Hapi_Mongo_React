import { OrderCollection } from '../data_access/types';
export default ({ orderCollection }: { orderCollection: OrderCollection }) => {
  return async () => {
    return await orderCollection.getAllorders();
  };
};
