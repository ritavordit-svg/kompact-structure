const ctrl = require('./taskType/controller');
const ctrlTaskStatus = require('./taskStatus/controller');

const ctrlTaskTypeSetting = require('./settingTaskType/controller');
const ctrlTaskStatusSetting = require('./settingTaskStatus/controller');
const ctrlProjectStatusSetting = require('./settingProjectStatus/controller');

exports.init = (app) => {
    app.get('/api/v1/templates/taskType', ctrl.getTaskTypeTemplate);
    app.put('/api/v1/templates/taskType', ctrl.updateTaskTypeTemplate);
    app.post('/api/v1/templates/taskType', ctrl.insertTaskTypeTemplate);
    app.delete('/api/v1/templates/taskType/:id', ctrl.deleteTaskTypeTemplate);

    app.get('/api/v1/templates/taskStatus', ctrlTaskStatus.getTaskStatusTemplate);
    app.put('/api/v1/templates/taskStatus', ctrlTaskStatus.updateTaskStatusTemplate);
    app.post('/api/v1/templates/taskStatus', ctrlTaskStatus.insertTaskStatusTemplate);
    app.delete('/api/v1/templates/taskStatus/:id', ctrlTaskStatus.deleteTaskStatusTemplate);

    app.put('/api/v1/setting/taskType', ctrlTaskTypeSetting.updateTaskTypeSettingTemplate);
    app.put('/api/v1/setting/taskStatus', ctrlTaskStatusSetting.updateTaskStatusSettingTemplate);
    app.put('/api/v1/setting/projectStatus', ctrlProjectStatusSetting.updateProjectStatusSettingTemplate);
    app.get('/api/v1/setting/projectStatus',ctrlProjectStatusSetting.getProjectStatus); 
    app.get('/api/v1/setting/taskStatus',ctrlTaskStatusSetting.getTaskStatus); 
    app.get('/api/v1/setting/taskType',ctrlTaskTypeSetting.getTaskTypes); 
}