import { model, Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
      required: true
    },
    books: [{
      book: {
        type: Schema.Types.ObjectId,
        ref: 'books',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }],
    // totalAmount: {
    //   type: Number,
    //   required: true
    // },
    paymentMethod: {
      type: String,
      enum: ['card', 'cash'],
      required: true
    },
    deliveryAddress: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
      default: 'pending'
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

export const Order = model("order", orderSchema);
