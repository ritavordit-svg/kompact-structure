const axios = require('axios');
const config = require('../Config/config');

exports.validateLicense = (Orgign) => {
    return new Promise((resolve, reject) => {
        try {
            let data = JSON.stringify({
                "licensesKey": config.CANYONLICENSEKEY,
            });
    
            let configeration = {
                method: 'post',
                maxBodyLength: Infinity,
                url: `${config.ENTERPRISEURL}/api/v1/validateRequest`,
                headers: {
                    'Content-Type': 'application/json',
                    'Origin': Orgign,
                },
                data : data
            };
    
            axios.request(configeration)
            .then((response) => {
                if (response.data.status === 200) {
                    resolve(response);
                } else {
                    reject(response.data);
                }
            })
            .catch((error) => {
                reject(error.response.data);
            });
        } catch (error) {
            reject(error);
        }
    })
}