import './App.css';

import GoogleFontLoader from 'react-google-font';
import { HashRouter, Routes, Route } from 'react-router-dom';

import About from './pages/About';
import Changelog from './pages/Changelog';
import Game from './pages/Game';

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
          <Route path="/about" element={<About />} />
          <Route path="/changelog" element={<Changelog />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
