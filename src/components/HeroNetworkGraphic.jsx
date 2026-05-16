import { useRef, useState, useCallback } from 'react';
import {
  Smartphone,
  Code,
  Monitor,
  CloudCog,
  BrainCircuit,
  LayoutDashboard,
  SquareMousePointer,
} from 'lucide-react';
import './HeroNetworkGraphic.css';

/** Hub center in viewBox units (0–100); lines converge here */
const HUB_CX = 50;
const HUB_CY = 50;
const HUB_R = 44;
/** Vertical squash = faux-isometric ring */
const HUB_FLATTEN = 0.9;

/** 7 nodes — angles (rad from +x): matches reference layout around the cube */
const HUB_NODE_DEFS = [
  { key: 'software', kind: 'brackets', label: 'Software Development', angle: (7 * Math.PI) / 6 },
  { key: 'web', kind: 'webMonitor', label: 'Web Development', angle: -Math.PI / 2 },
  { key: 'uiux', Icon: SquareMousePointer, label: 'UI/UX Design', angle: -Math.PI / 6 },
  { key: 'mobile', Icon: Smartphone, label: 'Mobile Development', angle: 0 },
  { key: 'cloud', Icon: CloudCog, label: 'Cloud & Hosting', angle: Math.PI / 4 },
  { key: 'ai', Icon: BrainCircuit, label: 'AI & Automation', angle: Math.PI / 2 },
  { key: 'cms', Icon: LayoutDashboard, label: 'CMS Development', angle: (3 * Math.PI) / 4 },
];

const ORBIT_SPIN_S = 90;

function hubCurvePath(x2, y2, bulgeSign) {
  const mx = (HUB_CX + x2) / 2;
  const my = (HUB_CY + y2) / 2;
  const dx = x2 - HUB_CX;
  const dy = y2 - HUB_CY;
  const len = Math.hypot(dx, dy) || 1;
  const bulge = 5.2 * bulgeSign;
  const cx = mx + (-dy / len) * bulge;
  const cy = my + (dx / len) * bulge;
  return `M ${HUB_CX} ${HUB_CY} Q ${cx} ${cy} ${x2} ${y2}`;
}

function buildHubNodes() {
  return HUB_NODE_DEFS.map((def, i) => {
    const angle = def.angle;
    const line = {
      x: HUB_CX + HUB_R * Math.cos(angle),
      y: HUB_CY + HUB_R * Math.sin(angle) * HUB_FLATTEN,
    };
    const style = {
      left: `${line.x}%`,
      top: `${line.y}%`,
    };
    const delay = i * 0.11;
    if (def.kind === 'brackets') {
      return {
        key: def.key,
        label: def.label,
        line,
        style,
        delay,
        brackets: true,
        webMonitor: false,
        Icon: Code,
      };
    }
    if (def.kind === 'webMonitor') {
      return {
        key: def.key,
        label: def.label,
        line,
        style,
        delay,
        brackets: false,
        webMonitor: true,
        Icon: null,
      };
    }
    return {
      key: def.key,
      Icon: def.Icon,
      label: def.label,
      line,
      style,
      delay,
      brackets: false,
      webMonitor: false,
    };
  });
}

const NODE_ITEMS = buildHubNodes();

