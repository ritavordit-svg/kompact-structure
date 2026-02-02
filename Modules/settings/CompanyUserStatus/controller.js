const { myCache } = require("../../../Config/config");
const { SCHEMA_TYPE } = require("../../../Config/schemaType");
const { MongoDbCrudOpration } = require("../../../utils/mongo-handler/mongoQueries");
const { settingsCollectionDocs } = require('../../../Config/collections');


exports.getCompanyUserStatus = async (req, res) => {
    try {
        const mongoObj = {
            type: SCHEMA_TYPE.SETTINGS,
            data: [
                {
                    "name":settingsCollectionDocs.COMPANY_USER_STATUS
                }
            ]
        };
        const companyId = req.headers['companyid'];

        const cache = `companyUserStatus:${companyId}`;
        let companyUserStatus = myCache.get(cache);
        let isFromCache = true;
        if(!companyUserStatus){
            isFromCache = false;
            companyUserStatus =  await MongoDbCrudOpration(companyId, mongoObj, 'find');
            myCache.set(cache, companyUserStatus, 604800);
        }
        if (isFromCache) {
            res.set({
                'FromCache': 'true',
                'cacheExpireTime': myCache.getTtl(cache)
            });
        }
        res.status(200).json(companyUserStatus);

    } catch (error) {
        res.status(500).json({ message: "An error occurred while getting the companyUserStatus", error: error.message });
    }
}