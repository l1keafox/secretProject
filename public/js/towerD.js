// Client side towerD.js logic.

const proms = new Promise((resolve, reject) => {
    var socket = io();
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
      console.log(response);
    let rsult = await response.json();
    return rsult;
  }

let gameInfo;
gameInfo = getGameInfo();
//let socket = await proms;

// const response = await fetch(`/api/users/auth/id/${socket.id}`, {
//     method: "PUT",
//     //    body: JSON.stringify({ userName, password }),
//     headers: { "Content-Type": "application/json" },
//   });
//   console.log("authicating user:", response);

// Let's wait a bit for the client communication.
// So called load time, this is designed to make sure
// the above data has been async'd

setTimeout(function(){
    if(gameInfo){

    }
}, 1000); 