function BrainGlow() {
  return (
    <svg className="hero-network-brain-svg" viewBox="0 0 120 100" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <defs>
        <linearGradient id="hero-brain-grad" x1="30%" y1="0%" x2="70%" y2="100%">
          <stop offset="0%" stopColor="#fdba74" stopOpacity="0.95" />
          <stop offset="45%" stopColor="#f97316" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#ea580c" stopOpacity="0.45" />
        </linearGradient>
        <filter id="hero-brain-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        filter="url(#hero-brain-glow)"
        fill="url(#hero-brain-grad)"
        opacity="0.92"
        d="M60 8c-8 0-15 4-18 10-4-2-9-3-14-1-10 3-17 13-15 23-6 5-9 13-7 21 2 10 12 17 22 16 2 7 8 12 16 14 10 2 20-3 25-11 6 4 14 5 21 2 12-5 18-19 13-30 4-4 6-10 5-16-1-14-13-25-27-26-2-7-8-12-16-12zm-6 62c-4 0-8-2-10-6-2 4-6 7-11 7-7 0-12-6-12-13 0-5 3-9 7-11-1-2-1-4 0-6 1-6 7-10 13-9 3-5 9-8 15-8 8 0 15 5 17 13 8 1 14 8 14 16 0 9-7 16-16 16-4 0-8-2-11-5-2 3-6 5-10 5z"
      />
    </svg>
  );
}

function renderNodeIcon({ brackets, webMonitor, Icon }) {
  if (brackets) {
    return <span className="hero-network-brackets">&lt;/&gt;</span>;
  }
  if (webMonitor) {
    return (
      <span className="hero-network-icon-web-monitor">
        <Monitor size={24} strokeWidth={2} aria-hidden />
        <span className="hero-network-icon-web-monitor-code">&lt;/&gt;</span>
      </span>
    );
  }
  return <Icon size={24} strokeWidth={2} aria-hidden />;
}

export default function HeroNetworkGraphic({ showBrain = true, showHud = true }) {
  const rootRef = useRef(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  const onPointerMove = useCallback((e) => {
    const el = rootRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    setTilt({ rx: py * -8, ry: px * 10 });
  }, []);

  const onPointerLeave = useCallback(() => {
    setTilt({ rx: 0, ry: 0 });
  }, []);

  const spinStyle = { '--orbit-spin': `${ORBIT_SPIN_S}s` };

  return (
    <div
      ref={rootRef}
      className="hero-network-graphic"
      style={{
        ...spinStyle,
        transform: `perspective(960px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
      }}
      aria-hidden
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="hero-network-ambient" />
      <div className="hero-network-lens hero-network-lens--a" />
      <div className="hero-network-lens hero-network-lens--b" />
      <div className="hero-network-lens hero-network-lens--c" />
      <div className="hero-network-particles" />
      <div className="hero-network-streaks" />
      <div className="hero-network-floor-grid" />
      <div className="hero-network-vignette" />

      <svg className="hero-network-svg hero-network-svg--orbits" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
        <ellipse
          className="hero-network-orbit-dash hero-network-orbit-dash--1"
          cx={HUB_CX}
          cy={HUB_CY}
          rx={HUB_R + 1.2}
          ry={(HUB_R + 1.2) * HUB_FLATTEN}
          fill="none"
        />
        <ellipse
          className="hero-network-orbit-dash hero-network-orbit-dash--2"
          cx={HUB_CX}
          cy={HUB_CY}
          rx={HUB_R + 4.5}
          ry={(HUB_R + 4.5) * HUB_FLATTEN}
          fill="none"
        />
      </svg>

      <div
        className="hero-network-orbit-rotator hero-network-orbit-rotator--lines"
      >
        <svg className="hero-network-svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="hero-network-line-glow-ref" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" stopOpacity="0.35" />
              <stop offset="50%" stopColor="#fb923c" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ea580c" stopOpacity="0.55" />
            </linearGradient>
          </defs>
          {NODE_ITEMS.map(({ line }, i) => (
            <path
              key={`ln-${i}`}
              className="hero-network-line"
              style={{ animationDelay: `${i * 0.26}s` }}
              d={hubCurvePath(line.x, line.y, i % 2 === 0 ? 1 : -1)}
              pathLength={100}
              stroke="url(#hero-network-line-glow-ref)"
              strokeWidth="0.48"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>

      <div className="hero-network-pedestal">
        <div className="hero-network-beam" />
        <div className="hero-network-pedestal-ripple hero-network-pedestal-ripple--3" />
        <div className="hero-network-pedestal-ripple hero-network-pedestal-ripple--2" />
        <div className="hero-network-pedestal-ripple hero-network-pedestal-ripple--1" />
        <div className="hero-network-pedestal-disc" />
      </div>

      <div className={`hero-network-focal${showBrain ? '' : ' hero-network-focal--cube-only'}`}>
        {showBrain ? (
          <div className="hero-network-brain">
            <BrainGlow />
          </div>
        ) : null}
        <div className="hero-network-orbit-wrap">
          <div className="hero-network-orbit hero-network-orbit--1" />
          <div className="hero-network-orbit hero-network-orbit--2" />
          <div className="hero-network-orbit hero-network-orbit--3" />
          <div className="hero-network-cube-scope">
            <div className="hero-network-cube-top-glow" aria-hidden />
            <div className="hero-network-cube-bob">
              <div className="hero-network-cube-spin">
                <div className="hero-network-cube">
                  <div className="hero-network-cube-face hero-network-cube-face--front">
                    <span className="hero-network-cube-ai">AI</span>
                  </div>
                  <div className="hero-network-cube-face hero-network-cube-face--top" />
                  <div className="hero-network-cube-face hero-network-cube-face--right" />
                  <div className="hero-network-cube-face hero-network-cube-face--left" />
                  <div className="hero-network-cube-face hero-network-cube-face--bottom" />
                  <div className="hero-network-cube-face hero-network-cube-face--back" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-network-orbit-rotator hero-network-orbit-rotator--nodes">
        {NODE_ITEMS.map(({ label, style, delay, brackets, webMonitor, Icon, key }) => (
          <div key={key} className="hero-network-node-slot" style={{ ...style, animationDelay: `${delay}s` }}>
            <div
              className="hero-network-node hero-network-node--glass hero-network-node--ref"
              style={{ animationDelay: `${delay}s` }}
            >
              <div className="hero-network-node-inner">
                <div className="hero-network-node-glass">
                  <div className="hero-network-node-tile-glow" />
                  <span className="hero-network-node-label">{label}</span>
                  <div className="hero-network-node-icon-wrap">
                    <div className="hero-network-node-ring" />
                    <div className="hero-network-node-core">
                      {renderNodeIcon({ brackets, webMonitor, Icon })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showHud ? (
        <div className="hero-network-hud">
          <div className="hero-network-hud-row">
            <span className="hero-network-hud-label">Smart Searching</span>
            <div className="hero-network-hud-track" aria-hidden>
              <div className="hero-network-hud-fill hero-network-hud-fill--a" />
            </div>
          </div>
          <div className="hero-network-hud-row">
            <span className="hero-network-hud-label">Image Analysis</span>
            <div className="hero-network-hud-track" aria-hidden>
              <div className="hero-network-hud-fill hero-network-hud-fill--b" />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
