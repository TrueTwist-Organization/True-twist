/**
 * Hero 3D (Spline) — whatever URL you set here is exactly what loads (not “robot mode”).
 * The built‑in default is a public Spline sample (often typography like “design”), not your robot.
 *
 * Apna robot dikhane ke liye:
 * 1. Spline app mein robot scene open karo → https://app.spline.design
 * 2. Export → Code → React → `scene="https://prod.spline.design/…/scene.splinecode"` copy karo
 * 3. Project root mein `.env` banao: `VITE_SPLINE_HERO_SCENE=paste_url_here`
 * 4. `npm run dev` dubara chalao
 *
 * @see `.env.example`
 */
export const HERO_SPLINE_SCENE =
  import.meta.env.VITE_SPLINE_HERO_SCENE ||
  'https://prod.spline.design/kZqon7W22qJ0fLKV/scene.splinecode';
