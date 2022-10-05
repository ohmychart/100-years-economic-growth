import preprocess from "svelte-preprocess";
import adapter from "@sveltejs/adapter-static";

const prod = process.env.NODE_ENV === "production";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      pages: "docs",
      assets: "docs",
    }),
    paths: {
      base: prod ? "/100-years-economic-growth" : "",
    },
  },

  preprocess: [
    preprocess({
      postcss: true,
    }),
  ],
};

export default config;
