import { UserCollection } from '../data_access/types';
export default ({ userCollection }: { userCollection: UserCollection }) => {
  return async ({ userData }: any) => {
    return await userCollection.createNewUser({ userData });
  };
};
