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
      return userModel({ dbConnection }).findById(_id).select('-password');
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

  return Object.freeze({
    getAllusers,
    getUserById,
    getUserByEmail,
  });
};

export default makeUserCollection;
