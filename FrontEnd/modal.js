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

async function delete_project(id) {
  const delete_project = await fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + window.localStorage.getItem("token"),
    },
  });
  if (delete_project.status == 204) {
    display_projects(-1, true);
    display_projects(-1, false);
  }
}

async function hydrate_select_category() {
  const select = document.getElementById("categories");
  const categories = await get_category();
  for (let category of categories) {
    const option = new Option(category.name, category.id);
    select.appendChild(option);
  }
}
hydrate_select_category();

async function add_picture() {}

function previewImage() {
  const file_input = document.getElementById("file-upload");
  const file = file_input.files[0];
  const image_preview_container = document.getElementById(
    "previewImageContainer"
  );

  if (file.type.match("image.*")) {
    const reader = new FileReader();

    reader.addEventListener("load", function (event) {
      const imageUrl = event.target.result;
      const image = new Image();

      image.addEventListener("load", function () {
        image_preview_container.innerHTML = "";
        image_preview_container.appendChild(image);
      });

      image.src = imageUrl;
      image.style.width = "129px";
      image.style.height = "169px";
    });

    reader.readAsDataURL(file);
  }
}

const button_add_picture = document.getElementById("file-upload");
const icone = document.querySelector(".fa-image");
button_add_picture.addEventListener("change", function () {
  previewImage();

  document.querySelector(".upload_button_container").style.display = "none";
});

const form = document.forms.namedItem("modal_add_image");

form.addEventListener(
  "submit",
  async (event) => {
    event.preventDefault();
    const output = document.querySelector("#output");
    const formData = new FormData(form);
    const request = await fetch("http://localhost:5678/api/works/", {
      method: "POST",
      body: formData,
      headers: {
        Authorization: "Bearer " + window.localStorage.getItem("token"),
      },
    });

    console.log(window.localStorage.getItem("token"));

    if (request.status === 201) {
      output.innerHTML = "Fichier téléversé !";
      display_projects(-1, true);
      display_projects(-1, false);
      event.target.reset();
    } else {
      output.innerHTML =
        "Erreur lors de la tentative de téléversement du fichier.";
    }
  },
  false
);
