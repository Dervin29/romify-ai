import type { Route } from "./+types/home";
import Navbar from "../../components/Navbar";
import { ArrowRight, ArrowUpRight, Clock, Layers } from "lucide-react";
import Button from "../../components/ui/Button";
import Upload from "../../components/Upload";
import { useNavigate } from "react-router";

/**
 * Provide route metadata for the page.
 *
 * @returns An array of metadata entries: a `title` entry with value `"New React Router App"` and a `description` meta tag with content `"Welcome to React Router!"`.
 */
export function meta({}: Route.MetaArgs) {
  return [
    { title: "New React Router App" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

/**
 * Renders the Home page, including hero, upload card, and projects sections.
 *
 * When an upload completes the component navigates to `/visualizer/<id>` and
 * passes the uploaded image's base64 data in the navigation state.
 *
 * @returns The React element for the Home page.
 */
export default function Home() {
  const navigate = useNavigate();

  const handleUploadComplete = async (base64Data: string) => {
    const newId = Date.now().toString();
    navigate(`/visualizer/${newId}`, { state: { base64Data } });
    return true;
  };

  return (
    <div className="home">
      <Navbar />

      {/* Hero Section */}
      <section className="hero">
        <div className="announce">
          <div className="dot">
            <div className="pulse"></div>
          </div>
          <p>Introducing Roomify 2.0</p>
        </div>
        <h1 className="header">
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

            {/* Upload component */}
            <Upload onComplete={handleUploadComplete} />
          </div>
        </div>
      </section>

      {/* Project Section  */}
      <section className="projects">
        <div className="section-inner">
          <div className="section-head">
            <div className="copy">
              <h2>Projects</h2>
              <p>View and manage your architectural projects in one place.</p>
            </div>
          </div>

          <div className="projects-grid">
            <div className="project-card group">
              <div className="preview">
                <img
                  src="https://roomify-mlhuk267-dfwu1i.puter.site/projects/1770803585402/rendered.png"
                  alt=""
                />
                <div className="badge">
                  <span>Community</span>
                </div>
              </div>

              <div className="card-body">
                <div>
                  <h3>Project Name</h3>

                  <div className="meta">
                    <Clock size={12} />
                    <span>{new Date("01.01.2027").toLocaleDateString()}</span>
                    <span>By Roomify</span>
                  </div>
                </div>

                <div className="arrow">
                  <ArrowUpRight size={16} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
