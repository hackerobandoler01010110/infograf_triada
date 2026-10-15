import React, { useState } from 'react';
import { 
  Shield, 
  Activity, 
  FileText, 
  Copy, 
  Check, 
  ExternalLink, 
  Download, 
  Share2, 
  Info, 
  AlertTriangle, 
  Layers, 
  Lock, 
  Eye, 
  CheckCircle2, 
  Globe, 
  Sparkles,
  ChevronRight
} from 'lucide-react';

const TRIADS_DATA = {
  epidemiologica: {
    id: 'epidemiologica',
    title: 'Tríada Epidemiológica',
    subtitle: 'El modelo clásico de causalidad de las enfermedades transmisibles',
    icon: Activity,
    themeColor: 'emerald',
    accentGradient: 'from-emerald-500 to-teal-600',
    description: 'La tríada ecológica o epidemiológica tradicional describe la interacción dinámica entre tres elementos esenciales que conducen a la aparición o propagación de una enfermedad o evento patológico.',
    components: [
      {
        id: 'agente',
        name: 'Agente Causal',
        tagline: '¿Qué lo causa?',
        icon: AlertTriangle,
        color: 'from-amber-500 to-orange-600',
        badge: 'Factor Etiológico',
        points: [
          'Biológicos (bacterias, virus, hongos, parásitos, priones).',
          'Químicos (toxinas, venenos, contaminantes, alérgenos).',
          'Físicos (radiación, calor extremo, traumatismos mecánicos).',
          'Propiedades: Virulencia, patogenicidad, infectividad e inmunogenicidad.'
        ],
        example: 'SARS-CoV-2 (Virus ARN con proteína Spike de alta afinidad)'
      },
      {
        id: 'huesped',
        name: 'Huésped Susceptible',
        tagline: '¿En quién se desarrolla?',
        icon: Shield,
        color: 'from-blue-500 to-indigo-600',
        badge: 'Organismo Receptor',
        points: [
          'Factores genéticos e inmunidad previa (vacunas o infecciones).',
          'Edad, sexo biológico, estado nutricional y comorbilidades.',
          'Comportamientos, higiene, hábitos y estilos de vida.',
          'Susceptibilidad biológica y barreras tisulares/mucosas.'
        ],
        example: 'Seres humanos, especialmente adultos mayores con comorbilidades'
      },
      {
        id: 'ambiente',
        name: 'Ambiente / Entorno',
        tagline: '¿Dónde interactúan?',
        icon: Globe,
        color: 'from-emerald-500 to-green-600',
        badge: 'Medio Circundante',
        points: [
          'Factores físicos (clima, temperatura, altitud, humedad).',
          'Factores biológicos (vectores como mosquitos, fauna silvestre).',
          'Factores socioeconómicos (hacinamiento, acceso a agua potable, pobreza).',
          'Ambiente hospitalario o laboral con alta exposición.'
        ],
        example: 'Espacios cerrados, mala ventilación y aglomeraciones urbanas'
      }
    ],
    equilibriumNote: 'La enfermedad ocurre cuando se rompe el equilibrio dinámico entre estos tres componentes, facilitando la transmisión y expresión clínica.',
    webReference: 'https://www.who.int/es/news-room/fact-sheets',
    citation: 'Centros para el Control y Prevención de Enfermedades (CDC) / OPS'
  },
  seguridad: {
    id: 'seguridad',
    title: 'Tríada CIA (Ciberseguridad)',
    subtitle: 'Los tres pilares fundacionales de la seguridad de la información',
    icon: Lock,
    themeColor: 'cyan',
    accentGradient: 'from-cyan-500 to-blue-600',
    description: 'La tríada CIA (Confidencialidad, Integridad y Disponibilidad) es el modelo de referencia universal para evaluar y diseñar políticas de ciberseguridad y arquitectura de protección de datos.',
    components: [
      {
        id: 'confidencialidad',
        name: 'Confidencialidad',
        tagline: 'Privacidad y Acceso Restringido',
        icon: Eye,
        color: 'from-indigo-500 to-purple-600',
        badge: 'Solo autorizados',
        points: [
          'Previene la divulgación indebida de datos críticos a terceros.',
          'Implementación de cifrado robusto en tránsito (TLS) y en reposo (AES).',
          'Autenticación multifactor (MFA) y control de acceso basado en roles (RBAC).',
          'Manejo de acuerdos de confidencialidad y clasificación de información.'
        ],
        example: 'Cifrado de extremo a extremo y encriptación de bases de datos de clientes'
      },
      {
        id: 'integridad',
        name: 'Integridad',
        tagline: 'Exactitud y Confiabilidad',
        icon: CheckCircle2,
        color: 'from-emerald-500 to-teal-600',
        badge: 'Datos Inalterados',
        points: [
          'Garantiza que la información permanezca libre de modificaciones o falsificaciones.',
          'Uso de funciones hash criptográficas (SHA-256) para verificar alteraciones.',
          'Firmas digitales y certificados PKI para validación de origen.',
          'Registros de auditoría inmutables (tamper-evident logs) y control de versiones.'
        ],
        example: 'Suma de verificación (checksum SHA-256) al descargar paquetes de software'
      },
      {
        id: 'disponibilidad',
        name: 'Disponibilidad',
        tagline: 'Accesibilidad Oportuna',
        icon: Shield,
        color: 'from-amber-500 to-red-600',
        badge: 'Operatividad Continua',
        points: [
          'Asegura que los sistemas y datos estén disponibles cuando se requieran.',
          'Mitigación de ataques de Denegación de Servicio Distribuido (DDoS).',
          'Redundancia de hardware, servidores distribuidos y failover automático.',
          'Planes de Recuperación ante Desastres (DRP) y copias de seguridad continuas.'
        ],
        example: 'Arquitecturas Multi-Región en la nube con 99.99% de SLA y balanceadores'
      }
    ],
    equilibriumNote: 'Un sistema seguro debe balancear los tres vértices: maximizar uno sin descuidar los otros asegura una protección integral y usabilidad óptima.',
    webReference: 'https://csrc.nist.gov/glossary/term/cia_triad',
    citation: 'NIST Computer Security Resource Center / ISO/IEC 27001'
  }
};

