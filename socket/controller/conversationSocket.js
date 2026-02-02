const { joinRoom, leaveRoom } = require("../helper");
const socketRef = require("../socketinit");
const socketEmitter = require("../../event/socketEventEmitter");

function setMessageEventName(type) {
    switch (type) {
        case "insert":
            return "messageInsert";
        case "update":
        case "replace":
            return "messageUpdate";
        case "delete":
            return "messageDelete";
        default:
            return null;
    }
}

function setGroupChatEventName(type) {
    switch (type) {
        case "insert":
            return "groupChatInsert";
        case "update":
        case "replace":
            return "groupChatUpdate";
        case "delete":
            return "groupChatDelete";
        default:
            return null;
    }
}

const handleConversationMessage = (changeData, includeUpdatedFields = false) => {
    if (changeData.module !== "chats") return;

    const doc = changeData.data?._doc || changeData.data || changeData.fullDocument || {};
    if (!doc.groupChatId) return;

    const groupChatId = String(doc.groupChatId);
    const eventName = setMessageEventName(changeData.type);

    if (!eventName) return;

    // Room pattern: conversation_${groupChatId}
    const conversationIdentifier = `conversation_${groupChatId}`;

    const relatedRooms = socketRef.rooms.filter((x) =>
        x.roomName.includes(conversationIdentifier)
    );

    const emittedSockets = new Set();

    relatedRooms.forEach((data) => {
        if (emittedSockets.has(data.socketId)) return;

        const conversation = `${conversationIdentifier}**${data.socketId}`;

        const matchingRooms = [
            ...new Set(
                Array.from(data.namespace.adapter.rooms.keys()).filter((roomName) => {
                    let socId = roomName.split("**");
                    if (socId.length > 1 && socId[1] === data.socketId) {
                        return (
                            roomName.includes(conversation) &&
                            data.roomName.includes(conversation)
                        );
                    }
                    return false;
                })
            ),
        ];

        const emitData = {
            fullDocument: doc,
            ...(includeUpdatedFields && { updatedFields: changeData.updatedFields }),
        };

        matchingRooms.forEach((room) => {
            if (!emittedSockets.has(data.socketId)) {
                data.namespace.to(room).emit(eventName, emitData);
                emittedSockets.add(data.socketId);
                console.log('[conversationSocket] Emitted', eventName, 'to room:', room);
            }
        });
    });
};

const handleGroupChatSidebar = (changeData, includeUpdatedFields = false) => {
    if (changeData.module !== "chats") return;

    const doc = changeData.data?._doc || changeData.data || changeData.fullDocument || {};
    if (!doc.groupChatId) return;

    const memberIds = doc.memberIds || [];
    if (!memberIds.length) return;

    const groupChatId = String(doc.groupChatId);
    const eventName = setGroupChatEventName(changeData.type);

    if (!eventName) return;

    // Emit tới room của TẤT CẢ members (giống chatSocket emit tới cả 2 users)
    memberIds.forEach((memberId) => {
        const odtorId = String(memberId);
        const chatIdentifier = `groupChat_${groupChatId}_${odtorId}`;

        const relatedRooms = socketRef.rooms.filter((x) =>
            x.roomName.includes(chatIdentifier)
        );

        relatedRooms.forEach((data) => {
            const chat = `${chatIdentifier}**${data.socketId}`;

            const matchingRooms = [
                ...new Set(
                    Array.from(data.namespace.adapter.rooms.keys()).filter((roomName) => {
                        let socId = roomName.split("**");
                        if (socId.length > 1 && socId[1] === data.socketId) {
                            return (
                                roomName.includes(chat) &&
                                data.roomName.includes(chat)
                            );
                        }
                        return false;
                    })
                ),
            ];

            const emitData = {
                fullDocument: {
                    _id: groupChatId,
                    id: groupChatId,
                    groupChatId: groupChatId,
                    // Latest message info cho sidebar
                    message: doc.message || "",
                    lastMessage: doc.createdAt || new Date(),
                    lastMessageTime: doc.createdAt || new Date(),
                    type: doc.type || "text",
                    userId: doc.userId || "",
                    mediaName: doc.mediaName || "",
                    mediaOriginalName: doc.mediaOriginalName || "",
                },
                ...(includeUpdatedFields && { updatedFields: changeData.updatedFields }),
            };

            matchingRooms.forEach((room) => {
                data.namespace.to(room).emit(eventName, emitData);
            });
        });
    });
};

