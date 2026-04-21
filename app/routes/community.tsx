import type { Route } from "./+types/community";
import Navbar from "../../components/Navbar";
import { Users, MessageCircle, BookOpen, Award, Calendar, ArrowRight } from "lucide-react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Community | Roomify" },
    { name: "description", content: "Join thousands of architects sharing and learning together" },
  ];
}

const stats = [
  { value: "10,000+", label: "Active Members" },
  { value: "50,000+", label: "Designs Shared" },
  { value: "150+", label: "Countries" },
  { value: "24/7", label: "Community Support" }
];

const resources = [
  {
    icon: BookOpen,
    title: "Documentation",
    description: "Comprehensive guides and API references",
    link: "#"
  },
  {
    icon: MessageCircle,
    title: "Forums",
    description: "Discuss ideas and get help from peers",
    link: "#"
  },
  {
    icon: Award,
    title: "Showcase",
    description: "Featured designs from the community",
    link: "#"
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Webinars, workshops, and meetups",
    link: "#"
  }
];

const testimonials = [
  {
    quote: "Roomify has transformed how our firm approaches architectural visualization. The community support is outstanding.",
    author: "Sarah Chen",
    role: "Principal Architect, Chen Studio",
    avatar: "SC"
  },
  {
    quote: "The collaborative features have cut our design iteration time in half. Best investment we've made this year.",
    author: "Marcus Rodriguez",
    role: "Design Director, Rodriguez Associates",
    avatar: "MR"
  },
  {
    quote: "As a solo practitioner, Roomify gives me access to tools and resources that were previously only available to large firms.",
    author: "Emma Thompson",
    role: "Independent Architect",
    avatar: "ET"
  }
];

export default function Community() {
  return (
    <>
      <Navbar />
      <div className="home">
        <section className="hero">
          <div className="announce">
            <div className="dot">
              <div className="pulse"></div>
            </div>
            <p>Community</p>
          </div>

          <h1>
            Join a global community<br />
            of architects and designers
          </h1>

          <p className="subtitle">
            Connect, share, and grow with thousands of professionals using Roomify
          </p>
        </section>

        <section className="projects">
          <div className="section-inner">
            <div className="projects-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
              {stats.map((stat, index) => (
                <div key={index} className="project-card" style={{ textAlign: 'center' }}>
                  <div className="card-body" style={{ 
                    flexDirection: 'column', 
                    alignItems: 'center',
                    padding: '2rem'
                  }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                      {stat.value}
                    </h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)' }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="projects" style={{ backgroundColor: 'var(--color-surface)' }}>
          <div className="section-inner">
            <div className="section-head">
              <div className="copy">
                <h2>Community Resources</h2>
                <p>Everything you need to get started and succeed</p>
              </div>
            </div>

            <div className="projects-grid">
              {resources.map((resource, index) => (
                <div key={index} className="project-card group">
                  <div className="card-body" style={{ 
                    flexDirection: 'column', 
                    alignItems: 'flex-start', 
                    gap: '1rem',
                    padding: '1.5rem'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--color-surface-highlight)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--color-border)'
                    }}>
                      <resource.icon size={24} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    
                    <div>
                      <h3 style={{ marginBottom: '0.5rem' }}>{resource.title}</h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-muted)', marginBottom: '1rem' }}>
                        {resource.description}
                      </p>
                      <a 
                        href={resource.link}
                        style={{
                          fontSize: '0.875rem',
                          color: 'var(--color-primary)',
                          textDecoration: 'none',
                          fontWeight: '500',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.5rem'
                        }}
                      >
                        Learn More <ArrowRight size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}