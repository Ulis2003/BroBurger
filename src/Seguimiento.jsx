import './App.css';
import './Seguimiento.css';
import './MiscelaneaFooter.css'; 
import MiscelaneaFooter from './MiscelaneaFooter';
import Pago from './Pago';
import React, { useState } from 'react';

function Seguimiento({ pedido, volverMenu, ClienteInfo }) {

    /*Funciones de Seguimiento*/

    //Estados de un Pedido
    const estados = ['Pedido Recibido','En Preparacion','Esperando al Repartidor', 'En camino', 'Finalizado'];
    //Indice del Estado Actual del Pedido
    const IndiceEstados = pedido ? estados.indexOf(pedido.estado) : 0;
    //Corregir el Indice para evitar errores en caso de que el estado no se encuentre
    const CorregirEstado = IndiceEstados >= 0 ? IndiceEstados : 0;



    
    /*Vista*/
    return (

        <div className="app-container">
            {/*Boton Regresar*/}
            <button className="btn-back" onClick={volverMenu}>
            ← Volver al menú
            </button>
            {/*  Banner y Texto */}
            <section className="hero">
                <div className="hero-text">
                    <h2>¡Gracias por tu Compra!</h2>
                    <p>Estamos preparando tu pedido. Puedes seguir el estado aquí.</p>
                </div>
            </section>

            <main className="main-container form-principal">
                <section>
                    <div className="subtitulo-seguimiento">
                    <h3>Estado del Pedido:</h3>
                    </div>
                    <p>Tu pedido está siendo preparado. Estimamos que estará listo en aproximadamente 20 minutos.</p>
                </section>
            </main>

            <div className="progress-bar">
                    {estados.map((estado, index) => (
                <div
                    key={estado}
                    className={`progress-step ${
                    index < IndiceEstados ? 'completed' : ''
                    } ${index === IndiceEstados ? 'active' : ''}`}
            >
            <div className="step-circle">{index + 1}</div>
            <div className="step-label">{estado}</div>
            {index < estados.length - 1 && <div className="step-line" />}
            </div>
            ))}
            </div>

            <div className="pedido-detalles">
                <h3>Detalles del Pedido:</h3>
                <p><strong>Cliente:</strong> {pedido?.cliente || pedido?.NombreApellido || 'Sin datos'}</p>
                <p><strong>Teléfono:</strong> {pedido?.numero || 'Sin datos'}</p>
                <p><strong>Dirección:</strong> {pedido?.direccion || 'Sin datos'}</p>
                <p><strong>Anotaciones:</strong> {pedido?.indicaciones || pedido?.Indicaciones || 'Ninguna'}</p>
                <p><strong>Orden:</strong> {pedido?.orden || 'Sin productos'}</p>
                <p><strong>Total:</strong> S/ {pedido?.total ? pedido.total.toFixed(2) : '0.00'}</p>
            </div>

            <div className="footer-container">
            <MiscelaneaFooter />
            </div>
        </div>
    );
}

export default Seguimiento;