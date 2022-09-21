// IMPORTING DEPENDENCIES:
const path = require("path");

//express
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

//sequelize
const SequelizeStore = require("connect-session-sequelize")(session.Store);

const routes = require("./controllers");
const sequelize = require("./config/connection");

//if we are using any helpers
//const helpers = require('');

const app = express();

//Io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const ioPORT = process.env.PORT || 3000;
let convo;
server.listen(ioPORT, () => {
  console.log('listening on *:3000');
});

io.on('connection', (socket) => {
  console.log('connection open');
  socket.on('chat message', (msg) => {
    if(!convo) convo = [];
    convo.push(msg);
    console.log(convo);
    io.emit('chat message', convo);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });  
});
//server port
const PORT = process.env.PORT || 3001;

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

//if we are use any helpers // we need this for engine.
const hbs = exphbs.create({});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening http://localhost:3001/"));
// });
