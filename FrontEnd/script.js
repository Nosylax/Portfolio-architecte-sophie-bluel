async function get_projects() {
  const response = await fetch("http://localhost:5678/api/works");
  const projects = await response.json();
  console.log(projects);

  const gallery = document.querySelector(".gallery");

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

async function get_categories() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  console.log(categories);

  const filter = document.querySelector(".filter");

  const all_element = document.createElement("button");
  all_element.innerHTML = "Tous";
  all_element.classList = "button button_selected";

  filter.appendChild(all_element);
  for (i in categories) {
    const button_element = document.createElement("button");
    button_element.innerHTML = categories[i].name;
    button_element.classList = "button button_unselected";

    filter.appendChild(button_element);
  }
}

get_projects();
get_categories();
