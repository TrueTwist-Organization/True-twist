import React, { useMemo } from "react";
import { CircularTestimonials } from './circular-testimonials';
import { defaultReviews } from '../../data/reviewData';

const REVIEWS_STORAGE_KEY = 'tt_reviews_v12';
const DEFAULT_POSTER = 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=400&auto=format&fit=crop';

function loadReviews() {
  const saved = localStorage.getItem(REVIEWS_STORAGE_KEY);
  if (!saved) return defaultReviews;
  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultReviews;
  } catch {
    return defaultReviews;
  }
}

const FALLBACK_TESTIMONIALS = [
  {
    quote: "TrueTwist transformed our legacy systems into high-performance cloud infrastructure. Their AI-driven approach saved us months of development time.",
    name: "Alexander Mitchell",
    designation: "Nexus Dynamics",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote: "The UI/UX design provided by the team is world-class. Our user engagement increased by 45% within the first month of the new platform launch.",
    name: "Sarah Chen",
    designation: "Quantum Soft",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote: "Their automation tools completely streamlined our operations. Professional, agile, and they truly understand modern technology.",
    name: "James Rodriguez",
    designation: "EcoVibe Solutions",
    src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
  },
  {
    quote: "Exceptional security and scalability. We needed a partner who could handle enterprise-level demands, and TrueTwist delivered beyond expectations.",
    name: "Elena Petrova",
    designation: "Global FinTech",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop",
  },
];

export const CircularTestimonialsDemo = () => {
  const rawReviews = React.useMemo(() => loadReviews(), []);

  const testimonials = useMemo(() => {
    const published = rawReviews
      .filter((r: any) => r && r.status === 'Published')
      .map((r: any) => ({
        quote: r.text || '',
        name: r.name || 'Anonymous',
        designation: r.company || '',
        src: r.poster || DEFAULT_POSTER,
      }));
    return published.length > 0 ? published : FALLBACK_TESTIMONIALS;
  }, [rawReviews]);

  return (
    <div className="w-full flex justify-center px-4">
      <CircularTestimonials
        testimonials={testimonials}
        autoplay={true}
        colors={{
          name: "#f7f7ff",
          designation: "#f97316",
          testimony: "#d1d5db",
          arrowBackground: "#ea580c",
          arrowForeground: "#ffffff",
          arrowHoverBackground: "#ffffff",
        }}
      />
    </div>
  );
};
