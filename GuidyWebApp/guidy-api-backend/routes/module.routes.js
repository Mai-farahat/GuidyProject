
const express = require('express');
const router = express.Router();
const ModuleController = require('../controllers/moduleController');

// POST /api/modules
router.post('/', ModuleController.createModule);

// GET /api/modules
router.get('/', ModuleController.getAllModules);

// GET /api/modules/:id
router.get('/:id', ModuleController.getModuleById);

// PUT /api/modules/:id
router.put('/:id', ModuleController.updateModule);

// DELETE /api/modules/:id
router.delete('/:id', ModuleController.deleteModule);

module.exports = router;
