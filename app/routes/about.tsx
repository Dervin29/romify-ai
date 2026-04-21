import type { Route } from "./+types/about";
import Navbar from "../../components/Navbar";
import { Layers, Clock, Sparkles, Target, Zap, Heart } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | Roomify" },
    { name: "description", content: "Learn more about Roomify" },
  ];
}

export default function About() {
  const missionCards = [
    {
      icon: Layers,
      title: "Clarity",
      description: "Clean, simple workflows that eliminate unnecessary steps.",
    },
    {
      icon: Clock,
      title: "Speed",
      description: "Compress hours of design iteration into seconds.",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "AI-first tools that redefine how spaces are created.",
    },
  ];

  const stats = [
    { value: "10x", label: "Faster workflows" },
    { value: "1000+", label: "Designs generated" },
    { value: "24/7", label: "AI availability" },
  ];

  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>About Roomify</p>
        </div>

        <h1>
          Built for speed. <br />
          Designed for creators.
        </h1>

        <p className="subtitle">
          Roomify transforms architectural workflows into a fast, AI-powered
          experience—helping you go from idea to visualization instantly.
        </p>
      </section>

      {/* Mission Section */}
      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>What drives us</h2>
              <p>
                We focus on speed, clarity, and removing friction from design.
              </p>
            </div>
          </div>

          <div className="projects-grid">
            {missionCards.map((card, index) => (
              <div key={index} className="project-card group">
                <div className="card-body" style={{ 
                  flexDirection: 'column', 
                  alignItems: 'flex-start', 
                  gap: '0.75rem' 
                }}>
                  <card.icon size={28} style={{ color: 'var(--color-primary)' }} />
                  <h3>{card.title}</h3>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--color-muted)',
                    lineHeight: '1.5',
                    margin: 0
                  }}>
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="projects" style={{ backgroundColor: 'var(--color-surface)' }}>
        <div className="section-inner">
          <div className="section-head">
            <div className="copy" style={{ maxWidth: '48rem' }}>
              <h2>Our story</h2>
              <p style={{ fontSize: '1.125rem', marginBottom: '1rem' }}>
                Architectural visualization has always been slow, manual, and
                expensive. We saw an opportunity to rethink it completely.
              </p>
              <p style={{ color: 'var(--color-muted)' }}>
                Roomify was built to remove that friction. By combining AI with
                intuitive tooling, we created a system where ideas can be
                visualized instantly—without complex workflows or delays.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="projects">
        <div className="section-inner">
          <div className="projects-grid">
            {stats.map((stat, index) => (
              <div key={index} className="project-card group" style={{ textAlign: 'center' }}>
                <div className="card-body" style={{ 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <h2 style={{ 
                    fontSize: '3rem', 
                    fontWeight: 'bold', 
                    color: 'var(--color-primary)',
                    letterSpacing: '-0.02em'
                  }}>
                    {stat.value}
                  </h2>
                  <p style={{ 
                    fontSize: '0.875rem', 
                    color: 'var(--color-muted)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}