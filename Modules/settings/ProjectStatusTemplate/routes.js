const ctrl = require('./controller');

exports.init = (app) => {
    app.post('/api/v1/project-status-template', ctrl.create);
    app.get('/api/v1/project-status-template', ctrl.get);
    app.put('/api/v1/project-status-template', ctrl.update);
    app.delete('/api/v1/project-status-template/:id', ctrl.delete);
}