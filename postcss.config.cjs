/**
 * CommonJS PostCSS config — works reliably with `"type": "module"` in package.json
 * (avoids ESM resolution issues some setups hit with postcss.config.js).
 */
module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer')],
}
