export interface ProductCollection {
  getAllProducts: () => Promise<any>;
  getProductById: ({ _id }: any) => Promise<any>;
}
export interface UserCollection {
  getAllusers: () => Promise<any>;
  getUserById: ({ _id }: { _id: string }) => Promise<any>;
  getUserByEmail: ({ email }: { email: string }) => Promise<any>;
  createNewUser: ({ userData }: { userData: any }) => Promise<any>;
  updateUserById: ({ _id, dataToUpdate }: { _id: string; dataToUpdate: any }) => Promise<any>;
}

export interface OrderCollection {
  createNewOrder: ({ orderData }: { orderData: any }) => Promise<any>;
  getOrderById: ({ _id }: { _id: string }) => Promise<any>;
}
