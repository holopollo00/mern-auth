const router = require('express').Router();
const middlewareController = require('../controller/middlewareController');
const designSaveController = require('../controller/designSaveController.js'); // Assuming controllers are in a 'controllers' folder

// Get all design saves
router.get('/', middlewareController.verifyToken, designSaveController.getAllDesignSaves);

// Get a specific design save by ID
router.get('/:id', middlewareController.verifyToken, designSaveController.getDesignSaveById);

// Get a specific design save by ID to view
router.get('/view/:id', middlewareController.verifyToken, designSaveController.getDesignSaveViewById);

// Create a new design save
router.post('/', middlewareController.verifyToken, designSaveController.createDesignSave);

// Update a design save
router.put('/:id', middlewareController.verifyToken, designSaveController.updateDesignSave);

// Delete a design save
router.delete('/:id', middlewareController.verifyToken, designSaveController.deleteDesignSave);

// Get design saves by user ID (optional)
router.get('/user/:userId', middlewareController.verifyToken, designSaveController.getByUserId); // Adjust path if needed

module.exports = router;
