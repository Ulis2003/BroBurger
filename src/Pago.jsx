import './App.css';
import './Pago.css';
import './MiscelaneaFooter.css'; 
import MiscelaneaFooter from './MiscelaneaFooter';
import React, { useState } from 'react';

function Pago( {carrito, volverMenu, onConfirmarPedido} ) {

    //Datos de Contacto
const [NombreApellido, setNombreApellido] = useState("");
const [Numero, setNumero] = useState("");
const [Dni, setDni] = useState("");
const [Direccion, setDireccion] = useState("");
const [Indicaciones, setIndicaciones] = useState("");



const totalPagar = carrito.reduce(
    (acc, item) => acc + (item.precio * item.cantidad),
    0);

    const handleSubmit = (event) => {
        //Evita que el formulario se recargue al enviar
        event.preventDefault();

        // Crea un objeto con la información del cliente
        const ClienteInfo = {
            NombreApellido,
            Numero,
            Dni,
            Direccion,
            Indicaciones
        };

        // Llama a la función de confirmación de pedido pasada desde App.jsx
        if (onConfirmarPedido) {
            onConfirmarPedido(ClienteInfo);
        }
    };

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
                    <input name="indicaciones" value={Indicaciones} onChange={(e) => setIndicaciones(e.target.value)} type="text-box"></input>
                </div>

                <div className="total-pedido">
                    <p>Total:</p>
                    <p>S/ {totalPagar.toFixed(2)}</p>
                </div>
                </section>


                <form className="form-control" onSubmit={handleSubmit}>
                    <h4>Datos de Contacto:</h4>
                    <div className="form-container">
                        <label>Nombre y Apellido: </label>
                        <input name="NombreApellido" type='text' value={NombreApellido} onChange={(e) => setNombreApellido(e.target.value)} required/>
                    </div>
                    <div className="form-container">
                        <label>Numero de DNI: </label>
                        <input name="Dni" type='text' value={Dni} onChange={(e) => setDni(e.target.value)} required/>
                    </div>
                    <div className="form-container">
                        <label>Numero de Contacto: </label>
                        <input name="Numero" type='text' value={Numero} onChange={(e) => setNumero(e.target.value)} required/>
                    </div>
                    <div className="form-container">
                        <label>Direccion:</label>
                        <input name="Direccion" type='text' value={Direccion} onChange={(e) => setDireccion(e.target.value)} required/>
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
                    

                    <button type="submit" className="button-finally">Confirmar Pedido</button>
                </form>

            </main>

            <footer className="footer-container">
                <MiscelaneaFooter />
            </footer>

        </div>
    );
}

export default Pago;