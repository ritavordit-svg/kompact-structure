const ctrl = require('./controller');

exports.init = (app) => {
    app.put('/api/v1/fileExtensions', ctrl.updateFileExtensions);
    app.get('/api/v1/fileExtensions', ctrl.getFileExtensions);
}