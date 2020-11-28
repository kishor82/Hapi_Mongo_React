import { Mongoose } from 'mongoose';
const makeOrderModelConnetion = ({ dbConnection }: { dbConnection: Mongoose }) => {
  try {
    return dbConnection.model('Order');
  } catch (e) {
    const orderSchema = new dbConnection.Schema(
      {
        user: { type: dbConnection.Schema.Types.ObjectId, required: true, ref: 'User' },
        orderItems: [
          {
            name: { type: String, required: true },
            qty: { type: Number, required: true },
            image: { type: String, required: true },
            price: { type: Number, required: true },
            product: {
              type: dbConnection.Schema.Types.ObjectId,
              required: true,
              ref: 'Product',
            },
          },
        ],
        shippingAddress: {
          address: { type: String, required: true },
          city: { type: String, required: true },
          postalCode: { type: String, required: true },
          country: { type: String, required: true },
        },
        paymentMethod: { type: String, required: true },
        paymentResult: {
          id: { type: String },
          status: { type: String },
          update_time: { type: String },
          email_address: { type: String },
        },
        taxPrice: { type: Number, return: true, default: 0.0 },
        shipingPrice: { type: Number, return: true, default: 0.0 },
        totalPrice: { type: Number, return: true, default: 0.0 },
        isPaid: { type: Boolean, required: true, default: false },
        paidAt: { type: Date },
        isDelivered: { type: Boolean, required: true, default: false },
        deliveredAt: { type: Date },
      },
      { timestamps: true }
    );
    return dbConnection.model('Order', orderSchema);
  }
};

export default makeOrderModelConnetion;
