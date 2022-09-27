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
// This is cheating, I wish there was an way
// to grab this server that is created.
global.io = new Server(server, {
  cookie: true
});
const ioPORT = process.env.PORT || 3000;


server.listen(ioPORT, () => {
  console.log('listening on http://localHost:3000');
});
// io.engine.on("headers", (headers, request) => {
//   if (!request.headers.cookie) return;
//   const cookies = parse(request.headers.cookie);
//   if (!cookies.randomId) {
//     headers["set-cookie"] = serialize("randomId", "abc", { maxAge: 86400 });
//   }
// });
const {newConnection,chatting,scoring} = require('./sockets');

io.on('connection', newConnection );
io.on('connection', chatting );
io.on('connection', scoring);
io.on('connection', (socket) => {
  socket.on("click",(msg)=>{
    console.log("getting click from?",msg,msg.x);1
    let i = bubbleArray.length;
    
    while(i--){
      let bubb = bubbleArray[i];
      if(distance(bubb.x+bubb.r,bubb.y+bubb.r,msg.x,msg.y) < bubb.r){
        bubb.hits--;
        console.log('hitted!');
        if(bubb.hits <= 0){
          bubbleArray.splice(i,1);
        }
      }
    }
  });
});

function distance(x1,y1,x2,y2){
  let a =Math.abs (x1-x2);
  let b =Math.abs (y1-y2);
  return Math.sqrt((a*a)+(b*b))
}


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



class Bubble{
  constructor(){
    this.type = "bubble";
    this.r =  Math.floor( Math.random()*10)+3; // the radius of the bubble
    this.x = Math.floor( Math.random()*320);
    this.y = 480; // make sure it starts off screen
    let rando = Math.floor( Math.random()*5)+1;
    this.speed = (Math.floor( Math.random()*7)+.05 * 0.001) + 0.2
    this.hits = rando;
    this.score = rando;
  }
  update(){
    this.y -= this.speed;
  
  }
  render(){
    return 'circle';
  }
}
// sequelize.sync({ force: false }).then(() => {
//   app.listen(PORT, () => console.log("Now listening http://localhost:3001/"));
// });
let frames = 60;
let nextBubble = 0;
let bubbleTimer = 40;
let bubbleArray = [];
function doLoop(i) {
//  console.log('Doin Game Loops',nextBubble);
  nextBubble--;
  if(nextBubble<= 0){
    nextBubble = bubbleTimer;
    let newBubble = new Bubble();
    bubbleArray.push(newBubble);
  }
  // UPdate
  let index = bubbleArray.length;
  while(index--){
    let bubb = bubbleArray[index];
    bubb.update();
     if(bubbleArray[index].y <= -10){
       bubbleArray.splice(index,1);
       break;
     }
  }


  io.emit('gameLoop', bubbleArray);
  setTimeout(() => {
    doLoop(++i);
  }, 1000/frames)
}

doLoop(0);

let {Engine} = require("./engine");
Engine.init();
//Engine