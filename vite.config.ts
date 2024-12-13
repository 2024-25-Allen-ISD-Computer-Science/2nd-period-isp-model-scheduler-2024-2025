import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/2nd-period-isp-model-scheduler-2024-2025/",
  build: {
    rollupOptions: {
      
    }
  },
})
