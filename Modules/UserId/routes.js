const ctrl = require('./controller');

exports.init = (app) => {
    app.get('/api/v1/collection/userid/:id', ctrl.getCounts);
    app.put('/api/v1/collection/userid', ctrl.updateCounts);
}