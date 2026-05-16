import React, { useEffect, useRef } from "react";

class Particle {
  constructor() {
    this.pos = { x: 0, y: 0 };
    this.vel = { x: 0, y: 0 };
    this.acc = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.closeEnoughTarget = 100;
    this.maxSpeed = 1.0;
    this.maxForce = 0.1;
    this.particleSize = 10;
    this.isKilled = false;
    this.startColor = { r: 0, g: 0, b: 0 };
    this.targetColor = { r: 0, g: 0, b: 0 };
    this.colorWeight = 0;
    this.colorBlendRate = 0.01;
  }

  move() {
    let proximityMult = 1;
    const distance = Math.sqrt(Math.pow(this.pos.x - this.target.x, 2) + Math.pow(this.pos.y - this.target.y, 2));

    if (distance < this.closeEnoughTarget) {
      proximityMult = distance / this.closeEnoughTarget;
    }

    const towardsTarget = {
      x: this.target.x - this.pos.x,
      y: this.target.y - this.pos.y,
    };

    const magnitude = Math.sqrt(towardsTarget.x * towardsTarget.x + towardsTarget.y * towardsTarget.y);
    if (magnitude > 0) {
      towardsTarget.x = (towardsTarget.x / magnitude) * this.maxSpeed * proximityMult;
      towardsTarget.y = (towardsTarget.y / magnitude) * this.maxSpeed * proximityMult;
    }

    const steer = {
      x: towardsTarget.x - this.vel.x,
      y: towardsTarget.y - this.vel.y,
    };

    const steerMagnitude = Math.sqrt(steer.x * steer.x + steer.y * steer.y);
    if (steerMagnitude > 0) {
      steer.x = (steer.x / steerMagnitude) * this.maxForce;
      steer.y = (steer.y / steerMagnitude) * this.maxForce;
    }

    this.acc.x += steer.x;
    this.acc.y += steer.y;

    this.vel.x += this.acc.x;
    this.vel.y += this.acc.y;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;
    this.acc.x = 0;
    this.acc.y = 0;
  }

  draw(ctx, drawAsPoints) {
    if (this.colorWeight < 1.0) {
      this.colorWeight = Math.min(this.colorWeight + this.colorBlendRate, 1.0);
    }

    const currentColor = {
      r: Math.round(this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight),
      g: Math.round(this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight),
      b: Math.round(this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight),
    };

    ctx.fillStyle = `rgb(${currentColor.r}, ${currentColor.g}, ${currentColor.b})`;
    if (drawAsPoints) {
      ctx.fillRect(this.pos.x, this.pos.y, 2, 2);
    } else {
      ctx.beginPath();
      ctx.arc(this.pos.x, this.pos.y, this.particleSize / 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  kill(width, height) {
    if (!this.isKilled) {
      const randomPos = this.generateRandomPos(width / 2, height / 2, (width + height) / 2);
      this.target.x = randomPos.x;
      this.target.y = randomPos.y;

      this.startColor = {
        r: this.startColor.r + (this.targetColor.r - this.startColor.r) * this.colorWeight,
        g: this.startColor.g + (this.targetColor.g - this.startColor.g) * this.colorWeight,
        b: this.startColor.b + (this.targetColor.b - this.startColor.b) * this.colorWeight,
      };
      this.targetColor = { r: 0, g: 0, b: 0 };
      this.colorWeight = 0;
      this.isKilled = true;
    }
  }

  generateRandomPos(x, y, mag) {
    const randomX = Math.random() * 1000;
    const randomY = Math.random() * 500;
    const direction = { x: randomX - x, y: randomY - y };
    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag;
      direction.y = (direction.y / magnitude) * mag;
    }
    return { x: x + direction.x, y: y + direction.y };
  }
}

import logoImg from '../assets/logo.png';

export function ParticleTextEffect({ words = ["TRUETWIST"], onComplete }) {
  const canvasRef = useRef(null);
  const animationRef = useRef();
  const particlesRef = useRef([]);       // logo particles
  const subtitleParticlesRef = useRef([]); // subtitle particles (separate pool)
  const frameCountRef = useRef(0);
  const wordIndexRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0, isPressed: false, isRightClick: false });

