import { getStaff, addStaff } from '../models/Staff.js';

const getAllStaff = async () => {
  return await getStaff();
};

const createStaff = async (employee) => {
  return await addStaff(employee);
};

export { getAllStaff, createStaff };