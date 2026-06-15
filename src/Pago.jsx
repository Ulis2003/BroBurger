
import './App.css';
import './Pago.css'

function Pago( {carrito, volverMenu} ) {



const totalPagar = carrito.reduce(
    (acc, item) => acc + (item.precio * item.cantidad),
    0);

    return (
        <div className="app-container">

            <button className="btn-back" onClick={volverMenu}>
            ← Volver al menú
            </button>
 
            <section className="hero">
                <div className="hero-text">
                    <h2>Completa tu pedido</h2>
                    <p>Ingresa tus datos para confirmar la compra.</p>
                </div>
            </section>

            <main className="main-container form-principal">

                <section>

                    <div className="subtitulo-resumen">
                    <h3>Resumen del Pedido:</h3>
                    </div>

                    <div className="detalle-encabezado">
                        <p className="detalle-producto">Producto</p>
                        <p className="detalle-cantidad">Cant.</p>
                        <p className="detalle-precio">Subtotal</p>
                    </div>

                    {carrito.map(item => (
                        <div className="detalle-pedido" key={item.id}>
                            <p className="detalle-producto">{item.nombre}</p>
                            <p className="detalle-cantidad">x{item.cantidad}</p>
                            <p className="detalle-precio">
                                S/ {(item.precio * item.cantidad).toFixed(2)}
                            </p>
                        </div>
                    ))}

                <div className="detalle-indicaciones">
                    <label>Indicaciones Adicionales</label>
                    <input name="indicaciones" type="text-box"></input>
                </div>

                <div className="total-pedido">
                    <p>Total:</p>
                    <p>S/ {totalPagar.toFixed(2)}</p>
                </div>
                </section>


                <form className="form-control">
                    <h4>Datos de Contacto:</h4>
                    <div className="form-container">
                        <label>Nombre y Apellido: </label>
                        <input name="NombreApellido" type='text' required/>
                    </div>
                    <div className="form-container">
                        <label>Numero de DNI: </label>
                        <input name="Dni" type='text' required/>
                    </div>
                    <div className="form-container">
                        <label>Numero de Contacto: </label>
                        <input name="Numero" type='text' required/>
                    </div>
                    <div className="form-container">
                        <label>Direccion:</label>
                        <input name="Direccion" type='text' required/>
                    </div>
                    <hr />
                    <h4>Datos de Pago</h4>
                    <div className="form-container">
                        <label>Numero de tarjeta: </label>
                        <input name="NumeroTarjeta" type='text' required/>
                    </div>
                    <div className="form-container">
                        <label>Fecha de Vencimiento: </label>
                        <input name="FechaVencimiento" type='month' required/>
                    </div>
                    <div className="form-container">
                        <label>CVV: </label>
                        <input name="CCV" type='text' required />
                    </div>
                    

                    <button className="button-finally">Confirmar Pedido</button>
                </form>

            </main>

            <footer className="footer">
                <p>© 2026 BroBurger - Todos los derechos reservados.</p>
            </footer>

        </div>
    );
}

export default Pago;