// Array para almacenar los productos en el carrito
const carrito = [];
 
// Función para renderizar productos
function renderizarProductos() {
  const contenedorProductos = document.getElementById('productos'); // Selecciona el contenedor de productos

  productos.forEach(producto => {
    const elementoProducto = document.createElement('div');
    elementoProducto.className = 'col-md-4 margin_bottom1'; // Ajusta la clase según tu diseño
    elementoProducto.innerHTML = `
      <div class="product_box">
        <h2>${producto.nombre}</h2>
        <img src="${producto.imagen}" alt="${producto.nombre}" width="150">
        <p>Precio: $${producto.precio}</p>
        <button onclick="agregarAlCarrito('${producto.nombre}', ${producto.precio})">Agregar al Carrito</button>
      </div>
    `;
    contenedorProductos.appendChild(elementoProducto);
  });
}

// Función para agregar productos al carrito
function agregarAlCarrito(nombre, precio) {
  // Busca si el producto ya está en el carrito
  const productoEnCarrito = carrito.find(item => item.nombre === nombre);

  if (productoEnCarrito) {
    // Si el producto ya está en el carrito, aumenta la cantidad
    productoEnCarrito.cantidad++;
  } else {
    // Si el producto no está en el carrito, agrégalo con cantidad 1
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  // llamar a actualizarCarrito
  actualizarCarrito();
}

// Función para actualizar el carrito
function actualizarCarrito() {
  const contenedorItemsCarrito = document.getElementById('items-carrito');
  const totalCarritoElemento = document.getElementById('total-carrito');

  contenedorItemsCarrito.innerHTML = '';
  let total = 0;

  carrito.forEach((item, index) => {
    const elementoItemCarrito = document.createElement('li');
    elementoItemCarrito.className = 'item-carrito';

    const nombreItem = document.createElement('span');
    nombreItem.textContent = `${item.nombre} (Precio Unitario: $${item.precio}) x${item.cantidad}`;

    const controlesItem = document.createElement('div');

    const botonAumentar = document.createElement('button');
    botonAumentar.textContent = '+';
    botonAumentar.onclick = () => aumentarCantidad(index);
    botonAumentar.style.marginRight = '5px'; // Ajusta el margen derecho


    const botonDisminuir = document.createElement('button');
    botonDisminuir.textContent = '-';
    botonDisminuir.onclick = () => disminuirCantidad(index);
    botonDisminuir.style.marginLeft = '5px'; // Ajusta el margen izquierdo


    const botonEliminar = document.createElement('button');
    botonEliminar.textContent = 'Eliminar';
    botonEliminar.onclick = () => eliminarItem(index);
    botonEliminar.style.marginLeft = '10px'; // Ajusta el margen izquierdo


    controlesItem.appendChild(botonDisminuir);
    controlesItem.appendChild(botonAumentar);
    controlesItem.appendChild(botonEliminar);

    elementoItemCarrito.appendChild(nombreItem);
    elementoItemCarrito.appendChild(controlesItem);

    contenedorItemsCarrito.appendChild(elementoItemCarrito);
    total += item.precio * item.cantidad;
  });

  totalCarritoElemento.textContent = total.toFixed(2);
}

// Función para aumentar la cantidad de un artículo en el carrito
function aumentarCantidad(index) {
  // Verificar si el índice es válido
  if (index >= 0 && index < carrito.length) {
    carrito[index].cantidad++;
  }

  // Llamar a actualizarCarrito
  actualizarCarrito();
}

// Función para disminuir la cantidad de un artículo en el carrito
function disminuirCantidad(index) {
  // Verificar si el índice es válido y la cantidad es mayor a 1
  if (index >= 0 && index < carrito.length && carrito[index].cantidad > 1) {
    carrito[index].cantidad--;
  }

  // Llamar  a actualizarCarrito
  actualizarCarrito();
}

// Función para eliminar un artículo del carrito
function eliminarItem(index) {
  // Verificar si el índice es válido
  if (index >= 0 && index < carrito.length) {
    carrito.splice(index, 1); // Eliminar el artículo del array
  }

  //Llamar a actualizarCarrito
  actualizarCarrito();
}

// Función para vaciar todo el contenido del carrito
function vaciarCarrito() {
carrito.length = 0; // Vacía el array del carrito
actualizarCarrito(); // Actualiza la presentación del carrito
}