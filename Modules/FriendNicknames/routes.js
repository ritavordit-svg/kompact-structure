const ctrl = require('./controller');

exports.init = (app) => {
    app.get('/api/v1/friendNickname/find', ctrl.findFriendNickname);
    app.get('/api/v1/friendNickname/:userId', ctrl.findFriendNicknameList);
    app.put('/api/v1/friendNickname/update', ctrl.updateFriendNickname);
};