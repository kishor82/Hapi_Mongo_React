export interface ProductCollection {
  getAllProducts: () => Promise<any>;
  getProductById: ({ _id }: any) => Promise<any>;
}
export interface UserCollection {
  getAllusers: () => Promise<any>;
  getUserById: ({ _id }: { _id: string }) => Promise<any>;
  getUserByEmail: ({ email }: { email: string }) => Promise<any>;
}
