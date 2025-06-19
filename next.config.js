/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com'],
  },
  // Asegúrate de que no haya conflictos en la configuración de rutas
  // Evita redirecciones circulares
  async redirects() {
    return [];
  },
  // Si usas rewrites, asegúrate que estén bien configurados
  async rewrites() {
    return [];
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig; 