

async function amInGame(){
  setTimeout(async() => {
    const response = await fetch(`/api/game/status`, {
//      method: "GET",
      //    body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response,response.status);
    if(response.status === 201){
      document.location.replace("/tower");
    } else {
      amInGame();
    }
  }, 1000);
}

async function joinGame(event) {
    event.preventDefault();

    const response = await fetch(`/api/game/join`, {
        method: "PUT",
        //    body: JSON.stringify({ userName, password }),
        headers: { "Content-Type": "application/json" },
      });
    console.log(response.status);
    if(response.status === 200){
        console.log("Status is good, update here on if there's an game. Maybe we use a status object?");
        amInGame();

    }
    console.log("Looking for Game?");
  }

document.querySelector("#joinGame").addEventListener("click", joinGame);