export default function App() {
  const [activeTriadId, setActiveTriadId] = useState('epidemiologica');
  const [selectedNode, setSelectedNode] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState('infografia'); // 'infografia' | 'markdown' | 'share'
  const [customWebUrl, setCustomWebUrl] = useState('https://mi-dominio-educativo.org/infografia/triada');

  const currentTriad = TRIADS_DATA[activeTriadId];

  const generateMarkdown = () => {
    return `# 📊 Infografía: ${currentTriad.title}

> **${currentTriad.subtitle}**
> 
> 🌐 **Dirección Web del Recurso:** [${customWebUrl}](${customWebUrl})
> 📖 **Referencia Estándar:** [${currentTriad.webReference}](${currentTriad.webReference})
> 🏛️ **Fuente de Autoridad:** ${currentTriad.citation}

---

## 📌 Introducción y Contexto

${currentTriad.description}

---

## 🔺 Los Tres Vértices de la Tríada

${currentTriad.components.map((comp, idx) => `
### ${idx + 1}. ${comp.name} (${comp.tagline})
* **Categoría:** \`${comp.badge}\`
* **Definición y Factores Clave:**
${comp.points.map(p => `  - ${p}`).join('\n')}
* **Ejemplo Práctico:** *${comp.example}*
`).join('\n---\n')}

---

## ⚖️ Principio de Equilibrio e Interacción

> ${currentTriad.equilibriumNote}

---

## 🔗 Ficha de Entrega y Distribución

| Parámetro | Detalle |
| :--- | :--- |
| **Documento** | Infografía Interactiva Resumen |
| **Modelo** | ${currentTriad.title} |
| **URL Oficial de Despliegue** | [${customWebUrl}](${customWebUrl}) |
| **Formato de Exportación** | Markdown (.md) UTF-8 compatible con GitHub, Obsidian y Notion |
| **Licencia** | Creative Commons Atribución 4.0 Internacional (CC BY 4.0) |

