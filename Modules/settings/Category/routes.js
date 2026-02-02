const ctrl = require('./controller');

exports.init = (app) => {
    app.get('/api/v1/setting/category',ctrl.getCategory);
}