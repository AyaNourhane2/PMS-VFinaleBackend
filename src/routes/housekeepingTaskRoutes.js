


import express from 'express';
import { getTasks, addTask, updateTaskStatus } from '../controllers/housekeepingTaskController.js';

const router = express.Router();

router.get('/tasks', getTasks); // Pour accéder aux tâches d'entretien
router.post('/tasks', addTask);
router.put('/tasks/:id', updateTaskStatus);

export default router;