const { myCache } = require("../../../../Config/config");
const { dbCollections, settingsCollectionDocs } = require("../../../../Config/collections");
const { SCHEMA_TYPE } = require("../../../../Config/schemaType");
const { removeCache } = require("../../../../utils/commonFunctions");
const { MongoDbCrudOpration } = require("../../../../utils/mongo-handler/mongoQueries");

/**
 * Updates the project status settings for a company
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.updateProjectStatusSettingTemplate = async (req, res) => {
    try {
        const companyId = req.headers["companyid"];
        const { value, textColor, name, isDeleted, backgroundColor} = req.body;

        if (!companyId) {
            return res.status(400).json({
                message: "An error occurred while updating the project status settings.",
                error: "Company ID is required in headers."
            });
        }

        const requiredFields = { value, textColor, name, isDeleted, backgroundColor };
        const missingField = Object.keys(requiredFields).find(key => !requiredFields[key] && requiredFields[key] !== false);
        if (missingField) {
            return res.status(400).json({ message: `${missingField} is required.` });
        }

        const allowedKeys = ["value", "textColor", "name", "isDeleted", "backgroundColor","refreshToken"];
        const invalidKeys = Object.keys(req.body).filter(key => !allowedKeys.includes(key));
        if (invalidKeys.length > 0) {
            return res.status(400).json({
                message: "Invalid keys provided in the request.",
                error: `Invalid keys: ${invalidKeys.join(", ")}. Allowed keys: ${allowedKeys.join(", ")}.`
            });
        }

        const currentDate = new Date();
        const updateObject = {
            value,
            textColor,
            name,
            isDeleted,
            backgroundColor
        };
        
        const query = {
            type: dbCollections.SETTINGS,
            data: [
                { name: settingsCollectionDocs.PROJECT_STATUS },
                { $inc: { totalStatus: 1 } },
                { updatedAt: currentDate },
                { new: true }
            ]
        };

        const response = await MongoDbCrudOpration(companyId, query, "findOneAndUpdate");
        if (!response) {
            return res.status(500).json({ message: "Failed to update totalStatus." });
        }

        updateObject.key = response.totalStatus + 1;
        const updateQuery = {
            type: dbCollections.SETTINGS,
            data: [
                { name: settingsCollectionDocs.PROJECT_STATUS },
                { $push: { settings: { ...updateObject } } },
                { returnDocument: 'after' }
            ]
        };

        const updateResponse = await MongoDbCrudOpration(companyId, updateQuery, "findOneAndUpdate");
        removeCache(`projectstatus:${companyId}`,true);
        return res.status(200).json(updateResponse);

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while updating project status settings.",
            error: error.message || error
        });
    }
};

exports.getProjectStatus = async (req,res) => {
    try {
        const mongoObj = {
            type: SCHEMA_TYPE.SETTINGS,
            data: [
                {
                    "name": settingsCollectionDocs.PROJECT_STATUS
                }
            ]
        };
        const companyId = req.headers['companyid'];

        const projectStatusCache = `projectstatus:${companyId}`;
        let taskStatus = myCache.get(projectStatusCache);
        let isFromCache = true;
        if(!taskStatus){
            isFromCache = false;
            taskStatus =  await MongoDbCrudOpration(companyId, mongoObj, 'find');
            myCache.set(projectStatusCache, taskStatus, 604800);
        }
        if (isFromCache) {
            res.set({
                'FromCache': 'true',
                'cacheExpireTime': myCache.getTtl(projectStatusCache)
            });
        }

        res.status(200).json(taskStatus);
    } catch (error) {
        res.status(500).json({ message: "An error occurred while getting the project status.", error: error.message });
    }
}