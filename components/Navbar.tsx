import { Box } from "lucide-react";
import Button from "./ui/Button";
import { useOutletContext } from "react-router";
const Navbar = () => {
  const { isSignedIn, username, signIn, signOut } =
    useOutletContext<AuthContext>();

  // handling user authentication
  const handleAuthClick = async () => {
    // If the user is currently signed in, we want to sign them out. Otherwise, we want to sign them in.
    if (isSignedIn) {
      try {
        await signOut();
      } catch (error) {
        console.error("Error signing out:", error);
      }
      return;
    }

    // If the user is not signed in, we want to sign them in.
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
                {" "}
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
