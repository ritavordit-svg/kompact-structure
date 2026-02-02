const { SCHEMA_TYPE } = require("../../../Config/schemaType");
const { MongoDbCrudOpration } = require("../../../utils/mongo-handler/mongoQueries");
const mongoose = require("mongoose")
const { myCache } = require('../../../Config/config');
const { removeCache } = require('../../../utils/commonFunctions');

/**
 * This endpoint is used to create project status template
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.create = async (req, res) => {
    try {

        const query = {
            type: SCHEMA_TYPE.PROJECT_STATUS_TEMPLATES,
            data: req.body 
        };

        const response = await MongoDbCrudOpration(req.headers['companyid'], query, "save");

        const cacheKey = `project_status_template:${req.headers['companyid']}`;
        removeCache(cacheKey);

        if(response) {
            return res.status(200).json({ status: true, data: response });
        } else {
            return res.status(404).json({ status: false });
        }

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while saving the project status template",
            error: error 
        });
    }
}

/**
 * This endpoint is used to delete project status template
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.delete = async (req, res) => {
    try {
        const { id } = req.params;

        if(!id) {
            return res.status(400).json({
                status: false,
                message: `'id' parameter is required.`
            });
        }

        const params = {
            type: SCHEMA_TYPE.PROJECT_STATUS_TEMPLATES,
            data: [
                {
                    _id: new mongoose.Types.ObjectId(id)
                }
            ]
        }

        const response = await MongoDbCrudOpration(req.headers['companyid'], params, "deleteOne")

        const cacheKey = `project_status_template:${req.headers['companyid']}`;
        removeCache(cacheKey);

        if (response) {
            return res.status(200).json({ status: true });
        } else {
            return res.status(404).json({ tatus: false });
        }

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while delete the project status template",
            error: error 
        });
    }
}

/**
 * This endpoint is used to update project status template
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.update = async (req, res) => {
    try {
        const { id, templateName } = req.body;

        if(!id && !templateName) {
            return res.status(400).json({
                status: false,
                message: `'id' and 'templateName' parameters are required.`
            });
        }

        const params = {
            type: SCHEMA_TYPE.PROJECT_STATUS_TEMPLATES,
            data: [
                {
                    _id: new mongoose.Types.ObjectId(id)
                },
                {
                    $set: {
                        TemplateName: templateName 
                    }
                }
            ]
        }

        const response = await MongoDbCrudOpration(req.headers['companyid'], params, 'findOneAndUpdate');

        const cacheKey = `project_status_template:${req.headers['companyid']}`;
        removeCache(cacheKey);

        if(response) {
            return res.status(200).json({ status: true });
        } else {
            return res.status(404).json({ status: false });
        }

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while update the project global filter",
            error: error 
        });
    }
}

/**
 * This endpoint is used to get project status template
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.get = async (req, res) => {
    try {

        let params = {
            type: SCHEMA_TYPE.PROJECT_STATUS_TEMPLATES,
            data: []
        }

        const cacheKey = `project_status_template:${req.headers['companyid']}`;
        const hasCache = myCache.get(cacheKey);
        if (hasCache) {
            res.set({
                'FromCache': 'true',
                'cacheExpireTime': myCache.getTtl(cacheKey)
            });
            return res.status(200).json({ status: true, data: JSON.parse(hasCache) || []});
        }

        const response = await MongoDbCrudOpration(req.headers['companyid'], params, 'find');
        myCache.set(cacheKey, JSON.stringify(response), 604800);

        if (response) {
            return res.status(200).json({ status: true, data: response || [] });
        } else {
            return res.status(404).json({ status: false });
        }

    } catch (error) {
        return res.status(500).json({
            message: "An error occurred while get the project status template",
            error: error 
        });
    }
}