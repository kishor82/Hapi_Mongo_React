const makeProductCollection = ({ createMongoConnectoin, productModel }: any) => {
  const addNewProduct = async ({ productData }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return productModel({ dbConnection }).create({ ...productData });
    } catch (err) {
      throw err;
    }
  };

  const getAllProducts = async ({ query, pageSize, page }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      /**
       * Get all products or get with with specified keyword.
       */
      return productModel({ dbConnection })
        .find({ ...query })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
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

  const countDocuments = async ({ query }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      /**
       * Get all products or get with with specified keyword.
       */
      return productModel({ dbConnection }).countDocuments({ ...query });
    } catch (err) {
      throw err;
    }
  };

  const getTopProducts = async ({ topLimit }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      /**
       * Return top rating products in descending order.
       */
      return productModel({ dbConnection }).find({}).sort({ rating: -1 }).limit(topLimit);
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
    countDocuments,
    getTopProducts
  });
};

export default makeProductCollection;
