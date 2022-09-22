const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 30);
    }
  );
})();
var localMsgCache;
var localGameCache;

var GAME = {
  // set up some initial values
  WIDTH: 320,
  HEIGHT: 480,
  nextBubble: 0,
  entities: [],
  // we'll set the rest of these
  // in the init function
  RATIO: null,
  currentWidth: null,
  currentHeight: null,
  canvas: null,
  ctx: null,

  init: function () {
    // the proportion of width to height
    GAME.RATIO = GAME.WIDTH / GAME.HEIGHT;
    // these will change when the screen is resized
    GAME.currentWidth = GAME.WIDTH;
    GAME.currentHeight = GAME.HEIGHT;
    // this is our canvas element
    GAME.canvas = document.querySelector("#canvas");
    // setting this is important
    // otherwise the browser will
    // default to 320 x 200
    GAME.canvas.width = GAME.WIDTH;
    GAME.canvas.height = GAME.HEIGHT;
    // the canvas context enables us to
    // interact with the canvas api
    GAME.ctx = GAME.canvas.getContext("2d");

    // we're ready to resize
    //GAME.resize();
    GAME.loop();
  //},
//  resize: function () {
//    GAME.currentHeight = window.innerHeight;
    // resize the width in proportion
    // to the new height
    GAME.currentWidth = GAME.currentHeight * GAME.RATIO;

    // this will create some extra space on the
    // page, allowing us to scroll past
    // the address bar, thus hiding it.
    if (GAME.android || GAME.ios) {
      document.body.style.height = window.innerHeight + 50 + "px";
    }

    // set the new canvas style width and height
    // note: our canvas is still 320 x 480, but
    // we're essentially scaling it with CSS
    GAME.canvas.style.width = GAME.currentWidth + "px";
    GAME.canvas.style.height = GAME.currentHeight + "px";

    // we use a timeout here because some mobile
    // browsers don't fire if there is not
    // a short delay
    window.setTimeout(function () {
      window.scrollTo(0, 1);
    }, 1);
  },


  // Update will be removed, pretty much all update will be done server side.
  update: function () {
    GAME.nextBubble -= 1;
    // if the counter is less than zero
    if (GAME.nextBubble < 0) {
      // put a new instance of bubble into our entities array
      GAME.entities.push(new GAME.Bubble());
      // reset the counter with a random value
      GAME.nextBubble = Math.random() * 100 + 100;
    }
    // cycle through all entities and update as necessary
    for (i = 0; i < GAME.entities.length; i += 1) {
      GAME.entities[i].update();

      // delete from array if remove property
      // flag is set to true
      if (GAME.entities[i].remove || Gamepad.entities[i].y < -10) {
        GAME.entities.splice(i, 1);
      }
    }
  },
  render: function () {
    var i;

    GAME.Draw.rect(0, 0, GAME.WIDTH, GAME.HEIGHT, "#036");

    // cycle through all entities and render to canvas
    if(localGameCache){
      for(let gameObj of localGameCache){
        let ditto = GAME.Draw.circle(gameObj.x, gameObj.y, gameObj.r, "rgba(255,255,255,1)");
//        console.log(ditto,gameObj.x,gameObj.y, gameObj.r);
      }
    }
    

     //Maybe this is where we update chat?
     var messages = document.getElementById('messages');
     if(localMsgCache){
      messages.innerHTML = '';
      for(let text of localMsgCache){
          var item = document.createElement('li');
          item.textContent = text;
          messages.appendChild(item);
        }
      }
   //  localMsgCache = msg;
     window.scrollTo(0, document.body.scrollHeight);
   

  },
  loop: function () {
    requestAnimFrame(GAME.loop);

//    GAME.update();
    GAME.render();
  },

  Draw : {
    clear: function () {
      GAME.ctx.clearRect(0, 0, GAME.WIDTH, GAME.HEIGHT);
    },
  
    rect: function (x, y, w, h, col) {
      GAME.ctx.fillStyle = col;
      GAME.ctx.fillRect(x, y, w, h);
    },
  
    circle: function (x, y, r, col) {
      GAME.ctx.fillStyle = col;
      GAME.ctx.beginPath();
      GAME.ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
      GAME.ctx.closePath();
      GAME.ctx.fill();
    },
  
    text: function (string, x, y, size, col) {
      GAME.ctx.font = "bold " + size + "px Monospace";
      GAME.ctx.fillStyle = col;
      GAME.ctx.fillText(string, x, y);
    },
  },
  Bubble : function () {
    this.type = "bubble";
    this.r = 5; // the radius of the bubble
    this.x = 100;
    this.y = GAME.HEIGHT + 100; // make sure it starts off screen
    this.remove = false;
  
    this.update = function () {
      // move up the screen by 1 pixel
      this.y -= 1;
  
      // if off screen, flag for removal
      if (this.y < -10) {
        this.remove = true;
      }
    };
  
    this.render = function () {
      GAME.Draw.circle(this.x, this.y, this.r, "rgba(255,255,255,1)");
    };
  },
};

const proms = new Promise((resolve, reject) => {
  var socket = io();
  setTimeout(() => {
    if (socket.id) {
        resolve(socket);
    }
  }, 1000);
});

async function startGame(){
  let socket = await proms;
  console.log(socket.id,socket,"What is it?");
  const response = await fetch(`/api/users/auth/id/${socket.id}`, {
    method: "PUT",
//    body: JSON.stringify({ userName, password }),
    headers: { "Content-Type": "application/json" },
  });
  console.log('authicating user:',response);

  var thisUser;
  GAME.init();
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
  socket.on('chat message', function(msg) {
    localMsgCache = msg;
  //  console.log(localMsgCache);
  });
  
  socket.on('gameLoop', obj =>{
    localGameCache = obj;
  })
  
  let Input = {
  
    x: 0,
    y: 0,
    tapped :false,
  
    set: function(data) {
      var offsetTop = GAME.canvas.offsetTop,
      offsetLeft = GAME.canvas.offsetLeft;
        this.x = data.pageX - offsetLeft;
        this.y = data.pageY - offsetTop;      
        this.tapped = true;
        console.log('Tapped!',{x:this.x,y:this.y});
        socket.emit('click',{x:this.x,y:this.y});
        GAME.Draw.circle(this.x, this.y, 10, 'red');
    }
  
  };
  // listen for clicks
  GAME.canvas.addEventListener('click', function(e) {
    e.preventDefault();
  //  POP.Input.set(e);
      Input.set(e);
  }, false);
}
// here we send the id to the server?
//socket.emit('linkUser',{userName:,id:socket.id});
startGame()

