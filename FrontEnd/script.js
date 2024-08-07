//Recupération des projets
async function get_projects() {
  const response = await fetch("http://localhost:5678/api/works");
  const projects = await response.json();

  return projects;
}

//Affichage des projets en fonction de la catégorie
async function display_projects(id_category, is_modal) {
  let projects = await get_projects();
  if (id_category != -1) {
    projects = projects.filter(function (project) {
      return project.categoryId == id_category;
    });
  }
  console.log(projects);
  const gallery = document.querySelector(
    is_modal ? ".modal_gallery" : ".gallery"
  );

  //Affichage des projets
  gallery.innerHTML = "";
  for (i in projects) {
    const figure_element = document.createElement("figure");

    const image_element = document.createElement("img");
    image_element.src = projects[i].imageUrl;
    image_element.alt = projects[i].title;

    const description_element = document.createElement("figcaption");
    description_element.innerHTML = projects[i].title;

    figure_element.appendChild(image_element);
    gallery.appendChild(figure_element);
    if (is_modal) {
      const modal_image_trash = document.createElement("i");
      modal_image_trash.classList.add("fa-solid", "fa-trash-can");
      modal_image_trash.id = projects[i].id;
      modal_image_trash.addEventListener("click", function (event) {
        window.localStorage.removeItem("figure");
        delete_project(modal_image_trash.id);

        console.log(modal_image_trash.id);
      });
      figure_element.appendChild(modal_image_trash);
    } else {
      const description_element = document.createElement("figcaption");
      description_element.innerHTML = projects[i].title;
      figure_element.appendChild(description_element);
    }
  }
}

let category_selected = 0;
// Récupération des catégories
async function get_category() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  return categories;
}
//Création des boutons de filtre + Evenement au click
async function display_categories() {
  const categories = await get_category();
  categories.unshift({ id: -1, name: "Tous" });
  const filter = document.querySelector(".filter");

  for (i in categories) {
    const button_element = document.createElement("button");
    button_element.innerHTML = categories[i].name;
    button_element.id = categories[i].id;
    if (i == 0) {
      button_element.classList.add("button_selected");
    }
    button_element.classList.add("button");

    button_element.addEventListener("click", async function (event) {
      console.log(event);
      await display_projects(button_element.id);
      update_button_selection(event);
    });

    filter.appendChild(button_element);
  }
}
// Style des boutons des filtres par catégories
function update_button_selection(event) {
  const buttons = document.querySelectorAll(".button");
  buttons.forEach((button) => button.classList.remove("button_selected"));
  event.target.classList.add("button_selected");
}

display_projects(-1, false);
display_categories();
