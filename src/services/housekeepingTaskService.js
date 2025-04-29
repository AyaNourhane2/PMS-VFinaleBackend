import { getTasks, addTask, updateTaskStatus } from '../models/HousekeepingTask.js';

const getAllTasks = async () => {
  return await getTasks();
};

const createTask = async (task) => {
  return await addTask(task);
};

const updateTask = async (taskId, status) => {
  return await updateTaskStatus(taskId, status);
};

export { getAllTasks, createTask, updateTask };