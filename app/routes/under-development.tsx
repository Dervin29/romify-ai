import type { Route } from "./+types/under-development";
import { Construction, ArrowLeft, Home } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../../components/Navbar";
export function meta({ params }: Route.MetaArgs) {
  const pageName = params.page?.charAt(0).toUpperCase() + params.page?.slice(1);
  return [
    { title: `${pageName} | Roomify` },
    { name: "description", content: `${pageName} page is coming soon` },
  ];
}

export default function UnderDevelopment() {
  const navigate = useNavigate();
  const { page } = useParams();
  const pageName = page ? page.charAt(0).toUpperCase() + page.slice(1) : '';

  // List of valid under-development pages
  const validPages = ['products', 'pricing', 'community', 'enterprise'];
  
  // If the page is not in the valid list, redirect to 404
  if (!page || !validPages.includes(page)) {
    navigate('/404', { replace: true });
    return null;
  }

  return (
    <>
      <Navbar />
      <div className="home">
        <section className="hero" style={{ minHeight: '60vh', justifyContent: 'center' }}>
          <div className="announce">
            <div className="dot">
              <div className="pulse"></div>
            </div>
            <p>Under Development</p>
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
              <Construction size={40} style={{ color: 'var(--color-primary)' }} />
            </div>
          </div>

          <h1 style={{ marginBottom: '1rem' }}>
            {pageName} is coming soon
          </h1>

          <p className="subtitle" style={{ maxWidth: '600px', marginBottom: '2rem' }}>
            We're working hard to bring you something amazing. 
            This feature will be available shortly.
          </p>

          <div className="actions" style={{ marginBottom: 0 }}>
            <button 
              onClick={() => navigate(-1)}
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
              <ArrowLeft size={18} />
              Go Back
            </button>
            <button 
              onClick={() => navigate('/')}
              className="demo"
              style={{
                background: 'var(--color-surface)',
                color: 'var(--color-foreground)',
                border: '1px solid var(--color-border)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <Home size={18} />
              Home
            </button>
          </div>

          <div style={{ 
            marginTop: '4rem',
            padding: '1.5rem',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto',
            backgroundColor: 'var(--color-surface)',
            borderRadius: '0.75rem',
            border: '1px solid var(--color-border)'
          }}>
            <p style={{ 
              fontSize: '0.75rem', 
              color: 'var(--color-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.5rem'
            }}>
              Coming Features
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0, 
              margin: 0,
              fontSize: '0.875rem',
              color: 'var(--color-foreground)'
            }}>
              <li style={{ marginBottom: '0.5rem' }}>• AI-powered design suggestions</li>
              <li style={{ marginBottom: '0.5rem' }}>• Real-time collaboration tools</li>
              <li style={{ marginBottom: '0.5rem' }}>• Advanced rendering engine</li>
              <li>• Mobile app integration</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}