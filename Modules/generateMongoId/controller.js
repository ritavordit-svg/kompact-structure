const mongoose = require("mongoose");

exports.generateMongoId = async (_, res) => {
    try {
        const newId = new mongoose.Types.ObjectId();
        return res.status(200).json(newId);
    } catch (error) {
        return res.status(500).json({
            message: `An error occurred while generateMongoId.`,
            error: error.message || error
        });
    }
};