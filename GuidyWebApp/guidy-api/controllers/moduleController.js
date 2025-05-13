const ModuleModel = require('../models/module.model');

const ModuleController = {
  async createModule(req, res) {
    try {
      const { courseId, title, durationHours, moduleOrder } = req.body;
      await ModuleModel.create({ courseId, title, durationHours, moduleOrder });
      res.status(201).json({ message: 'Module created successfully' });
    } catch (error) {
      console.error('❌ Error creating module:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getAllModules(req, res) {
    try {
      const modules = await ModuleModel.getAll();
      res.json(modules);
    } catch (error) {
      console.error('❌ Error getting modules:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async getModuleById(req, res) {
    try {
      const module = await ModuleModel.getById(parseInt(req.params.id));
      if (!module) return res.status(404).json({ error: 'Module not found' });
      res.json(module);
    } catch (error) {
      console.error('❌ Error getting module by ID:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async updateModule(req, res) {
    try {
      const moduleId = parseInt(req.params.id);
      const { title, durationHours, moduleOrder, status } = req.body;
      await ModuleModel.update(moduleId, { title, durationHours, moduleOrder, status });
      res.json({ message: 'Module updated successfully' });
    } catch (error) {
      console.error('❌ Error updating module:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  async deleteModule(req, res) {
    try {
      await ModuleModel.delete(parseInt(req.params.id));
      res.json({ message: 'Module deleted successfully' });
    } catch (error) {
      console.error('❌ Error deleting module:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
};

module.exports = ModuleController;
