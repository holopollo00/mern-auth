const ResponseData = require('../models/ResponseData');

const responseController = {
    responseData: async(req, res) => {
        try {
            const newResponseData = await new ResponseData({
                error: req.body.error,
                message: req.body.message
            });
            const responseData = await newResponseData.save();
            res.status(200).json(responseData);
        } catch (error) {
            res.status(500).send(error);
        }
    }
};

module.exports = responseController;