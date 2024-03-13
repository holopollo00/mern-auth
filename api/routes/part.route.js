import express from "express";

import {
    getPartById,
    getLastedParts,
    createPart,
    updatePartById,
deletePartById,
} from "../controllers/part.controller.js";

const router = express.Router();

router.get('/', getLastedParts);
router.get('/:id', getPartById);
router.post('/', createPart);
router.put('/:id', updatePartById);
router.delete('/:id', deletePartById);

export default router;