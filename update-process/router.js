const ctr = require("./controller");
const { handleEvents } = require('./eventController');


/**
 * Init
 * @param {Object} app 
 */
exports.init = (app) => {
    app.post("/api/v1/update-submit", ctr.updateEnvSubmit);
    app.get("/api/v1/upgradeProcess/events/:id", (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        
        handleEvents(req, res)
    });
    app.get("/api/v1/realLog/events/:id", (req, res) => {
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        
        handleEvents(req, res)
    });
    
    app.post("/api/v1/finalupgradeprocess", ctr.finalupgradeprocess);
};
