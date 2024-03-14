const router = require('express').Router();

const materialController = require('../controller/material.controller.js');

router.get('/', materialController.getAllMaterial);
router.get('/:id', materialController.getMaterialById);
router.post('/', materialController.createMaterial);
router.put('/:id', materialController.updateMaterialById);
router.delete('/:id', materialController.deleteMaterialById);

module.exports = router;