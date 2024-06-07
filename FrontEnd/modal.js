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

async function display_project_modal() {
  let projects = await get_projects();
  const gallery_modal = document.querySelector(".modal_gallery");

  for (i in projects) {
    const modal_figure_element = document.createElement("figure");

    const modal_image_element = document.createElement("img");
    modal_image_element.src = projects[i].imageUrl;

    const modal_image_trash = document.createElement("i");
    modal_image_trash.classList.add("fa-solid", "fa-trash-can");

    modal_figure_element.appendChild(modal_image_trash);
    modal_figure_element.appendChild(modal_image_element);
    gallery_modal.appendChild(modal_figure_element);
  }
}
get_projects();
display_project_modal();
