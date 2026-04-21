import type { Route } from "./+types/not-found";
import { Home, Search } from "lucide-react";
import { useNavigate } from "react-router";
import Navbar from "../../components/Navbar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "404 | Page Not Found" },
    { name: "description", content: "The requested page could not be found" },
  ];
}

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <div className="home">
        <section className="hero" style={{ minHeight: '60vh', justifyContent: 'center' }}>
          <div className="announce">
            <div className="dot">
              <div className="pulse"></div>
            </div>
            <p>404 Error</p>
          </div>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginBottom: '2rem' 
          }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-surface-highlight)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--color-border)'
            }}>
              <Search size={40} style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>

          <h1 style={{ marginBottom: '1rem' }}>
            Page not found
          </h1>

          <p className="subtitle" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>

          <div className="actions" style={{ marginBottom: 0 }}>
            <button 
              onClick={() => navigate('/')}
              className="cta"
              style={{ 
                background: 'var(--color-primary)', 
                color: 'white',
                border: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Home size={18} />
              Back to Home
            </button>
          </div>
        </section>
      </div>
    </>
  );
}