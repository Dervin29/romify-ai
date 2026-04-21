import type { Route } from "./+types/products";
import Navbar from "../../components/Navbar";
import { ArrowRight, Cpu, Shield, Zap, Globe, Layers, Sparkles } from "lucide-react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Products | Roomify" },
    { name: "description", content: "Explore Roomify's AI-powered architectural design tools" },
  ];
}

const features = [
  {
    icon: Cpu,
    title: "AI Rendering Engine",
    description: "Generate photorealistic renders in seconds using advanced neural networks trained on millions of architectural designs.",
    badge: "Available Now"
  },
  {
    icon: Zap,
    title: "Real-time Collaboration",
    description: "Work simultaneously with team members, share designs instantly, and collect feedback in real-time.",
    badge: "Coming Soon"
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-grade encryption with SSO, audit logs, and compliance certifications for enterprise teams.",
    badge: "Available Now"
  },
  {
    icon: Globe,
    title: "Cloud Sync",
    description: "Access your projects from anywhere, on any device with automatic cloud synchronization.",
    badge: "Available Now"
  },
  {
    icon: Layers,
    title: "Version Control",
    description: "Track changes, revert to previous versions, and maintain a complete history of your design evolution.",
    badge: "Available Now"
  },
  {
    icon: Sparkles,
    title: "Style Transfer",
    description: "Apply any architectural style to your designs with one click - from brutalist to neoclassical.",
    badge: "Coming Soon"
  }
];

export default function Products() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="home">
        <section className="hero">
          <div className="announce">
            <div className="dot">
              <div className="pulse"></div>
            </div>
            <p>Products</p>
          </div>

          <h1>
            Powerful tools for<br />
            modern architecture
          </h1>

          <p className="subtitle">
            Everything you need to design, visualize, and collaborate on architectural projects
          </p>
        </section>

        <section className="projects">
          <div className="section-inner">
            <div className="section-head">
              <div className="copy">
                <h2>Features</h2>
                <p>Discover what makes Roomify the preferred choice for architects worldwide</p>
              </div>
            </div>

            <div className="projects-grid">
              {features.map((feature, index) => (
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
                      <feature.icon size={24} style={{ color: 'var(--color-primary)' }} />
                    </div>
                    
                    <div>
                      <h3 style={{ marginBottom: '0.5rem' }}>{feature.title}</h3>
                      <p style={{ 
                        fontSize: '0.875rem', 
                        color: 'var(--color-muted)',
                        lineHeight: '1.5',
                        marginBottom: '0.75rem'
                      }}>
                        {feature.description}
                      </p>
                      <span style={{
                        fontSize: '0.75rem',
                        color: feature.badge === 'Available Now' ? 'var(--color-primary)' : 'var(--color-muted)',
                        fontWeight: '500',
                        textTransform: 'uppercase',
                        letterSpacing: '0.05em'
                      }}>
                        {feature.badge}
                      </span>
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