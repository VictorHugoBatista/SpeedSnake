import Controls from './Controls';
import GameArea from './game-area/GameArea';

const Main = function () {
  return (
    <div className="game">
      <GameArea />
      <Controls />
    </div>
  );
};

export default Main;
