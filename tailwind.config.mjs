export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'content-toc': 'minmax(0, 1fr) 250px',
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}