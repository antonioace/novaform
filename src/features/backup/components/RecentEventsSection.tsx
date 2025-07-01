import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { RecentEvent } from "./RecentEvent";

const recentEvents = [
  {
    title: "Nuevo proyecto creado",
    description: "Proyecto de tienda online",
    time: "Hace 2 horas",
    status: "success" as const,
    color: "bg-green-500"
  },
  {
    title: "Formulario enviado",
    description: "Formulario de contacto completado",
    time: "Hace 4 horas",
    status: "success" as const,
    color: "bg-blue-500"
  },
  {
    title: "Archivo subido",
    description: "imagen_producto.jpg",
    time: "Hace 6 horas",
    status: "success" as const,
    color: "bg-purple-500"
  },
  {
    title: "Error en validación",
    description: "Campo requerido faltante",
    time: "Hace 8 horas",
    status: "error" as const,
    color: "bg-red-500"
  },
  {
    title: "Usuario registrado",
    description: "nuevo_usuario@email.com",
    time: "Hace 12 horas",
    status: "success" as const,
    color: "bg-indigo-500"
  }
];

export const RecentEventsSection: React.FC = () => (
  <div className="bg-white rounded-xl shadow-sm border border-gray-100">
    <div className="px-6 py-4 border-b border-gray-100">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">Eventos recientes</h3>
        <span className="text-sm text-gray-500">Últimos 10 eventos</span>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {recentEvents.map((event, index) => (
        <RecentEvent key={index} event={event} />
      ))}
    </div>
    <div className="px-6 py-4 border-t border-gray-100">
      <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
        Ver todos los eventos
        <FiArrowRight className="ml-1 h-4 w-4" />
      </button>
    </div>
  </div>
); 