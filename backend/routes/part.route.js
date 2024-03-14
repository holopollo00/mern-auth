const router = require('express').Router();

const partController = require('../controller/part.controller.js');

router.get('/', partController.getLastedParts);
router.get('/:id', partController.getPartById);
router.post('/', partController.createPart);
router.put('/:id', partController.updatePartById);
router.delete('/:id', partController.deletePartById);

module.exports = router;