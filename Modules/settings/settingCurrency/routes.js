const ctrl = require('./controller');

exports.init = (app) => {
    app.put('/api/v1/currency/:cid/:id', ctrl.updateCurrency);
    app.get('/api/v1/currency', ctrl.getCurrency);
}