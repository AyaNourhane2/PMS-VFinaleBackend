import express from 'express';
import { getStaff, addStaff } from '../controllers/staffController.js';

const router = express.Router();

router.get('/staff', getStaff);
router.post('/staff', addStaff);

export default router;