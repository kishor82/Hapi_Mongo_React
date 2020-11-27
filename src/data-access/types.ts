export interface ProductCollection {
  getAllProducts: () => Promise<any>;
  getProductById: ({ _id }: any) => Promise<any>;
}
