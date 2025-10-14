const OverlayBase = function ({ children, onClick, show }) {
  return (
    <div
      className={`game-area-overlay ${onClick ? 'clickable' : ''} ${show ? 'active' : ''}`}
      onClick={onClick}>
      {children}
    </div>
  );
};

export default OverlayBase;
