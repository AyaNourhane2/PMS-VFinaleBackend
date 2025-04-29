import express from 'express';
import { getSpecialRequests, addSpecialRequest } from '../controllers/specialRequestController.js';

const router = express.Router();

router.get('/requests', getSpecialRequests);
router.post('/requests', addSpecialRequest);

export default router;