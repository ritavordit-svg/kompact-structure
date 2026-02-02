const ctrl = require('./controller');

exports.init = (app) => {
    app.put('/api/v1/taskPriority', ctrl.updateTaskPriority);
    app.get('/api/v1/taskPriority', ctrl.getTaskPriority);
}