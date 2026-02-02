const { SCHEMA_TYPE } = require("../../../Config/schemaType");
const { MongoDbCrudOpration } = require("../../../utils/mongo-handler/mongoQueries");
const mongoose = require("mongoose")
const { myCache } = require('../../../Config/config');
// const { removeCache } = require('../../../utils/commonFunctions');

/**
 * This endpoint is used to get project template
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.getExtensions = async (req, res) => {
    try {

        let params = {
            type: SCHEMA_TYPE.RESTRICTED_EXTENSIONS,
            data: []
        }

        const cacheKey = `file_extensions_caches`;
        const hasCache = myCache.get(cacheKey);
        if (hasCache) {
            res.set({
                'FromCache': 'true',
                'cacheExpireTime': myCache.getTtl(cacheKey)
            });
            return res.status(200).json({ status: true, data: JSON.parse(hasCache) });
        }

        const response = await MongoDbCrudOpration(SCHEMA_TYPE.GOLBAL, params, 'findOne');
        myCache.set(cacheKey, JSON.stringify(response), 604800);

        return res.status(200).json({ status: true, data: response || [] });

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while get the project template",
            error: error 
        });
    }
}