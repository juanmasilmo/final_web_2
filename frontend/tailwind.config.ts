import type { Config } from 'tailwindcss';

const config: Config = {
  // Indicar a Tailwind dónde buscar las clases utilizadas
  // para eliminar las no usadas en el build de producción (PurgeCSS)
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
