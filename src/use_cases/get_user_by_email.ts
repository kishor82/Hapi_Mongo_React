import { UserCollection } from '../data_access/types';
export default ({ userCollection }: { userCollection: UserCollection }) => {
  return async ({ email }: any) => {
    return await userCollection.getUserByEmail({ email });
  };
};
