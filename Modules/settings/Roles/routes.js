const ctrl = require('./controller');

exports.init = (app) => {
    app.get('/api/v1/setting/roles',ctrl.getRoles);
    app.put('/api/v1/setting/roles/update',ctrl.updateRole);
}