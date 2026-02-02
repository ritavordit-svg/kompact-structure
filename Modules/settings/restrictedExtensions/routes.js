const ctrl = require('./controller');

exports.init = (app) => {
    app.get('/api/v1/restricted-extensions', ctrl.getExtensions);
}