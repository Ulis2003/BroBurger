import React, { useState } from 'react';

export default function Login({ onLoginSuccess, onCancel }) {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí puedes poner el usuario y contraseña
    if (usuario === 'admin' && password === '123') {
      onLoginSuccess();
    } else {
      setError('Usuario o contraseña incorrectos ❌');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Acceso Administrador</h2>
        
        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.inputGroup}>
          <label>Usuario:</label>
          <input 
            type="text" 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)} 
            style={styles.input}
            required 
          />
        </div>

        <div style={styles.inputGroup}>
          <label>Contraseña:</label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={styles.input}
            required 
          />
        </div>

        <div style={styles.btnGroup}>
          <button type="submit" style={styles.btnSubmit}>Ingresar</button>
          <button type="button" onClick={onCancel} style={styles.btnCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

// Estilos rápidos en línea para que se vea ordenado
const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '40px 0' },
  form: { background: '#fff', padding: '30px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', width: '320px' },
  title: { textAlign: 'center', color: '#333', marginBottom: '20px', fontSize: '20px' },
  error: { color: 'red', textAlign: 'center', fontSize: '14px', marginBottom: '15px' },
  inputGroup: { marginBottom: '15px', display: 'flex', flexDirection: 'column', gap: '5px' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '16px' },
  btnGroup: { display: 'flex', gap: '10px', marginTop: '20px' },
  btnSubmit: { flex: 1, background: '#df2020', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' },
  btnCancel: { flex: 1, background: '#666', color: 'white', border: 'none', padding: '10px', borderRadius: '6px', cursor: 'pointer' }
};