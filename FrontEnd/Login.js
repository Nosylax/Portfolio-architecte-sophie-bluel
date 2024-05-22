function login() {
  const email_value = document.getElementById("email").value;
  const password_value = document.getElementById("password").value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: email_value,
      password: password_value,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  }).then(async (response) => {
    console.log(response);
    const error_message = document.querySelector(".error_message");
    if (response.ok) {
      error_message.style.visibility = "hidden";
      let json = await response.json();
      window.localStorage.setItem("token", json.token);
      window.location.replace("http://127.0.0.1:5500/FrontEnd/index.html");
    } else {
      console.error("Erreur lors de la connexion.");
      error_message.style.visibility = "visible";
    }
  });
}

const connect_button = document.getElementById("connect_button");
connect_button.addEventListener("click", function (event) {
  event.preventDefault();
  login();
});
