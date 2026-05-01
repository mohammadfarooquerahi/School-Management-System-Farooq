import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/School-Management-System-Farooq/", // ✅ add this
  plugins: [react(), tailwindcss()],
});
