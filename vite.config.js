import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // this line makes the on the network (to test it on other devices)
  // run: npm run dev --host
  server: {
    host: true, // Expose the server to the network
  },
})
