import { Mongoose } from 'mongoose';
const makeProductModelConnetion = ({ dbConnection }: { dbConnection: Mongoose }) => {
  try {
    return dbConnection.model('Product');
  } catch (e) {
    const reviewSchema = new dbConnection.Schema(
      {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
      { timestamps: true }
    );
    const productSchema = new dbConnection.Schema(
      {
        user: { type: dbConnection.Schema.Types.ObjectId },
        name: { type: String, trim: true, required: true },
        image: { type: String, trim: true, required: true },
        brand: { type: String, trim: true, required: true },
        category: { type: String, trim: true, required: true },
        description: { type: String, trim: true, required: true },
        reviews: [reviewSchema],
        rating: { type: Number, required: true, default: 0 },
        numReviews: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        countInStock: { type: Number, required: true, default: 0 },
      },
      { timestamps: true }
    );
    return dbConnection.model('Product', productSchema);
  }
};

export default makeProductModelConnetion;
