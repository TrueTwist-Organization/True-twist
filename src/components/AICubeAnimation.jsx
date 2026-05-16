import { useState, useEffect } from "react";

const services = [
  { id: 1, icon: "</>", label: "Web Development", sublabel: "Development", angle: 210, dist: 220 },
  { id: 2, icon: "📱", label: "Mobile App", sublabel: "Solutions", angle: 280, dist: 200 },
  { id: 3, icon: "🎨", label: "UI/UX Design", sublabel: "Interfaces", angle: 340, dist: 220 },
  { id: 4, icon: "☁️", label: "Cloud Ops", sublabel: "Infrastructure", angle: 30, dist: 205 },
  { id: 5, icon: "🤖", label: "AI Core", sublabel: "Enhancement", angle: 100, dist: 215 },
  { id: 6, icon: "🗄️", label: "Data Hub", sublabel: "Analytics", angle: 155, dist: 220 },
  { id: 7, icon: "🧠", label: "Strategy", sublabel: "Consulting", angle: 245, dist: 190 },
  { id: 8, icon: "⚡", label: "Performance", sublabel: "Optimization", angle: 60, dist: 210 },
];

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Rajdhani:wght@500;600;700&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .ai-root {
    background: transparent;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Rajdhani', sans-serif;
    position: relative;
    overflow: visible;
  }

  .scene {
    position: relative;
    width: 600px;
    height: 560px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* --- CUBE --- */
  .cube-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -58%);
    perspective: 800px;
    z-index: 10;
  }

  .cube {
    width: 120px;
    height: 120px;
    position: relative;
    transform-style: preserve-3d;
    animation: rotateCube 16s linear infinite;
  }

  @keyframes rotateCube {
    0%   { transform: rotateX(-20deg) rotateY(0deg); }
    100% { transform: rotateX(-20deg) rotateY(360deg); }
  }

  .face {
    position: absolute;
    width: 120px;
    height: 120px;
    border: 1px solid rgba(249, 115, 22, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Orbitron', monospace;
    font-weight: 800;
    font-size: 34px;
    color: #f97316;
    text-shadow: 0 0 15px rgba(249, 115, 22, 0.6);
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    backface-visibility: visible;
    box-shadow: inset 0 0 25px rgba(249, 115, 22, 0.15);
  }

  .face-front  { transform: translateZ(60px); }
  .face-back   { transform: rotateY(180deg) translateZ(60px); font-size: 22px; opacity: 0.85; }
  .face-right  { transform: rotateY(90deg) translateZ(60px); font-size: 26px; }
  .face-left   { transform: rotateY(-90deg) translateZ(60px); font-size: 26px; }
  .face-top    { transform: rotateX(90deg) translateZ(60px); font-size: 24px; }
  .face-bottom { transform: rotateX(-90deg) translateZ(60px); border-color: rgba(249, 115, 22, 0.1); background: rgba(255, 255, 255, 0.1); box-shadow: none; }

  /* --- CUBE INNER GLOW --- */
  .cube::before {
    content: '';
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    width: 60px; height: 60px;
    background: #f97316;
    border-radius: 50%;
    filter: blur(30px);
    opacity: 0.6;
    animation: corePulse 3s ease-in-out infinite;
  }

  @keyframes corePulse {
    0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
    50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
  }

  /* --- PLATFORM --- */
  .platform-wrap {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, 15%);
    z-index: 5;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .platform-glow {
    width: 220px;
    height: 24px;
    border-radius: 50%;
    background: radial-gradient(ellipse, rgba(249, 115, 22, 0.3) 0%, rgba(249, 115, 22, 0.08) 40%, transparent 70%);
    animation: platformPulse 3s ease-in-out infinite;
    margin-bottom: -6px;
  }

  .platform-ring1 {
    width: 180px;
    height: 16px;
    border-radius: 50%;
    border: 2px solid rgba(249, 115, 22, 0.4);
    background: transparent;
    animation: ringPulse 3s ease-in-out infinite;
    box-shadow: 0 0 15px rgba(249, 115, 22, 0.2), inset 0 0 10px rgba(249, 115, 22, 0.2);
  }

  .platform-ring2 {
    width: 130px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid rgba(249, 115, 22, 0.2);
    background: transparent;
    margin-top: 5px;
    animation: ringPulse 3s ease-in-out infinite 0.4s;
  }

  @keyframes platformPulse {
    0%, 100% { opacity: 0.7; transform: scaleX(1); }
    50% { opacity: 1; transform: scaleX(1.1); }
  }
  @keyframes ringPulse {
    0%, 100% { border-color: rgba(249, 115, 22, 0.2); box-shadow: 0 0 10px rgba(249, 115, 22, 0.1); }
    50% { border-color: rgba(249, 115, 22, 0.5); box-shadow: 0 0 20px rgba(249, 115, 22, 0.3); }
  }

  /* --- SVG LINES --- */
  .svg-lines {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 2;
  }

  /* --- SERVICE PANELS --- */
  .panel {
    position: absolute;
    z-index: 8;
    cursor: pointer;
  }

  .panel-inner {
    background: rgba(255, 255, 255, 0.75);
    border: 1px solid rgba(249, 115, 22, 0.2);
    border-radius: 16px;
    padding: 12px 18px;
    min-width: 120px;
    box-shadow: 0 8px 32px rgba(249, 115, 22, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 6px;
  }

  .panel:hover .panel-inner {
    border-color: rgba(249, 115, 22, 0.6);
    background: rgba(255, 255, 255, 0.95);
    box-shadow: 0 14px 40px rgba(249, 115, 22, 0.2);
    transform: scale(1.12) translateY(-6px);
  }

  .panel-icon {
    font-size: 22px;
    line-height: 1;
    filter: drop-shadow(0 2px 4px rgba(249, 115, 22, 0.2));
    transition: transform 0.3s ease;
  }
  
  .panel:hover .panel-icon {
    transform: scale(1.15);
  }

  .panel-label {
    font-size: 13px;
    font-weight: 700;
    color: #2e1f52;
    letter-spacing: 0.3px;
    text-align: center;
    line-height: 1.2;
    font-family: 'Rajdhani', sans-serif;
  }

  .panel-subtitle-anim {
    font-size: 10px;
    color: #f97316;
    font-family: 'Rajdhani', sans-serif;
    text-align: center;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: 600;
  }

  /* Float animations */
  .float-0 { animation: float0 3.2s ease-in-out infinite; }
  .float-1 { animation: float1 3.7s ease-in-out infinite 0.4s; }
  .float-2 { animation: float2 4.0s ease-in-out infinite 0.8s; }
  .float-3 { animation: float3 3.5s ease-in-out infinite 1.2s; }
  .float-4 { animation: float4 3.9s ease-in-out infinite 1.6s; }
  .float-5 { animation: float5 3.3s ease-in-out infinite 2.0s; }
  .float-6 { animation: float6 4.1s ease-in-out infinite 2.4s; }
  .float-7 { animation: float7 3.6s ease-in-out infinite 2.8s; }

  @keyframes float0 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes float1 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-10px)} }
  @keyframes float2 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
  @keyframes float3 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-9px)} }
  @keyframes float4 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-8px)} }
  @keyframes float5 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-11px)} }
  @keyframes float6 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-7px)} }
  @keyframes float7 { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-9px)} }

  .title-bar {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(249, 115, 22, 0.3);
    padding: 8px 24px;
    border-radius: 50px;
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 2px;
    color: #f97316;
    text-transform: uppercase;
    white-space: nowrap;
    box-shadow: 0 8px 24px rgba(249, 115, 22, 0.15);
  }
