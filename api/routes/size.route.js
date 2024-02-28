import express from 'express';
import {
    createSize,
    getAllSizes,
    getSizeById,
    updateSizeById,
    deleteSizeById
} from '../controllers/size.controller.js';

const router = express.Router();

// Create a new size
router.post('/', createSize);

// Get all sizes
router.get('/', getAllSizes);

// Get size by ID
router.get('/:id', getSizeById);

// Update size by ID
router.put('/:id', updateSizeById);

// Delete size by ID
router.delete('/:id', deleteSizeById);

export default router;
