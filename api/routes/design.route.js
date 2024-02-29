import express from 'express';
import {
    createDesign,
    getAllDesigns,
    getDesignById,
    updateDesignById,
    deleteDesignById
} from '../controllers/design.controller.js';

const router = express.Router();

// Create a new design
router.post('/', createDesign);

// Get all designs
router.get('/', getAllDesigns);

// Get design by ID
router.get('/:id', getDesignById);

// Update design by ID
router.put('/:id', updateDesignById);

// Delete design by ID
router.delete('/:id', deleteDesignById);

export default router;
