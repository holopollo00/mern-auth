const router = require('express').Router();
const middlewareController = require('../controller/middlewareController');
const designSaveController = require('../controller/designSaveController.js'); // Assuming controllers are in a 'controllers' folder

// Get all design saves
router.get('/', designSaveController.getAllDesignSaves);

// Get a specific design save by ID
router.get('/:id', designSaveController.getDesignSaveById);

// Create a new design save
router.post('/', middlewareController.verifyToken, designSaveController.createDesignSave);

// Update a design save
router.put('/:id', middlewareController.verifyToken, designSaveController.updateDesignSave);

// Delete a design save
router.delete('/:id', designSaveController.deleteDesignSave);

// Get design saves by user ID (optional)
router.get('/user/:userId', middlewareController.verifyToken, designSaveController.getByUserId); // Adjust path if needed

module.exports = router;
