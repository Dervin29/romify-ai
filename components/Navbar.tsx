import { Box, Sun, Moon } from "lucide-react";
import Button from "./ui/Button";
import { useOutletContext, useNavigate, Link } from "react-router";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isSignedIn, username, signIn, signOut } =
    useOutletContext<AuthContext>();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleAuthClick = async () => {
    if (isSignedIn) {
      try {
        await signOut();
      } catch (error) {
        console.error("Error signing out:", error);
      }
      return;
    }

    try {
      await signIn();
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/products", label: "Products" },
    { path: "/pricing", label: "Pricing" },
    { path: "/community", label: "Community" },
    { path: "/enterprise", label: "Enterprise" },
  ];

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand" onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
            <Box className="logo" />
            <span className="name">Roomify</span>
          </div>
          <ul className="links">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))}
          </ul>
        </div>
        <div className="actions">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="btn theme-toggle"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </Button>

          {isSignedIn ? (
            <>
              <span className="greeting">Hi, {username}</span>
              <Button
                variant="outline"
                onClick={handleAuthClick}
                size="sm"
                className="btn"
              >
                Log out
              </Button>
            </>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="btn"
              onClick={handleAuthClick}
            >
              Log in
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;