import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import {
  ArrowRight,
  ArrowUpRight,
  Clock,
  Layers,
} from "lucide-react";
import Button from "../../components/ui/Button";
import Upload from "../../components/Upload";
import { useNavigate } from "react-router";
import React, { useEffect, useRef, useState } from "react";
import { createProject, getProjects } from "../../lib/puter.action";
import ScrollToTop from "../../components/ScrollToTop";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Roomify - AI Architectural Design Platform" },
    { name: "description", content: "Build beautiful spaces at the speed of thought with Roomify AI" },
  ];
}

export default function Home() {
  const navigate = useNavigate();
  const [projects, setProjects] = React.useState<DesignItem[]>([]);
  const [loading, setLoading] = React.useState(true);
  const isCreatingProjectRef = useRef(false);

  const handleUploadComplete = async (base64Data: string) => {
    if (isCreatingProjectRef.current) return;

    isCreatingProjectRef.current = true;

    const newId = Date.now().toString();
    const name = `Residence_${newId}`;

    const newItem = {
      id: newId,
      name,
      sourceImage: base64Data,
      renderedImage: undefined,
      timestamp: Date.now(),
    };

    try {
      const saved = await createProject({
        item: newItem,
        visibility: "private",
      });

      if (!saved) {
        console.error("Failed to create project");
        return false;
      }

      setProjects((prev) => [saved, ...prev]);

      navigate(`/visualizer/${newId}`, {
        state: {
          initialImage: saved.sourceImage,
          initialRender: saved.renderedImage || null,
          name,
        },
      });

      return true;
    } catch (err) {
      console.error("Failed to create project", err);
      return false;
    } finally {
      isCreatingProjectRef.current = false;
    }
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const items = await getProjects();
        setProjects(items || []);
      } catch (err) {
        console.error("Failed to fetch projects", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="home">
      <Navbar />

      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Introducing Roomify 2.0</p>
        </div>
        
        <h1>
          Build Beautiful spaces at the speed of thought with Roomify
        </h1>
        
        <p className="subtitle">
          Roomify is an AI-first design environment that empowers you to
          visualize, render and ship architectural designs in record time.
        </p>

        <div className="actions">
          <a href="#upload" className="cta">
            Start Building <ArrowRight className="icon" />
          </a>
          <Button variant="outline" size="lg">
            Watch Demo
          </Button>
        </div>

        <div className="upload-shell">
          <div className="grid-overlay" />

          <div className="upload-card">
            <div className="upload-head">
              <div className="upload-icon">
                <Layers size={24} />
              </div>
              <h3>Upload your floor plan</h3>
              <p>Supports JPG, PNG formats up to 10MB</p>
            </div>

            <Upload onComplete={handleUploadComplete} />
          </div>
        </div>
      </section>

      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>View and manage your architectural projects in one place.</p>
            </div>
          </div>

          <div className="projects-grid">
            {loading ? (
              Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="project-card">
                  <div className="preview" />
                  <div className="card-body">
                    <div>
                      <div className="skeleton-line" />
                      <div className="skeleton-line small" />
                    </div>
                  </div>
                </div>
              ))
            ) : projects.length === 0 ? (
              <div className="empty">
                No projects yet. Start by uploading one.
              </div>
            ) : (
              projects.map(
                ({ id, name, renderedImage, sourceImage, timestamp }) => (
                  <div
                    key={id}
                    className="project-card group"
                    onClick={() => navigate(`/visualizer/${id}`)}
                  >
                    <div className="preview">
                      <img
                        src={renderedImage || sourceImage}
                        alt={`${name} preview`}
                      />
                      <div className="badge">
                        <span>Community</span>
                      </div>
                    </div>

                    <div className="card-body">
                      <div>
                        <h3>{name}</h3>
                        <div className="meta">
                          <Clock size={12} />
                          <span>
                            {new Date(timestamp).toLocaleDateString()}
                          </span>
                          <span>By You</span>
                        </div>
                      </div>

                      <div className="arrow">
                        <ArrowRight size={16} />
                      </div>
                    </div>
                  </div>
                ),
              )
            )}
          </div>
        </div>
      </section>

      <ScrollToTop />
    </div>
  );
}