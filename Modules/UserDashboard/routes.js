const ctrl = require('./controller');

exports.init = (app) => {
    app.get('/api/v1/dashboard/:id', ctrl.getDashboard);
    app.post('/api/v1/dashboard',ctrl.updateDashboard);
    app.get('/api/v1/cardcomponent',ctrl.getCardComponent);
}