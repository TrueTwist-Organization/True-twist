import { useRef, useEffect, useCallback } from 'react';

const TEAL  = '#f97316';
const BLUE  = '#ea580c';
const WHITE = '#ffedd5';

/* ── Rotate vector around Y axis ── */
function rotY(x, y, z, a) {
  return [x * Math.cos(a) + z * Math.sin(a), y, -x * Math.sin(a) + z * Math.cos(a)];
}

/* ── Orthographic + slight Z tilt projection ── */
function proj(x, y, z, cx, cy, S) {
  const TILT = 0.28;   // how much z shifts screen-y (perspective tilt)
  return { sx: cx + x * S, sy: cy - y * S + z * TILT * S, depth: z };
}

/* ── Build ring sample points (axis = normalised [nx,ny,nz]) ── */
function ringPoints(nx, ny, nz, R, n) {
  // perpendicular basis vectors u, v
  let ux, uy, uz;
  if (Math.abs(ny) < 0.95) {
    const len = Math.hypot(nz, nx);
    ux = nz / len; uy = 0; uz = -nx / len;
  } else {
    ux = 1; uy = 0; uz = 0;
  }
  const vx = ny * uz - nz * uy;
  const vy = nz * ux - nx * uz;
  const vz = nx * uy - ny * ux;
  return Array.from({ length: n + 1 }, (_, i) => {
    const a = (i / n) * Math.PI * 2;
    const c = Math.cos(a), s = Math.sin(a);
    return [R * (c * ux + s * vx), R * (c * uy + s * vy), R * (c * uz + s * vz), a];
  });
}

/* ── Seeded particle scatter ── */
function makeParticles(count) {
  return Array.from({ length: count }, (_, i) => {
    const seed = (i * 2654435761) >>> 0;
    const theta = ((seed % 9973) / 9973) * Math.PI * 2;
    const phi   = ((seed % 7919) / 7919) * Math.PI;
    const r     = 1.15 + ((seed % 37) / 37) * 0.7;
    return {
      x: r * Math.sin(phi) * Math.cos(theta),
      y: r * Math.cos(phi),
      z: r * Math.sin(phi) * Math.sin(theta),
      size:  0.012 + ((seed % 17) / 17) * 0.022,
      alpha: 0.25 + ((seed % 13) / 13) * 0.55,
      blink: 0.8 + ((seed % 11) / 11) * 2.4,
    };
  });
}

/* ── Three ring definitions (base normals before scene rotation) ── */
const RING_DEFS = [
  { nx: 0,   ny: 1, nz: 0,    R: 1.0,  col: TEAL,  lw: 1.8, travellers: 4 },
  { nx: 0.86, ny: 0, nz: 0.5, R: 0.88, col: BLUE,  lw: 1.4, travellers: 3 },
  { nx: -0.5, ny: 0, nz: 0.86,R: 0.76, col: TEAL,  lw: 1.2, travellers: 3 },
];

const PARTICLES = makeParticles(60);

