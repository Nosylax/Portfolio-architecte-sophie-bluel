function is_connected() {
  const is_connected = window.localStorage.getItem("token");
  if (is_connected) {
    return true;
  } else {
    return false;
  }
}

function display_admin_element() {
  const admin_element = document.querySelectorAll(".admin-element");
  admin_element.forEach(function (element) {
    console.log(element);
    if (is_connected()) {
      element.classList.remove("hidden");
    } else {
      element.classList.add("hidden");
    }
  });
}

display_admin_element();

function hide_login() {
  const log_element = document.querySelector(".login");
  if (is_connected()) {
    log_element.classList.add("hidden");
  } else {
    log_element.classList.remove("hidden");
  }
}

hide_login();

function hide_logout() {
  const logout_element = document.querySelector(".logout");
  if (is_connected()) {
    logout_element.classList.remove("hidden");
  } else {
    logout_element.classList.add("hidden");
  }
}

hide_logout();

function hide_filter() {
  const log_element = document.querySelector(".filter");
  if (is_connected()) {
    log_element.classList.add("hidden");
  }
}

hide_filter();

function hide_custom() {
  const custom_element = document.querySelector(".custom");
  if (is_connected()) {
    custom_element.classList.remove("hidden");
  } else {
    custom_element.classList.add("hidden");
  }
}

hide_custom();

const remove_token = document.querySelector(".logout");
remove_token.addEventListener("click", function () {
  window.localStorage.removeItem("token");
});
