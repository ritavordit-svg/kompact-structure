const { myCache } = require("../../../Config/config");
const { settingsCollectionDocs } = require("../../../Config/collections");
const { SCHEMA_TYPE } = require("../../../Config/schemaType");
const { MongoDbCrudOpration } = require("../../../utils/mongo-handler/mongoQueries");

exports.getReactionEmoji = async (req, res) => {
    try {
        const companyId = req.headers["companyid"];

        const reactionObj = {
            type: SCHEMA_TYPE.SETTINGS,
            data: [
                {
                    name: settingsCollectionDocs.REACTION_EMOJIS,
                },
            ],
        };

        const cacheKey = `reaction_emoji:${companyId}`;
        let data = myCache.get(cacheKey);
        let isFromCache = true;

        if (!data) {
            isFromCache = false;
            data = await MongoDbCrudOpration(companyId, reactionObj, "findOne");
            myCache.set(cacheKey, data, 604800); // 7 ngày
        }
        if (isFromCache) {
            res.set({
                FromCache: "true",
                cacheExpireTime: myCache.getTtl(cacheKey),
            });
        }

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({
            message: "An error occurred while getting reaction emoji",
            error: error.message,
        });
    }
};
