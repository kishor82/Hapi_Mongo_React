import { UserCollection } from '../data_access/types';
export default ({ userCollection }: { userCollection: UserCollection }) => {
  return async ({ _id, dataToUpdate }: any) => {
    return await userCollection.updateUserById({ _id, dataToUpdate });
  };
};
