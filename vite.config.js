import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => {
  if (command === 'build') {
    return {
      plugins: [react()],
      build: {
        lib: {
          entry: './src/index.tsx',
          name: 'DynamicJson',
          fileName: (format) => `dynamic-json.${format}.js`,
        },
        rollupOptions: {
          // Externalize deps that shouldn't be bundled
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
    };
  }
  // Dev mode config
  return {
    plugins: [react()],
    base: './',
    test: {
      environment: 'jsdom',
      globals: true,
    },
  };
});
