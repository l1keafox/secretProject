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
const { System, getBounceDirection,Circle, Point} =require("detect-collisions");
const physics = new System();
//if we are using any helpers
//const helpers = require('');

const app = express();

//Io
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cookie: true
});
const ioPORT = process.env.PORT || 3000;
let convo;
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
io.on('connection', (socket) => {
  console.log('connection open',socket.id);
  /// How would we get session cookie?
  io.emit('chat message', convo);

  socket.on('getScore',(msg) => {
    let scoreArray = [];

    io.emit('currentScore',scoreArray);
  });

  socket.on('chat message', (msg) => {
    if(!convo) convo = [];
    convo.push(msg);
    console.log(convo);
    if(convo.length > 10){
      convo.shift();
    }
    io.emit('chat message', convo);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });  
  socket.on("click",(msg)=>{

    console.log("getting click from?",msg,msg.x);1
    let body = new Point(msg.x,msg.y);
    body.setPosition(msg.x,msg.y);
    physics.update();
  //  console.log(body);
//    let i = bubbleArray.length;
    
//    while(i--){
//      let bubb = bubbleArray[i];
      let nearBy = bubblePhysics;// physics.getPotentials(body);
      console.log(nearBy.length);
      nearBy.forEach((collider) => {
        function testCollision(position, radius = 10) {
          const circle = physics.createCircle(position, radius);
          const getPotentials = physics.getPotentials(circle);
          const collided = potentials.some((body) =>
            physics.checkCollision(circle, body)
          );
        
          physics.remove(circle);
        
          return collided;
        }        
        //let body = n
        // new Point(msg.x,msg.y)
        //bubblePhysics
        //console.log(body,collider,physics.checkCollision(body, collider));
//        if (physics.checkCollision(body, collider)) {
       //   handleCollisions(physics.response);
      //     console.log('TEST? H ITS');
          // if(global.userDataObj[global.idTooUserObj[socket.id]] ){
          //   global.userDataObj[global.idTooUserObj[socket.id]].score+=bubb.score;
          // }
      
          // bubbleArray.splice(i,1);

       // } else {
        //  console.log('failure to hit?',nearBy.length);
       // }
      });
      
      //if(bubb.x )
      // let badd = 10;
      // if((bubb.x - msg.x < badd) && (bubb.x - msg.x > -badd ) && (bubb.y - msg.y < badd) && (bubb.y - msg.y > -badd ) ){
      //   bubb.hits--;
      //   if(bubb.hits <= 0){
      //   }
      //   break;
      // }
//    }
  });

  
});
function highScore(){
  let scoreArray = [];
  for(let id in global.userDataObj){
    if(global.userDataObj[id].score){
      scoreArray.push(global.userDataObj[id]);
    }
  }

  scoreArray.sort(function (a, b) {
    return (a.score - b.score)*-1;
  });
  io.emit('highScore',scoreArray);

  // recheck score.
  setTimeout(() => {
    highScore();
  }, 1000);
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
    this.speed = (Math.floor( Math.random()*7)+1 * 0.01) + 0.3
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
let bubblePhysics = [];
function doLoop(i) {
//  console.log('Doin Game Loops',nextBubble);
//  nextBubble--;
  if(nextBubble<= 0){
    nextBubble = bubbleTimer;
    let newBubble = new Bubble();
    let position = {x:5,y:5};
 //   newBubble.circle = new Circle(position, 5,{});
    //const circle = new Circle(position, radius, options);
//    newBubble.circle.setPosition(newBubble.x, newBubble.y);
//console.log(newBubble.circle);
//    physics.insert(newBubble.circle);
    const circle = physics.createCircle(position, 5, {});
    bubblePhysics.push(circle);
//    console.log("Collsion Circle","CREATED",bubblePhysics.length);
    bubbleArray.push(newBubble);

    //    console.log("creating bubble:",bubbleArray);
  //  console.log('number of bubbles',bubbleArray.length);
    // if(bubbleArray.length > 30){
    //   bubbleArray.shift();
    // }
  }
  // UPdate
  let index = bubbleArray.length;
  while(index--){
    let bubb = bubbleArray[index];
    bubb.update();
    bubblePhysics[index].setPosition(bubb.x,bubb.y);
     if(bubbleArray[index].y <= -10){
       bubbleArray.splice(index,1);
       bubblePhysics.pop();
       break;
     }
  }


  io.emit('gameLoop', bubbleArray);
  setTimeout(() => {
    doLoop(++i);
  }, 1000/frames)
}

doLoop(0);
highScore();

