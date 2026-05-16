import React from 'react';
import {
  BrainCircuit,
  Cloud,
  Code2,
  MonitorSmartphone,
  ShieldCheck,
  Sparkles,
  Database,
  Cpu,
  Rocket,
} from 'lucide-react';
import './HeroWaveCardsAnimation.css';

const cards = [
  { id: 'ai', label: 'AI Core', Icon: BrainCircuit },
  { id: 'cloud', label: 'Cloud Ops', Icon: Cloud },
  { id: 'web', label: 'Web Stack', Icon: Code2 },
  { id: 'ux', label: 'UX Flow', Icon: MonitorSmartphone },
  { id: 'secure', label: 'Secure', Icon: ShieldCheck },
  { id: 'boost', label: 'Growth', Icon: Sparkles },
  { id: 'data', label: 'Data Hub', Icon: Database },
  { id: 'compute', label: 'Compute', Icon: Cpu },
  { id: 'launch', label: 'Launch', Icon: Rocket },
];

const HeroWaveCardsAnimation = () => {
  return (
    <div className="hero-wave-cards" aria-hidden>
      <div className="hero-wave-stage">
        <div className="hero-wave-glow hero-wave-glow--one" />
        <div className="hero-wave-glow hero-wave-glow--two" />
        <div className="hero-wave-sweep" />
        <div className="hero-wave-grid">
        {cards.map(({ id, label, Icon }, index) => (
          <article
            key={id}
            className={`hero-wave-card hero-wave-card--${(index % 3) + 1}`}
            style={{
              '--card-delay': `${index * 0.09}s`,
              '--card-z': `${8 + (index % 3) * 8}px`,
            }}
          >
            <Icon size={17} strokeWidth={2} />
            <span>{label}</span>
          </article>
        ))}
        </div>
      </div>
    </div>
  );
};

export default HeroWaveCardsAnimation;
