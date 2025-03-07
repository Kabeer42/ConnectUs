import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG'],
  
  // server: {
  //   host: '0.0.0.0', // This allows the server to be accessible from other devices
  //   port: 5173,      // You can change this to any port you prefer
  // },
})
