import { Box, Sun, Moon, Menu, X } from "lucide-react";
import Button from "./ui/Button";
import { useOutletContext, useNavigate, Link } from "react-router";
import { useTheme } from "../context/ThemeContext";
import { useState } from "react";

const Navbar = () => {
  const { isSignedIn, username, signIn, signOut } =
    useOutletContext<AuthContext>();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);

  const handleAuthClick = async () => {
    if (isSignedIn) {
      await signOut();
      return;
    }
    await signIn();
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
        {/* LEFT */}
        <div className="left">
          <div
            className="brand"
            onClick={() => navigate("/")}
          >
            <Box className="logo" />
            <span className="name">Roomify</span>
          </div>

          {/* Desktop Links */}
          <div className="links hidden md:flex">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div className="actions">
          {/* Theme */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="btn theme-toggle"
          >
            {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
          </Button>

          {/* Auth (desktop only) */}
          <div className="hidden md:flex items-center space-x-3">
            {isSignedIn && (
              <span className="greeting">Hi, {username}</span>
            )}

            <Button
              variant="outline"
              size="sm"
              onClick={handleAuthClick}
              className="btn"
            >
              {isSignedIn ? "Log out" : "Log in"}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="text-[var(--color-muted)]" size={20} /> : <Menu className="text-[var(--color-muted)]" size={20} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t border-[var(--color-border)] bg-[var(--color-surface)]">
          <div className="flex flex-col px-6 py-4 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-[var(--color-border)]">
              {isSignedIn && (
                <p className="text-xs mb-2 text-[var(--color-muted)]">
                  Hi, {username}
                </p>
              )}

              <Button
                variant="outline"
                size="sm"
                className="btn w-full"
                onClick={handleAuthClick}
              >
                {isSignedIn ? "Log out" : "Log in"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;