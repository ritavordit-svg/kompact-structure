const ctrl = require('./controller');

exports.init = (app) => {
    app.put('/api/v1/commonDateFormate', ctrl.updateCommonDateFormate);
    app.get('/api/v1/commonDateFormate', ctrl.getCommonDateFormate);
}