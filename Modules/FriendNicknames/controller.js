const { myCache } = require("../../Config/config.js");
const { dbCollections } = require("../../Config/collections.js");
const logger = require("../../Config/loggerConfig");
const { SCHEMA_TYPE } = require("../../Config/schemaType.js");
const { removeCache } = require("../../utils/commonFunctions.js");
const { MongoDbCrudOpration } = require("../../utils/mongo-handler/mongoQueries.js");
const mongoose = require("mongoose");

exports.findFriendNickname = async (req, res) => {
    try {
        const { userId, friendId } = req.query;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "userId are required.",
            });
        }
        if (!friendId) {
            return res.status(400).json({
                status: false,
                message: "friendId are required.",
            });
        }
        let data = {
            userId: userId,
            friendId: friendId,
        };
        let obj = {
            type: dbCollections.FRIENDNICKNAMES,
            data: data,
        };
        MongoDbCrudOpration("global", obj, "findOne")
            .then((response) => {
                res.send({
                    status: true,
                    statusText: "User Friend Nickname Found",
                    data: response,
                });
            })
            .catch((error) => {
                res.send({
                    status: false,
                    statusText: "User Friend Nickname Not Found",
                    error: error.message || error,
                });
                logger.error("USER FRIEND NICKNAME FIND ERROR findFriendNickname: ", error);
            });
    } catch (error) {
        res.send({
            status: false,
            statusText: "User Friend Nickname Not Found",
            error: error.message || error,
        });
        logger.error("USER FRIEND NICKNAME FIND ERROR findFriendNickname: ", error);
    }
};

exports.findFriendNicknameList = async (req, res) => {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "userId are required.",
            });
        }

        let data = {
            userId: userId,
        };
        let obj = {
            type: dbCollections.FRIENDNICKNAMES,
            data: data,
        };
        MongoDbCrudOpration("global", obj, "find")
            .then((response) => {
                res.send({
                    status: true,
                    statusText: "User Friend Nickname Found",
                    data: response,
                });
            })
            .catch((error) => {
                res.send({
                    status: false,
                    statusText: "User Friend Nickname Not Found",
                    error: error.message || error,
                });
                logger.error("USER FRIEND NICKNAME FIND ERROR findFriendNickname: ", error);
            });
    } catch (error) {
        res.send({
            status: false,
            statusText: "User Friend Nickname Not Found",
            error: error.message || error,
        });
        logger.error("USER FRIEND NICKNAME FIND ERROR findFriendNickname: ", error);
    }
};

exports.updateFriendNickname = async (req, res) => {
    try {
        const { userId, friendId, newNickname } = req.body;

        if (!userId) {
            return res.status(400).json({
                status: false,
                message: "userId are required.",
            });
        }
        if (!friendId) {
            return res.status(400).json({
                status: false,
                message: "friendId are required.",
            });
        }
        if (!newNickname) {
            return res.status(400).json({
                status: false,
                message: "newNickname are required.",
            });
        }

        let data = [
            { userId: userId, friendId: friendId },
            {
                $set: {
                    nickname: newNickname,
                },
            },
            { upsert: true },
        ];

        let obj = {
            type: dbCollections.FRIENDNICKNAMES,
            data: data,
        };

        const cacheKey = `UserData:${req.body.userId}`;
        MongoDbCrudOpration("global", obj, "findOneAndUpdate")
            .then((response) => {
                removeCache(cacheKey);
                removeCache("UserAllData:", true);
                res.send({
                    status: true,
                    statusText: "User Friend Nickname Updated",
                    data: response,
                });
            })
            .catch((error) => {
                res.send({
                    status: false,
                    statusText: "User Friend Nickname Not Updated",
                    error: error.message || error,
                });
                logger.error("USER FRIEND NICKNAME UPDATE ERROR updateFriendNickname: ", error);
            });
    } catch (error) {
        res.send({
            status: false,
            statusText: "User Friend Nickname Not Updated",
            error: error.message || error,
        });
        logger.error("USER FRIEND NICKNAME UPDATE ERROR updateFriendNickname: ", error);
    }
};
