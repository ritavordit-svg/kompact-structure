const ctrl = require('./controller');

exports.init = (app) => {
    app.get('/api/v1/setting/designation',ctrl.getDesignations);
    app.put('/api/v1/setting/designation/update',ctrl.updateDesignation);
}