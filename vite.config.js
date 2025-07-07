import fs from "fs";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
    server: {
      open: true,
      https: {
        key: fs.readFileSync("localhost-key.pem"),
        cert: fs.readFileSync("localhost-cert.pem"),
      },
    },
    build: {
      lib: {
        entry: "src/main.js",
        name: "IdvJs",
        fileName: () => `idv.js`,
        formats: ["umd"],
      },
      rollupOptions: {
        external: [],
        output: {
          globals: {},
        },
      },
    },
    plugins: [
      {
        name: "html-transform",
        transformIndexHtml(html) {
          const scriptSrc = isProduction ? "/idv.js" : "/src/main.js";
          return html.replace("%SCRIPT_SRC%", scriptSrc);
        },
      },
    ],
  };
});
