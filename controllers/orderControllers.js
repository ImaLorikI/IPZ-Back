import catchAsync from "../helpers/catchAsync.js";
import { createOrder, getUserOrders, updateOrderStatus } from "../services/orderServices.js";

export const createOrderController = catchAsync(async (req, res) => {
  const userId = req.user.id; 
  const orderData = req.body;
  
  const newOrder = await createOrder(userId, orderData);
  
  res.status(201).json(newOrder);
});

export const getUserOrdersController = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const orders = await getUserOrders(userId);
  res.status(200).json({ orders });
});

export const updateOrderStatusController = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { status } = req.body;
  const updatedOrder = await updateOrderStatus(orderId, status);
  res.status(200).json({ order: updatedOrder });
});
