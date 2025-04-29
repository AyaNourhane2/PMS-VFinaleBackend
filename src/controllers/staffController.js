import { getAllStaff, createStaff } from '../services/staffService.js';

const getStaff = async (req, res) => {
  try {
    const staff = await getAllStaff();
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addStaff = async (req, res) => {
  try {
    const { name, status, performance } = req.body;
    if (!name || !status || !performance) {
      return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
    }
    const staffId = await createStaff({ name, status, performance });
    res.json({ id: staffId, name, status, performance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getStaff, addStaff };