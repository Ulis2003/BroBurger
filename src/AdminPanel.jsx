import { useState } from 'react';

export default function AdminPanel() {
  // Estado para alternar entre las dos pestañas de administración
  const [vistaActual, setVistaActual] = useState('pedidos'); // 'pedidos' o 'menu'

  // ==========================================
  // 1. INTERFAZ: PEDIDOS ACTIVOS
  // ==========================================
  // Simulamos nuestro "ArrayList" de pedidos
  const [pedidos, setPedidos] = useState([
    { id: 101, cliente: 'Bruce', orden: '1x Bro Clásica, 1x Gaseosa', estado: 'En proceso' },
    { id: 102, cliente: 'Mateo', orden: '2x Mega Bacon Bro', estado: 'En proceso' }
  ]);

  // Función para cambiar el estado (lo sacamos de la lista al completarlo)
  const marcarComoListo = (idPedido) => {
    const pedidosActualizados = pedidos.filter(pedido => pedido.id !== idPedido);
    setPedidos(pedidosActualizados);
  };

  // ==========================================
  // 2. INTERFAZ: MODIFICAR MENÚ
  // ==========================================
  // Simulamos nuestro "ArrayList" del menú
  const [menu, setMenu] = useState([
    { id: 1, nombre: 'Bro Clásica', precio: 8.50, descripcion: 'Carne de res premium, queso cheddar...', imagen: 'burger1.jpg' },
    { id: 2, nombre: 'Mega Bacon Bro', precio: 11.00, descripcion: 'Doble carne, doble queso cheddar...', imagen: 'burger2.jpg' },
    { id: 3, nombre: 'Bro Crispy Chicken', precio: 9.50, descripcion: 'Pollo crujiente, ensalada col...', imagen: 'burger3.jpg' }
  ]);

  // Función para modificar cualquier campo de un producto
  const modificarProducto = (id, campo, nuevoValor) => {
    const menuActualizado = menu.map(producto => {
      if (producto.id === id) {
        return { ...producto, [campo]: nuevoValor };
      }
      return producto;
    });
    setMenu(menuActualizado);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#d32f2f' }}>⚙️ Panel de Administración</h2>
      
      {/* Botones de navegación */}
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setVistaActual('pedidos')}
          style={{ padding: '10px', backgroundColor: vistaActual === 'pedidos' ? '#333' : '#ddd', color: vistaActual === 'pedidos' ? '#fff' : '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Pedidos Activos
        </button>
        <button 
          onClick={() => setVistaActual('menu')}
          style={{ padding: '10px', backgroundColor: vistaActual === 'menu' ? '#333' : '#ddd', color: vistaActual === 'menu' ? '#fff' : '#000', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
        >
          Modificar Menú
        </button>
      </div>

      {/* RENDERIZADO CONDICIONAL DE VISTAS */}
      {vistaActual === 'pedidos' ? (
        // --- VISTA DE PEDIDOS ---
        <div>
          <h3>🕒 Pedidos en Proceso</h3>
          {pedidos.length === 0 ? (
            <p>No hay pedidos pendientes. ¡Buen trabajo!</p>
          ) : (
            pedidos.map(pedido => (
              <div key={pedido.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Pedido #{pedido.id} - {pedido.cliente}</strong>
                  <p style={{ margin: '5px 0 0 0' }}>{pedido.orden}</p>
                </div>
                <button 
                  onClick={() => marcarComoListo(pedido.id)}
                  style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '10px 15px', borderRadius: '5px', cursor: 'pointer' }}
                >
                  Marcar Listo ✓
                </button>
              </div>
            ))
          )}
        </div>
      ) : (
        // --- VISTA DE MODIFICAR MENÚ ---
        <div>
          <h3>🍔 Editar Productos</h3>
          {menu.map(producto => (
            <div key={producto.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '15px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              
              <label>Nombre:</label>
              <input 
                type="text" 
                value={producto.nombre} 
                onChange={(e) => modificarProducto(producto.id, 'nombre', e.target.value)} 
                style={{ padding: '8px' }}
              />

              <label>Precio (S/):</label>
              <input 
                type="number" 
                step="0.10"
                value={producto.precio} 
                onChange={(e) => modificarProducto(producto.id, 'precio', parseFloat(e.target.value))} 
                style={{ padding: '8px' }}
              />

              <label>Descripción:</label>
              <textarea 
                value={producto.descripcion} 
                onChange={(e) => modificarProducto(producto.id, 'descripcion', e.target.value)} 
                style={{ padding: '8px', minHeight: '60px' }}
              />

              <label>Ruta de Imagen:</label>
              <input 
                type="text" 
                value={producto.imagen} 
                onChange={(e) => modificarProducto(producto.id, 'imagen', e.target.value)} 
                style={{ padding: '8px' }}
              />
              
            </div>
          ))}
        </div>
      )}
    </div>
  );
}