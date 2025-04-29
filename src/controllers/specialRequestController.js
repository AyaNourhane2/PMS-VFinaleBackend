import { getAllSpecialRequests, createSpecialRequest } from '../services/specialRequestService.js';

const getSpecialRequests = async (req, res) => {
  try {
    const requests = await getAllSpecialRequests();
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addSpecialRequest = async (req, res) => {
  try {
    const { room, request } = req.body;
    if (!room || !request) {
      return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
    }
    const requestId = await createSpecialRequest({ room, request });
    res.json({ id: requestId, room, request });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getSpecialRequests, addSpecialRequest };