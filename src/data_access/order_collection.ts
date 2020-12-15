const makeOrderCollection = ({ createMongoConnectoin, orderModel }: any) => {
  const createNewOrder = async ({ orderData }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return orderModel({ dbConnection }).create({ ...orderData });
    } catch (err) {
      throw err;
    }
  };

  const getOrderById = async ({ _id }: { _id: string }) => {
    try {
      const dbConnection = await createMongoConnectoin();
      /**
       * Return order data with usre name and email address from user collection.
       */
      return orderModel({ dbConnection }).findById(_id);
    } catch (err) {
      throw err;
    }
  };

  return Object.freeze({
    createNewOrder,
    getOrderById,
  });
};

export default makeOrderCollection;
