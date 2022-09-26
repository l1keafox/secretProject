let convo;

const chatting = (socket) => {
  console.log("Chat Connection", socket.id);
  if (!convo) convo = [];
  io.emit("chat message", convo);
  socket.on("chat message", (msg) => {
    convo.push(msg);
    if (convo.length > 10) {
      convo.shift();
    }
    io.emit("chat message", convo);
  });
};
module.exports = chatting;