  const pixelSteps = 3;
  const drawAsPoints = true;

  const logoColors = [
    { r: 234, g: 88,  b: 12  }, // Brand Orange
    { r: 249, g: 115, b: 22  }, // Orange 500
    { r: 251, g: 146, b: 60  }, // Orange 400
    { r: 253, g: 186, b: 116 }, // Orange 300
  ];

  const generateRandomPos = (x, y, mag) => {
    const randomX = Math.random() * 1000;
    const randomY = Math.random() * 500;
    const direction = { x: randomX - x, y: randomY - y };
    const magnitude = Math.sqrt(direction.x * direction.x + direction.y * direction.y);
    if (magnitude > 0) {
      direction.x = (direction.x / magnitude) * mag;
      direction.y = (direction.y / magnitude) * mag;
    }
    return { x: x + direction.x, y: y + direction.y };
  };

  // ── Phase 1: Logo from image ───────────────────────────────────────────────
  const nextWord = (word, canvas) => {
    const img = new Image();
    img.src = logoImg;
    img.onload = () => {
      const offscreenCanvas = document.createElement("canvas");
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
      const offscreenCtx = offscreenCanvas.getContext("2d");

      // Draw logo centered in the top 60% of canvas
      const scale = Math.min(canvas.width / img.width, (canvas.height * 0.50) / img.height) * 0.9;
      const w = img.width * scale;
      const h = img.height * scale;
      const xOffset = (canvas.width - w) / 2;
      // Center it in top 60%, with a small top padding
      const yOffset = (canvas.height * 0.60 - h) / 2 + canvas.height * 0.02;

      offscreenCtx.drawImage(img, xOffset, yOffset, w, h);

      const imageData = offscreenCtx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;

      const particles = particlesRef.current;
      let particleIndex = 0;

      const coordsIndexes = [];
      for (let i = 0; i < pixels.length; i += pixelSteps * 4) {
        coordsIndexes.push(i);
      }
      // shuffle
      for (let i = coordsIndexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [coordsIndexes[i], coordsIndexes[j]] = [coordsIndexes[j], coordsIndexes[i]];
      }

      for (const coordIndex of coordsIndexes) {
        const alpha = pixels[coordIndex + 3];
        if (alpha > 50) {
          const x = (coordIndex / 4) % canvas.width;
          const y = Math.floor(coordIndex / 4 / canvas.width);
          const randomColor = logoColors[Math.floor(Math.random() * logoColors.length)];

          let particle;
          if (particleIndex < particles.length) {
            particle = particles[particleIndex];
            particle.isKilled = false;
            particleIndex++;
          } else {
            particle = new Particle();
            const randomPos = generateRandomPos(canvas.width / 2, canvas.height / 2, (canvas.width + canvas.height) / 2);
            particle.pos.x = randomPos.x;
            particle.pos.y = randomPos.y;
            particle.maxSpeed = Math.random() * 8 + 5;
            particle.maxForce = particle.maxSpeed * 0.08;
            particle.particleSize = Math.random() * 4 + 4;
            particle.colorBlendRate = Math.random() * 0.03 + 0.01;
            particles.push(particle);
          }

          particle.startColor = {
            r: particle.startColor.r + (particle.targetColor.r - particle.startColor.r) * particle.colorWeight,
            g: particle.startColor.g + (particle.targetColor.g - particle.startColor.g) * particle.colorWeight,
            b: particle.startColor.b + (particle.targetColor.b - particle.startColor.b) * particle.colorWeight,
          };
          particle.targetColor = randomColor;
          particle.colorWeight = 0;
          particle.target.x = x;
          particle.target.y = y;
        }
      }

      for (let i = particleIndex; i < particles.length; i++) {
        particles[i].kill(canvas.width, canvas.height);
      }
    };
  };

