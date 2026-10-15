import React, { useState } from 'react';
import './App.css';

const ciaData = [
  {
    id: 'confidentiality',
    title: 'Confidencialidad',
    icon: '🔒',
    tagline: 'Solo quienes tienen autorización pueden acceder a la información.',
    description: 'Previene la divulgación no autorizada de datos mediante autenticación, cifrado, control de acceso y clasificación de información.',
    threats: ['Espionaje de datos (Snooping/Sniffing)', 'Ataques Man-in-the-Middle', 'Fuga de contraseñas'],
    defenses: ['Cifrado (AES, RSA, TLS)', 'MFA (Autenticación multifactor)', 'Control de acceso basado en roles (RBAC)'],
  },
  {
    id: 'integrity',
    title: 'Integridad',
    icon: '🛡️',
    tagline: 'Los datos deben mantenerse exactos, completos y sin alteraciones.',
    description: 'Asegura que la información y los sistemas no sean modificados de manera fraudulenta o accidental durante el almacenamiento o la transmisión.',
    threats: ['Inyección SQL o de código', 'Manipulación de paquetes en tránsito', 'Ataques de Ransomware'],
    defenses: ['Funciones Hash (SHA-256)', 'Firmas digitales', 'Sumas de verificación (Checksums)', 'Auditorías de logs'],
  },
  {
    id: 'availability',
    title: 'Disponibilidad',
    icon: '⚡',
    tagline: 'Los sistemas y datos deben ser accesibles cuando se requieran.',
    description: 'Garantiza que los usuarios legítimos tengan acceso oportuno y confiable a los servicios, redes y datos críticos.',
    threats: ['Ataques de Denegación de Servicio (DoS / DDoS)', 'Fallas de hardware / energía', 'Desastres físicos'],
    defenses: ['Redundancia y Alta Disponibilidad (HA)', 'Balanceadores de carga', 'Copias de seguridad periódicas (Backups)', 'Planes de DRP/BCP'],
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('confidentiality');
  
  // Estados para los simuladores
  const [inputText, setInputText] = useState('Mensaje Secreto');
  const [isEncrypted, setIsEncrypted] = useState(false);
  
  const [dataTampered, setDataTampered] = useState(false);
  const [serverOnline, setServerOnline] = useState(true);

  // Helper para simular cifrado César simple
  const toggleEncryption = () => {
    setIsEncrypted(!isEncrypted);
  };

  const getEncryptedText = (str) => {
    return str
      .split('')
      .map(c => String.fromCharCode(c.charCodeAt(0) + 3))
      .join('');
  };

  const currentPillar = ciaData.find(item => item.id === activeTab);

  return (
    <div className="container">
      <header className="header">
        <h1>Tríada de la Seguridad (CIA)</h1>
        <p className="subtitle">Los tres pilares fundamentales de la Seguridad de la Información</p>
      </header>

      {/* Selector de Pilares */}
      <nav className="tabs">
        {ciaData.map((item) => (
          <button
            key={item.id}
            className={`tab-btn ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => setActiveTab(item.id)}
          >
            <span className="tab-icon">{item.icon}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </nav>

      {/* Contenido del Pilar */}
      <main className="card main-card">
        <div className="pillar-header">
          <span className="big-icon">{currentPillar.icon}</span>
          <div>
            <h2>{currentPillar.title}</h2>
            <p className="tagline">{currentPillar.tagline}</p>
          </div>
        </div>

        <p className="description">{currentPillar.description}</p>

        <div className="grid-details">
          <div className="info-box danger">
            <h3>⚠️ Amenazas Comunes</h3>
            <ul>
              {currentPillar.threats.map((threat, index) => (
                <li key={index}>{threat}</li>
              ))}
            </ul>
          </div>
          <div className="info-box success">
            <h3>🛡️ Medidas de Defensa</h3>
            <ul>
              {currentPillar.defenses.map((defense, index) => (
                <li key={index}>{defense}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Demostración interactiva según el pilar seleccionado */}
        <section className="interactive-demo">
          <h3>Laboratorio Rápido: {currentPillar.title}</h3>
          
          {activeTab === 'confidentiality' && (
            <div className="demo-content">
              <p>Escribe un texto y simula su protección mediante cifrado:</p>
              <input 
                type="text" 
                value={inputText} 
                onChange={(e) => setInputText(e.target.value)}
                className="input-field"
                placeholder="Escribe algo aquí..."
              />
              <button className="action-btn" onClick={toggleEncryption}>
                {isEncrypted ? 'Descifrar Texto' : 'Cifrar Texto'}
              </button>
              <div className="output-box">
                <strong>En tránsito: </strong>
                <code>{isEncrypted ? getEncryptedText(inputText) : inputText}</code>
              </div>
            </div>
          )}

          {activeTab === 'integrity' && (
            <div className="demo-content">
              <p>Simula una alteración no autorizada de un archivo/registro:</p>
              <div className="hash-display">
                <span>Estado: <strong>{dataTampered ? '❌ Modificado' : '✅ Íntegro'}</strong></span>
                <span className="hash-code">
                  Hash SHA: {dataTampered ? 'e3b0c44298fc1c149afb' : '7d8b5f3a2c1e4b901a2f'}
                </span>
              </div>
              <button 
                className="action-btn"
                onClick={() => setDataTampered(!dataTampered)}
              >
                {dataTampered ? 'Restaurar Original' : 'Alterar Contenido'}
              </button>
            </div>
          )}

          {activeTab === 'availability' && (
            <div className="demo-content">
              <p>Simula el estado del servidor frente a una falla o ataque DoS:</p>
              <div className={`status-badge ${serverOnline ? 'online' : 'offline'}`}>
                {serverOnline ? '🟢 Sistema En Línea (200 OK)' : '🔴 Servicio No Disponible (503 Service Unavailable)'}
              </div>
              <button 
                className="action-btn"
                onClick={() => setServerOnline(!serverOnline)}
              >
                {serverOnline ? 'Simular Caída / Ataque DoS' : 'Reiniciar / Levantar Backup'}
              </button>
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Modelo CIA • Confidencialidad, Integridad y Disponibilidad</p>
      </footer>
    </div>
  );
}