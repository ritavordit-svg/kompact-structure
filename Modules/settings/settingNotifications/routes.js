const ctrl = require('./controller');

exports.init = (app) => {
    app.put('/api/v1/notifications', ctrl.updateNotifications);
    app.get('/api/v1/notifications/:id', ctrl.getNotifications);
}