import { defineConfig } from "vite";

export default defineConfig(({ mode }) => {
  const isProduction = mode === "production";

  return {
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
