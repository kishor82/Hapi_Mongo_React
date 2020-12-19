const makeUserCollection = ({ createMongoConnectoin, userModel }: any) => {
  const getAllusers = async () => {
    try {
      const dbConnection = await createMongoConnectoin();
      return userModel({ dbConnection }).find({});
    } catch (err) {
      throw err;
    }
  };

  const getUserById = async ({ _id }: { _id: string }) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return userModel({ dbConnection }).findById(_id).select('-password -__v');
    } catch (err) {
      throw err;
    }
  };

  const getUserByEmail = async ({ email }: { email: string }) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return userModel({ dbConnection }).findOne({ email });
    } catch (err) {
      throw err;
    }
  };

  const createNewUser = async ({ userData }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return userModel({ dbConnection }).create({ ...userData });
    } catch (err) {
      throw err;
    }
  };

  const updateUserById = async ({ _id, dataToUpdate }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      /**
       * Find and update document after successful operation return updated document.
       * Exclude password and __v fields from output.
       */
      return await userModel({ dbConnection })
        .findOneAndUpdate(
          { _id },
          {
            $set: {
              ...dataToUpdate,
            },
          },
          { new: true }
        )
        .lean().select('-password -__v');
    } catch (err) {
      throw err;
    }
  };

  const deleteUserById = async ({ _id }: any) => {
    try {
      const dbConnection = await createMongoConnectoin();
      return await userModel({ dbConnection }).findByIdAndDelete(_id);
    } catch (err) {
      throw err;
    }
  };
  return Object.freeze({
    getAllusers,
    getUserById,
    getUserByEmail,
    createNewUser,
    updateUserById,
    deleteUserById,
  });
};

export default makeUserCollection;
