const makeOrderCollection = ({ createMongoConnectoin, orderModel }: any) => {
  const createNewOrder = async ({ orderData }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return orderModel({ dbConnection }).create({ ...orderData });
    } catch (err) {
      throw err;
    }
  };

  return Object.freeze({
    createNewOrder,
  });
};

export default makeOrderCollection;
