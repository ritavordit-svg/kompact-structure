const { myCache } = require("../../../Config/config");
const { SCHEMA_TYPE } = require("../../../Config/schemaType");
const { MongoDbCrudOpration } = require("../../../utils/mongo-handler/mongoQueries");
const { settingsCollectionDocs } = require('../../../Config/collections');


exports.getCategory = async (req, res) => {
    try {
        const categoryObj = {
            type: SCHEMA_TYPE.SETTINGS,
            data: [
                {
                    "name":settingsCollectionDocs.PROJECT_CATEGORY
                }
            ]
        };
        const companyId = req.headers['companyid'];

        const categoryCache = `category:${companyId}`;
        let category = myCache.get(categoryCache);
        let isFromCache = true;
        if(!category){
            isFromCache = false;
            category =  await MongoDbCrudOpration(companyId, categoryObj, 'find');
            myCache.set(categoryCache, category, 604800);
        }
        if (isFromCache) {
            res.set({
                'FromCache': 'true',
                'cacheExpireTime': myCache.getTtl(categoryCache)
            });
        }
        res.status(200).json(category);

    } catch (error) {
        res.status(500).json({ message: "An error occurred while getting the category", error: error.message });
    }
}