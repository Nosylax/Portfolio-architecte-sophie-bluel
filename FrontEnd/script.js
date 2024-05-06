async function get_projects() {
  const response = await fetch("http://localhost:5678/api/works");
  const projects = await response.json();

  return projects;
}

async function display_projects(id_category) {
  console.log(id_category);
  let projects = await get_projects();
  if (id_category != undefined) {
    projects = projects.filter(function (project) {
      return project.categoryId == id_category;
    });
  }
  console.log(projects);
  const gallery = document.querySelector(".gallery");
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
    figure_element.appendChild(description_element);
  }
}

let category_selected = 0;

async function get_category() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  console.log(categories);
  return categories;
}
async function display_categories() {
  const categories = await get_category();
  const filter = document.querySelector(".filter");

  const all_element = document.createElement("button");
  all_element.innerHTML = "Tous";
  all_element.classList = "button button_selected";

  all_element.addEventListener("click", async function () {
    await display_projects();
  });

  filter.appendChild(all_element);

  for (i in categories) {
    const button_element = document.createElement("button");
    button_element.innerHTML = categories[i].name;
    button_element.id = categories[i].id;
    button_element.classList = "button";

    button_element.addEventListener("click", async function () {
      await display_projects(button_element.id);
      button_element.classList = "button button_selected";
    });

    filter.appendChild(button_element);
  }
}

display_projects();
display_categories();
