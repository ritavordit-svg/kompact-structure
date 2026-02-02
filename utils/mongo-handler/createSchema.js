const { Schema } = require('mongoose');
const { schema } = require('./schema');
const taskSchema = new Schema(schema.tasks, { strict: false, timestamps: true });
taskSchema.index({
  "objId.sprintId": 1,
  "objId.ProjectID": 1,
  deletedStatusKey: 1,
  isParentTask: 1,
  statusKey: 1,
  groupByStatusIndex: 1,
  createdAt: 1,
  _id: 1
});
const commentSchema = new Schema(schema.comments, { strict: false, timestamps: true });
const timeSheetSchema = new Schema(schema.timesheet, { strict: false, timestamps: true });
const historySchema = new Schema(schema.history);
const userIdSchema = new Schema(schema.userId, { strict: false, timestamps: true });
const usersSchema = new Schema(schema.users, { strict: true, timestamps: true });
const adminDetailSchema = new Schema(schema.adminDetail, { strict: false, timestamps: true });
const wasabicredentials = new Schema(schema.wasabicredentials, { strict: true, timestamps: true });
const ProjectTemplate = new Schema(schema.ProjectTemplate, { strict: true, timestamps: true });
const timeTrackerDownload = new Schema(schema.timeTrackerDownload, { strict: true, timestamps: true });
const companies = new Schema(schema.companies, { strict: true, timestamps: true });
const companyProjectTemplate = new Schema(schema.companyProjectTemplate, { strict: true, timestamps: true });
const proejctTabComponents = new Schema(schema.proejctTabComponents, { strict: true, timestamps: true });
const projectStatusTemplate = new Schema(schema.projectStatusTemplate, { strict: true, timestamps: true });
const taskTypeTemplates = new Schema(schema.taskTypeTemplates, { strict: true, timestamps: true });
const taskStatusTemplates = new Schema(schema.taskStatusTemplates, { strict: true, timestamps: true });
const temsManagment = new Schema(schema.temsManagment, { strict: true, timestamps: true });
const companyUserSchema = new Schema(schema.companyUsers, { strict: true, timestamps: true })
const rulesSchema = new Schema(schema.rules, { strict: true, timestamps: true })
const estimatedTimeSchema = new Schema(schema.estimatedTime, { strict: true, timestamps: true })
const currencyListSchema = new Schema(schema.currency_list, { strict: true, timestamps: true })
const projectsSchema = new Schema(schema.projects, { strict: true, timestamps: true })
const mainChatSchema = new Schema(schema.mainChats, { strict: true, timestamps: true })
const settingsSchema = new Schema(schema.settings, { strict: true, timestamps: true })
const milestone = new Schema(schema.milestone, { strict: true, timestamps: true });
const appsSchema = new Schema(schema.apps, { strict: true, timestamps: true })
const notificationsSchema = new Schema(schema.notifications, { strict: true, timestamps: true })
const notificationsSettingsSchema = new Schema(schema.notificationsSettings, { strict: true, timestamps: true })
const mentionsSchema = new Schema(schema.mentions, { strict: true, timestamps: true })
const projectRulesSchema = new Schema(schema.projectRules, { strict: true, timestamps: true })
const subscriptionPlanSchema = new Schema(schema.subscriptionPlan, { strict: false, timestamps: true });
const planFeatureSchema = new Schema(schema.planFeature, { strict: false, timestamps: true });
const planFeatureDisplaySchema = new Schema(schema.planFeature, { strict: false, timestamps: true });
const subscriptionsSchema = new Schema(schema.subscriptions, { strict: false, timestamps: true });
const invoiceSchema = new Schema(schema.invoices, { strict: false, timestamps: true });
const globalCustomFieldsSchema = new Schema(schema.globalCustomFields, { strict: false, timestamps: true })
const customFieldsSchema = new Schema(schema.customFields, { strict: false, timestamps: true })
const creditNoteSchema = new Schema(schema.creditNotes, { strict: false, timestamps: true })
const sprints = new Schema(schema.sprints, { strict: true, timestamps: true });
const folders = new Schema(schema.folders, { strict: true, timestamps: true });
const restrictedExtensions = new Schema(schema.restrictedExtensions, { strict: true, timestamps: true });
const tours = new Schema(schema.tours, { strict: true, timestamps: true });

const preCompaniesSchema = new Schema(schema.preCompanies, { strict: true, timestamps: true })
const bucketSchema = new Schema(schema.bucket, { strict: true, timestamps: true })
const globalFilterSchema = new Schema(schema.globalFilter, { strict: true, timestamps: true })
const userAuthSchema = new Schema(schema.userAuth, { strict: true, timestamps: true })
const resetAttemptSchema = new Schema(schema.resetAttempt, { strict: true, timestamps: true })
const sessionsSchema = new Schema(schema.sessions, { strict: true, timestamps: true })
const userDashboard = new Schema(schema.userDashboard, { strict: true, timestamps: true })
sessionsSchema.index({ createdAt: 1 }, { expireAfterSeconds: Number(process.env.SESSIONEXPIREDTIME || 172800) });
const referCodeSchema = new Schema(schema.refferalcodes, { strict: true, timestamps: true });
const refferalmapping = new Schema(schema.refferalmapping, { strict: true, timestamps: true });
const globalSettingsSchema = new Schema(schema.globalSettings, { strict: true, timestamps: true });
const noteSchema = new Schema({
    userId: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: Object,
        default: {}
    },
    is_pin: {
        type: Boolean,
        default: false,
        index: true
    },
    order: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false 
    },
    createdBy: String
}, {
    timestamps: true
});

const groupChatSchema = new Schema(schema.groupChats, { strict: true, timestamps: true });
const chatSchema = new Schema(schema.chats, { strict: true, timestamps: true });
const stickerSchema = new Schema(schema.stickers, { strict: true, timestamps: true });
const stickerPacksSchema = new Schema(schema.stickerPacks, { strict: true, timestamps: true });

module.exports = {
    timeSheetSchema,
    historySchema,
    userIdSchema,
    usersSchema,
    adminDetailSchema,
    wasabicredentials,
    ProjectTemplate,
    timeTrackerDownload,
    companies,
    companyProjectTemplate,
    proejctTabComponents,
    projectStatusTemplate,
    taskTypeTemplates,
    taskStatusTemplates,
    temsManagment,
    companyUserSchema,
    rulesSchema,
    estimatedTimeSchema,
    currencyListSchema,
    projectsSchema,
    settingsSchema,
    milestone,
    mainChatSchema,
    settingsSchema,
    appsSchema,
    notificationsSchema,
    notificationsSettingsSchema,
    mentionsSchema,
    taskSchema,
    commentSchema,
    projectRulesSchema,
    subscriptionPlanSchema,
    planFeatureSchema,
    planFeatureDisplaySchema,
    subscriptionsSchema,
    invoiceSchema,
    globalCustomFieldsSchema,
    customFieldsSchema,
    creditNoteSchema,
    sprints,
    folders,
    restrictedExtensions,
    tours,
    preCompaniesSchema,
    bucketSchema,
    globalFilterSchema,
    userAuthSchema,
    resetAttemptSchema,
    sessionsSchema,
    userDashboard,
    referCodeSchema,
    refferalmapping,
    globalSettingsSchema,
    noteSchema,
    groupChatSchema,
    chatSchema,
    stickerSchema,
    stickerPacksSchema
};
