import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
//@ts-expect-error DTS is not defined properly
import dts from 'unplugin-dts/vite';

export default defineConfig(({ command }) => {
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        bundleTypes: true,
      }),
    ],
    base: './',
    test: {
      environment: 'jsdom',
      globals: true,
    },
    build: {
      lib: {
        entry: './src/index.tsx',
        name: 'ReactDynamicJson',
        fileName: (format) => `react-dynamic-json.${format}.js`,
      },
      rollupOptions: {
        // Externalize deps that shouldn't be bundled
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
  };
});
