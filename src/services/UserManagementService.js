import UserManagementModel from '../models/UserManagementModel.js';

class UserManagementService {
  static async getAllUsers() {
    return await UserManagementModel.getAllUsers();
  }

  static async addUser(username, email, role) {
    if (!username || !role) {
      throw new Error('Username and role are required');
    }
    return await UserManagementModel.addUser(username, email, role);
  }

  static async updateUser(id, username, email, role) {
    if (!username || !role) {
      throw new Error('Username and role are required');
    }
    return await UserManagementModel.updateUser(id, username, email, role);
  }

  static async deleteUser(id) {
    return await UserManagementModel.deleteUser(id);
  }
}

export default UserManagementService;