/**
 * page.tsx (Nosotros)
 * -------------------
 * Responsabilidad: Página informativa sobre el proyecto.
 *
 * Ruta: /nosotros
 * Explica el propósito educativo del proyecto y la arquitectura.
 * Server Component sin interactividad.
 */

export default function NosotrosPage() {
  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Nosotros</h1>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 space-y-6">
        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Sobre el Proyecto</h2>
          <p className="text-gray-600 leading-relaxed">
            Este es un proyecto educativo desarrollado para aprender y practicar arquitectura
            Full Stack moderna. El foco está en entender el flujo completo de datos desde
            el formulario del usuario hasta la base de datos y de vuelta.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Objetivos de Aprendizaje</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Arquitectura MVC en el backend (Express)</li>
            <li>Separación de responsabilidades entre capas</li>
            <li>Comunicación Frontend ↔ Backend mediante API REST</li>
            <li>Consultas SQL directas con mysql2 (sin ORM)</li>
            <li>TypeScript tanto en frontend como en backend</li>
            <li>Validaciones en ambas capas</li>
            <li>Manejo de errores HTTP apropiados</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Arquitectura</h2>
          <div className="bg-gray-50 rounded-lg p-4 font-mono text-sm text-gray-700">
            <pre>{`PROYECTO
├── frontend/  (Next.js + TypeScript + Tailwind)
├── backend/   (Express + TypeScript + MVC)
│   ├── routes/
│   ├── controllers/
│   ├── services/
│   ├── models/
│   └── config/
└── database/  (MySQL)`}</pre>
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-gray-900 mb-3">Tecnologías</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Frontend</h3>
              <ul className="text-gray-600 space-y-1">
                <li>Next.js 14 (App Router)</li>
                <li>React 18</li>
                <li>TypeScript</li>
                <li>Tailwind CSS</li>
                <li>pnpm</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-800 mb-2">Backend</h3>
              <ul className="text-gray-600 space-y-1">
                <li>Node.js</li>
                <li>Express 4</li>
                <li>TypeScript</li>
                <li>mysql2</li>
                <li>CORS</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
