import React, { useState, useEffect } from 'react';

const MiscelaneaFooter = () => {
  // Estado para capturar la fecha y hora en vivo
  const [tiempo, setTiempo] = useState(new Date());

  useEffect(() => {
    const temporizador = setInterval(() => {
      setTiempo(new Date());
    }, 1000);

    return () => clearInterval(temporizador);
  }, []);

  // Formateadores de fecha y hora localizados para Perú
  const opcionesFecha = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const fechaReal = tiempo.toLocaleDateString('es-PE', opcionesFecha);
  const horaReal = tiempo.toLocaleTimeString('es-PE');

  return (
    <footer style={{
      backgroundColor: '#0d1b2a', 
      color: '#ffffff', 
      padding: '40px 20px', 
      marginTop: '50px', 
      fontFamily: 'sans-serif',
      borderTop: '5px solid #d32f2f'
    }}>
      <div style={{
        maxWidth: '1100px', 
        margin: '0 auto', 
        display: 'flex', 
        flexWrap: 'wrap', 
        gap: '30px', 
        justifyContent: 'space-between'
      }}>
        
        {/* SECCIÓN 1: SOBRE NOSOTROS */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h3 style={{ color: '#d32f2f', marginBottom: '15px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Sobre BroBurger
          </h3>
          <p style={{ color: '#e0e1dd', fontSize: '14px', lineHeight: '1.5', margin: 0 }}>
            ¡Las mejores hamburguesas del barrio! Preparadas con carne premium 
            100% de res, vegetales frescos e insumos seleccionados.
          </p>
        </div>

        {/* SECCIÓN 2: REDES SOCIALES */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h3 style={{ color: '#d32f2f', marginBottom: '15px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Sigue el Sabor
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px' }}>📘 Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px' }}>📸 Instagram</a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '14px' }}>🎵 TikTok</a>
          </div>
        </div>

        {/* SECCIÓN 3: RELOJ Y CALENDARIO DIGITAL EN TIEMPO REAL */}
        <div style={{ flex: '1', minWidth: '250px' }}>
          <h3 style={{ color: '#d32f2f', marginBottom: '15px', textTransform: 'uppercase', fontWeight: 'bold' }}>
            Horario & Pedidos
          </h3>
          
          <div style={{
            backgroundColor: '#1b263b', 
            padding: '12px', 
            borderRadius: '6px', 
            marginBottom: '15px', 
            borderLeft: '4px solid #28a745',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
          }}>
            <div style={{ marginBottom: '8px' }}>
              <small style={{ fontSize: '11px', color: '#778da9', display: 'block', textTransform: 'uppercase' }}>📅 Fecha Actual</small>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', color: '#ffffff', textTransform: 'capitalize', fontWeight: '500' }}>{fechaReal}</p>
            </div>
            <div>
              <small style={{ fontSize: '11px', color: '#778da9', display: 'block', textTransform: 'uppercase' }}>⏰ Hora en Vivo</small>
              <p style={{ margin: '2px 0 0 0', fontFamily: 'monospace', color: '#39ff14', fontSize: '16px', fontWeight: 'bold' }}>{horaReal}</p>
            </div>
          </div>
          
          <p style={{ margin: '4px 0', fontSize: '13px', color: '#cbd5e1' }}>📍 Lima Metropolitana, Perú</p>
          <p style={{ margin: '4px 0', fontSize: '13px', color: '#cbd5e1' }}>📞 Central: +51 999 888 777</p>
        </div>

      </div>

      {/* CRÉDITOS INFERIORES */}
      <div style={{ borderTop: '1px solid #1b263b', textAlign: 'center', paddingTop: '15px', marginTop: '30px', fontSize: '13px', color: '#778da9' }}>
        <p style={{ margin: 0 }}>&copy; {tiempo.getFullYear()} BroBurger - Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default MiscelaneaFooter;