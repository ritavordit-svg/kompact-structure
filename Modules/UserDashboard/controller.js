const { myCache } = require("../../Config/config");
const { SCHEMA_TYPE } = require("../../Config/schemaType");
const { MongoDbCrudOpration } = require("../../utils/mongo-handler/mongoQueries");
const axios = require("axios");
const logger = require("../../Config/loggerConfig");

/**
 * This endpoint is used to get user user dashboard template
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */

exports.getDashboard = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ status: false, message: "'id' parameter is required." });
        }

        const cacheKey = `dashboard_${id}`;
        const cachedDashboard = myCache.get(cacheKey);

        if (cachedDashboard) {
            res.set({
                'FromCache': 'true',
                'cacheExpireTime': myCache.getTtl(cacheKey)
            });
            return res.status(200).json(cachedDashboard);
        }

        const params = { type: SCHEMA_TYPE.USERDASHBOARD, data: [{ userId: id }] };
        const response = await MongoDbCrudOpration(req.headers['companyid'], params, 'find');

        if (response?.length) {
            myCache.set(cacheKey, response, 86400);
            return res.status(200).json(response);
        }

        try {
            const { data: lanData } = await axios.get(`${process.env.CANYONAPIURL}/api/v1/defaultdashboard`);
            const defaultDashboard = lanData.find(e => e.isDefault && !e.isDeleted);
            
            if (!defaultDashboard) {
                return res.status(404).json({ status: false, message: "Default dashboard not found." });
            }

            const { _id, ...dashboardWithoutId } = defaultDashboard;
            const dashboardData = { ...dashboardWithoutId, templateId: _id, userId: id };

            const dataSaveRes = await MongoDbCrudOpration(req.headers['companyid'], { type: SCHEMA_TYPE.USERDASHBOARD, data: dashboardData }, 'save');
            
            if (!dataSaveRes) {
                return res.status(400).json({ status: false, message: "Error while saving default dashboard." });
            }

            myCache.set(cacheKey, [dataSaveRes], 86400);
            return res.status(200).json([dataSaveRes]);
        } catch (apiError) {
            logger.error(`Error fetching default dashboard: ${apiError}`);
            return res.status(400).json({ status: false, message: "Error fetching default dashboard.", error: apiError });
        }
    } catch (error) {
        logger.error(`An error occurred while fetching the user dashboard: ${error}`);
        return res.status(400).json({ status: false, message: "An error occurred while fetching the user dashboard.", error });
    }
};
exports.getCardComponent = async (req, res) => {
    try {
        const cacheKey = `dashboard_card_component`;
        const cachedDashboard = myCache.get(cacheKey);

        if (cachedDashboard) {
            res.set({
                'FromCache': 'true',
                'cacheExpireTime': myCache.getTtl(cacheKey)
            });
            return res.status(200).json(cachedDashboard);
        }

        try {
            const dataSaveRes = await axios.get(`${process.env.CANYONAPIURL}/api/v1/defaultCardComponent`);
            
            if (!dataSaveRes) {
                return res.status(400).json({ status: false, message: "Error while saving default dashboard." });
            }

            myCache.set(cacheKey, dataSaveRes.data, 86400);
            return res.status(200).json(dataSaveRes.data);
        } catch (apiError) {
            logger.error(`Error fetching default dashboard: ${apiError}`);
            return res.status(400).json({ status: false, message: "Error fetching default dashboard.", error: apiError });
        }
    } catch (error) {
        logger.error(`An error occurred while fetching the user dashboard: ${error}`);
        return res.status(400).json({ status: false, message: "An error occurred while fetching the user dashboard.", error });
    }
};


exports.updateDashboard = async (req, res) => {
    try {
        const { queryObject, method, userId } = req.body;

        if (!queryObject || !method) {
            return res.status(400).json({
                status: false, 
                message: "'queryObject' and 'method' parameters are required." 
            });
        }

        let updateQuery = {
            type: SCHEMA_TYPE.USERDASHBOARD,
            data: queryObject
        };

        MongoDbCrudOpration(req.headers['companyid'], updateQuery, method)
            .then((result) => {
                if (result) {
                    if(userId) {
                        const cacheKey = `dashboard_${userId}`;
                        myCache.del(cacheKey);
                    }
                    return res.status(200).json({
                        status: true,
                        message: "Dashboard updated successfully.", 
                        data: result 
                    });
                } else {
                    return res.status(404).json({ status: false, message: "Dashboard not found." });
                }
            })
            .catch((error) => {
                logger.error(`Error while updating the user dashboard: ${error}`);
                return res.status(400).json({ 
                    status: false, 
                    message: "Error while updating dashboard.", 
                    error: error 
                });
            });

    } catch (error) {
        logger.error(`Error while updating the user dashboard: ${error}`);
        return res.status(400).json({ 
            status: false, 
            message: "An error occurred while updating the user dashboard.", 
            error 
        });
    }
};