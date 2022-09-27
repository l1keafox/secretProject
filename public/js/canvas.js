const requestAnimFrame = (function () {
    return (
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
  

let GAME = {
    // setting up inital values
    WIDTH:320,
    HEIGHT: 480,
    RATIO:null, // needed for screen sizing
    elementId:null, // this needs to be set 
    currentWidth:null,
    currentHeight:null,
    canvas:null,
    ctx:null,
    init:function(){
        this.RATIO = this.WIDTH / this.HEIGHT;
        this.currentHeight = this.WIDTH;
        this.currentHeight = this.HEIGHT;
        this.canvas = document.querySelector(elementId);
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        // This is for canvas api for 2d
        this.ctx = this.canvas.getContext("2d");
        // Resizn the width in proportion to the new neight
        this.currentWidth = this.currentHeight * GAME.RATIO;

        this.canvas.style.width = this.currentWidth + "px";
        this.canvas.style.height = this.currentHeight+ "px";

        window.setTimeout(()=>{window.scrollTo(0,1)} ,1);

        this.loop
    },
    loop:function(){
        requestAnimFrame(this.loop);
        this.render();
    },
    render:function(){

        // This is the background
        this.Draw.rect(0,0, this.WIDTH,this.HEIGHT,"#036");

        // Then we draw game objects.
    },
    Draw:{
        rect: function(x,y,w,h,col){
            this.ctx.fillStyle = col;
            this.ctx.fillRect(x,y,w,h);
        },
    }

}