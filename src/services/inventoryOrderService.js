import { getInventoryOrders, addInventoryOrder } from '../models/InventoryOrder.js';

const getAllInventoryOrders = async () => {
  return await getInventoryOrders();
};

const createInventoryOrder = async (order) => {
  return await addInventoryOrder(order);
};

export { getAllInventoryOrders, createInventoryOrder };