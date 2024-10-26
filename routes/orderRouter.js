import express from "express";
import {
  createOrderController,
  getUserOrdersController,
  updateOrderStatusController
} from "../controllers/orderControllers.js";
import authenticate from "../middlewares/authMiddlewares.js";


const orderRouter = express.Router();

orderRouter.use(authenticate);

orderRouter.post("/", createOrderController);
orderRouter.get("/", getUserOrdersController);
orderRouter.patch("/:orderId/status", updateOrderStatusController);

export default orderRouter;
