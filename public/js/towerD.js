// Client side towerD.js logic.
var socket;
const proms = new Promise((resolve, reject) => {
     socket = io();
    function doLoop() {
      setTimeout(() => {
        if (socket.id) {
          resolve(socket);
        }
        doLoop();
      }, 50);
    }
    doLoop();
  });

  
async function getGameInfo() {
//    event.preventDefault();

    const response = await fetch(`/api/game/status`, {
        method: "GET",
        //    body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
      });
    let rsult = await response.json();
    console.log(response,rsult,"dasf");
    gameInfo = rsult;
    return rsult;
  }

let gameInfo;
getGameInfo();
socket = io();

// const response = await fetch(`/api/users/auth/id/${socket.id}`, {
//     method: "PUT",
//     //    body: JSON.stringify({ userName, password }),
//     headers: { "Content-Type": "application/json" },
//   });
//   console.log("authicating user:", response);

// Let's wait a bit for the client communication.
// So called load time, this is designed to make sure
// the above data has been async'd
let localGameCache;
setTimeout(async function(){
    if(gameInfo){
      //  var socket = await io();
        console.log("listening on", gameInfo.id,socket.id );
        socket.on(gameInfo.id, obj => {
            localGameCache = obj;
          });

        GAME.init('#towerD'); //pass it the object ID that it's creating on
        GAME.render = function(){
            GAME.Draw.rect(0,0, GAME.WIDTH,GAME.HEIGHT,"#306");
            if(localGameCache){
                for(let gameObj in localGameCache){
//                    console.log(gameObj);
                }
            }
        }
    }
}, 1000); 