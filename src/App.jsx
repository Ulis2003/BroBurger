import React, { useState } from 'react';
import './App.css';
import MiscelaneaFooter from './MiscelaneaFooter';
import Pago from './Pago';

const INITIAL_MENU = [
  {
    id: 1,
    nombre: "Bro Clásica",
    categoria: "Bro Clásica",
    descripcion: "Carne de res premium, queso cheddar, lechuga, tomate y la salsa secreta Bro.",
    precio: 8.50,
    imagen: "bro_clasica.png"
  },
  {
    id: 2,
    nombre: "Mega Bacon Bro",
    categoria: "Bro Clásica",
    descripcion: "Doble carne, doble queso cheddar, tiras de tocino crocante y salsa BBQ.",
    precio: 11.00,
    imagen: "mega_bacon.png"
  },
  {
    id: 3,
    nombre: "Bro Crispy Chicken",
    categoria: "Bro Clásica",
    descripcion: "Pollo crujiente, ensalada col, pepinillos y mayonesa ahumada.",
    precio: 9.50,
    imagen: "crispy_chicken.png"
  },
  {
    id: 4,
    nombre: "Bro Combo Clásico",
    categoria: "Bro Combo",
    descripcion: "Bro Clásica + Papas fritas medianas + Bebida personal.",
    precio: 14.50,
    imagen: "combo_clasico.png"
  },
  {
    id: 5,
    nombre: "Bro Combo Mega Bacon",
    categoria: "Bro Combo",
    descripcion: "Mega Bacon Bro + Papas fritas grandes + Bebida personal.",
    precio: 17.00,
    imagen: "combo_mega_bacon.png"
  },
  {
  id: 6,
  nombre: "Papas Fritas Medianas",
  categoria: "Papas",
  descripcion: "Papas fritas doradas y crujientes.",
  precio: 5.50,
  imagen: "papas_medianas.png"
  },
  {
  id: 7,
  nombre: "Papas Fritas Grandes",
  categoria: "Papas",
  descripcion: "Porción grande de papas fritas.",
  precio: 7.50,
  imagen: "papas_grandes.png"
  },
  {
  id: 8,
  nombre: "Papas con Queso",
  categoria: "Papas",
  descripcion: "Papas fritas cubiertas con salsa de queso cheddar.",
  precio: 8.50,
  imagen: "papas_queso.png"
  },
  {
  id: 9,
  nombre: "Gaseosa Personal",
  categoria: "Bebidas",
  descripcion: "Bebida gaseosa de 500ml.",
  precio: 3.50,
  imagen: "gaseosa_personal.png"
  },
  {
  id: 10,
  nombre: "Gaseosa Familiar",
  categoria: "Bebidas",
  descripcion: "Bebida gaseosa de 1.5L.",
  precio: 7.50,
  imagen: "gaseosa_familiar.png"
  },
  {
  id: 11,
  nombre: "Limonada Frozen",
  categoria: "Bebidas",
  descripcion: "Limonada helada preparada al momento.",
  precio: 6.00,
  imagen: "limonada_frozen.png"
  },
  {
  id: 12,
  nombre: "Milkshake de Vainilla",
  categoria: "Bebidas",
  descripcion: "Batido cremoso de vainilla.",
  precio: 9.00,
  imagen: "milkshake_vainilla.png"
  },
  {
  id: 13,
  nombre: "Brownie con Helado",
  categoria: "Postres",
  descripcion: "Brownie tibio acompañado de helado de vainilla.",
  precio: 10.50,
  imagen: "brownie_helado.png"
  },
  {
  id: 14,
  nombre: "Pie de Manzana",
  categoria: "Postres",
  descripcion: "Porción de pie de manzana artesanal.",
  precio: 7.50,
  imagen: "pie_manzana.png"
  }
];

