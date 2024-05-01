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

get_projects();
