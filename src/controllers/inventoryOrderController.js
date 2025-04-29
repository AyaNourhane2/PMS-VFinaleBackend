import { getAllInventoryOrders, createInventoryOrder } from '../services/inventoryOrderService.js';

const getInventoryOrders = async (req, res) => {
  try {
    const orders = await getAllInventoryOrders();
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addInventoryOrder = async (req, res) => {
  try {
    const { product, quantity, date } = req.body;
    if (!product || !quantity || !date) {
      return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
    }
    const orderId = await createInventoryOrder({ product, quantity, date });
    res.json({ id: orderId, product, quantity, date });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getInventoryOrders, addInventoryOrder };