import { Box, Sun, Moon } from "lucide-react";
import Button from "./ui/Button";
import { useOutletContext } from "react-router";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { isSignedIn, username, signIn, signOut } =
    useOutletContext<AuthContext>();
  const { theme, toggleTheme } = useTheme();

  // handling user authentication
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

  return (
    <header className="navbar">
      <nav className="inner">
        <div className="left">
          <div className="brand">
            <Box className="logo" />
            <span className="name">Roomify</span>
          </div>
          <ul className="links">
            <a href="#">Products</a>
            <a href="#">Pricing</a>
            <a href="#">Community</a>
            <a href="#">Enterprise</a>
          </ul>
        </div>
        <div className="actions">
          {/* Theme Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="btn"
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
            <>
              <Button
                variant="outline"
                size="sm"
                className="btn"
                onClick={handleAuthClick}
              >
                Log in
              </Button>
              <a href="#upload" className="cta">
                Get Started
              </a>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
