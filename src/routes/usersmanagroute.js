import express from 'express';
import UserManagementController from '../controllers/UserManagementController.js';

const router = express.Router();

router.get('/', UserManagementController.getAllUsers);
router.post('/', UserManagementController.addUser);
router.put('/:id', UserManagementController.updateUser);
router.delete('/:id', UserManagementController.deleteUser);

export default router;