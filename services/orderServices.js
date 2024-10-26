import { Order } from "../models/order.js";
import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";

export const createOrder = async (userId, orderData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new HttpError(404, "User not found");
  }

  const { bookId, paymentMethod, deliveryAddress, phoneNumber } = orderData;
  const books = [{
    book: bookId,
    quantity: 1  
  }];

  const newOrder = await Order.create({
    user: userId,
    books,
    paymentMethod,
    deliveryAddress,
    phoneNumber,
  });

  return newOrder;
};

export const getUserOrders = async (userId) => {
  const orders = await Order.find({ user: userId }).populate('books.book');
  return orders;
};

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
  if (!order) {
    throw new HttpError(404, "Order not found");
  }
  return order;
};
