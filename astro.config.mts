import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import { FontaineTransform } from "fontaine";
import vercel from "@astrojs/vercel";
import Icons from "unplugin-icons/vite";
import { promises as fs } from "node:fs";
import { pascalCase } from "es-toolkit";
import pocketbase from "astro-pocketbase";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    isr: { bypassToken: process.env.VERCEL_REVALIDATE_TOKEN, exclude: ["/api/invalidate"] },
  }),

  // prefetch: {
  //   defaultStrategy: "load",
  //   prefetchAll: true,
  // },

  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    pocketbase({
      ignore: ["users"],
      nameEnumSchema: (name: string) => `z${pascalCase(name)}`,
      nameRecordSchema: (name: string) => `z${pascalCase(name)}Record`,
    }),
    sitemap(),
  ],

  vite: {
    plugins: [
      // @ts-expect-error
      FontaineTransform.vite({
        fallbacks: ["Arial"],
        resolvePath: (id) => new URL(id.startsWith("/") ? `public/${id.slice(1)}` : `node_modules/${id}`, import.meta.url),
      }),
      // @ts-expect-error
      Icons({
        compiler: "jsx",
        jsx: "react",
        customCollections: {
          ta: {
            logo: () => fs.readFile("./src/icons/logo.svg", "utf8"),
            stain: () => fs.readFile("./src/icons/stain.svg", "utf8"),
          },
        },
      }),
    ],
  },

  env: {
    schema: {
      ASTRO_POCKETBASE_ADMIN_EMAIL: envField.string({ context: "server", access: "secret" }),
      ASTRO_POCKETBASE_ADMIN_PASSWORD: envField.string({ context: "server", access: "secret" }),
      MAILCHIMP_API_KEY: envField.string({ context: "server", access: "secret" }),
      MAILCHIMP_LIST_ID: envField.string({ context: "server", access: "secret" }),
      MAILCHIMP_SERVER: envField.string({ context: "server", access: "secret" }),
      PUBLIC_ASTRO_POCKETBASE_URL: envField.string({ context: "server", access: "public" }),
      PUBLIC_IMGIX_URL: envField.string({ context: "server", access: "public" }),
      RESEND_API_KEY: envField.string({ context: "server", access: "secret" }),
      VERCEL_REVALIDATE_TOKEN: envField.string({ context: "server", access: "secret" }),
    },
  },
});