*Generado automáticamente mediante el Diseñador de Infografías Educativas.*
`;
  };

  const handleCopyMarkdown = () => {
    const md = generateMarkdown();
    navigator.clipboard.writeText(md);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadMarkdown = () => {
    const md = generateMarkdown();
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `infografia_${currentTriad.id}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-teal-500 selection:text-white pb-16">
      {/* Top Banner / Navbar */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black shadow-lg shadow-teal-500/20">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-white leading-tight flex items-center gap-2">
                Infografía Tríadas
                <span className="text-xs px-2 py-0.5 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30">
                  Exportador .MD
                </span>
              </h1>
              <p className="text-xs text-slate-400">Visualizador y Generador con Dirección Web</p>
            </div>
          </div>

          {/* Triad Selector Switcher */}
          <div className="flex items-center bg-slate-800/80 p-1 rounded-xl border border-slate-700/60 text-xs font-medium">
            <button
              onClick={() => { setActiveTriadId('epidemiologica'); setSelectedNode(0); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTriadId === 'epidemiologica'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Epidemiológica</span>
            </button>
            <button
              onClick={() => { setActiveTriadId('seguridad'); setSelectedNode(0); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all ${
                activeTriadId === 'seguridad'
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Seguridad (CIA)</span>
            </button>
          </div>

          {/* View Mode Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('infografia')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'infografia'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Infografía
            </button>
            <button
              onClick={() => setActiveTab('markdown')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'markdown'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Ver .MD
            </button>
            <button
              onClick={() => setActiveTab('share')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition ${
                activeTab === 'share'
                  ? 'bg-teal-500/20 text-teal-300 border border-teal-500/40'
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <Share2 className="w-3.5 h-3.5" />
              Dirección Web
            </button>
          </div>
        </div>
      </header>

      {}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        {/* Quick Web URL Bar */}
        <section className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-slate-400 font-bold block">
                Dirección Web Asociada (Para Enviar en el .MD)
              </span>
              <div className="flex items-center gap-2 mt-0.5">
                <input
                  type="text"
                  value={customWebUrl}
                  onChange={(e) => setCustomWebUrl(e.target.value)}
                  className="bg-slate-950 border border-slate-700 rounded-lg px-3 py-1 text-xs text-teal-300 font-mono focus:outline-none focus:border-teal-500 w-full sm:w-96"
                  placeholder="https://tudominio.com/infografia"
                />
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <button
              onClick={handleCopyMarkdown}
              className="flex-1 md:flex-initial flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition shadow-lg shadow-teal-500/20 active:scale-95"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-950" /> : <Copy className="w-4 h-4" />}
              {copied ? '¡Copiado al Portapapeles!' : 'Copiar Markdown (.md)'}
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
              title="Descargar archivo .md"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* Tab 1: Interactive Infographic Visualizer */}
        {activeTab === 'infografia' && (
          <div className="space-y-6">
            {/* Hero / Header Card */}
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-10">
              <div className="absolute -top-24 -right-24 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-3xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-teal-400 text-xs font-semibold mb-4">
                  <currentTriad.icon className="w-3.5 h-3.5" />
                  Modelo Teórico y Científico
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
                  {currentTriad.title}
                </h2>
                <p className="text-slate-300 text-base sm:text-lg mb-6 leading-relaxed">
                  {currentTriad.description}
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-4 h-4 text-teal-400" />
                    Fuente: <strong className="text-slate-200">{currentTriad.citation}</strong>
                  </span>
                  <a
                    href={currentTriad.webReference}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-teal-400 hover:text-teal-300 underline"
                  >
                    Referencia externa <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Visual Interactive Triangle Representation */}
            {}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
              {/* Graphic Diagram Side */}
              <div className="lg:col-span-5 rounded-3xl bg-slate-900/90 border border-slate-800 p-6 flex flex-col items-center justify-center relative min-h-[420px]">
                <div className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-6 text-center">
                  Diagrama Interactivo Triangular
                  <span className="block text-[11px] font-normal text-slate-500 lowercase mt-0.5">
                    (Haz clic en cada nodo para ver su desglose)
                  </span>
                </div>

                <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
                  {/* SVG Connector Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100">
                    <polygon
                      points="50,15 85,80 15,80"
                      fill="none"
                      stroke="rgba(71, 85, 105, 0.4)"
                      strokeWidth="1.5"
                      strokeDasharray="3 3"
                    />
                    <circle cx="50" cy="50" r="14" fill="rgba(15, 23, 42, 0.9)" stroke="rgba(20, 184, 166, 0.4)" strokeWidth="1" />
                  </svg>

                  {/* Central Pivot */}
                  <div className="absolute z-10 text-center pointer-events-none p-2 bg-slate-950/80 rounded-xl border border-slate-800 shadow-md">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-400 block">
                      Equilibrio
                    </span>
                    <span className="text-[9px] text-slate-400">Interacción</span>
                  </div>

                  {/* Node 1: Top */}
                  <button
                    onClick={() => setSelectedNode(0)}
                    className={`absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center transition-transform ${
                      selectedNode === 0 ? 'scale-110 z-20' : 'hover:scale-105 opacity-80'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border transition-all ${
                      selectedNode === 0 
                        ? 'bg-amber-500/20 border-amber-400 text-amber-300 ring-4 ring-amber-500/20 shadow-amber-500/20' 
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                      {React.createElement(currentTriad.components[0].icon, { className: "w-7 h-7" })}
                    </div>
                    <span className="mt-2 text-xs font-bold text-slate-200 bg-slate-900/90 px-2 py-0.5 rounded-md border border-slate-800">
                      {currentTriad.components[0].name}
                    </span>
                  </button>

                  {/* Node 2: Bottom Right */}
                  <button
                    onClick={() => setSelectedNode(1)}
                    className={`absolute bottom-2 right-2 flex flex-col items-center transition-transform ${
                      selectedNode === 1 ? 'scale-110 z-20' : 'hover:scale-105 opacity-80'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border transition-all ${
                      selectedNode === 1 
                        ? 'bg-blue-500/20 border-blue-400 text-blue-300 ring-4 ring-blue-500/20 shadow-blue-500/20' 
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                      {React.createElement(currentTriad.components[1].icon, { className: "w-7 h-7" })}
                    </div>
                    <span className="mt-2 text-xs font-bold text-slate-200 bg-slate-900/90 px-2 py-0.5 rounded-md border border-slate-800">
                      {currentTriad.components[1].name}
                    </span>
                  </button>

                  {/* Node 3: Bottom Left */}
                  <button
                    onClick={() => setSelectedNode(2)}
                    className={`absolute bottom-2 left-2 flex flex-col items-center transition-transform ${
                      selectedNode === 2 ? 'scale-110 z-20' : 'hover:scale-105 opacity-80'
                    }`}
                  >
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg border transition-all ${
                      selectedNode === 2 
                        ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 ring-4 ring-emerald-500/20 shadow-emerald-500/20' 
                        : 'bg-slate-800 border-slate-700 text-slate-300'
                    }`}>
                      {React.createElement(currentTriad.components[2].icon, { className: "w-7 h-7" })}
                    </div>
                    <span className="mt-2 text-xs font-bold text-slate-200 bg-slate-900/90 px-2 py-0.5 rounded-md border border-slate-800">
                      {currentTriad.components[2].name}
                    </span>
                  </button>
                </div>

                <div className="mt-6 text-center text-xs text-slate-400 max-w-xs">
                  {currentTriad.equilibriumNote}
                </div>
              </div>

              {/* Detail Cards of Selected Node */}
              {}
              <div className="lg:col-span-7 flex flex-col justify-between rounded-3xl bg-slate-900 border border-slate-800 p-6 md:p-8">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="text-xs uppercase font-extrabold tracking-wider px-3 py-1 rounded-full bg-slate-800 text-teal-400 border border-slate-700">
                      Elemento #{selectedNode + 1} de la Tríada
                    </span>
                    <span className="text-xs text-slate-400 bg-slate-800/60 px-2.5 py-1 rounded-md">
                      {currentTriad.components[selectedNode].badge}
                    </span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-1">
                    {currentTriad.components[selectedNode].name}
                  </h3>
                  <p className="text-sm text-teal-400 font-medium mb-6">
                    {currentTriad.components[selectedNode].tagline}
                  </p>

                  <div className="space-y-3 mb-6">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Características Principales:
                    </h4>
                    <ul className="space-y-2.5">
                      {currentTriad.components[selectedNode].points.map((pt, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2 shrink-0" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wide block mb-1">
                      Ejemplo Representativo:
                    </span>
                    <p className="text-xs text-slate-300 italic">
                      "{currentTriad.components[selectedNode].example}"
                    </p>
                  </div>
                </div>

                {/* Node Navigation Tabs */}
                <div className="pt-6 border-t border-slate-800 flex items-center justify-between mt-6">
                  <div className="text-xs text-slate-400">
                    Navegar elementos:
                  </div>
                  <div className="flex gap-2">
                    {currentTriad.components.map((c, i) => (
                      <button
                        key={c.id}
                        onClick={() => setSelectedNode(i)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          selectedNode === i
                            ? 'bg-teal-500 text-slate-950 shadow-md font-bold'
                            : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Pillars Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
              {currentTriad.components.map((comp, idx) => {
                const IconComponent = comp.icon;
                return (
                  <div
                    key={comp.id}
                    onClick={() => setSelectedNode(idx)}
                    className={`cursor-pointer rounded-2xl p-6 border transition-all ${
                      selectedNode === idx
                        ? 'bg-slate-850 border-teal-500 shadow-lg shadow-teal-500/10'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2.5 rounded-xl bg-slate-800 border border-slate-700 text-teal-400">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
                        Vértice {idx + 1}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-1">{comp.name}</h4>
                    <p className="text-xs text-slate-400 mb-3">{comp.tagline}</p>
                    <div className="text-xs text-slate-300 line-clamp-2">
                      {comp.points[0]}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 2: Markdown Live Preview and Code */}
        {}
        {activeTab === 'markdown' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 rounded-2xl bg-slate-900 border border-slate-800">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-400" />
                  Archivo Generado: infografia_{currentTriad.id}.md
                </h3>
                <p className="text-xs text-slate-400">
                  Listo para copiar, enviar por correo, o subir a repositorios Git, Obsidian, Notion y Teams.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyMarkdown}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-xs transition"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? '¡Copiado!' : 'Copiar Texto Completo'}
                </button>
                <button
                  onClick={handleDownloadMarkdown}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-xs transition"
                >
                  <Download className="w-4 h-4" />
                  Descargar .md
                </button>
              </div>
            </div>

            {/* Code Block */}
            <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="font-mono text-slate-300 ml-2">infografia_{currentTriad.id}.md</span>
                </div>
                <span className="text-[11px] text-slate-500 font-mono">Formato Markdown (UTF-8)</span>
              </div>
              <pre className="p-6 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto whitespace-pre leading-relaxed max-h-[600px] overflow-y-auto selection:bg-teal-700">
                {generateMarkdown()}
              </pre>
            </div>
          </div>
        )}

        {/* Tab 3: Web URL and Delivery instructions */}
        {}
        {activeTab === 'share' && (
          <div className="space-y-6">
            <div className="p-6 md:p-8 rounded-3xl bg-slate-900 border border-slate-800">
              <div className="max-w-2xl">
                <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                  <Globe className="w-5 h-5 text-teal-400" />
                  Pautas de Entrega de Infografía en .MD con Dirección Web
                </h3>
                <p className="text-sm text-slate-300 mb-6">
                  Si tu consigna escolar, universitaria o técnica solicita "enviar por .md con dirección web", sigue estos sencillos pasos para cumplir todos los requerimientos:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <h4 className="font-bold text-white text-sm">Configura la Dirección Web</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Ingresa en la barra superior el enlace URL donde se aloja tu infografía o proyecto (por ejemplo en GitHub Pages, Vercel, Netlify o tu blog).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <h4 className="font-bold text-white text-sm">Exporta el Archivo .md</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Haz clic en el botón <strong>"Descargar .md"</strong> o <strong>"Copiar Markdown"</strong>. El archivo ya incluye la dirección web incrustada en el encabezado y en la tabla de entrega.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <h4 className="font-bold text-white text-sm">Envía o Publica</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Sube el archivo <code>.md</code> al aula virtual, adjúntalo a un correo o haz un <code>git commit & push</code> a tu repositorio en GitHub/GitLab.
                  </p>
                </div>
              </div>

              {/* Ready-to-copy delivery snippet */}
              <div className="mt-8 p-5 rounded-2xl bg-slate-950/90 border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-300">
                    Texto Rápido para el mensaje de envío (Correo o Entrega virtual):
                  </span>
                  <button
                    onClick={() => {
                      const msg = `Estimado docente/evaluador,\n\nAdjunto el archivo .md con la infografía correspondiente a la ${currentTriad.title}.\n\nTambién puede consultar la versión web directamente en:\n${customWebUrl}\n\nSaludos cordiales.`;
                      navigator.clipboard.writeText(msg);
                      alert('¡Mensaje copiado para tu correo o aula virtual!');
                    }}
                    className="text-xs text-teal-400 hover:text-teal-300 underline font-medium"
                  >
                    Copiar texto de entrega
                  </button>
                </div>
                <div className="font-mono text-xs text-slate-400 bg-slate-900 p-3 rounded-xl border border-slate-800">
                  Estimado docente/evaluador,<br />
                  Adjunto el archivo .md con la infografía correspondiente a la <strong>{currentTriad.title}</strong>.<br />
                  También puede consultar la versión interactiva en la siguiente dirección web:<br />
                  <span className="text-teal-300">{customWebUrl}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 text-center text-xs text-slate-500">
        <p>Herramienta para creación de Infografías Científicas y Técnicas • Exportador a Markdown (.md)</p>
      </footer>
    </div>
  );
}