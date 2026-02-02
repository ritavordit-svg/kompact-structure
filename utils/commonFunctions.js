const {myCache} = require('../Config/config');
/* ------------- GENERATE UNIQUE ID  ------------- */
exports.makeUniqueId = (length) =>  {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * 
        charactersLength));
    }
    return result;
}


exports.removeCache = (cacheKey,isKeyWithPrefix) => {
    if (isKeyWithPrefix) {
        let mykeys = myCache.keys();
        let projectDt = mykeys.filter((x)=> x.includes(cacheKey));
        myCache.del([...projectDt]);
    } else {
        myCache.del(cacheKey);
    }
}