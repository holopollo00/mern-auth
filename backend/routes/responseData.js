const router = require('express').Router();
const responseDataController = require('../controller/responseDataController');
router.post("/put-response", responseDataController.responseData);
module.exports = router;