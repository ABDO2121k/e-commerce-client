import withMT from "@material-tailwind/react/utils/withMT"
import daisyui from "daisyui";
 
export default withMT({
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
});