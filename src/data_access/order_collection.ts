const makeOrderCollection = ({ createMongoConnectoin, orderModel, userModel }: any) => {
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
       * Before that register user model to populate user.
       */
      await userModel({ dbConnection });
      return orderModel({ dbConnection }).findById(_id).populate('user', 'name email');
    } catch (err) {
      throw err;
    }
  };

  async function updateOrderById({ _id, dataToUpdate }: any) {
    try {
      const dbConnection = await createMongoConnectoin();
      return await orderModel({ dbConnection })
        .updateOne(
          { _id },
          {
            $set: {
              ...dataToUpdate,
            },
          }
        )
        .lean();
    } catch (err) {
      throw err;
    }
  }

  async function findOrderByUserId({ userId }: any) {
    try {
      const dbConnection = await createMongoConnectoin();
      return await orderModel({ dbConnection }).find({ user: userId });
    } catch (err) {
      throw err;
    }
  }

  return Object.freeze({
    createNewOrder,
    getOrderById,
    updateOrderById,
    findOrderByUserId,
  });
};

export default makeOrderCollection;