  // ── Phase 2: Subtitle text as particles ────────────────────────────────────
  const spawnSubtitleParticles = (canvas) => {
    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const ctx2 = offscreen.getContext("2d");

    const fontSize = Math.max(16, Math.round(canvas.width * 0.022));
    ctx2.font = `400 ${fontSize}px 'Inter', 'Outfit', sans-serif`;
    ctx2.textAlign = "center";
    ctx2.textBaseline = "middle";
    ctx2.letterSpacing = "0.45em";
    ctx2.fillStyle = "#ffffff";

    // Position text at ~68% — closer to logo to reduce gap
    const textY = canvas.height * 0.68;
    const text = "WHERE IDEAS MEET THEIR TRUETWIST";
    ctx2.fillText(text, canvas.width / 2, textY);

    // Draw thin divider lines above and below text (tighter gap)
    const textWidth = Math.min(ctx2.measureText(text).width + 40, canvas.width * 0.6);
    ctx2.fillRect(canvas.width / 2 - textWidth / 2, textY - fontSize - 5, textWidth, 1);
    ctx2.fillRect(canvas.width / 2 - textWidth / 2, textY + fontSize + 5, textWidth, 1);

    const imageData = ctx2.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;

    const subParticles = subtitleParticlesRef.current;

    const coords = [];
    for (let i = 0; i < pixels.length; i += 4) {
      if (pixels[i + 3] > 30) coords.push(i);
    }
    // shuffle
    for (let i = coords.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [coords[i], coords[j]] = [coords[j], coords[i]];
    }

    // Orange palette for subtitle
    const subtitleColors = [
      { r: 234, g: 88,  b: 12  }, // Brand Orange
      { r: 249, g: 115, b: 22  }, // Orange 500
      { r: 251, g: 146, b: 60  }, // Orange 400
      { r: 253, g: 186, b: 116 }, // Orange 300
    ];

    let idx = 0;
    for (const ci of coords) {
      const x = (ci / 4) % canvas.width;
      const y = Math.floor(ci / 4 / canvas.width);
      const color = subtitleColors[Math.floor(Math.random() * subtitleColors.length)];

      let p;
      if (idx < subParticles.length) {
        p = subParticles[idx];
        p.isKilled = false;
        idx++;
      } else {
        p = new Particle();
        // Start from random edge positions
        const fromX = Math.random() > 0.5 ? -50 : canvas.width + 50;
        p.pos.x = fromX;
        p.pos.y = canvas.height * 0.68 + (Math.random() - 0.5) * 40;
        p.maxSpeed = Math.random() * 6 + 4;
        p.maxForce = p.maxSpeed * 0.09;
        p.particleSize = Math.random() * 3 + 2;
        p.colorBlendRate = Math.random() * 0.04 + 0.02;
        subParticles.push(p);
      }
      p.startColor = { r: 100, g: 100, b: 100 };
      p.targetColor = color;
      p.colorWeight = 0;
      p.target.x = x;
      p.target.y = y;
    }
    for (let i = idx; i < subParticles.length; i++) {
      subParticles[i].kill(canvas.width, canvas.height);
    }

  };

  const [isFading, setIsFading] = React.useState(false);


  const handleComplete = () => {
    setIsFading(true);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);
  };

  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "rgba(0, 0, 0, 0.15)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw logo particles
    const particles = particlesRef.current;
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.move();
      p.draw(ctx, drawAsPoints);
      if (p.isKilled) {
        if (p.pos.x < 0 || p.pos.x > canvas.width || p.pos.y < 0 || p.pos.y > canvas.height) {
          particles.splice(i, 1);
        }
      }
    }

    // Draw subtitle particles
    const subParticles = subtitleParticlesRef.current;
    for (let i = subParticles.length - 1; i >= 0; i--) {
      const p = subParticles[i];
      p.move();
      p.draw(ctx, true);
      if (p.isKilled) {
        if (p.pos.x < 0 || p.pos.x > canvas.width || p.pos.y < 0 || p.pos.y > canvas.height) {
          subParticles.splice(i, 1);
        }
      }
    }

    frameCountRef.current++;

    // Spawn subtitle particles after logo has mostly formed (~3s at 60fps)
    if (frameCountRef.current === 180) {
      spawnSubtitleParticles(canvas);
    }

    // Auto-complete after full display time
    if (frameCountRef.current === 500) {
      handleComplete();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    nextWord(words[0], canvas);
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      nextWord(words[wordIndexRef.current], canvas);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-[9999] bg-black transition-opacity duration-700 ${isFading ? 'opacity-0' : 'opacity-100'}`}>
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}

