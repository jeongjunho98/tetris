import { useCallback, useEffect, useRef } from 'react'
import Board from './components/Board'
import SidePanel from './components/SidePanel'
import { useTetris } from './hooks/useTetris'
import { useInterval } from './hooks/useInterval'
import './styles/App.css'

function App() {
  const {
    stage,
    setStage,
    piece,
    updatePiecePos,
    resetPiece,
    checkCollision,
    startGame,
    drop,
    movePiece,
    rotatePiece,
    getGhostPos,
    gameOver,
    score,
    setScore,
    rows,
    setRows,
    level,
    setLevel,
    dropTime,
    setDropTime,
    nextPiece
  } = useTetris();

  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Focus the game container whenever the game starts or restarts
  useEffect(() => {
    if (dropTime && gameContainerRef.current) {
      gameContainerRef.current.focus();
    }
  }, [dropTime]);

  const sweepRows = useCallback((newStage: any[][]) => {
    let rowsCleared = 0;
    const sweptStage = newStage.reduce((acc, row) => {
      if (row.every(cell => cell[0] !== 0)) {
        rowsCleared += 1;
        acc.unshift(new Array(newStage[0].length).fill([0, 'clear']));
        return acc;
      }
      acc.push(row);
      return acc;
    }, [] as any[][]);

    if (rowsCleared > 0) {
      const linePoints = [0, 100, 300, 500, 800]; // Higher score for multiple lines
      setScore(prev => prev + linePoints[rowsCleared] * (level + 1));
      setRows(prev => prev + rowsCleared);
    }
    return sweptStage;
  }, [level, setScore, setRows]);

  useEffect(() => {
    if (piece.collided) {
      const newStage = stage.map(row => [...row]);
      piece.tetromino.shape.forEach((row: any[], y: number) => {
        row.forEach((value: any, x: number) => {
          if (value !== 0) {
            const boardY = y + piece.pos.y;
            const boardX = x + piece.pos.x;
            if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
              newStage[boardY][boardX] = [value, 'merged'];
            }
          }
        });
      });

      const sweptStage = sweepRows(newStage);
      setStage(sweptStage);
      resetPiece();
    }
  }, [piece.collided, piece.pos, piece.tetromino, stage, resetPiece, setStage, sweepRows]);

  useInterval(() => {
    drop();
  }, dropTime);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!gameOver && dropTime) {
      if (e.keyCode === 37) { // Left
        e.preventDefault();
        movePiece(-1);
      } else if (e.keyCode === 39) { // Right
        e.preventDefault();
        movePiece(1);
      } else if (e.keyCode === 40) { // Down
        e.preventDefault();
        drop();
      } else if (e.keyCode === 38) { // Up
        e.preventDefault();
        rotatePiece(stage);
      } else if (e.keyCode === 32) { // Space (Hard drop)
        e.preventDefault();
        const ghost = getGhostPos();
        // Immediately place at ghost position and trigger collision logic
        setPiece((prev: any) => ({
          ...prev,
          pos: ghost,
          collided: true
        }));
      }
    }
  };

  return (
    <div 
      ref={gameContainerRef}
      className="app-container" 
      role="button" 
      tabIndex={0} 
      onKeyDown={handleKeyDown}
      style={{ outline: 'none' }}
    >
      <h1 className="game-title">TETRIS</h1>
      <div className="game-layout">
        <div className="game-area">
          <Board stage={stage} piece={piece} ghostPos={getGhostPos()} />
          {(gameOver || !dropTime) && (
            <div className="game-over-overlay">
              <div className="game-over-content">
                <div className="game-over-text">{gameOver ? 'GAME OVER' : 'READY?'}</div>
                <button className="start-button" onClick={startGame}>
                  {gameOver ? 'RETRY' : 'START GAME'}
                </button>
              </div>
            </div>
          )}
        </div>
        <div className="side-area">
          <SidePanel score={score} level={level} rows={rows} nextPiece={nextPiece} />
          <div className="controls-guide">
            <p>← → : Move</p>
            <p>↑ : Rotate</p>
            <p>↓ : Soft Drop</p>
            <p>Space : Hard Drop</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
