const logger = require("../../../Config/loggerConfig");
const mongoRef = require('../../../utils/mongo-handler/mongoQueries');
const sendMailRef = require("./sendVerificationMail")
const {generateJWTToken} = require('../../../Config/jwt');
const { dbCollections } = require('../../../Config/collections');
const ctr = require("../controller");
let paymentRef = null;
if (process.env.PAYMENTMETHOD) {
    try {
        if (process.env.PAYMENTMETHOD === "chargebee") {
            paymentRef = require(`../../${process.env.PAYMENTMETHOD}/controller2`);
        } else if(process.env.PAYMENTMETHOD === "paddle") {
            paymentRef = require(`../../${process.env.PAYMENTMETHOD}/controller`);
        } else {
            paymentRef = require(`../../${process.env.PAYMENTMETHOD}/controller2`);
        }
    } catch (error) {
        logger.error(`Payment File is not Found: ${error} `);
    }
}

exports.authenticateToken = "";


exports.addUserMongodbV2 = (data) => {
    return new Promise((resolve, reject) => {
        try {
            let obj = {
                AssignCompany: data.assignCompany ? [data.assignCompany] : [],
                Employee_FName:  data.firstName,
                Employee_LName:  data.lastName,
                Employee_Email: data.email,
                Employee_Name:  data.firstName +' '+ data.lastName,
                Time_Format: "12",
                isDeleted: false,
                isActive: true,
                isOnline: false,
                isEmailVerified: data.isInvitation,
            }
            if (data.isProductOwner) {
                obj.isProductOwner = data.isProductOwner;
            }
            let object = {
                type: dbCollections.USERS,
                data: obj
            }
            try {
                ctr.insertAuthFun({email: data.email, password: data.password}, (iUserRes) => {
                    if (iUserRes.status) {
                        object.data._id = iUserRes.data._id;
                        mongoRef.MongoDbCrudOpration('global',object,'save').then((res)=>{
                            resolve({status: true, statusText: res})
                        }).catch((error)=>{
                            reject(error)
                        })
                        return;
                    }
                    reject(iUserRes.message);
                });
            } catch (error) {
                reject(error)
            }
        } catch (error) {
            reject(error);
        }
    })
}


/**
 * Create User API
 * @param {Objcet} req
 * @param {Object} res
 * @returns
 */
exports.createUserV2 = (req,res) => {
    try {
        if (!(req.body && req.body.firstName)) {
            res.send({
                status: false,
                statusText: `First Name is required`
            })
        }
        if (!(req.body && req.body.lastName)) {
            res.send({
                status: false,
                statusText: `Last Name is required`
            })
        }
        if (!(req.body && req.body.email)) {
            res.send({
                status: false,
                statusText: `Email is required`
            })
        }
        if (!(req.body && req.body.password)) {
            res.send({
                status: false,
                statusText: `Password is required`
            })
        }
        // CALL VALIDATE LICENCE FUNCTION HERE...............
        exports.addUserMongodbV2(req.body).then((respo)=>{
            if (!req.body.isInvitation) {
                sendMailRef.sendVerificationEmailPromise(respo.statusText._id,respo.statusText.Employee_Email).catch((error)=>{
                    logger.error(error.statusText);
                })
            }
            try {
                // if (process.env.PAYMENTMETHOD) {
                //     paymentRef.createCustomerInPayment(respo.statusText._id).then(() => {
                //         res.send(respo);
                //     }).catch((error)=>{
                //         logger.error(`Error create customer chargbee: ${error}`);
                //         res.send({
                //             status: false,
                //             statusText: error
                //         });
                //     });
                // } else {
                //     res.send(respo);
                // }
                res.send(respo);
            } catch (error) {
                logger.error(`Error create customer In Payment: ${error}`);
                res.send({
                    status: false,
                    statusText: error.message || error
                });
            }
            // res.send(respo);
        }).catch((error)=>{
            res.send({
                status: false,
                statusText: error
            })
        })
    } catch (error) {
        res.send({
            status: false,
            statusText: `Error: ${error}`
        })
    }
}

/**
 * Generate JWT Token Function
 * @param {Object} req 
 * @param {Object} res 
 */
exports.generateToken = async (req, res) => {
    try {

        if (!(req.body && req.body.uid)) {
            res.status(400).json({
                status: false,
                statusText: "The user id is required."
            });
            return;
        }

        const {uid} = req.body;
        let object = {
            type: dbCollections.USERS,
            data: [
                {
                    _id: uid
                }
            ]
        }
        mongoRef.MongoDbCrudOpration('global', object, "findOne").then(async (response) => {
            const companyIds = response.AssignCompany && response.AssignCompany.length ? response.AssignCompany : [];
            const token = await generateJWTToken({uid: uid, companyIds: companyIds});
            res.json({
                status: true,
                statusText: "Jwt token generate successfully.",
                token: token
            });
        }).catch((error) => {
            logger.error(`Generate Jwt Token Error: ${error}`);
            res.status(400).json({
                status: false, 
                error,
                statusText: 'User not found.',
            });
        })
    } catch (error) {
        logger.error(`Generate Jwt Token Error: ${error}`);
        res.status(400).json({
            status: false,
            statusText: "Authentication failed!"
        });
    }
};


exports.verifyToken = (req, res) => {
    res.json({
        status: true,
        key: 1
    });
};