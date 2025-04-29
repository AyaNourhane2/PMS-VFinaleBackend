import { getAllTasks, createTask, updateTask } from '../services/housekeepingTaskService.js';

 const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (error) {
    console.error(error); // Ajoutez un log de l'erreur
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
};

const addTask = async (req, res) => {
  try {
    const { room, status } = req.body;
    if (!room || !status) {
      return res.status(400).json({ error: 'Veuillez remplir tous les champs.' });
    }
    const taskId = await createTask({ room, status });
    res.json({ id: taskId, room, status });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateTaskStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ error: 'Veuillez spécifier un statut.' });
    }
    await updateTask(id, status);
    res.json({ message: 'Tâche mise à jour avec succès' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getTasks, addTask, updateTaskStatus };