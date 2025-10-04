import './App.css';

import { HashRouter, Routes, Route } from 'react-router-dom';

import Game from './pages/Game';
import Soundtrack from './pages/Soundtrack';

function App() {
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/soundtrack" element={<Soundtrack />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
