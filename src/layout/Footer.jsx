import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      © 2015 - {new Date().getFullYear()} | <Link to="/changelog">2.4.0</Link> |
      Remade with love by <a target="_blank" rel="noreferrer" href="https://github.com/VictorHugoBatista">@VictorHugoBatista</a>.
    </footer>
  );
}

export default Footer;