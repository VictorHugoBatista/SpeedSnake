import Controls from './Controls';
import GameArea from './GameArea';

const Main = function () {
  return (
    <div className="game">
      <GameArea />
      <Controls />
    </div>
  );
};

export default Main;
