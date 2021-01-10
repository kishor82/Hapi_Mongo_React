import { UserCollection } from '../data_access/types';
export default ({ userCollection }: { userCollection: UserCollection }) => {
  return async ({ _id }: any) => {
    return await userCollection.getUserById({ _id });
  };
};
