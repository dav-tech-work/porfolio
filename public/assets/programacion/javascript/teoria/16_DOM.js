// ACCESO AL DOM

// obtener acceso al elemento
const h1 = document.querySelector("h1"); // selecciona el primer h1 que encuentre en el documento HTML

// obtener la información a partir del acceso
console.log(h1.textContent); // devuelve el contenido del texto del h1 seleccionado (Título principal) 

// Cómo cambiar el contenido del texto
h1.textContent = "Título principal cambiado"; // cambia el contenido del texto del h1 seleccionado

function cambiaH1() { // función que cambia el contenido del texto del h1 seleccionado al hacer clic en el botón
  alert("Has hecho clic en el h1"); // muestra un mensaje de alerta
}

// Sistema 2
const h2 = document.querySelector("h2"); // selecciona el primer h2 que encuentre en el documento HTML

h2.onclick = () => { // al hacer clic en el h2 seleccionado
  h2.style.color = "red"; // cambia el color del texto del h2 seleccionado a rojo
};
h2.ondblclick = () => { // al hacer doble clic en el h2 seleccionado
  h2.style.fontSize = "64px"; // cambia el tamaño del texto del h2 seleccionado a 64px
};

// Sistema 3
const h3 = document.querySelector("h3");  // selecciona el primer h3 que encuentre en el documento HTML

h3.addEventListener("click", () => { // al hacer clic en el h3 seleccionado 
  h3.style.backgroundColor = "darkgreen"; // cambia el color de fondo del h3 seleccionado a verde oscuro
  alert(h3.textContent);  // muestra un mensaje de alerta con el contenido del texto del h3 seleccionado
  h3.style.color = "white"; // cambia el color del texto del h3 seleccionado a blanco
});

// Selección múltiple
const parrafos = document.querySelectorAll("p"); // selecciona todos los elementos p que encuentre en el documento HTML
console.log(`Hay ${parrafos.length} nodos p`); // muestra en consola cuántos elementos p hay en el documento HTML

let ponteAzul = true;   // variable que indica si el color de fondo de los elementos p seleccionados es azul o no
for (let i = 0; i < parrafos.length; i++) { // recorre todos los elementos p seleccionados 
  parrafos[i].addEventListener("click", () => { // al hacer clic en un elemento p seleccionado
    if (ponteAzul) { // si el color de fondo de los elementos p seleccionados es azul
      parrafos[i].style.backgroundColor = "steelblue"; // cambia el color de fondo del elemento p seleccionado a azul acero
      parrafos[i].style.color = "white";  // cambia el color del texto del elemento p seleccionado a blanco
      ponteAzul = false; // cambia el valor de la variable ponteAzul a false
    } else { // si el color de fondo de los elementos p seleccionados no es azul
      parrafos[i].style.backgroundColor = "white"; // cambia el color de fondo del elemento p seleccionado a blanco
      parrafos[i].style.color = "black"; // cambia el color del texto del elemento
      ponteAzul = true;
    }
  });
}

const div = document.querySelector("div");

div.addEventListener("click", () => {
  div.innerHTML = "<h2>Soy un h2 nuevo</h2>";
});

// Otros eventos
// Cuando el cursor se pone encima del elemento seleccionado
h1.addEventListener("mouseover", () => {
  h1.style.backgroundColor = "tomato";
  h1.style.color = "white";
});
// Cuando el cursor se pone fuera del elemento seleccionado
h1.addEventListener("mouseout", () => {
  h1.style.backgroundColor = "black";
  h1.style.color = "white";
});