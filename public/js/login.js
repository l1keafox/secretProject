//const { response } = require("express");

const loginFormHandler = async (event) => {
  event.preventDefault();

  const userName = document.querySelector("#username-log").value.trim();
  const password = document.querySelector("#password-log").value.trim();

  if (userName && password) {
    try{
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ userName, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      localStorage.setItem("userName",userName);
      document.location.replace("/");
    } else {
      alert("Login Failed");
    }
  }catch(err){
    console.log(err);
  }
  }
};



async function signupFormHandler(event) {
  event.preventDefault();

  
  const userName = document.querySelector("#username-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();
  let latitude;
  let longitude;
  async function success(position) {
    const reponse = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({
        username: userName,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });
    if (reponse.ok) {
      localStorage.setItem("userName",userName);
      document.location.replace("/");
    } else {
      console.log("404");
    }
  }

  console.log("success");
  navigator.geolocation.getCurrentPosition(success, success);
}
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);

document.querySelector(".signup-form").addEventListener("submit", signupFormHandler);
