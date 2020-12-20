const makeProductCollection = ({ createMongoConnectoin, productModel }: any) => {
  const addNewProduct = async ({ productData }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return productModel({ dbConnection }).create({ ...productData });
    } catch (err) {
      throw err;
    }
  };

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

  const deleteProductById = async ({ _id }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return await productModel({ dbConnection }).findByIdAndDelete(_id);
    } catch (err) {
      throw err;
    }
  };

  const updateProductById = async ({ _id, dataToUpdate }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      /**
       * Find and update document after successful operation return updated document.
       */
      return await productModel({ dbConnection })
        .findOneAndUpdate(
          { _id },
          {
            $set: {
              ...dataToUpdate,
            },
          },
          { new: true }
        )
        .lean();
    } catch (err) {
      throw err;
    }
  };

  return Object.freeze({
    getAllProducts,
    getProductById,
    deleteProductById,
    updateProductById,
    addNewProduct,
  });
};

export default makeProductCollection;
