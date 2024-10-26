import { model, Schema } from "mongoose";

const userSchemas = new Schema(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: {
      type: String,
      default: null,
    },
    wishlist: [{
      type: Schema.Types.ObjectId,
      ref: 'books'
    }],
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    paymentMethods: [{
      type: {
        type: String,
        enum: ['card', 'cash'],
        required: true
      },
      cardNumber: {
        type: String,
        required: function() { return this.type === 'card'; }
      },
      expirationDate: {
        type: String,
        required: function() { return this.type === 'card'; }
      }
    }]
  },
  {
    versionKey: false,
  }
);

export const User = model("user", userSchemas);
