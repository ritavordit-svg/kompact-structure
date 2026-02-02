const { myCache } = require("../../../Config/config");
const { removeCache } = require("../../../utils/commonFunctions");
const { dbCollections } = require("../../../Config/collections");
const { MongoDbCrudOpration } = require("../../../utils/mongo-handler/mongoQueries");
const mongoose = require("mongoose");

exports.updateCurrency = async (req, res) => {
    try {
        const { cid, id } = req.params;
        const { key,updateObject } = req.body;

        // Validate parameters
        if (!cid || !id) {
            return res.status(400).json({
                message: "An error occurred while updating the currency.",
                error: "Company ID (cid) and currency ID (id) are required."
            });
        }
        if (!(updateObject)) {
            return res.status(400).json({message: 'Update Object is Required'});
        }
        if(!(key)){
            return res.status(400).json({message: 'key is Required'});
        }
        // MongoDB query
        const query = {
            type: dbCollections.CURRENCY_LIST,
            data: [
                { _id: new mongoose.Types.ObjectId(id) },
                { [key]: updateObject }
            ]
        };

        // Execute query
        const response = await MongoDbCrudOpration(cid, query, "updateOne");
        removeCache(`currency:${cid}`);
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error updating currency:", error);
        return res.status(500).json({
            message: "An error occurred while updating the currency.",
            error: error.message || error
        });
    }
};

exports.getCurrency = async (req, res) => {
    try {
        const companyId = req.headers["companyid"];
        if (!companyId) {
            return res.status(400).json({
                message: "An error occurred while getting the currency.",
                error: "Company ID is required in headers."
            });
        }
        const cacheKey = `currency:${companyId}`;
        const value = myCache.get(cacheKey);

        if (value) {
            res.set({
                'FromCache': 'true',
                'cacheExpireTime': myCache.getTtl(cacheKey)
            });
            return res.status(200).json(JSON.parse(value));
        }
        // MongoDB query
        const query = {
            type: dbCollections.CURRENCY_LIST,
            data: []
        };

        // Execute query
        const response = await MongoDbCrudOpration(companyId, query, "find");
        myCache.set( cacheKey, JSON.stringify(response && response.length ? response : []), 604800 );
        return res.status(200).json(response);
    } catch (error) {
        console.error("Error getting currency:", error);
        return res.status(500).json({
            message: "An error occurred while getting the currency.",
            error: error.message || error
        });
    }
};
