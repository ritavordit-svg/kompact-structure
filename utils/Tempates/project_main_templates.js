exports.projectMainTemplates = [
    {
        "TemplateTaskStatusId": "",
        "TemplateTaskActiveKey": [
            1,
            3
        ],
        "TemplateName": "Development",
        "taskStatusData": [
            {
                "key": 1,
                "name": "doing",
                "textColor": "#000000",
                "bgColor": "#00000035",
                "type": "default_active"
            },
            {
                "key": 2,
                "name": "In Progress",
                "textColor": "#E0E550",
                "bgColor": "#E0E55035",
                "type": "active"
            },
            {
                "key": 3,
                "name": "Complete",
                "textColor": "#6BC950",
                "bgColor": "#6BC95035",
                "type": "close"
            },
            {
                "key": 4,
                "name": "testing",
                "textColor": "#FF9128",
                "bgColor": "#FFECDA",
                "type": "active"
            }
        ],
        "TemplateRequiredComponent": [
            {
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_active.svg",
                "viewStatus": true,
                "keyName": "ProjectListView",
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_inactive.svg",
                "value": "list",
                "name": "List",
                "setAsDefault": true
            },
            {
                "keyName": "ProjectKanban",
                "viewStatus": true,
                "value": "ProjectKanban",
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_active.svg",
                "setAsDefault": false,
                "name": "Board",
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_inactive.svg"
            }
        ],
        "ProjectCurrency": {
            "code": "INR",
            "symbol_native": "টকা",
            "symbol": "₹",
            "decimal_digits": 2,
            "name": "Indian Rupee",
            "name_plural": "Indian rupees",
            "rounding": 0
        },
        "projectStatusData": [
            {
                "key": 1,
                "type": "default_active",
                "default": true,
                "value": "open",
                "backgroundColor": "#E3E1FC35",
                "name": "Open",
                "textColor": "#7367F0"
            },
            {
                "key": 2,
                "type": "close",
                "value": "close",
                "backgroundColor": "#ED514535",
                "name": "Close",
                "textColor": "#ED5145"
            },
            {
                "key": 3,
                "type": "active",
                "value": "Progress",
                "backgroundColor": "#FF9128",
                "name": "Progress",
                "textColor": "#FFECDA"
            }
        ],
        "AssigneeUserId": [],
        "TaskTypeTemplateId": "",
        "TemplateTaskCloseKey": 2,
        "LeadUserId": [],
        "TemplateTaskDoneKey": [],
        "TemplateCategory": {
            "key": 1,
            "name": "Creative & Design"
        },
        "apps": [
            {
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timeBlue.png",
                "appStatus": true,
                "key": "TimeEstimates",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timegrey.png",
                "name": "Time Estimate"
            },
            {
                "appStatus": true,
                "name": "Milestones",
                "key": "Milestones",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflaggrey.png",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflagblue.png"
            },
            {
                "appStatus": true,
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flaggrey.png",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flagblue.png",
                "key": "Priority",
                "name": "Priority"
            }
        ],
        "TemplateTaskType": [
            {
                "key": 1,
                "value": "task",
                "name": "Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/task.png"
            },
            {
                "key": 2,
                "value": "sub_task",
                "name": "Sub Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/subtask.png"
            },
            {
                "key": 3,
                "value": "bug",
                "name": "Bug",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/bug.png"
            }
        ],
        "Description": ""
    },
    {
        "TemplateTaskDoneKey": [],
        "Description": "",
        "TemplateTaskStatusId": "",
        "TemplateCategory": {
            "name": "Finance & Accounting",
            "key": 3
        },
        "ProjectCurrency": {
            "name": "Indian Rupee",
            "symbol": "₹",
            "decimal_digits": 2,
            "code": "INR",
            "rounding": 0,
            "name_plural": "Indian rupees",
            "symbol_native": "টকা"
        },
        "projectStatusData": [
            {
                "key": 1,
                "type": "default_active",
                "default": true,
                "value": "open",
                "backgroundColor": "#E3E1FC35",
                "name": "Open",
                "textColor": "#7367F0"
            },
            {
                "key": 2,
                "type": "close",
                "value": "close",
                "backgroundColor": "#ED514535",
                "name": "Close",
                "textColor": "#ED5145"
            },
            {
                "key": 3,
                "type": "active",
                "value": "Progress",
                "backgroundColor": "#FF9128",
                "name": "Progress",
                "textColor": "#FFECDA"
            }
        ],
        "taskStatusData": [
            {
                "key": 1,
                "name": "To Do",
                "textColor": "#000000",
                "bgColor": "#00000035",
                "type": "default_active"
            },
            {
                "key": 2,
                "name": "In Progress",
                "textColor": "#E0E550",
                "bgColor": "#E0E55035",
                "type": "active"
            },
            {
                "key": 3,
                "name": "Complete",
                "textColor": "#6BC950",
                "bgColor": "#6BC95035",
                "type": "close"
            }
        ],
        "LeadUserId": [],
        "TemplateName": "UI/UX",
        "TemplateTaskCloseKey": 2,
        "TemplateTaskActiveKey": [
            1,
            3
        ],
        "apps": [
            {
                "appStatus": true,
                "key": "TimeEstimates",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timegrey.png",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timeBlue.png",
                "name": "Time Estimate"
            },
            {
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflaggrey.png",
                "name": "Milestones",
                "key": "Milestones",
                "appStatus": true,
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflagblue.png"
            },
            {
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flagblue.png",
                "name": "Priority",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flaggrey.png",
                "key": "Priority",
                "appStatus": true
            }
        ],
        "TemplateRequiredComponent": [
            {
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_active.svg",
                "value": "list",
                "name": "List",
                "setAsDefault": true,
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_inactive.svg",
                "keyName": "ProjectListView",
                "viewStatus": true
            },
            {
                "name": "Board",
                "viewStatus": true,
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_inactive.svg",
                "setAsDefault": false,
                "keyName": "ProjectKanban",
                "value": "ProjectKanban",
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_active.svg"
            }
        ],
        "AssigneeUserId": [],
        "TaskTypeTemplateId": "",
        "TemplateTaskType": [
            {
                "key": 1,
                "value": "task",
                "name": "Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/task.png"
            },
            {
                "key": 2,
                "value": "sub_task",
                "name": "Sub Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/subtask.png"
            },
            {
                "key": 3,
                "value": "bug",
                "name": "Bug",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/bug.png"
            }
        ]
    },
    {
        "ProjectCurrency": {
            "rounding": 0,
            "name_plural": "Indian rupees",
            "code": "INR",
            "symbol": "₹",
            "name": "Indian Rupee",
            "symbol_native": "টকা",
            "decimal_digits": 2
        },
        "TemplateTaskStatusId": "",
        "TemplateTaskCloseKey": 2,
        "projectStatusData": [
            {
                "key": 1,
                "type": "default_active",
                "default": true,
                "value": "open",
                "backgroundColor": "#E3E1FC35",
                "name": "Open",
                "textColor": "#7367F0"
            },
            {
                "key": 2,
                "type": "close",
                "value": "close",
                "backgroundColor": "#ED514535",
                "name": "Close",
                "textColor": "#ED5145"
            },
            {
                "key": 3,
                "type": "active",
                "value": "Progress",
                "backgroundColor": "#FF9128",
                "name": "Progress",
                "textColor": "#FFECDA"
            }
        ],
        "Description": "",
        "TaskTypeTemplateId": "",
        "TemplateRequiredComponent": [
            {
                "name": "List",
                "keyName": "ProjectListView",
                "setAsDefault": true,
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_inactive.svg",
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_active.svg",
                "viewStatus": true,
                "value": "list"
            },
            {
                "setAsDefault": false,
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_inactive.svg",
                "keyName": "ProjectKanban",
                "viewStatus": true,
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_active.svg",
                "name": "Board",
                "value": "ProjectKanban"
            }
        ],
        "AssigneeUserId": [],
        "TemplateTaskActiveKey": [
            1,
            3
        ],
        "TemplateCategory": {
            "key": 2,
            "name": "Engineering & Product"
        },
        "TemplateTaskType": [
            {
                "key": 1,
                "value": "task",
                "name": "Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/task.png"
            },
            {
                "key": 2,
                "value": "sub_task",
                "name": "Sub Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/subtask.png"
            },
            {
                "key": 3,
                "value": "bug",
                "name": "Bug",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/bug.png"
            }
        ],
        "apps": [
            {
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timeBlue.png",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timegrey.png",
                "key": "TimeEstimates",
                "name": "Time Estimate",
                "appStatus": true
            },
            {
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflagblue.png",
                "appStatus": true,
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflaggrey.png",
                "key": "Milestones",
                "name": "Milestones"
            },
            {
                "appStatus": true,
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flagblue.png",
                "key": "Priority",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flaggrey.png",
                "name": "Priority"
            }
        ],
        "LeadUserId": [],
        "TemplateTaskDoneKey": [],
        "TemplateName": "Product marketing",
        "taskStatusData": [
            {
                "key": 1,
                "name": "To Do",
                "textColor": "#000000",
                "bgColor": "#00000035",
                "type": "default_active"
            },
            {
                "key": 2,
                "name": "In Progress",
                "textColor": "#E0E550",
                "bgColor": "#E0E55035",
                "type": "active"
            },
            {
                "key": 3,
                "name": "Complete",
                "textColor": "#6BC950",
                "bgColor": "#6BC95035",
                "type": "close"
            }
        ]
    },
    {
        "projectStatusData": [
            {
                "key": 1,
                "type": "default_active",
                "default": true,
                "value": "open",
                "backgroundColor": "#E3E1FC35",
                "name": "Open",
                "textColor": "#7367F0"
            },
            {
                "key": 2,
                "type": "close",
                "value": "close",
                "backgroundColor": "#ED514535",
                "name": "Close",
                "textColor": "#ED5145"
            },
            {
                "key": 3,
                "type": "active",
                "value": "Progress",
                "backgroundColor": "#FF9128",
                "name": "Progress",
                "textColor": "#FFECDA"
            }
        ],
        "TemplateCategory": {
            "name": "Creative & Design",
            "key": 1
        },
        "AssigneeUserId": [],
        "taskStatusData": [
            {
                "key": 1,
                "name": "To Do",
                "textColor": "#000000",
                "bgColor": "#00000035",
                "type": "default_active"
            },
            {
                "key": 2,
                "name": "In Progress",
                "textColor": "#E0E550",
                "bgColor": "#E0E55035",
                "type": "active"
            },
            {
                "key": 3,
                "name": "Complete",
                "textColor": "#6BC950",
                "bgColor": "#6BC95035",
                "type": "close"
            }
        ],
        "TemplateTaskCloseKey": 2,
        "TemplateTaskActiveKey": [
            1,
            3
        ],
        "apps": [
            {
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timegrey.png",
                "appStatus": true,
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timeBlue.png",
                "key": "TimeEstimates",
                "name": "Time Estimate"
            },
            {
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflaggrey.png",
                "name": "Milestones",
                "key": "Milestones",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflagblue.png",
                "appStatus": true
            },
            {
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flaggrey.png",
                "name": "Priority",
                "key": "Priority",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flagblue.png",
                "appStatus": true
            }
        ],
        "LeadUserId": [],
        "ProjectCurrency": {
            "symbol_native": "টকা",
            "rounding": 0,
            "name": "Indian Rupee",
            "code": "INR",
            "name_plural": "Indian rupees",
            "symbol": "₹",
            "decimal_digits": 2
        },
        "TemplateRequiredComponent": [
            {
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_inactive.svg",
                "name": "List",
                "value": "list",
                "setAsDefault": true,
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_active.svg",
                "viewStatus": true,
                "keyName": "ProjectListView"
            },
            {
                "viewStatus": true,
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_inactive.svg",
                "name": "Board",
                "keyName": "ProjectKanban",
                "value": "ProjectKanban",
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_active.svg",
                "setAsDefault": false
            }
        ],
        "TemplateTaskStatusId": "",
        "TemplateTaskType": [
            {
                "key": 1,
                "value": "task",
                "name": "Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/task.png"
            },
            {
                "key": 2,
                "value": "sub_task",
                "name": "Sub Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/subtask.png"
            },
            {
                "key": 3,
                "value": "bug",
                "name": "Bug",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/bug.png"
            }
        ],
        "TaskTypeTemplateId": "",
        "TemplateName": "Design",
        "TemplateTaskDoneKey": [],
        "Description": ""
    },
    {
        "TemplateTaskCloseKey": 2,
        "ProjectCurrency": {
            "code": "INR",
            "name_plural": "Indian rupees",
            "symbol": "₹",
            "name": "Indian Rupee",
            "decimal_digits": 2,
            "rounding": 0,
            "symbol_native": "টকা"
        },
        "taskStatusData": [
            {
                "key": 1,
                "name": "To Do",
                "textColor": "#000000",
                "bgColor": "#00000035",
                "type": "default_active"
            },
            {
                "key": 2,
                "name": "In Progress",
                "textColor": "#E0E550",
                "bgColor": "#E0E55035",
                "type": "active"
            },
            {
                "key": 3,
                "name": "Complete",
                "textColor": "#6BC950",
                "bgColor": "#6BC95035",
                "type": "close"
            }
        ],
        "apps": [
            {
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timeBlue.png",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timegrey.png",
                "name": "Time Estimate",
                "key": "TimeEstimates",
                "appStatus": true
            },
            {
                "key": "Milestones",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflagblue.png",
                "appStatus": true,
                "name": "Milestones",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflaggrey.png"
            },
            {
                "name": "Priority",
                "appStatus": true,
                "key": "Priority",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flaggrey.png",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flagblue.png"
            }
        ],
        "TemplateRequiredComponent": [
            {
                "value": "list",
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_active.svg",
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_inactive.svg",
                "setAsDefault": true,
                "viewStatus": true,
                "keyName": "ProjectListView",
                "name": "List"
            },
            {
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_inactive.svg",
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_active.svg",
                "setAsDefault": false,
                "name": "Board",
                "keyName": "ProjectKanban",
                "viewStatus": true,
                "value": "ProjectKanban"
            }
        ],
        "projectStatusData": [
            {
                "key": 1,
                "type": "default_active",
                "default": true,
                "value": "open",
                "backgroundColor": "#E3E1FC35",
                "name": "Open",
                "textColor": "#7367F0"
            },
            {
                "key": 2,
                "type": "close",
                "value": "close",
                "backgroundColor": "#ED514535",
                "name": "Close",
                "textColor": "#ED5145"
            },
            {
                "key": 3,
                "type": "active",
                "value": "Progress",
                "backgroundColor": "#FF9128",
                "name": "Progress",
                "textColor": "#FFECDA"
            }
        ],
        "TemplateCategory": {
            "key": 3,
            "name": "Finance & Accounting"
        },
        "TemplateName": "Accounting",
        "TaskTypeTemplateId": "",
        "Description": "",
        "LeadUserId": [],
        "TemplateTaskStatusId": "",
        "TemplateTaskDoneKey": [],
        "TemplateTaskType": [
            {
                "key": 1,
                "value": "task",
                "name": "Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/task.png"
            },
            {
                "key": 2,
                "value": "sub_task",
                "name": "Sub Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/subtask.png"
            },
            {
                "key": 3,
                "value": "bug",
                "name": "Bug",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/bug.png"
            }
        ],
        "AssigneeUserId": [],
        "TemplateTaskActiveKey": [
            1,
            3
        ]
    },
    {
        "TemplateTaskStatusId": "",
        "apps": [
            {
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timegrey.png",
                "key": "TimeEstimates",
                "name": "Time Estimate",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/timeBlue.png",
                "appStatus": true
            },
            {
                "key": "Milestones",
                "name": "Milestones",
                "appStatus": true,
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflaggrey.png",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/checkflagblue.png"
            },
            {
                "appStatus": true,
                "key": "Priority",
                "beforeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flaggrey.png",
                "afterIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/apps/flagblue.png",
                "name": "Priority"
            }
        ],
        "TemplateCategory": {
            "name": "Engineering & Product",
            "key": 2
        },
        "TemplateTaskActiveKey": [
            1,
            3
        ],
        "TemplateTaskType": [
            {
                "key": 1,
                "value": "task",
                "name": "Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/task.png"
            },
            {
                "key": 2,
                "value": "sub_task",
                "name": "Sub Task",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/subtask.png"
            },
            {
                "key": 3,
                "value": "bug",
                "name": "Bug",
                "taskImage": "https://s3.us-east-1.wasabisys.com/setting-icons/bug.png"
            }
        ],
        "AssigneeUserId": [],
        "taskStatusData": [
            {
                "key": 1,
                "name": "To Do",
                "textColor": "#000000",
                "bgColor": "#00000035",
                "type": "default_active"
            },
            {
                "key": 2,
                "name": "In Progress",
                "textColor": "#E0E550",
                "bgColor": "#E0E55035",
                "type": "active"
            },
            {
                "key": 3,
                "name": "Complete",
                "textColor": "#6BC950",
                "bgColor": "#6BC95035",
                "type": "close"
            }
        ],
        "ProjectCurrency": {
            "name": "Indian Rupee",
            "symbol_native": "টকা",
            "decimal_digits": 2,
            "code": "INR",
            "name_plural": "Indian rupees",
            "rounding": 0,
            "symbol": "₹"
        },
        "TemplateRequiredComponent": [
            {
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_inactive.svg",
                "viewStatus": true,
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_list_active.svg",
                "keyName": "ProjectListView",
                "name": "List",
                "value": "list",
                "setAsDefault": true
            },
            {
                "icon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_inactive.svg",
                "value": "ProjectKanban",
                "keyName": "ProjectKanban",
                "viewStatus": true,
                "setAsDefault": false,
                "activeIcon": "https://s3.us-east-1.wasabisys.com/setting-icons/defaultViews/comp_board_active.svg",
                "name": "Board"
            }
        ],
        "TemplateName": "Marketing",
        "TaskTypeTemplateId": "",
        "LeadUserId": [],
        "Description": "",
        "TemplateTaskDoneKey": [],
        "projectStatusData": [
            {
                "key": 1,
                "type": "default_active",
                "default": true,
                "value": "open",
                "backgroundColor": "#E3E1FC35",
                "name": "Open",
                "textColor": "#7367F0"
            },
            {
                "key": 2,
                "type": "close",
                "value": "close",
                "backgroundColor": "#ED514535",
                "name": "Close",
                "textColor": "#ED5145"
            },
            {
                "key": 3,
                "type": "active",
                "value": "Progress",
                "backgroundColor": "#FF9128",
                "name": "Progress",
                "textColor": "#FFECDA"
            }
        ],
        "TemplateTaskCloseKey": 2
    }
]