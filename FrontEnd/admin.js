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
