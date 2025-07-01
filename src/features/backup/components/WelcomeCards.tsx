import React from "react";
import { FiArrowRight, FiUser, FiActivity } from "react-icons/fi";

interface WelcomeCardsProps {
  userName: string;
}

export const WelcomeCards: React.FC<WelcomeCardsProps> = ({ userName }) => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
    {/* Welcome Card */}
    <div className="bg-gradient-to-r from-gray-900 to-gray-700 rounded-2xl p-8 text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <span className="text-2xl mr-2">👋</span>
          <h1 className="text-2xl font-bold">¡Bienvenido de vuelta!</h1>
        </div>
        <h2 className="text-xl font-semibold mb-2">{userName}</h2>
        <p className="text-gray-300 mb-6 max-w-md">
          Si vas a usar un parágrafo de Lorem Ipsum, necesitas estar seguro que no hay nada incómodo escondido.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center">
          Ir ahora
          <FiArrowRight className="ml-2 h-4 w-4" />
        </button>
      </div>
      <div className="absolute right-0 bottom-0 transform translate-x-12 translate-y-4">
        <div className="w-48 h-48 bg-green-500 rounded-lg flex items-center justify-center">
          <FiUser className="h-24 w-24 text-white" />
        </div>
      </div>
    </div>

    {/* Featured App Card */}
    <div className="bg-gradient-to-r from-purple-900 via-blue-800 to-indigo-900 rounded-2xl p-8 text-white relative overflow-hidden">
      <div className="relative z-10">
        <div className="text-green-400 text-sm font-medium mb-2">APLICACIÓN DESTACADA</div>
        <h3 className="text-xl font-bold mb-2">Salud Mental en la Era Digital: Navegando...</h3>
        <p className="text-gray-300 text-sm mb-6">
          He construido cuidadosamente una hermosa escultura de arcilla, sus delicadas...
        </p>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20"></div>
      <div className="absolute right-4 bottom-4">
        <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
          <FiActivity className="h-6 w-6 text-white" />
        </div>
      </div>
    </div>
  </div>
); 