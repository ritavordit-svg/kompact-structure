exports.joinRoom = (soket,roomName) => {
    soket.join(roomName);
}

exports.leaveRoom = (soket,roomName) => {
    soket.leave(roomName);
}