function App() {
  // Estados de la tienda cliente
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [carrito, setCarrito] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');


  // Estados exclusivos del Panel de Administración
  const [esAdmin, setEsAdmin] = useState(false);
  const [vistaAdmin, setVistaAdmin] = useState('pedidos'); // 'pedidos' o 'menu'
  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: "Cliente #241", orden: "1x Mega Bacon Bro, 1x Bro Clásica", total: 19.50 }
  ]);

  /**/
  const [pantalla, setPantalla] = useState("App");
  if(pantalla === "Pago") return <Pago carrito={carrito} volverMenu={()=> {setPantalla("App")}}/>;
  /**/

  // --- FUNCIONES DEL CARRITO ---
  const agregarAlPedido = (producto) => {
    setCarrito((prevCarrito) => {
      const existe = prevCarrito.find(item => item.id === producto.id);
      if (existe) {
        return prevCarrito.map(item => 
          item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const restarDelPedido = (id) => {
    setCarrito((prevCarrito) => {
      const producto = prevCarrito.find(item => item.id === id);
      if (producto.cantidad === 1) {
        return prevCarrito.filter(item => item.id !== id);
      }
      return prevCarrito.map(item =>
        item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
      );
    });
  };

  const eliminarDelCarrito = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
  };

  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const totalPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0);

  // --- FUNCIÓN PARA PROCESAR COMPRA (Envía al admin) ---
  const gestionarConfirmacionCompra = () => {
    if (carrito.length === 0) return;

    const nuevoPedido = {
      id: pedidos.length + 1,
      cliente: `Cliente #${Math.floor(100 + Math.random() * 900)}`,
      orden: carrito.map(item => `${item.cantidad}x ${item.nombre}`).join(', '),
      total: totalPagar
    };

    setPedidos([...pedidos, nuevoPedido]);
    setCarrito([]);
    setIsModalOpen(false);
    alert("¡Tu pedido ha sido enviado a la cocina con éxito!");
  };

  // --- FUNCIONES DE ADMINISTRACIÓN ---
  const cambiarEstadoPedido = (idPedido) => {
    setPedidos(pedidos.filter(pedido => pedido.id !== idPedido));
  };

  const actualizarItemMenu = (id, campo, nuevoValor) => {
    setMenu(menu.map(producto => 
      producto.id === id ? { ...producto, [campo]: nuevoValor } : producto
    ));
  };

  // Filtrado de productos para la vista de cliente
  const productosFiltrados = categoriaSeleccionada === 'Todos'
    ? menu
    : menu.filter(producto => producto.categoria === categoriaSeleccionada);

  return (
    <div className="app-container">
      
      {/* Encabezado Principal */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1 className="logo" onClick={() => setEsAdmin(false)} style={{ cursor: 'pointer' }}>🍔 BroBurger</h1>
            <p className="slogan">¡Las mejores hamburguesas del barrio!</p>
          </div>
          
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            {/* Botón Switch de Vista Admin / Cliente */}
            <button 
              onClick={() => setEsAdmin(!esAdmin)}
              style={{
                backgroundColor: esAdmin ? '#007bff' : '#d32f2f',
                color: 'white',
                border: 'none',
                padding: '10px 15px',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '14px'
              }}
            >
              {esAdmin ? '🛒 Ver Tienda' : '⚙️ Panel Admin'}
            </button>

            {!esAdmin && (
              <div className="cart-badge" onClick={() => setIsModalOpen(true)}>
                <span>🛒 Productos: {cantidadTotal}</span>
                <span>Total: S/ {totalPagar.toFixed(2)}</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* RENDERIZADO CONDICIONAL: VISTA ADMIN vs VISTA TIENDA */}
      {esAdmin ? (
        /* ================= VISTA ADMINISTRADOR ================= */
        <main className="main-container" style={{ padding: '20px' }}>
          <h2 className="menu-title">⚙️ Panel de Administración</h2>
          
          {/* Navegación interna de Admin */}
          <div style={{ marginBottom: '25px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
            <button 
              onClick={() => setVistaAdmin('pedidos')}
              style={{
                padding: '10px 20px',
                backgroundColor: vistaAdmin === 'pedidos' ? '#333' : '#eee',
                color: vistaAdmin === 'pedidos' ? '#fff' : '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Pedidos Activos ({pedidos.length})
            </button>
            <button 
              onClick={() => setVistaAdmin('menu')}
              style={{
                padding: '10px 20px',
                backgroundColor: vistaAdmin === 'menu' ? '#333' : '#eee',
                color: vistaAdmin === 'menu' ? '#fff' : '#000',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}
            >
              Modificar Menú
            </button>
          </div>

          {/* Subvistas de Administración */}
          {vistaAdmin === 'pedidos' ? (
            <div style={{ maxWidth: '600px', margin: '0 auto' }}>
              <h3>🕒 Pedidos en preparación (Cambiar estado)</h3>
              {pedidos.length === 0 ? (
                <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>No hay pedidos en proceso por el momento.</p>
              ) : (
                pedidos.map(pedido => (
                  <div key={pedido.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <div>
                      <strong style={{ color: '#d32f2f' }}>{pedido.cliente}</strong>
                      <p style={{ margin: '5px 0', fontSize: '14px' }}>{pedido.orden}</p>
                      <small style={{ fontWeight: 'bold', color: '#333' }}>Total: S/ {pedido.total.toFixed(2)}</small>
                    </div>
                    <button 
                      onClick={() => cambiarEstadoPedido(pedido.id)}
                      style={{ backgroundColor: '#28a745', color: 'white', border: 'none', padding: '8px 12px', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                      Listo ✓
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : (
            <div style={{ maxWidth: '600px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <h3>🍔 List / Formulario de Modificación de Menú</h3>
              {menu.map(producto => (
                <div key={producto.id} style={{ border: '1px solid #ddd', padding: '20px', borderRadius: '8px', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', gap: '10px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                  
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Nombre:</label>
                    <input 
                      type="text" 
                      value={producto.nombre} 
                      onChange={(e) => actualizarItemMenu(producto.id, 'nombre', e.target.value)}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Precio (S/):</label>
                    <input 
                      type="number" 
                      step="0.10"
                      value={producto.precio} 
                      onChange={(e) => actualizarItemMenu(producto.id, 'precio', parseFloat(e.target.value) || 0)}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Descripción:</label>
                    <textarea 
                      value={producto.descripcion} 
                      onChange={(e) => actualizarItemMenu(producto.id, 'descripcion', e.target.value)}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px', minHeight: '60px', resize: 'vertical' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <label style={{ fontSize: '13px', fontWeight: 'bold', marginBottom: '4px' }}>Ruta de la Imagen:</label>
                    <input 
                      type="text" 
                      value={producto.imagen || ''} 
                      onChange={(e) => actualizarItemMenu(producto.id, 'imagen', e.target.value)}
                      style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                    />
                  </div>

                </div>
              ))}
            </div>
          )}
        </main>
      ) : (
        /* ================= VISTA CLIENTE TIENDA ================= */
        <>
          {/* Sección Hero */}
          <section className="hero">
            <div className="hero-text">
              <h2>Sabor que te hace volver</h2>
              <p>Pide ahora y disfruta de la verdadera experiencia BroBurger en casa.</p>
            </div>
          </section>

          {/*Filtro de Categorías */}
          <div className="filter-container">
            {['Todos', 'Bro Clásica', 'Bro Combo', 'Papas', 'Bebidas', 'Postres'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoriaSeleccionada(cat)}
                className={`btn-filter ${categoriaSeleccionada === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sección del Menú */}
          <main className="main-container">
            <h2 className="menu-title">Nuestro Menú Premium</h2>
            
            <div className="menu-grid">
              {productosFiltrados.map((hamburguesa) => (
                <div key={hamburguesa.id} className="burger-card">
                  <div className="burger-info">
                    <div>
                      <h3 className="burger-name">{hamburguesa.nombre}</h3>
                      <p className="burger-description">{hamburguesa.descripcion}</p>
                    </div>
                    
                    <div className="burger-footer">
                      <span className="burger-price">S/ {hamburguesa.precio.toFixed(2)}</span>
                      
                      <button 
                        onClick={() => agregarAlPedido(hamburguesa)}
                        className="btn-order"
                      >
                        Pedir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </>
      )}

      {/* VENTANA MODAL DEL CARRITO */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>🛒 Tu Pedido</h2>
              <button className="btn-close" onClick={() => setIsModalOpen(false)}>×</button>
            </div>

            <div className="modal-body">
              {carrito.length === 0 ? (
                <p className="empty-cart-message">Tu carrito está vacío. ¡Agrega alguna hamburguesa!</p>
              ) : (
                <div className="cart-items-list">
                  {carrito.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-details">
                        <h4>{item.nombre}</h4>
                        <p>S/ {item.precio.toFixed(2)}</p>
                      </div>
                      
                      
                      <div className="cart-item-actions">
                        <button className="btn-action-minus" onClick={() => restarDelPedido(item.id)}>-</button>
                        <span className="item-qty">{item.cantidad}</span>
                        <button className="btn-action-plus" onClick={() => agregarAlPedido(item)}>+</button>
                        <button className="btn-action-delete" onClick={() => eliminarDelCarrito(item.id)}>🗑️</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {carrito.length > 0 && (
              <div className="modal-footer">
                <div className="modal-total">
                  <span>Total a pagar:</span>
                  <strong>S/ {totalPagar.toFixed(2)}</strong>
                </div>
                {/* */}
                <button
                  className="btn-checkout" onClick={() => {setPantalla("Pago");}}>
                  Ir a pagar
                </button>
                {/**/}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Pie de página */}

      <MiscelaneaFooter />
    </div>
  );
}

export default App;