// const requestAnimFrame = (function () {
//   return (
//     window.requestAnimationFrame ||
//     window.webkitRequestAnimationFrame ||
//     window.mozRequestAnimationFrame ||
//     window.oRequestAnimationFrame ||
//     window.msRequestAnimationFrame ||
//     function (callback) {
//       window.setTimeout(callback, 1000 / 60);
//     }
//   );
// })();

// var GAME = {
//   // set up some initial values
//   WIDTH: 320,
//   HEIGHT: 480,
//   nextBubble: 0,
//   entities: [],
//   // we'll set the rest of these
//   // in the init function
//   RATIO: null,
//   currentWidth: null,
//   currentHeight: null,
//   canvas: null,
//   ctx: null,

//   init: function () {
//     // the proportion of width to height
//     GAME.RATIO = GAME.WIDTH / GAME.HEIGHT;
//     // these will change when the screen is resized
//     GAME.currentWidth = GAME.WIDTH;
//     GAME.currentHeight = GAME.HEIGHT;
//     // this is our canvas element
//     GAME.canvas = document.querySelector("#canvas");
//     // setting this is important
//     // otherwise the browser will
//     // default to 320 x 200
//     GAME.canvas.width = GAME.WIDTH;
//     GAME.canvas.height = GAME.HEIGHT;
//     // the canvas context enables us to
//     // interact with the canvas api
//     GAME.ctx = GAME.canvas.getContext("2d");

//     // we're ready to resize
//     //GAME.resize();
//     GAME.loop();
//   //},
// //  resize: function () {
//     GAME.currentHeight = window.innerHeight;
//     // resize the width in proportion
//     // to the new height
//     GAME.currentWidth = GAME.currentHeight * GAME.RATIO;

//     // this will create some extra space on the
//     // page, allowing us to scroll past
//     // the address bar, thus hiding it.
//     if (GAME.android || GAME.ios) {
//       document.body.style.height = window.innerHeight + 50 + "px";
//     }

//     // set the new canvas style width and height
//     // note: our canvas is still 320 x 480, but
//     // we're essentially scaling it with CSS
//     GAME.canvas.style.width = GAME.currentWidth + "px";
//     GAME.canvas.style.height = GAME.currentHeight + "px";

//     // we use a timeout here because some mobile
//     // browsers don't fire if there is not
//     // a short delay
//     window.setTimeout(function () {
//       window.scrollTo(0, 1);
//     }, 1);
//   },

//   update: function () {
//     GAME.nextBubble -= 1;
//     // if the counter is less than zero
//     if (GAME.nextBubble < 0) {
//       // put a new instance of bubble into our entities array
//       GAME.entities.push(new GAME.Bubble());
//       // reset the counter with a random value
//       GAME.nextBubble = Math.random() * 100 + 100;
//     }
//     // cycle through all entities and update as necessary
//     for (i = 0; i < GAME.entities.length; i += 1) {
//       GAME.entities[i].update();

//       // delete from array if remove property
//       // flag is set to true
//       if (GAME.entities[i].remove) {
//         GAME.entities.splice(i, 1);
//       }
//     }
//   },
//   render: function () {
//     var i;

//     GAME.Draw.rect(0, 0, GAME.WIDTH, GAME.HEIGHT, "#036");

//     // cycle through all entities and render to canvas
//     for (i = 0; i < GAME.entities.length; i += 1) {
//       GAME.entities[i].render();
//     }
//   },
//   loop: function () {
//     requestAnimFrame(GAME.loop);

//     GAME.update();
//     GAME.render();
//   },

//   Draw : {
//     clear: function () {
//       GAME.ctx.clearRect(0, 0, GAME.WIDTH, GAME.HEIGHT);
//     },
  
//     rect: function (x, y, w, h, col) {
//       GAME.ctx.fillStyle = col;
//       GAME.ctx.fillRect(x, y, w, h);
//     },
  
//     circle: function (x, y, r, col) {
//       GAME.ctx.fillStyle = col;
//       GAME.ctx.beginPath();
//       GAME.ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
//       GAME.ctx.closePath();
//       GAME.ctx.fill();
//     },
  
//     text: function (string, x, y, size, col) {
//       GAME.ctx.font = "bold " + size + "px Monospace";
//       GAME.ctx.fillStyle = col;
//       GAME.ctx.fillText(string, x, y);
//     },
//   },
//   Bubble : function () {
//     this.type = "bubble";
//     this.r = 5; // the radius of the bubble
//     this.x = 100;
//     this.y = GAME.HEIGHT + 100; // make sure it starts off screen
//     this.remove = false;
  
//     this.update = function () {
//       // move up the screen by 1 pixel
//       this.y -= 1;
  
//       // if off screen, flag for removal
//       if (this.y < -10) {
//         this.remove = true;
//       }
//     };
  
//     this.render = function () {
//       GAME.Draw.circle(this.x, this.y, this.r, "rgba(255,255,255,1)");
//     };
//   },
// };
var socket = io();

//GAME.init();
//GAME.resize();
var form = document.querySelector('#form');
var input = document.querySelector('#input');
var logout = document.querySelector("#logout");
logout.addEventListener('click',async function(e){
  e.preventDefault();
  try{
    const response = await fetch("/api/users/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Logout Failed");
    }
  }catch (err){
    console.log(err);
  }
});

form.addEventListener('submit', function(e) {
  e.preventDefault();
  if (input.value) {
    const userString = localStorage.getItem("userName");
    socket.emit('chat message', userString+": "+input.value);
    input.value = '';
  }
});
var messages = document.getElementById('messages');

socket.on('chat message', function(msg) {
  // e.preventDefault();
  // let prsed = JSON.parse(msg);
  messages.innerHTML = '';
  for(let text of msg){
    var item = document.createElement('li');
    item.textContent = text;
    messages.appendChild(item);
  }
  window.scrollTo(0, document.body.scrollHeight);

});