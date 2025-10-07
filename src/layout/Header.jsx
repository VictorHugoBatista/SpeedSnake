import { Link } from 'react-router';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </nav>
      <span className="header-title"><Link to="/">SpeedSnake 2025</Link></span>
      <nav>
        <ul>
          <li>
            <a target="_blank" href="/legacy">Legacy</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
