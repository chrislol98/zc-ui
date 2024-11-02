import { defineConfig } from "tsup";

export default defineConfig({
  clean: true,
  target: "es2019",
  dts: true,
  format: ["cjs", "esm"],
  banner: { js: '"use client";' },
});
