// Affichage des modales
function handle_display_modal() {
  const open_modal_link = document.querySelector(".open_modal");
  open_modal_link.addEventListener("click", function () {
    document.getElementById("delete_modal").classList.add("active");
  });
  const back_modal_arrow = document.querySelector(".back_modal");
  back_modal_arrow.addEventListener("click", function () {
    document.getElementById("delete_modal").classList.add("active");
    document.getElementById("add_modal").classList.remove("active");
  });

  let next_modal = document.querySelector(".add_picture");

  next_modal.addEventListener("click", function () {
    document.getElementById("delete_modal").classList.remove("active");
    document.getElementById("add_modal").classList.add("active");
  });
}

handle_display_modal();

// Affichage des modales
function toggle_modal() {
  const modal_container = document.querySelector(".modal_container");
  modal_container.classList.toggle("active");
}

// Fermeture des modales
function handle_close_modal() {
  const close_modal = document.querySelectorAll(".close_modal");
  close_modal.forEach((trigger) =>
    trigger.addEventListener("click", function () {
      document.getElementById("delete_modal").classList.remove("active");
      document.getElementById("add_modal").classList.remove("active");
    })
  );
  document.addEventListener("click", function (event) {
    console.log(event.target);
    const parent = event.target.closest(".modal");
    const modal_container = event.target.closest(".modal_container");

    if (modal_container && !parent) {
      document.getElementById("delete_modal").classList.remove("active");
      document.getElementById("add_modal").classList.remove("active");
    }
  });
}

handle_close_modal();
get_projects();
display_projects(-1, true);

//Suppression projet
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
//Ajout des catégories dans le système de selection de la modale
async function hydrate_select_category() {
  const select = document.getElementById("categories");
  const categories = await get_category();
  for (let category of categories) {
    const option = new Option(category.name, category.id);
    select.appendChild(option);
  }
}
hydrate_select_category();

// Apercue de l'image envoyé
function preview_image() {
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
      image.classList.add("image_preview");
    });

    reader.readAsDataURL(file);
  }
  is_champ3_completed = true;
  verify_required_input();
}

const button_add_picture = document.getElementById("file-upload");
const icone = document.querySelector(".fa-image");
const upload_button_container = document.querySelector(
  ".upload_button_container"
);
button_add_picture.addEventListener("change", function () {
  preview_image();
  verify_required_input();
  upload_button_container.classList.add("hidde");
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
      output.innerHTML = "Photo ajouté !";
      display_projects(-1, true);
      display_projects(-1, false);
      event.target.reset();
      reset_image_preview();
      verify_required_input();
    }
  },
  false
);

//Suppression de l'apercie de l'image après son envoie ok
function reset_image_preview() {
  const image = previewImageContainer.querySelector("img");
  const upload_button_container = document.querySelector(
    ".upload_button_container"
  );
  if (image) {
    previewImageContainer.removeChild(image);
    upload_button_container.classList.remove("hidde");
  }
}

//Vérification des chammps requis pour envoi du formulaire
function verify_required_input() {
  const boutonSubmit = document.getElementById("submit_add");
  const champ1 = document.getElementById("title");
  const champ2 = document.getElementById("categories");
  const file_input = document.getElementById("file-upload");
  const file = file_input.files[0];
  const champsRemplis = champ1.value !== "" && champ2.value !== "" && file;

  if (champsRemplis) {
    boutonSubmit.classList.add("submit_button_modal_selected");
    boutonSubmit.disabled = false;
  } else {
    boutonSubmit.classList.remove("submit_button_modal_selected");
    boutonSubmit.disabled = true;
  }
}
const champ1 = document.getElementById("title");
const champ2 = document.getElementById("categories");
champ1.addEventListener("input", verify_required_input);
champ2.addEventListener("input", verify_required_input);
