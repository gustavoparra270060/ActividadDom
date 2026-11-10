import { PortafolioService, Proyecto } from "./portafolioService.js";

const formulario = document.getElementById("formProyecto");
const contenedor = document.querySelector(".projects__container");

const servicio = new PortafolioService();

function textoALista(texto) {
  return texto
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter((item) => item !== "");
}

function crearSeccionLista(titulo, items) {
  const fragmento = document.createDocumentFragment();

  const p = document.createElement("p");
  const strong = document.createElement("strong");
  strong.textContent = titulo;
  p.appendChild(strong);

  const div = document.createElement("div");
  div.classList.add("projects__section");
  const ul = document.createElement("ul");
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    ul.appendChild(li);
  });
  div.appendChild(ul);

  fragmento.appendChild(p);
  fragmento.appendChild(div);
  return fragmento;
}

function crearTarjeta(proyecto) {
  const tarjeta = document.createElement("div");
  tarjeta.id = `${proyecto.id}-project`;
  tarjeta.classList.add("project");

  const titulo = document.createElement("h3");
  titulo.textContent = proyecto.nombre;

  const descripcion = document.createElement("p");
  descripcion.textContent = proyecto.descripcion;

  const repo = document.createElement("div");
  repo.textContent = `Puedes encontrar el repositorio en ${proyecto.repositorio}`;

  tarjeta.appendChild(titulo);
  tarjeta.appendChild(descripcion);
  tarjeta.appendChild(crearSeccionLista("Tecnologias", proyecto.tecnologias));
  tarjeta.appendChild(crearSeccionLista("Coolaboradores", proyecto.coolaboradores));
  tarjeta.appendChild(repo);

  return tarjeta;
}

function mostrarProyectos() {
  contenedor.innerHTML = ""; 
  servicio.getProyectos().forEach((proyecto) => {
    contenedor.appendChild(crearTarjeta(proyecto));
  });
}

formulario.addEventListener("submit", (evento) => {
  evento.preventDefault(); 

  const datos = new FormData(formulario);

  const proyecto = new Proyecto(
    datos.get("name").trim(),
    textoALista(datos.get("tecnologies")),
    datos.get("description").trim(),
    textoALista(datos.get("contributors")),
    datos.get("repository").trim()
  );

  servicio.guardarProyecto(proyecto); 
  mostrarProyectos();
  formulario.reset();
});
