import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  base: process.env.PUBLIC_PATH || '/react-para/',
  plugins: [reactRouter(), tsconfigPaths()],
});
