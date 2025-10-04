import { Link } from 'react-router';

function Header() {
  return (
    <header>
        <div className="container">
          <ul>
            <li>
              <Link to="/">Game</Link>
            </li>
            <li>
              <Link to="/soundtrack">Soundtrack</Link>
            </li>
          </ul>
        </div>
    </header>
  );
}

export default Header;
