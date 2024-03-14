const router = require('express').Router();

const designController = require('../controller/design.controller.js');

// Create a new design
router.post('/', designController.createDesign);

// Get all designs
router.get('/', designController.getAllDesigns);

// Get design by ID
router.get('/:id', designController.getDesignById);

// Update design by ID
router.put('/:id', designController.updateDesignById);

// Delete design by ID
router.delete('/:id', designController.deleteDesignById);

module.exports = router;
