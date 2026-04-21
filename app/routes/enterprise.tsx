import type { Route } from "./+types/enterprise";
import Navbar from "../../components/Navbar";
import {
  Shield,
  Users,
  Database,
  Globe,
  Lock,
  Headphones,
  Check,
  ArrowRight,
} from "lucide-react";
import Button from "../../components/ui/Button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Enterprise | Roomify" },
    {
      name: "description",
      content:
        "Enterprise-grade architectural design solutions for large organizations",
    },
  ];
}

const enterpriseFeatures = [
  {
    icon: Shield,
    title: "Security & Compliance",
    description:
      "SOC 2 Type II certified, GDPR compliant, with enterprise-grade encryption at rest and in transit.",
  },
  {
    icon: Users,
    title: "Team Management",
    description:
      "Advanced role-based access control, team analytics, and unified billing across departments.",
  },
  {
    icon: Database,
    title: "Data Sovereignty",
    description:
      "Choose your data region, with options for on-premise or dedicated cloud deployment.",
  },
  {
    icon: Globe,
    title: "Global Infrastructure",
    description:
      "99.99% uptime SLA with multi-region failover and load balancing for global teams.",
  },
  {
    icon: Lock,
    title: "SSO Integration",
    description:
      "Seamless integration with Okta, Auth0, Azure AD, and any SAML 2.0 identity provider.",
  },
  {
    icon: Headphones,
    title: "Premium Support",
    description:
      "24/7 dedicated account manager with 15-minute response time SLA for critical issues.",
  },
];

const caseStudies = [
  {
    company: "Foster + Partners",
    industry: "Architecture",
    description:
      "Reduced design iteration time by 67% across 50+ active projects.",
  },
  {
    company: "Gensler",
    industry: "Design",
    description:
      "Scaled from 10 to 500+ users while maintaining 99.99% platform uptime.",
  },
  {
    company: "BIG",
    industry: "Architecture",
    description:
      "Achieved 40% faster client approvals with real-time visualization tools.",
  },
];

export default function Enterprise() {
  return (
    <>
      <Navbar />
      <div className="home">
        <section className="hero">
          <div className="announce">
            <div className="dot">
              <div className="pulse"></div>
            </div>
            <p>Enterprise</p>
          </div>

          <h1>
            Enterprise-grade architecture
            <br />
            for the world's leading firms
          </h1>

          <p className="subtitle">
            Scale your practice with security, reliability, and dedicated
            support
          </p>

          <div className="actions">
            <button
              onClick={() =>
                (window.location.href = "mailto:enterprise@roomify.com")
              }
              className="cta"
            >
              Contact Sales <ArrowRight className="icon" />
            </button>
            <Button variant="outline" size="lg">
              Schedule Demo
            </Button>
          </div>
        </section>

        <section className="projects">
          <div className="section-inner">
            <div className="section-head">
              <div className="copy">
                <h2>Enterprise Features</h2>
                <p>Built for scale, security, and performance</p>
              </div>
            </div>

            <div className="projects-grid">
              {enterpriseFeatures.map((feature, index) => (
                <div key={index} className="project-card group">
                  <div
                    className="card-body"
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "1rem",
                      padding: "1.5rem",
                    }}
                  >
                    <div
                      style={{
                        width: "48px",
                        height: "48px",
                        borderRadius: "12px",
                        backgroundColor: "var(--color-surface-highlight)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid var(--color-border)",
                      }}
                    >
                      <feature.icon
                        size={24}
                        style={{ color: "var(--color-primary)" }}
                      />
                    </div>

                    <div>
                      <h3 style={{ marginBottom: "0.5rem" }}>
                        {feature.title}
                      </h3>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-muted)",
                          lineHeight: "1.5",
                        }}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="projects"
          style={{ backgroundColor: "var(--color-surface)" }}
        >
          <div className="section-inner">
            <div className="section-head">
              <div className="copy">
                <h2>Trusted by industry leaders</h2>
                <p>See how top architecture firms use Roomify Enterprise</p>
              </div>
            </div>

            <div
              className="projects-grid"
            >
              {caseStudies.map((study, index) => (
                <div key={index} className="project-card group">
                  <div
                    className="card-body"
                    style={{
                      flexDirection: "column",
                      gap: "1rem",
                      padding: "1.5rem",
                    }}
                  >
                    <h3 style={{ fontSize: "1.25rem" }}>{study.company}</h3>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--color-muted)",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      {study.industry}
                    </p>
                    <p
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-foreground)",
                        lineHeight: "1.6",
                      }}
                    >
                      {study.description}
                    </p>
                    <a
                      href="#"
                      style={{
                        fontSize: "0.875rem",
                        color: "var(--color-primary)",
                        textDecoration: "none",
                        fontWeight: "500",
                        marginTop: "0.5rem",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      Read Case Study <ArrowRight size={14} />
                    </a>
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
