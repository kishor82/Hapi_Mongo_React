const makeProductCollection = ({ createMongoConnectoin, productModel }: any) => {
  const getAllProducts = async () => {
    try {
      const dbConnection = await createMongoConnectoin();
      return productModel({ dbConnection }).find({});
    } catch (err) {
      throw err;
    }
  };

  const getProductById = async ({ _id }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return productModel({ dbConnection }).findById(_id);
    } catch (err) {
      throw err;
    }
  };

  return Object.freeze({
    getAllProducts,
    getProductById,
  });
};

export default makeProductCollection;
