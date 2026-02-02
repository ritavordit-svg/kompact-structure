const socketRef = require('../socketinit');
const {joinRoom,leaveRoom} = require('../helper');
const socketEmitter = require('../../event/socketEventEmitter');
exports.commentSocketHandler = ({socket, namespace}) => {
    socket.on('joinCommentRoom',(data)=>{
        const roomName = data.roomName;
        joinRoom(socket,roomName);
        socketRef.rooms.push({roomName, socketId: data.socketId,namespace,socket});
    });
    socket.on('leaveCommentRoom',(roomName)=>{
        let index = socketRef.rooms.findIndex((x)=> x.roomName === roomName);        
        if (index !== -1) {
            socketRef.rooms.splice(index, 1);
        }
        leaveRoom(socket,roomName);
    })
}
function setEventName(type) {
    let eventName;
    switch (type) {
        case 'insert': { 
            eventName = 'commentInsert'
            break;
        }
        case 'update': { 
            eventName = 'commentUpdate'
            break;
        }
        case 'delete': { 
            eventName = 'commentDelete'
            break;
        }
        case 'replace': { 
            eventName = 'commentReplace'
            break;
        }
    }
    return eventName;
}
const handleCommentChange = (changeData, includeUpdatedFields = false) => {
    if (changeData.module === 'comments') {
        const comentIdentifier = `comments_${JSON.parse(JSON.stringify(changeData.data)).projectId}_${JSON.parse(JSON.stringify(changeData.data)).sprintId}_${JSON.parse(JSON.stringify(changeData.data)).taskId}`;
        const relatedRooms = socketRef.rooms.filter(x => x.roomName.includes(comentIdentifier));
        
        relatedRooms.forEach(data => {
            const eventName = setEventName(changeData.type);
            const comment = `${comentIdentifier}**${data.socketId}`;
            const matchingRooms = [...new Set(
                Array.from(data.namespace.adapter.rooms.keys())
                    .filter((roomName) => {
                        let socId = roomName.split("**");
                        if (socId.length > 1 && socId[1] === data.socketId) {
                            return (
                                (roomName.includes(comment) && data.roomName.includes(comment)) 
                            )
                        }
                    })
            )];
            const emitData = {
                fullDocument: changeData.data,
                ...(includeUpdatedFields && { updatedFields: changeData.updatedFields })
            };

            matchingRooms.forEach(room => {
                data.namespace.to(room).emit(`${eventName}`, emitData);
            });
        });
    }

    if (changeData.module === 'comments_project') {
        const comentProjectIdentifier = `comments_project_${JSON.parse(JSON.stringify(changeData.data)).projectId}`;
        const relatedRooms = socketRef.rooms.filter(x => x.roomName.includes(comentProjectIdentifier));
        
        relatedRooms.forEach(data => {
            const eventName = setEventName(changeData.type);
            const commentProject = `${comentProjectIdentifier}**${data.socketId}`;
            const matchingRooms = [...new Set(
                Array.from(data.namespace.adapter.rooms.keys())
                    .filter((roomName) => {
                        let socId = roomName.split("**");
                        if (socId.length > 1 && socId[1] === data.socketId) {
                            return (
                                (roomName.includes(commentProject) && data.roomName.includes(commentProject)) 
                            )
                        }
                    })
            )];
            const emitData = {
                fullDocument: changeData.data,
                ...(includeUpdatedFields && { updatedFields: changeData.updatedFields })
            };

            matchingRooms.forEach(room => {
                data.namespace.to(room).emit(`${eventName}`, emitData);
            });
        });
    }
};

socketEmitter.on('update', changeData => handleCommentChange(changeData, true));
socketEmitter.on('insert', changeData => handleCommentChange(changeData, false));