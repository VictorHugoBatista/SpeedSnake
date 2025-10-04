import './App.css';

import GoogleFontLoader from 'react-google-font';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Game from './pages/Game';
import Soundtrack from './pages/Soundtrack';

function App() {
  return (
    <>
      <GoogleFontLoader
        fonts={[
          {
            font: 'Trade Winds',
            weights: [400],
          },
          {
            font: 'Silkscreen',
            weights: [400, 700],
          },
        ]}
        subsets={['cyrillic-ext', 'greek']}
      />
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
