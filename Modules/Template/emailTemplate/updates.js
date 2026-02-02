const roundImage = require("./roundImage")
const commonTemplate = require("./commonTemplate")
const { Notification_key, TemplateType, ChangeTypes } = require("../../../Config/notificationKey");
exports.updatesView = ({ data = [], key = '' }) => {
    return `<div  style="margin:0 auto">
        ${manageRender(key, data)}
    </div>`
}
function manageRender(type, data) {
    switch (type) {
        case TemplateType.UPDATES:
            return updateData(data)

        default:
            return `<div></div>`
    }
}

function updateData(data) {
    let item = data[0];
    return (
        `<div>
            ${data.length > 0 ? 
                `<table class="px" width="100%" align="center" role="presentation" border="0" cellpadding="0" cellspacing="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;padding:0px 0px;table-layout: fixed;">
                <tbody>
                <tr>
                  <td class="column col-sm-12" width="640" style="mso-table-lspace:0pt;mso-table-rspace:0pt;padding: 20px 10px 20px 20px;width: 9%; text-align: left;" align="left" valign="top">
                    ${commonTemplate.imageViewTD(item.profile,item.name)}
                  </td>
                  <td class="column col-sm-12" width="640" style="mso-table-lspace:0pt;mso-table-rspace:0pt;padding:20px 0px 20px 0px;width: 31%; text-align: left;" align="left" valign="middle">
                    ${commonTemplate.userNameViewTD(item.name)}
                  </td>
                  <td class="column col-sm-12" width="640" style="mso-table-lspace:0pt;mso-table-rspace:0pt;padding:20px 20px 20px 00px;width:60%; text-align: left;" align="left" valign="middle">
                    ${commonTemplate.dateViewTD(item.date)}
                  </td>
                </tr>
                <tr>
                  <td colspan="3" class="column col-sm-12" width="640" style="mso-table-lspace:0pt;mso-table-rspace:0pt;padding: 0px 10px 20px 20px;width: 100%; text-align: left;" align="left" valign="top">
                  <table class="px" role="presentation" border="0" align="center" cellpadding="20" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt; padding: 0 60px;">
                      <tbody>
                        <tr>
                          <td width="100%" align="left" valign="top" style="mso-table-lspace:0pt;mso-table-rspace:0pt; padding: 0px;">
                            <div>
                            ${manageSubRender(item?.changeType, item?.changeData)}
                            </div>
                          </td>
                      </tr>
                    </tbody>
                  </table>
                  </td>
                </tr>
                </tbody>
            </table>
                `
            : `<div></div>`
        }
        </div>`
    )

}

function manageSubRender(type, data) {
    switch (type) {
        case ChangeTypes.STATUS:
            return statusRender(data)
        case ChangeTypes.NAME:
            return nameRender(data)
        case ChangeTypes.DESCRIPTION:
            return descriptionRender(data)
        case ChangeTypes.PRIORITY:
            return priorityRender(data)
        case ChangeTypes.PROJECT_STATUS:
            return projectStatusRender(data)
        case ChangeTypes.PROJECT_CATEGORY:
            return projectCategoryRender(data)
        case ChangeTypes.PROJECT_SOURCE:
            return projectSourceRender(data)
        case ChangeTypes.PROJECT_TYPE:
            return projectTypeRender(data)
        case ChangeTypes.CURRENCY:
            return projectCurrencyRender(data)
        case ChangeTypes.AMOUNT:
            return projectAmountRender(data)
        case ChangeTypes.START_DATE:
            return projectStartDateRender(data)
        case ChangeTypes.END_DATE:
            return projectEndDateRender(data)      
        case ChangeTypes.DUE_DATE:
            return projectDueDateRender(data)      
        case ChangeTypes.ASSIGNEE:
            return projectAssigneeRender(data)    
        case ChangeTypes.CHECKLIST:
            return projectChecklistRender(data)   
        case ChangeTypes.CHECKLIST_ASSIGN:
            return projectChecklistAssignRender(data) 
        case ChangeTypes.CHECKLIST_REMOVE:
            return projectChecklistRemoveRender(data)
        case ChangeTypes.PROJECT_CLOSE:
            return projectCloseRENDER(data)
        default:
            return `<div></div>`
    }
}

function statusRender(data) {

    var oldStatus = {
        backColor: data.backColor, color: data.color, name: data.statusName
    }
    var newStatus = {
        backColor: data.bgColor, color: data.textColor, name: data.newStatusName
    }
    return commonTemplate.updateView({ value: "Status", oldValue: oldStatus, newValue: newStatus, type: "button" })


}

