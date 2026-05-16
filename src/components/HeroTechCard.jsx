import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import './HeroTechCard.css';

/* Deterministic star positions — same every render */
const STARS = Array.from({ length: 55 }, (_, i) => {
  const a = (i * 2654435761) >>> 0;
  const b = (a * 1103515245 + 12345) >>> 0;
  return {
    x: (a % 9973) / 9973 * 100,
    y: (b % 8191) / 8191 * 100,
    r: 0.8 + (a % 17) / 17 * 1.2,
    o: 0.35 + (b % 11) / 11 * 0.55,
  };
});

function StarField() {
  return (
    <svg
      className="htc-stars"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {STARS.map((s, i) => (
        <circle
          key={i}
          cx={s.x}
          cy={s.y}
          r={s.r}
          fill="white"
          opacity={s.o}
        />
      ))}
    </svg>
  );
}

export default function HeroTechCard({ tabs = [] }) {
  const safeTabs = tabs.length
    ? tabs
    : [{ id: 'cloud-hosting', title: 'Cloud Solutions', text: 'Architecture, migration, and managed cloud patterns for resilient delivery.' }];

  const [activeId, setActiveId] = useState(() => {
    const cloud = safeTabs.find((t) => /cloud/i.test(t.title));
    return cloud?.id ?? safeTabs[0].id;
  });

  /* active tab always first, rest follow */
  const ordered = useMemo(() => {
    const active = safeTabs.find((t) => t.id === activeId);
    const rest = safeTabs.filter((t) => t.id !== activeId);
    return active ? [active, ...rest] : [...safeTabs];
  }, [safeTabs, activeId]);

  const active = safeTabs.find((t) => t.id === activeId) ?? safeTabs[0];

  return (
    <div className="htc-wrap">
      {/* ── upper: chips + starfield ── */}
      <div className="htc-upper">
        {/* left: stacked service chips */}
        <div className="htc-chips" role="tablist" aria-label="Services">
          {ordered.map((tab, depth) => (
            <button
              key={tab.id + depth}
              type="button"
              role="tab"
              aria-selected={depth === 0}
              className={`htc-chip${depth === 0 ? ' htc-chip--active' : ''}`}
              style={{ '--d': depth }}
              onClick={() => setActiveId(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* right: dark starfield */}
        <div className="htc-sky">
          <StarField />
        </div>
      </div>

      {/* ── lower: description + CTA ── */}
      <div className="htc-lower">
        <p className="htc-desc">{active?.text}</p>
        <Link to={`/services/${active?.id}`} className="htc-cta">
          Explore service
        </Link>
      </div>
    </div>
  );
}
