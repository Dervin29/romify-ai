import type { Route } from "./+types/pricing";
import Navbar from "../../components/Navbar";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pricing | Roomify" },
    {
      name: "description",
      content: "Simple, transparent pricing for teams of all sizes",
    },
  ];
}

const plans = [
  {
    name: "Starter",
    price: "$29",
    period: "per month",
    description: "Perfect for individual architects and small studios",
    features: [
      "50 AI renders per month",
      "5 projects at a time",
      "Basic support",
      "Cloud storage (5GB)",
      "Export in PNG, JPEG",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "per month",
    description: "For professional architects and growing teams",
    features: [
      "Unlimited AI renders",
      "Unlimited projects",
      "Priority support",
      "Cloud storage (100GB)",
      "Export in PNG, JPEG, SVG",
      "Team collaboration (up to 5)",
      "Version history (30 days)",
    ],
    cta: "Get Started",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "tailored pricing",
    description: "For large organizations with specific needs",
    features: [
      "Unlimited everything",
      "24/7 dedicated support",
      "SAML SSO integration",
      "Custom storage limits",
      "Advanced analytics",
      "API access",
      "On-premise deployment option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export default function Pricing() {
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
            <p>Pricing</p>
          </div>

          <h1>
            Simple, transparent
            <br />
            pricing for everyone
          </h1>

          <p className="subtitle">
            Choose the plan that works best for you. All plans include a 14-day
            free trial.
          </p>
        </section>

        <section className="projects">
          <div className="section-inner">
            <div
              className="grid sm:grid-cols-2 md:grid-cols-3 gap-8"
              style={{
                gridTemplateColumns: "repeat(3, 1fr)",
                alignItems: "stretch",
              }}
            >
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className="project-card group"
                  style={{
                    transform: plan.highlighted ? "scale(1.02)" : "none",
                    border: plan.highlighted
                      ? "2px solid var(--color-primary)"
                      : "1px solid var(--color-border)",
                    borderRadius: "8px",
                    position: "relative",
                  }}
                >
                  {plan.highlighted && (
                    <div
                      style={{
                        position: "absolute",
                        top: "-12px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                        padding: "0.25rem 1rem",
                        borderRadius: "999px",
                        fontSize: "0.75rem",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Most Popular
                    </div>
                  )}

                  <div
                    className="card-body"
                    style={{
                      flexDirection: "column",
                      alignItems: "flex-start",
                      gap: "1rem",
                      padding: "2rem",
                      height: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <div style={{ width: "100%" }}>
                      <h3
                        style={{
                          fontSize: "1.5rem",
                          marginBottom: "0.5rem",
                          color: "var(--color-foreground)",
                        }}
                      >
                        {plan.name}
                      </h3>
                      <div style={{ marginBottom: "0.5rem" }}>
                        <span
                          style={{
                            fontSize: "2.5rem",
                            fontWeight: "bold",
                            color: "var(--color-foreground)",
                          }}
                        >
                          {plan.price}
                        </span>
                        <span
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--color-muted)",
                          }}
                        >
                          {" "}
                          {plan.period}
                        </span>
                      </div>
                      <p
                        style={{
                          fontSize: "0.875rem",
                          color: "var(--color-muted)",
                          marginBottom: "1.5rem",
                        }}
                      >
                        {plan.description}
                      </p>

                      <div
                        style={{
                          borderTop: "1px solid var(--color-border)",
                          margin: "1rem 0",
                          paddingTop: "1rem",
                        }}
                      >
                        {plan.features.map((feature, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "0.5rem",
                              marginBottom: "0.75rem",
                              fontSize: "0.875rem",
                              color: "var(--color-foreground)",
                            }}
                          >
                            <Check
                              size={16}
                              style={{
                                color: "var(--color-primary)",
                                flexShrink: 0,
                              }}
                            />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        plan.name === "Enterprise"
                          ? (window.location.href = "mailto:sales@roomify.com")
                          : navigate("/signup")
                      }
                      style={{
                        width: "100%",
                        padding: "0.75rem",
                        borderRadius: "0.5rem",
                        border: plan.highlighted
                          ? "none"
                          : "1px solid var(--color-border)",
                        backgroundColor: plan.highlighted
                          ? "var(--color-primary)"
                          : "var(--color-surface)",
                        color: plan.highlighted
                          ? "white"
                          : "var(--color-foreground)",
                        fontWeight: "500",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onMouseEnter={(e) => {
                        if (plan.highlighted) {
                          e.currentTarget.style.backgroundColor = "#ea580c";
                        } else {
                          e.currentTarget.style.backgroundColor =
                            "var(--color-surface-highlight)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (plan.highlighted) {
                          e.currentTarget.style.backgroundColor =
                            "var(--color-primary)";
                        } else {
                          e.currentTarget.style.backgroundColor =
                            "var(--color-surface)";
                        }
                      }}
                    >
                      {plan.cta}
                    </button>
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