function nameRender(data) {
    var oldStatus = {
        name:data.previousTaskName
    }
    var newStatus = {
        name: data.TaskName
    }
    return commonTemplate.updateView({  value:data.notificationType=="project"?"Project Name":"Task Name", oldValue: oldStatus, newValue: newStatus, type: "text" })
    
}

function descriptionRender(data) {
    var oldStatus = {
        name:data.previousDiscriptionText
    }
    var newStatus = {
        name: data.textSimple
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Description":"Task Description", oldValue: oldStatus, newValue: newStatus, type: "text" })
}

function priorityRender(data) {

    var oldStatus = {
        backColor: "", color: "", name: data.priorityName, image: data.statusImage
    }
    var newStatus = {
        backColor: "", color: "", name: data.newPriorityName, image: data.newStatusImage
    }
    return commonTemplate.updateView({ value: "Priority", oldValue: oldStatus, newValue: newStatus, type: "imageText" })


}

function projectStatusRender(data) {
    var oldStatus = {
        backColor: data.backColor, color: data.color, name: data.statusName
    }
    var newStatus = {
        backColor: data.bgColor, color: data.textColor, name: data.newStatusName
    }
    return commonTemplate.updateView({ value: "Project Status", oldValue: oldStatus, newValue: newStatus, type: "button" })


}

function projectCategoryRender(data) {
    var oldStatus = {
        name:data.previousDiscriptionText
    }
    var newStatus = {
        name: data.textSimple
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Category":"Category", oldValue: oldStatus, newValue: newStatus, type: "text" })
}
function projectSourceRender(data) {
    var oldStatus = {
        name:data.previousDiscriptionText
    }
    var newStatus = {
        name: data.textSimple
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Source":"Source", oldValue: oldStatus, newValue: newStatus, type: "text" })
}
function projectTypeRender(data) {
    var oldStatus = {
        name:data.previousType
    }
    var newStatus = {
        name: data.name
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Type":"Type", oldValue: oldStatus, newValue: newStatus, type: "text" })


}
function projectCurrencyRender(data) {
    var oldStatus = {
        name:data.ProjectCurrency
    }
    var newStatus = {
        name: data.name
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Currency":"Task Currency", oldValue: oldStatus, newValue: newStatus, type: "text" })
}

function projectAmountRender(data) {
    var oldStatus = {
        name:data.previousDiscriptionText
    }
    var newStatus = {
        name: data.textSimple
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Amount":"Task Amount", oldValue: oldStatus, newValue: newStatus, type: "text" })
}
function projectStartDateRender(data) {
    var oldStatus = {
        name:data.formetedStartDate || ''
    }
    var newStatus = {
        name: data.newDate || ''
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Start Date":"Start Date", oldValue: oldStatus, newValue: newStatus, type: "text" })
}
function projectEndDateRender(data) {
    var oldStatus = {
        name:data.formatedDate || ''
    }
    var newStatus = {
        name: data.newDate || ''
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project End Date":"End Date", oldValue: oldStatus, newValue: newStatus, type: "text" })
}
function projectDueDateRender(data) {
    var oldStatus = {
        name:data?.previousDate || ''
    }
    var newStatus = {
        name: data.changedDate || ''
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Due Date":"Due Date", oldValue: oldStatus, newValue: newStatus, type: "text" })
}
function projectAssigneeRender(data) {
    var oldValue={
        name:""
    }
    var types=data.type=="add"?" Added":" Removed"
    var newValue={
        name: `${data.name} ${types} in ${data.projectName}  project`
    }
    return commonTemplate.updateView({value:"Project Assignee" ,oldValue,newValue,type: "text"})
}
function projectChecklistRender(data) {
    var oldStatus = {
        name:data.previousDiscriptionText
    }
    var newStatus = {
        name: data.textSimple
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Checklist":"Checklist", oldValue: oldStatus, newValue: newStatus, type: "text" })
}
function projectChecklistRemoveRender(data) {
    var oldStatus = {
        name:data.previousDiscriptionText
    }
    var newStatus = {
        name: data.textSimple +" Removed"
    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Checklist":"Checklist", oldValue: oldStatus, newValue: newStatus, type: "text" })
}
function projectChecklistAssignRender(data) {
    var oldStatus = {
        name:"",
        image:""
    }
    var newStatus = {
        name: `${data?.name}${data?.type=="add"?" Added":' Removed'} in ${data?.checklist}`,
        image:data.profile,

    }
    return commonTemplate.updateView({ value: data.notificationType=="project"?"Project Checklist Assign":"Checklist Assign", oldValue: oldStatus, newValue: newStatus, type: "roundImageText" })
}

function projectCloseRENDER (data) {
    var oldValue={
        name:""
    }
    var newValue={
        name: `${data.projectName}  project is closed`
    }
    return commonTemplate.updateView({value:"Project Close" ,oldValue,newValue,type: "text"})
}