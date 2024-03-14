const router = require('express').Router();

const sizeController = require('../controller/size.controller.js');

// Create a new size
router.post('/', sizeController.createSize);

// Get all sizes
router.get('/', sizeController.getAllSizes);

// Get size by ID
router.get('/:id', sizeController.getSizeById);

// Update size by ID
router.put('/:id', sizeController.updateSizeById);

// Delete size by ID
router.delete('/:id', sizeController.deleteSizeById);

module.exports = router;
