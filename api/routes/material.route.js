import express from "express";

import {
    getMaterialById,
    getAllMaterial,
    createMaterial,
    updateMaterialById,
    deleteMaterialById,
} from "../controllers/material.controller.js";

const router = express.Router();

router.get('/', getAllMaterial);
router.get('/:id', getMaterialById);
router.post('/', createMaterial);
router.put('/:id', updateMaterialById);
router.delete('/:id', deleteMaterialById);

export default router;