import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  base: "/my-School-Management-System-smitaa/", // ✅ add this
  plugins: [react(), tailwindcss()],
});
