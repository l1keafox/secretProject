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
const scoring = (socket) => {
highScore();
  socket.on('getScore',(msg) => {
    let scoreArray = [];
    io.emit('currentScore',scoreArray);
  });

};
module.exports = scoring;
