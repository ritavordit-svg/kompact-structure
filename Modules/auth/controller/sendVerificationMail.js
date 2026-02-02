const mongoRef = require('../../../utils/mongo-handler/mongoQueries');
const sendMail = require("../../service.js");
const config = require("../../../Config/config");
const { dbCollections } = require('../../../Config/collections');


/**
 * Send Verification Email
 * @param {Object} UserId - Id of user For which We need to send the email
 * @param {Object} Email - Email of user For which We need to send the email
 * @returns
 */



/**./Modules/notification1/init
 * Send Verification Mail
 * @param {Objcet} req
 * @param {Object} res
 * @returns
 */
exports.sendVerificationEmail = (req,res) => {
    try {
        if(!req.body.uid || req.body.uid === '') {
            res.send({
                status: false,
                statusText: "Userid is required."
            });
            return;
        }
        if (!req.body.email || req.body.email === '') {
            res.send({
                status: false,
                statusText: "email is required."
            })
        }
        let obj = {
            type: dbCollections.USERS,
            data: [
                {
                    _id: req.body.uid
                },
            ]
        }
        mongoRef.MongoDbCrudOpration("global",obj,"findOne").then((response)=>{
            if (response.isEmailVerified === true) {
                res.send({
                    status: false,
                    statusText: `Your Email is already verified`
                })
                return;
            } else {
                exports.sendVerificationEmailPromise(req.body.uid,req.body.email).then((response)=>{
                    res.send(response)
                }).catch((error)=>{
                    res.send(error)
                })
            }
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