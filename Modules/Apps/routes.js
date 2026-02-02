const ctrl = require('./controllers') 

exports.init = (app) => {
    app.get('/api/v1/projects-apps',ctrl.getApps)
}
