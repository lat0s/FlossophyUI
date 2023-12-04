import { fileURLToPath, URL } from "node:url"

/// <reference types="vitest" />
import { defineConfig } from "vite"
import type { UserConfig as VitestUserConfigInterface } from "vitest/config"
import Components from 'unplugin-vue-components/vite'
import {BootstrapVueNextResolver} from 'unplugin-vue-components/resolvers'

const vitestConfig: VitestUserConfigInterface = {
  test: {
    globals: true,
    environment: "jsdom",
  },
}

import vue from "@vitejs/plugin-vue"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(),
    Components({
    resolvers: [BootstrapVueNextResolver()],
  }),],
  
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: vitestConfig.test,
})
