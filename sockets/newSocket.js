let convo;

const newSocket = (socket) => {
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
};
module.exports = newSocket;