`;

function toRad(deg) { return (deg * Math.PI) / 180; }

export default function AICubeAnimation() {
  const centerX = 300;
  const centerY = 280;

  return (
    <>
      <style>{styles}</style>
      <div className="ai-root">
        <div className="scene">

          {/* SVG connecting lines */}
          <svg className="svg-lines" viewBox="0 0 600 560">
            <defs>
              <filter id="lineGlow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Outer ambient glow ring */}
            <ellipse cx={centerX} cy={centerY} rx="160" ry="45" fill="none"
              stroke="#f97316" strokeWidth="1.5" strokeOpacity="0.1" filter="url(#lineGlow)" />

            {services.map((s) => {
              const rad = toRad(s.angle);
              const px = centerX + Math.cos(rad) * s.dist * 0.45;
              const py = centerY + Math.sin(rad) * s.dist * 0.3;
              const ex = centerX + Math.cos(rad) * s.dist * 0.9;
              const ey = centerY + Math.sin(rad) * s.dist * 0.7;
              return (
                <g key={s.id}>
                  <line x1={px} y1={py} x2={ex} y2={ey}
                    stroke="#f97316" strokeWidth="1.2" strokeOpacity="0.25"
                    strokeDasharray="4 4" />
                  <circle cx={ex} cy={ey} r="3" fill="#f97316" opacity="0.4" filter="url(#lineGlow)" />
                  <circle cx={px} cy={py} r="2" fill="#f97316" opacity="0.3" />
                </g>
              );
            })}
          </svg>

          {/* Platform */}
          <div className="platform-wrap">
            <div className="platform-glow" />
            <div className="platform-ring1" />
            <div className="platform-ring2" />
          </div>

          {/* Cube */}
          <div className="cube-wrap">
            <div className="cube">
              <div className="face face-front">AI</div>
              <div className="face face-back">AI</div>
              <div className="face face-right">&lt;/&gt;</div>
              <div className="face face-left">⚙</div>
              <div className="face face-top">☁</div>
              <div className="face face-bottom"></div>
            </div>
          </div>

          {/* Service Panels */}
          {services.map((s, i) => {
            const rad = toRad(s.angle);
            const px = centerX + Math.cos(rad) * s.dist - 60;
            const py = centerY + Math.sin(rad) * s.dist * 0.7 - 45;
            return (
              <div
                key={s.id}
                className={`panel float-${i}`}
                style={{ left: px, top: py }}
              >
                <div className="panel-inner">
                  <span className="panel-icon">{s.icon}</span>
                  <span className="panel-label">{s.label}</span>
                  <span className="panel-subtitle-anim">{s.sublabel}</span>
                </div>
              </div>
            );
          })}

          <div className="title-bar">Next-Gen Tech Stack</div>
        </div>
      </div>
    </>
  );
}
