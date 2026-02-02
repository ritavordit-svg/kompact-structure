const ctrl = require('./controller');

exports.init = (app) => {
    app.get('/api/v1/members', ctrl.getMembers);
    app.get('/api/v1/members/:id', ctrl.getMembersById);
    app.get('/api/v1/members/:key/:value', ctrl.checkRoleOrDesignationAssignedWithUsers);
    app.post('/api/v1/members/private-view', ctrl.handlePrivateView);
    app.put('/api/v1/members', ctrl.updateMember);
    app.put('/api/v1/root-members', ctrl.rootUpdateMember);
    app.post('/api/v1/members/count', ctrl.getMembersCount);
}