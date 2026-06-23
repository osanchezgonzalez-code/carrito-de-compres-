const listaCarrito = document.getElementById('lista-carrito');
const listaCarritoOffcanvas = document.getElementById('lista-carrito-offcanvas');
const contadorCarrito = document.getElementById('contador-carrito');

// Helper: returns number of real product items (excludes placeholder items that say 'No hay productos')
function countRealItems(listEl) {
  if (!listEl) return 0;
  const lis = Array.from(listEl.getElementsByTagName('li'));
  return lis.filter(li => li.textContent.trim() !== 'No hay productos').length;
}

function ensurePlaceholderIfEmpty(listEl) {
  if (!listEl) return;
  const realCount = countRealItems(listEl);
  if (realCount === 0) {
    listEl.innerHTML = '';
    const liVacio = document.createElement('li');
    liVacio.className = 'list-group-item text-muted text-center';
    liVacio.textContent = 'No hay productos';
    listEl.appendChild(liVacio);
  }
}

function updateCounter() {
  if (!contadorCarrito) return;
  const total = countRealItems(listaCarritoOffcanvas);
  contadorCarrito.textContent = total;
}

function agregarProducto(nombreProducto) {
  // Guardas por si los elementos no existen
  if (!listaCarrito || !listaCarritoOffcanvas) return;

  // Remover placeholder si existe
  if (countRealItems(listaCarrito) === 0) listaCarrito.innerHTML = '';
  if (countRealItems(listaCarritoOffcanvas) === 0) listaCarritoOffcanvas.innerHTML = '';

  const li = document.createElement('li');
  li.className = 'list-group-item agregado';
  li.textContent = nombreProducto;
  listaCarrito.appendChild(li);

  const liOff = document.createElement('li');
  liOff.className = 'list-group-item agregado';
  liOff.textContent = nombreProducto;
  listaCarritoOffcanvas.appendChild(liOff);

  // Quitar clase agregado después de 1s
  setTimeout(() => {
    li.classList.remove('agregado');
    liOff.classList.remove('agregado');
  }, 1000);

  updateCounter();
}

function eliminarProducto() {
  if (!listaCarrito || !listaCarritoOffcanvas) return;

  // Remove last real item from main list
  const items = Array.from(listaCarrito.getElementsByTagName('li'))
    .filter(li => li.textContent.trim() !== 'No hay productos');
  if (items.length > 0) {
    const ultimo = items[items.length - 1];
    ultimo.classList.add('eliminado');
    setTimeout(() => {
      ultimo.remove();
      ensurePlaceholderIfEmpty(listaCarrito);
    }, 500);
  }

  // Remove last real item from offcanvas list
  const itemsOff = Array.from(listaCarritoOffcanvas.getElementsByTagName('li'))
    .filter(li => li.textContent.trim() !== 'No hay productos');
  if (itemsOff.length > 0) {
    const ultimoOff = itemsOff[itemsOff.length - 1];
    ultimoOff.classList.add('eliminado');
    setTimeout(() => {
      ultimoOff.remove();
      ensurePlaceholderIfEmpty(listaCarritoOffcanvas);
      updateCounter();
    }, 500);
  } else {
    // Ensure counter updates even if offcanvas had no real items
    updateCounter();
  }
}

// Initialize counter on load
document.addEventListener('DOMContentLoaded', () => {
  // Ensure placeholders present if empty
  ensurePlaceholderIfEmpty(listaCarrito);
  ensurePlaceholderIfEmpty(listaCarritoOffcanvas);
  updateCounter();
});