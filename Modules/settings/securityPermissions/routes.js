const ctrl = require('./controller');

exports.init = (app) => {
    app.put('/api/v1/securityPermissions', ctrl.updateSecurityPermissions);
    app.get('/api/v1/securityPermissions', ctrl.getSecurityPermissions);
}