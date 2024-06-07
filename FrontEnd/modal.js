function handle_display_modal() {
  const modal_triggers = document.querySelectorAll(".modal_trigger");

  modal_triggers.forEach((trigger) =>
    trigger.addEventListener("click", toggle_modal)
  );
}

handle_display_modal();

function toggle_modal() {
  const modal_container = document.querySelector(".modal_container");
  modal_container.classList.toggle("active");
}

get_projects();
display_projects(-1, true);