export default function HeroHologram() {
  const canvasRef = useRef(null);
  const rafRef    = useRef(null);
  const tRef      = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.width, H = canvas.height;
    const w = W / dpr, h = H / dpr;

    const t  = tRef.current;
    const CX = w * 0.5;
    const CY = h * 0.52;
    const S  = Math.min(w, h) * 0.32;

    /* clear */
    ctx.clearRect(0, 0, W, H);

    /* ── outer ambient glow ── */
    const og = ctx.createRadialGradient(CX, CY, 0, CX, CY, S * 1.8);
    og.addColorStop(0,   'rgba(249,115,22,0.03)');
    og.addColorStop(0.5, 'rgba(234,88,12,0.02)');
    og.addColorStop(1,   'transparent');
    ctx.fillStyle = og;
    ctx.beginPath();
    ctx.arc(CX, CY, S * 1.8, 0, Math.PI * 2);
    ctx.fill();

    /* ── scattered particles ── */
    const sceneRotY = t * 0.18;
    for (const p of PARTICLES) {
      const [rx, ry, rz] = rotY(p.x, p.y, p.z, sceneRotY);
      const { sx, sy, depth } = proj(rx, ry, rz, CX, CY, S);
      const a = p.alpha * (0.5 + 0.5 * Math.sin(t * p.blink));
      const r = p.size * S * (0.8 + depth * 0.2);
      ctx.beginPath();
      ctx.arc(sx, sy, Math.max(r, 0.5), 0, Math.PI * 2);
      ctx.fillStyle = depth > 0 ? `rgba(249,115,22,${(a * 0.4).toFixed(2)})` : `rgba(234,88,12,${(a * 0.2).toFixed(2)})`;
      ctx.fill();
    }

    /* ── three orbital rings ── */
    for (let ri = 0; ri < RING_DEFS.length; ri++) {
      const { nx, ny, nz, R, col, lw, travellers } = RING_DEFS[ri];
      const rotOffset = t * (0.12 + ri * 0.07) * (ri % 2 === 0 ? 1 : -1);

      /* rotate ring normal around Y */
      const [rnx,,rnz] = rotY(nx, ny, nz, sceneRotY);
      const rny = ny;

      const pts = ringPoints(rnx, rny, rnz, R, 120);

      /* sort to draw back arc first (depth-based) */
      const projected = pts.map(([px, py, pz]) => {
        const [rx, ry, rz] = rotY(px, py, pz, 0);
        return proj(rx, ry, rz, CX, CY, S);
      });

      /* draw ring arc (segment by segment for depth-based opacity) */
      for (let i = 0; i < projected.length - 1; i++) {
        const p0 = projected[i], p1 = projected[i + 1];
        const depth = (p0.depth + p1.depth) / 2;
        const opacity = depth > 0 ? 0.35 : 0.12;
        ctx.save();
        ctx.strokeStyle = col;
        ctx.lineWidth   = lw;
        ctx.globalAlpha = opacity;
        ctx.shadowColor = col;
        ctx.shadowBlur  = depth > 0 ? 6 : 2;
        ctx.beginPath();
        ctx.moveTo(p0.sx, p0.sy);
        ctx.lineTo(p1.sx, p1.sy);
        ctx.stroke();
        ctx.restore();
      }

      /* travelling glow dots on ring */
      for (let d = 0; d < travellers; d++) {
        const baseA = rotOffset + (d / travellers) * Math.PI * 2;
        const [px, py, pz] = ringPoints(rnx, rny, rnz, R, 1)[0]; // dummy init
        const a = baseA % (Math.PI * 2);
        // compute exact point on ring
        let ux2, uy2, uz2;
        if (Math.abs(rny) < 0.95) {
          const len = Math.hypot(rnz, rnx);
          ux2 = rnz / (len || 1); uy2 = 0; uz2 = -rnx / (len || 1);
        } else {
          ux2 = 1; uy2 = 0; uz2 = 0;
        }
        const vx2 = rny * uz2 - rnz * uy2;
        const vy2 = rnz * ux2 - rnx * uz2;
        const vz2 = rnx * uy2 - rny * ux2;
        const dotX = R * (Math.cos(a) * ux2 + Math.sin(a) * vx2);
        const dotY = R * (Math.cos(a) * uy2 + Math.sin(a) * vy2);
        const dotZ = R * (Math.cos(a) * uz2 + Math.sin(a) * vz2);
        const dp = proj(dotX, dotY, dotZ, CX, CY, S);

        const dotScale = 0.8 + dp.depth * 0.25;
        ctx.save();
        ctx.shadowColor = col;
        ctx.shadowBlur  = 12;
        const dg = ctx.createRadialGradient(dp.sx, dp.sy, 0, dp.sx, dp.sy, 6 * dotScale);
        dg.addColorStop(0, col);
        dg.addColorStop(0.6, col);
        dg.addColorStop(1, 'transparent');
        ctx.fillStyle = dg;
        ctx.globalAlpha = dp.depth > 0 ? 0.8 : 0.3;
        ctx.beginPath();
        ctx.arc(dp.sx, dp.sy, 5 * dotScale, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    /* ── central core sphere (front, on top of rings) ── */
    const bob = Math.sin(t * 0.7) * 0.018 * S;

    /* outer glow layers */
    const glowSizes = [1.1, 0.75, 0.52, 0.34];
    const glowAlphas = [0.06, 0.1, 0.18, 0.28];
    for (let g = 0; g < glowSizes.length; g++) {
      const gr = ctx.createRadialGradient(CX, CY + bob, 0, CX, CY + bob, S * glowSizes[g]);
      gr.addColorStop(0,    `rgba(249,115,22,${glowAlphas[g] * 0.5})`);
      gr.addColorStop(0.55, `rgba(234,88,12,${glowAlphas[g] * 0.2})`);
      gr.addColorStop(1,    'transparent');
      ctx.fillStyle = gr;
      ctx.beginPath();
      ctx.arc(CX, CY + bob, S * glowSizes[g], 0, Math.PI * 2);
      ctx.fill();
    }

    /* sphere surface */
    const coreR = S * 0.2;
    ctx.save();
    ctx.shadowColor = TEAL;
    ctx.shadowBlur  = 25;
    const sg = ctx.createRadialGradient(CX - coreR * 0.28, CY + bob - coreR * 0.28, 0, CX, CY + bob, coreR);
    sg.addColorStop(0,    'rgba(255,255,255,0.98)');
    sg.addColorStop(0.35, 'rgba(255,237,213,0.9)');
    sg.addColorStop(0.72, 'rgba(249,115,22,0.7)');
    sg.addColorStop(1,    'rgba(234,88,12,0.4)');
    ctx.fillStyle = sg;
    ctx.beginPath();
    ctx.arc(CX, CY + bob, coreR, 0, Math.PI * 2);
    ctx.fill();

    /* inner bright specular */
    const hg = ctx.createRadialGradient(CX - coreR * 0.3, CY + bob - coreR * 0.3, 0, CX - coreR * 0.3, CY + bob - coreR * 0.3, coreR * 0.55);
    hg.addColorStop(0, 'rgba(255,255,255,0.9)');
    hg.addColorStop(1, 'transparent');
    ctx.fillStyle = hg;
    ctx.beginPath();
    ctx.arc(CX, CY + bob, coreR, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    /* ── light rays from core ── */
    const rayCount = 6;
    for (let i = 0; i < rayCount; i++) {
      const rayA    = (i / rayCount) * Math.PI * 2 + t * 0.08;
      const rayLen  = S * (0.55 + 0.15 * Math.sin(t * 0.6 + i));
      const rx2     = Math.cos(rayA);
      const ry2     = Math.sin(rayA);
      ctx.save();
      ctx.globalAlpha = 0.03 + 0.02 * Math.sin(t + i);
      const rg = ctx.createLinearGradient(
        CX, CY + bob,
        CX + rx2 * rayLen, CY + bob + ry2 * rayLen,
      );
      rg.addColorStop(0, TEAL);
      rg.addColorStop(1, 'transparent');
      ctx.strokeStyle = rg;
      ctx.lineWidth   = 1.2 + Math.sin(t * 0.4 + i) * 0.5;
      ctx.beginPath();
      ctx.moveTo(CX, CY + bob);
      ctx.lineTo(CX + rx2 * rayLen, CY + bob + ry2 * rayLen);
      ctx.stroke();
      ctx.restore();
    }

    /* ── pulsing outer ring ── */
    const pulseR  = S * (0.95 + 0.04 * Math.sin(t * 1.1));
    const pulseA  = 0.04 + 0.02 * Math.sin(t * 1.1);
    ctx.save();
    ctx.strokeStyle = TEAL;
    ctx.lineWidth   = 1;
    ctx.globalAlpha = pulseA;
    ctx.beginPath();
    ctx.arc(CX, CY, pulseR, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    tRef.current += 0.008;
    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width  = canvas.offsetWidth  * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      const ctx = canvas.getContext('2d');
      ctx.scale(dpr, dpr);
    };
    resize();
    rafRef.current = requestAnimationFrame(draw);
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [draw]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />;
}
