import { useState } from 'react';

export default function AdminPanel({ pedidos, setPedidos, menu, setMenu }) {
  // Estado para alternar entre las dos pestañas de administración
  const [vistaActual, setVistaActual] = useState('pedidos'); // 'pedidos' o 'menu'

  // Lógica de estados y función para avanzar al siguiente estado
  const estadosOrden = ['Pedido Recibido','En Preparacion','Esperando al Repartidor','En camino','Finalizado'];

  const nextEstado = (current) => {
    const idx = estadosOrden.indexOf(current);
    if (idx === -1) return estadosOrden[0];
    return idx === estadosOrden.length - 1 ? estadosOrden[idx] : estadosOrden[idx + 1];
  };

  const marcarComoListo = (idPedido) => {
    const current = pedidos.find(p => p.id === idPedido);
    const next = nextEstado(current ? current.estado : undefined);
    setPedidos(prev => prev.map(p => p.id === idPedido ? { ...p, estado: next } : p));
    console.log('AdminPanel.jsx -> marcarComoListo:', { idPedido, next });
  };

  // ==========================================
  // 2. INTERFAZ: MODIFICAR MENÚ (usa `menu` y `setMenu` pasados desde App)
  const modificarProducto = (id, campo, nuevoValor) => {
    const menuActualizado = menu.map(producto => {
      if (producto.id === id) {
        return { ...producto, [campo]: nuevoValor };
      }
      return producto;
    });
    if (setMenu) setMenu(menuActualizado);
  };

  return (
    <div className="admin-panel">
      <h2 className="admin-title">⚙️ Panel de Administración</h2>
      
      <div className="admin-nav">
        <button 
          onClick={() => setVistaActual('pedidos')}
          className={`admin-tab ${vistaActual === 'pedidos' ? 'active' : ''}`}
        >
          Pedidos Activos
        </button>
        <button 
          onClick={() => setVistaActual('menu')}
          className={`admin-tab ${vistaActual === 'menu' ? 'active' : ''}`}
        >
          Modificar Menú
        </button>
      </div>

      <div className="admin-section">
        {vistaActual === 'pedidos' ? (
          <>
            <h3 className="admin-section-title">🕒 Pedidos en Proceso</h3>
            {pedidos.length === 0 ? (
              <p className="admin-empty">No hay pedidos pendientes. ¡Buen trabajo!</p>
            ) : (
              [...pedidos].reverse().map(pedido => {
                const isFinal = pedido.estado === estadosOrden[estadosOrden.length - 1];
                const nextLabel = nextEstado(pedido.estado);
                return (
                  <div key={pedido.id} className="admin-order-card">
                    <div className="admin-order-info">
                      <strong className="admin-order-client">Pedido #{pedido.id}</strong>
                      <p className="admin-order-text">{pedido.orden}</p>
                      <p className="admin-order-status">Estado: {pedido.estado}</p>
                      {/*Info Cliente*/}
                      <p className="admin-order-client-info">
                        <strong>Nombre:</strong> {pedido.cliente || pedido.nombre}<br />
                        <strong>DNI:</strong> {pedido.dni}<br />
                        <strong>Teléfono:</strong> {pedido.numero}<br />
                        <strong>Dirección:</strong> {pedido.direccion}<br />
                        <strong>Anotaciones:</strong> {pedido.indicaciones || pedido.Indicaciones}
                      </p>
                    </div>
                    <button
                      onClick={() => { if (!isFinal) marcarComoListo(pedido.id); }}
                      className={`admin-button ${isFinal ? 'admin-button-disabled' : 'admin-button-primary'}`}
                      disabled={isFinal}
                      title={isFinal ? 'Pedido finalizado' : `Avanzar a: ${nextLabel}`}
                    >
                      {isFinal ? 'Finalizado' : `Avanzar ➜ ${nextLabel}`}
                    </button>
                  </div>
                );
              })
            )}
          </>
        ) : (
          <>
            <h3 className="admin-section-title">🍔 Editar Productos</h3>
            <div className="admin-products">
              {menu.map(producto => (
                <div key={producto.id} className="admin-product-card">
                  <div className="admin-form-group">
                    <label>Nombre:</label>
                    <input 
                      className="admin-input"
                      type="text" 
                      value={producto.nombre} 
                      onChange={(e) => modificarProducto(producto.id, 'nombre', e.target.value)} 
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Precio (S/):</label>
                    <input 
                      className="admin-input"
                      type="number" 
                      step="0.10"
                      value={producto.precio} 
                      onChange={(e) => modificarProducto(producto.id, 'precio', parseFloat(e.target.value))} 
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Descripción:</label>
                    <textarea 
                      className="admin-textarea"
                      value={producto.descripcion} 
                      onChange={(e) => modificarProducto(producto.id, 'descripcion', e.target.value)} 
                    />
                  </div>

                  <div className="admin-form-group">
                    <label>Ruta de Imagen:</label>
                    <input 
                      className="admin-input"
                      type="text" 
                      value={producto.imagen} 
                      onChange={(e) => modificarProducto(producto.id, 'imagen', e.target.value)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}