const handleGroupChatMetaChange = (changeData, includeUpdatedFields = false) => {
    if (changeData.module !== "groupChat") return;

    const doc = changeData.data?._doc || changeData.data || changeData.fullDocument || {};
    if (!doc._id) return;

    const groupChatId = String(doc._id);
    const eventName = setGroupChatEventName(changeData.type);

    if (!eventName) return;

    const currentMembers = (doc.AssigneeUserId || []).map((id) => String(id));
    const addedMembers = (changeData.addedMembers || []).map(String);
    const removedMembers = (changeData.removedMembers || []).map(String);
    const createdBy = doc.createdBy ? String(doc.createdBy) : null;

    const allMembers = [
        ...new Set([...currentMembers, ...addedMembers, ...removedMembers, createdBy].filter(Boolean)),
    ];

    allMembers.forEach((memberId) => {
        const odtorId = String(memberId);
        const chatIdentifier = `groupChat_${groupChatId}_${odtorId}`;

        const relatedRooms = socketRef.rooms.filter((x) =>
            x.roomName.includes(chatIdentifier)
        );

        relatedRooms.forEach((data) => {
            const chat = `${chatIdentifier}**${data.socketId}`;

            const matchingRooms = [
                ...new Set(
                    Array.from(data.namespace.adapter.rooms.keys()).filter((roomName) => {
                        let socId = roomName.split("**");
                        if (socId.length > 1 && socId[1] === data.socketId) {
                            return (
                                roomName.includes(chat) &&
                                data.roomName.includes(chat)
                            );
                        }
                        return false;
                    })
                ),
            ];

            const emitData = {
                fullDocument: doc,
                addedMembers,
                removedMembers,
                ...(includeUpdatedFields && { updatedFields: changeData.updatedFields }),
            };

            matchingRooms.forEach((room) => {
                data.namespace.to(room).emit(eventName, emitData);
            });
        });
    });
};

const handleGroupChatNotifyNewGroup = (changeData) => {
    if (changeData.module !== "groupChat") return;

    const doc = changeData.data?._doc || changeData.data || changeData.fullDocument || {};
    if (!doc._id) return;

    const groupChatId = String(doc._id);

    const allMembers = (doc.AssigneeUserId || []).map(String);
    const createdBy = doc.createdBy ? String(doc.createdBy) : null;
    const membersToNotify = allMembers.filter(id => id !== createdBy);

    if (!membersToNotify.length) return;

    membersToNotify.forEach((memberId) => {
        const overviewRoom = `groupChatOverview_${memberId}`;

        const relatedRooms = socketRef.rooms.filter((x) =>
            x.roomName === overviewRoom
        );

        if (!relatedRooms.length) return;

        relatedRooms.forEach((data) => {
            const emitData = {
                fullDocument: {
                    ...doc,
                    id: groupChatId,
                    _id: groupChatId,
                    isGroupChat: true,
                },
                groupChatId,
            };

            data.namespace.to(data.roomName).emit("groupChatAdded", emitData);
        });
    });
};

exports.conversationSocketHandler = ({ socket, namespace }) => {
    socket.on("joinConversationRoom", (data, callback) => {
        try {
            const roomName = data.roomName;
            joinRoom(socket, roomName);
            socketRef.rooms.push({ roomName, socketId: data.socketId, namespace, socket });

            if (typeof callback === "function") {
                callback({ success: true, roomName });
            }
        } catch (err) {
            if (typeof callback === "function") {
                callback({ success: false, error: err.message });
            }
        }
    });

    socket.on("leaveConversationRoom", (roomName) => {
        try {
            let index = socketRef.rooms.findIndex((x) => x.roomName === roomName);
            if (index !== -1) {
                socketRef.rooms.splice(index, 1);
            }
            leaveRoom(socket, roomName);
        } catch (err) {
            console.error("leaveConversationRoom error:", err);
        }
    });
};

exports.groupChatOverviewSocketHandler = ({ socket, namespace }) => {
    socket.on("joinGroupChatOverview", (data, callback) => {
        try {
            const roomName = `groupChatOverview_${data.userId}`;
            joinRoom(socket, roomName);
            socketRef.rooms.push({ roomName, socketId: socket.id, namespace, socket });

            console.log('[groupChatOverview] User joined:', data.userId);

            if (typeof callback === "function") {
                callback({ success: true, roomName });
            }
        } catch (err) {
            console.error('[groupChatOverview] Error:', err);
            if (typeof callback === "function") {
                callback({ success: false, error: err.message });
            }
        }
    });

    socket.on("leaveGroupChatOverview", (data) => {
        const roomName = `groupChatOverview_${data.userId}`;
        let index = socketRef.rooms.findIndex((x) => x.roomName === roomName);
        if (index !== -1) {
            socketRef.rooms.splice(index, 1);
        }
        leaveRoom(socket, roomName);
    });
};

exports.groupChatSocketHandler = ({ socket, namespace }) => {
    socket.on("joinGroupChats", (data) => {
        const roomName = `groupChat_${data.groupChatId}_${data.userId}**${data.socketId}`;
        joinRoom(socket, roomName);
        socketRef.rooms.push({ roomName, socketId: data.socketId, namespace, socket });
    });

    socket.on("leaveGroupChats", (roomName) => {
        let index = socketRef.rooms.findIndex((x) => x.roomName === roomName);
        if (index !== -1) {
            socketRef.rooms.splice(index, 1);
        }
        leaveRoom(socket, roomName);
    });
};

socketEmitter.on("update", (changeData) => handleConversationMessage(changeData, true));
socketEmitter.on("insert", (changeData) => handleConversationMessage(changeData, false));

socketEmitter.on("update", (changeData) => handleGroupChatSidebar(changeData, true));
socketEmitter.on("insert", (changeData) => handleGroupChatSidebar(changeData, false));

socketEmitter.on("update", (changeData) => handleGroupChatMetaChange(changeData, true));
// socketEmitter.on("insert", (changeData) => handleGroupChatMetaChange(changeData, false));
socketEmitter.on("delete", (changeData) => handleGroupChatMetaChange(changeData, false));

socketEmitter.on("insert", (changeData) => handleGroupChatNotifyNewGroup(changeData));