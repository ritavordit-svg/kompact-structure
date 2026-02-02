const { default: axios } = require("axios");
const config = require('../Config/config');
const {myCache} = require('../Config/config');

exports.getCachedPromptData = async(body) => {
    return new Promise(async(resolve,reject) => {
        try {
            let cachedPromptData = myCache.get(body.query[0].title);
            if (!cachedPromptData) {

                axios.post(`${config.CANYONAPIURL}/api/v1/findOnePrompts`,body).then((response) => {

                    delete response.data.result.predefinedPrompt;

                    if(response.data.status === true){
                        myCache.set(body.query[0].title, response.data.result,3600);
                        resolve({status: true,statusText: response.data.result})
                    }
                    else{
                        resolve({status: false,statusText: 'Error'})
                    }
                })
                .catch((error) => { 
                    resolve({status: false,statusText: error})
                })

            }else{
                resolve({status: true, statusText: cachedPromptData})
            }
        } catch (error) {
            reject(error);
        }
    })
}

exports.getCachedAllPromptData = async() => {
    return new Promise(async(resolve,reject) => {
        try {
            let cachedAllPromptData = myCache.get('getAllPrompt');
            if (!cachedAllPromptData) {

                axios.post(`${config.CANYONAPIURL}/api/v1/getPrompt`).then((response) => {

                    if(response.data.status === true){
                        let result = response.data.result.map(({ predefinedPrompt, ...rest }) => rest)
                        resolve({status: true,statusText: result})
                        myCache.set("getAllPrompt", result,3600);
                    }
                    else{
                        resolve({status: false,statusText: 'Error'})
                    }
                })
                .catch((error) => {
                    resolve({status: false,statusText: error})
                })

            }else{
                resolve({status: true, statusText: cachedAllPromptData})
            }
        } catch (error) {
            reject(error);
        }
    })
}

exports.getCachedCategoryData = async() => {
    return new Promise(async(resolve,reject) => {
        try {
            let cachedCategoryData = myCache.get('getCategory');
            if (!cachedCategoryData) {
                axios.post(`${config.CANYONAPIURL}/api/v1/getAiCategory`).then((response) => {

                    if(response.data.status === true){
                        myCache.set("getCategory", response.data.result,3600);
                        resolve({status: true,statusText: response.data.result})
                    }
                    else{
                        resolve({status: false,statusText: 'Error'})
                    }
                })
                .catch((error) => { 
                    resolve({status: false,statusText: error})
                })
            }else{
                resolve({status: true, statusText: cachedCategoryData})
            }
        } catch (error) {
            reject(error);
        }
    })
}

exports.getCachedAiModelData = async() => {
    return new Promise(async(resolve,reject) => {
        try {
            let cachedModelData = myCache.get('getModel');
            if (!cachedModelData) {
                axios.post(`${config.CANYONAPIURL}/api/v1/getAiModels`).then((response) => {

                    if(response.data.status === true){
                        myCache.set("getModel", response.data.result,3600);
                        resolve({status: true,statusText: response.data.result})
                    }
                    else{
                        resolve({status: false,statusText: 'Error'})
                    }
                })
                .catch((error) => { 
                    resolve({status: false,statusText: error})
                })
            }else{
                resolve({status: true, statusText: cachedModelData})
            }
        } catch (error) {
            reject(error);
        }
    })
}

exports.getCachedGlobalTemplateData = async() => {
    return new Promise(async(resolve,reject) => {
        try {
            let cacheglobalTemplateData = myCache.get('getTemplateData');
            if (!cacheglobalTemplateData) {
                axios.get(config.CANYONAPIURL + `/api/v1/globalProjectTemplate`).then((response) => {
                    if(response.data && response.data.length){
                        myCache.set('getTemplateData', response.data,3600);
                        resolve({status: true,statusText: response.data})
                    }
                    else{
                        resolve({status: false,statusText: 'Error'})
                    }
                })
                .catch((error) => { 
                    resolve({status: false,statusText: error})
                })
            }else{
                resolve({status: true, statusText: cacheglobalTemplateData})
            }
        } catch (error) {
            reject(error);
        }
    })
}
