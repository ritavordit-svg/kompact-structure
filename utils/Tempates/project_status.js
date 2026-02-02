
/**
 * Task status template
 * @returns 
 */
exports.TemplateData = () => {
    const data = [
        {
            default:true,
            projectActiveStatus: [
                {
                    "backgroundColor": "#E3E1FC35",
                    "textColor": "#7367F0",
                    "name": "Open",
                    "value": "open",
                    "isDeleted": false,
                    "key":1,
                    "default":true,
                    "type" : 'default_active'
                },
                {
                    "backgroundColor": "#68c21e35",
                    "textColor": "#68c21e",
                    "name": "Done",
                    "value": "done",
                    "isDeleted": false,
                    "key":3,
                    "type" : 'active'
                },
                {
                    "backgroundColor": "#c6b45d35",
                    "textColor": "#c6b45d",
                    "name": "On Hold",
                    "value": "on_hold",
                    "isDeleted": false,
                    "key":4,
                    "type" : 'active'
                },
                {
                    "backgroundColor": "#1aee1735",
                    "textColor": "#1aee17",
                    "name": "Completed",
                    "value": "completed",
                    "isDeleted": false,
                    "key":5,
                    "type" : 'active'
                },
            ],
            Created_At: new Date(),
            projectDoneStatus: [],
            TemplateName: "Development",
            projectCompletedStatus: {
                "backgroundColor": "#ED514535",
                "textColor": "#ED5145",
                "name": "Close",
                "value": "close",
                "isDeleted": false,
                "key":2,
                "type" : 'close'
            },
        },
        {
            default:true,
            projectActiveStatus: [
                {
                    "backgroundColor": "#E3E1FC35",
                    "textColor": "#7367F0",
                    "name": "Open",
                    "value": "open",
                    "isDeleted": false,
                    "key":1,
                    "default":true,
                    "type" : 'default_active'
                },
                {
                    "backgroundColor": "#68c21e35",
                    "textColor": "#68c21e",
                    "name": "Done",
                    "value": "done",
                    "isDeleted": false,
                    "key":3,
                    "type" : 'active'
                },
                {
                    "backgroundColor": "#c6b45d35",
                    "textColor": "#c6b45d",
                    "name": "On Hold",
                    "value": "on_hold",
                    "isDeleted": false,
                    "key":4,
                    "type" : 'active'
                },
                {
                    "backgroundColor": "#1aee1735",
                    "textColor": "#1aee17",
                    "name": "Completed",
                    "value": "completed",
                    "isDeleted": false,
                    "key":5,
                    "type" : 'active'
                },
                {
                    "backgroundColor": "#ff880035",
                    "textColor": "#ff8800",
                    "name": "In Process",
                    "value": "in_process",
                    "isDeleted": false,
                    "key":6,
                    "type" : 'active'
                },
            ],
            Created_At: new Date(),
            projectDoneStatus: [],
            TemplateName: "Design",
            projectCompletedStatus: {
                "backgroundColor": "#ED514535",
                "textColor": "#ED5145",
                "name": "Close",
                "value": "close",
                "isDeleted": false,
                "key":2,
                "type" : 'close'
            },
        },
    ]
    return data;
}