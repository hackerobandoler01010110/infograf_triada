import { useState } from "react";
import "./App.css";
 
// ✏️ Cambia estos datos por los tuyos
const AUTOR = "David Zamorano";
const GITHUB_USER = "hackerobandoler01010110";
const GITHUB_URL = `https://github.com/${hackerobandoler01010110}`;
 
const PILARES = {
  C: {
    nombre: "Confidencialidad",
    resumen: "Solo las personas autorizadas pueden ver la información.",
    ejemplo:
      "Un historial médico que solo puede abrir el doctor y el paciente.",
    controles: ["Cifrado", "Control de acceso", "Autenticación multifactor"],
    amenaza: "Filtración de datos",
    x: 200,
    y: 50,
  },
  I: {
    nombre: "Integridad",
    resumen: "La información se mantiene exacta y no se altera sin permiso.",
    ejemplo:
      "Una transferencia bancaria que llega con el mismo monto con que salió.",
    controles: ["Hashes y firmas digitales", "Control de versiones", "Auditoría"],
    amenaza: "Modificación no autorizada",
    x: 55,
    y: 295,
  },
  D: {
    nombre: "Disponibilidad",
    resumen: "La información y los sistemas funcionan cuando se necesitan.",
    ejemplo: "Una tienda en línea que sigue abierta durante el Cyber Day.",
    controles: ["Copias de seguridad", "Redundancia", "Plan de recuperación"],
    amenaza: "Caída del servicio o ransomware",
    x: 345,
    y: 295,
  },
};
 
function Vertice({ id, activo, onSelect }) {
  const p = PILARES[id];
  const esActivo = activo === id;
  // El texto se ubica según la posición del vértice
  const dy = id === "C" ? -26 : 38;
  return (
    <g
      className={`vertice ${esActivo ? "activo" : ""}`}
      role="button"
      tabIndex={0}
      aria-pressed={esActivo}
      aria-label={p.nombre}
      onClick={() => onSelect(id)}
      onMouseEnter={() => onSelect(id)}
      onFocus={() => onSelect(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onSelect(id);
      }}
    >
      <circle className="halo" cx={p.x} cy={p.y} r="26" />
      <circle className="punto" cx={p.x} cy={p.y} r="11" />
      <text className="vertice-texto" x={p.x} y={p.y + dy} textAnchor="middle">
        {p.nombre}
      </text>
    </g>
  );
}
 
export default function App() {
  const [activo, setActivo] = useState("C");
  const p = PILARES[activo];
 
  return (
    <div className="pagina">
      <header className="cabecera">
        <h1>La tríada CIA</h1>
        <p className="bajada">
          Tres principios que sostienen la seguridad de la información. Si
          falla uno, el sistema deja de ser confiable.
        </p>
      </header>
 
      <main className="contenido">
        <figure className="plano">
          <svg viewBox="0 0 400 350" role="img" aria-label="Triángulo de la tríada CIA">
            <defs>
              <pattern id="cuadricula" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M20 0H0V20" fill="none" className="grid-linea" />
              </pattern>
            </defs>
            <rect width="400" height="350" fill="url(#cuadricula)" />
 
            <polygon
              className="triangulo"
              points={`${PILARES.C.x},${PILARES.C.y} ${PILARES.I.x},${PILARES.I.y} ${PILARES.D.x},${PILARES.D.y}`}
            />
            <text className="centro" x="200" y="205" textAnchor="middle">
              Seguridad de la
            </text>
            <text className="centro" x="200" y="225" textAnchor="middle">
              información
            </text>
 
            {Object.keys(PILARES).map((id) => (
              <Vertice key={id} id={id} activo={activo} onSelect={setActivo} />
            ))}
          </svg>
        </figure>
 
        <section className="detalle" aria-live="polite" key={activo}>
          <h2>{p.nombre}</h2>
          <p className="resumen">{p.resumen}</p>
 
          <dl>
            <dt>Ejemplo</dt>
            <dd>{p.ejemplo}</dd>
 
            <dt>Cómo se protege</dt>
            <dd>
              <ul>
                {p.controles.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </dd>
 
            <dt>Amenaza principal</dt>
            <dd>{p.amenaza}</dd>
          </dl>
        </section>
      </main>
 
      <footer className="pie">
        <p>
          Hecho por <strong>{AUTOR}</strong>
        </p>
        <a className="github" href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 16 16" width="20" height="20" aria-hidden="true">
            <path
              fill="currentColor"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            />
          </svg>
          github.com/{GITHUB_USER}
        </a>
      </footer>
    </div>
  );
}
 