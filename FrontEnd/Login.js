function login() {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => {
      console.log(response);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      outputElement.textContent = JSON.stringify(data, null, 2);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

const login_forms = document.querySelector("submit");
login_forms.addEventListener("click", function (event) {
  event.preventDefault();
  login();
});
