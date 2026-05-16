import { useRef, useEffect, useCallback } from 'react';
import './HeroScene3D.css';

/* ── Website palette ── */
const TEAL  = '#f97316';
const BLUE  = '#ea580c';
const BG    = 'transparent';

/* ── 7 service tiles ── */
const TILE_LABELS = [
  'Web\nDevelopment',
  'UI/UX\nDesign',
  'Mobile\nDevelopment',
  'Cloud &\nHosting',
  'AI &\nAutomation',
  'CMS\nDevelopment',
  'Software\nDevelopment',
];

/* ── Seeded stars (stable between renders) ── */
function makeStars(w, h, n = 90) {
  return Array.from({ length: n }, (_, i) => {
    const s = (i * 2654435761) >>> 0;
    return {
      x: ((s % 9973) / 9973) * w,
      y: (((s >> 8) % 8191) / 8191) * h,
      r: 0.6 + ((s % 19) / 19) * 1.4,
      a: 0.25 + ((s % 11) / 11) * 0.6,
      blink: 1.2 + ((s % 7) / 7) * 3,
    };
  });
}

/* ── roundRect helper ── */
function rrect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

export default function HeroScene3D() {
  const canvasRef = useRef(null);
  const starsRef  = useRef(null);
  const rafRef    = useRef(null);
  const tRef      = useRef(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const W  = canvas.width;
    const H  = canvas.height;
    const dpr = window.devicePixelRatio || 1;
    const w = W / dpr;   // CSS pixels
    const h = H / dpr;

    const t = tRef.current;

    /* ── oblique projection ──────────────────────────────────
       XZ orbital plane viewed from ~35° above.
       3D → 2D:   sx = cx + x * SCALE
                  sy = cy - y * SCALE + z * TILT * SCALE
       ──────────────────────────────────────────────────────── */
    const SCALE  = Math.min(w, h) * 0.235;
    const TILT   = 0.38;           // how flat the orbit ellipse appears
    const CX     = w * 0.5;
    const CY     = h * 0.5;

    function proj(x, y, z) {
      return { sx: CX + x * SCALE, sy: CY - y * SCALE + z * TILT * SCALE };
    }

    /* ── ORBIT RADIUS ── */
    const R = 1.15;

    /* ── 1. Clear ── */
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, W, H);

    /* ── 2. Stars (Subtle dust in light theme) ── */
    if (!starsRef.current) starsRef.current = makeStars(w, h, 60);
    const stars = starsRef.current;
    for (const s of stars) {
      const alpha = s.a * (0.3 + 0.2 * Math.sin(t * s.blink));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r * 0.8, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(249, 115, 22, ${alpha.toFixed(2)})`;
      ctx.fill();
    }

    /* ── 3. Orbit ellipse (dashed) ── */
    ctx.save();
    ctx.strokeStyle = TEAL;
    ctx.lineWidth   = 0.8;
    ctx.globalAlpha = 0.28;
    ctx.setLineDash([6, 7]);
    ctx.beginPath();
    ctx.ellipse(CX, CY, R * SCALE, R * SCALE * TILT, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.globalAlpha = 1;
    ctx.restore();

    /* ── 4. Platform rings ── */
    ctx.save();
    const RING_RADII = [
      { rx: 0.32 * SCALE, pulseMul: 1,    col: TEAL },
      { rx: 0.48 * SCALE, pulseMul: 0.8,  col: BLUE },
      { rx: 0.64 * SCALE, pulseMul: 0.65, col: TEAL },
    ];
    for (const { rx, pulseMul, col } of RING_RADII) {
      const pulse  = 0.7 + 0.3 * Math.sin(t * 1.6 * pulseMul);
      ctx.shadowBlur   = 6 * pulse;
      ctx.strokeStyle  = col;
      ctx.lineWidth    = 1.5;
      ctx.globalAlpha  = pulse * 0.35;
      ctx.beginPath();
      ctx.ellipse(CX, CY, rx, rx * TILT, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    /* base disc glow */
    ctx.globalAlpha = 0.04;
    ctx.shadowBlur  = 20;
    ctx.shadowColor = TEAL;
    const grd = ctx.createRadialGradient(CX, CY, 0, CX, CY, 0.65 * SCALE);
    grd.addColorStop(0, 'rgba(249,115,22,0.15)');
    grd.addColorStop(1, 'transparent');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.ellipse(CX, CY, 0.65 * SCALE, 0.65 * SCALE * TILT, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    /* ── 5. Build tile positions and sort back→front ── */
    const N = TILE_LABELS.length;
    const tileData = TILE_LABELS.map((label, i) => {
      const a   = t + (i / N) * Math.PI * 2;
      const x   = R * Math.cos(a);
      const z   = R * Math.sin(a);
      const { sx, sy } = proj(x, 0, z);
      const depth = (Math.sin(a) + 1) / 2;  // 0 = back, 1 = front
      return { label, sx, sy, depth, i };
    });
    tileData.sort((a, b) => a.depth - b.depth);   // back first

    /* ── 6. Connecting lines (all, back→front) ── */
    for (const { sx, sy, depth } of tileData) {
      ctx.save();
      ctx.strokeStyle = TEAL;
      ctx.lineWidth   = 0.8;
      ctx.globalAlpha = 0.08 + depth * 0.08;
      ctx.setLineDash([4, 5]);
      ctx.beginPath();
      ctx.moveTo(CX, CY);
      ctx.lineTo(sx, sy);
      ctx.stroke();
      ctx.restore();
    }

    /* ── 7. Tiles (back→front for correct overlapping) ── */
    for (const { label, sx, sy, depth } of tileData) {
      const sc   = 0.62 + depth * 0.38;          // perspective scale
      const tw   = 82 * sc;
      const th   = 90 * sc;
      const fs   = 8.5 * sc;
      const alpha = 0.82 + depth * 0.15;

      ctx.save();
      ctx.globalAlpha = alpha;

      /* card background */
      ctx.shadowColor = 'rgba(0,0,0,0.06)';
      ctx.shadowBlur  = 8 * sc;
      ctx.fillStyle = '#ffffff';
      rrect(ctx, sx - tw/2, sy - th/2, tw, th, 12 * sc);
      ctx.fill();

      /* card border */
      ctx.strokeStyle = `rgba(249,115,22,${0.15 + depth * 0.2})`;
      ctx.lineWidth   = 1 * sc;
      rrect(ctx, sx - tw/2, sy - th/2, tw, th, 12 * sc);
      ctx.stroke();

      /* label */
      ctx.shadowBlur   = 0;
      ctx.fillStyle    = '#0c0a09';
      ctx.font         = `700 ${fs}px Inter,system-ui,sans-serif`;
      ctx.textAlign    = 'center';
      ctx.textBaseline = 'middle';
      const lines = label.split('\n');
      const lineH  = fs * 1.35;
      const startY = sy - th * 0.1 - (lineH * (lines.length - 1)) / 2;
      lines.forEach((ln, li) => ctx.fillText(ln, sx, startY + li * lineH));

      /* bottom icon glyph line */
      const glyphs = ['</>', '{ }', '[]', '~^', '(o)', '=', '{/}'];
      ctx.fillStyle = TEAL;
      ctx.font      = `bold ${9 * sc}px 'Courier New',monospace`;
      ctx.fillText(glyphs[tileData.findIndex(d => d.label === label) % glyphs.length], sx, sy + th * 0.26);

      ctx.restore();
    }

    /* ── 8. AI cube (isometric, above platform) ── */
    const bobY  = Math.sin(t * 0.85) * 0.055;
    const cubeS = 0.24 * SCALE;                 // half-size
    const cx    = CX;
    const cy    = CY - (0.32 + bobY) * SCALE;  // above the platform

    const cubeRotY = t * 0.14;
    const cos = Math.cos(cubeRotY), sin = Math.sin(cubeRotY);

    /* cube 3D vertices (Y-rotation only) */
    function vtx(lx, ly, lz) {
      const rx = lx * cos + lz * sin;
      const rz = -lx * sin + lz * cos;
      return proj(rx * 0.28, ly * 0.28 + (0.32 + bobY), rz * 0.28);
    }

    const corners = [
      vtx(-1,-1,-1), vtx(1,-1,-1), vtx(1,1,-1), vtx(-1,1,-1),
      vtx(-1,-1, 1), vtx(1,-1, 1), vtx(1,1, 1), vtx(-1,1, 1),
    ];

    const faces = [
      { idx:[0,1,2,3], normal:[ 0, 0,-1], col:'#ffedd5' },  // back
      { idx:[4,5,6,7], normal:[ 0, 0, 1], col:'#ffffff' },  // front
      { idx:[0,4,7,3], normal:[-1, 0, 0], col:'#fff7ed' },  // left
      { idx:[1,5,6,2], normal:[ 1, 0, 0], col:'#fff7ed' },  // right
      { idx:[3,2,6,7], normal:[ 0, 1, 0], col:'#ffffff' },  // top
      { idx:[0,1,5,4], normal:[ 0,-1, 0], col:'#fed7aa' },  // bottom
    ];

    /* backface cull & sort front→back */
    const rotatedFaces = faces.map(f => {
      const nx = f.normal[0] * cos + f.normal[2] * sin;
      const nz = -f.normal[0] * sin + f.normal[2] * cos;
      const nxp = nx - 0 * 0.35;
      const visible = nz < 0.1 || f.normal[1] !== 0;
      return { ...f, nz, visible };
    });
    rotatedFaces.sort((a, b) => b.nz - a.nz);

    ctx.save();
    ctx.shadowColor = 'rgba(234, 88, 12, 0.1)';
    ctx.shadowBlur  = 15;

    for (const face of rotatedFaces) {
      if (!face.visible) continue;
      const pts = face.idx.map(i => corners[i]);
      ctx.beginPath();
      ctx.moveTo(pts[0].sx, pts[0].sy);
      for (let k = 1; k < pts.length; k++) ctx.lineTo(pts[k].sx, pts[k].sy);
      ctx.closePath();
      ctx.fillStyle   = face.col;
      ctx.fill();
      ctx.strokeStyle = `rgba(234, 88, 12, 0.25)`;
      ctx.lineWidth   = 1;
      ctx.stroke();
    }

    /* AI text on front face */
    const fc = corners[4].sx + (corners[5].sx - corners[4].sx) * 0.5;
    const fy = corners[4].sy + (corners[6].sy - corners[4].sy) * 0.5;
    ctx.fillStyle    = '#ea580c';
    ctx.font         = `900 ${cubeS * 0.55}px Outfit,Inter,sans-serif`;
    ctx.textAlign    = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur   = 8;
    ctx.shadowColor  = 'rgba(234, 88, 12, 0.2)';
    ctx.fillText('AI', fc, fy);

    /* top glow */
    ctx.globalAlpha = 0.15 + 0.05 * Math.sin(t * 1.2);
    const topGrd = ctx.createRadialGradient(cx, cy - cubeS, 0, cx, cy - cubeS, cubeS * 1.4);
    topGrd.addColorStop(0, 'rgba(249,115,22,0.2)');
    topGrd.addColorStop(1, 'transparent');
    ctx.fillStyle = topGrd;
    ctx.beginPath();
    ctx.ellipse(cx, cy - cubeS, cubeS * 1.1, cubeS * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    /* ── 9. Up-beam ── */
    ctx.save();
    ctx.globalAlpha = 0.05 + 0.02 * Math.sin(t * 1.4);
    const beamGrd = ctx.createLinearGradient(cx, cy - cubeS * 1.5, cx, cy - cubeS * 4.5);
    beamGrd.addColorStop(0, 'rgba(249,115,22,0.3)');
    beamGrd.addColorStop(1, 'transparent');
    ctx.fillStyle = beamGrd;
    ctx.beginPath();
    ctx.moveTo(cx - cubeS * 0.25, cy - cubeS * 1.5);
    ctx.lineTo(cx + cubeS * 0.25, cy - cubeS * 1.5);
    ctx.lineTo(cx + cubeS * 0.04, cy - cubeS * 4.5);
    ctx.lineTo(cx - cubeS * 0.04, cy - cubeS * 4.5);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    tRef.current += 0.007;
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
      starsRef.current = null;   // regenerate stars for new size
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

  return (
    <div className="hs3d-root">
      <canvas ref={canvasRef} className="hs3d-canvas" />
    </div>
  );
}
