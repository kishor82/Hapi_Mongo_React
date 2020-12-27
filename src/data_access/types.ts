export interface ProductCollection {
  getAllProducts: ({ query, pageSize, page }: { query: any; pageSize: number; page: number }) => Promise<any>;
  getProductById: ({ _id }: { _id: string }) => Promise<any>;
  updateProductById: ({ _id, dataToUpdate }: { _id: string; dataToUpdate: any }) => Promise<any>;
  deleteProductById: ({ _id }: { _id: string }) => Promise<any>;
  addNewProduct: ({ productData }: { productData: any }) => Promise<any>;
  countDocuments: ({ query }: { query: any }) => Promise<any>;
  getTopProducts: ({ topLimit }: { topLimit: number }) => Promise<any>;
}
export interface UserCollection {
  getAllusers: () => Promise<any>;
  getUserById: ({ _id }: { _id: string }) => Promise<any>;
  getUserByEmail: ({ email }: { email: string }) => Promise<any>;
  createNewUser: ({ userData }: { userData: any }) => Promise<any>;
  updateUserById: ({ _id, dataToUpdate }: { _id: string; dataToUpdate: any }) => Promise<any>;
  deleteUserById: ({ _id }: { _id: string }) => Promise<any>;
}

export interface OrderCollection {
  getAllorders: () => Promise<any>;
  createNewOrder: ({ orderData }: { orderData: any }) => Promise<any>;
  getOrderById: ({ _id }: { _id: string }) => Promise<any>;
  updateOrderById: ({ _id, dataToUpdate }: { _id: string; dataToUpdate: any }) => Promise<any>;
  findOrderByUserId: ({ userId }: { userId: string }) => Promise<any>;
}
