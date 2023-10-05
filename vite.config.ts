// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import { libInjectCss } from "vite-plugin-lib-inject-css"

export default defineConfig({
  plugins: [react(), dts({ include: "lib" }), libInjectCss()],
  build: {
    // do not copy the contents of the public folder to the dist folder
    copyPublicDir: false,
    lib: {
      // this is the file that exports our components
      entry: resolve(__dirname, "lib/components-lib-sore.ts"),
      name: "ViteStorybookLibrary",
      fileName: "components-lib-sore",
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ["react", "react-dom"],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
})