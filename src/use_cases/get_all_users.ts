import { UserCollection } from '../data_access/types';
export default ({ userCollection }: { userCollection: UserCollection }) => {
  return async () => {
    return await userCollection.getAllusers();
  };
};
