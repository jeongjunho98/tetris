import { useCallback, useEffect } from 'react'
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

  // Line clearing logic
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
      setScore(prev => prev + rowsCleared * 100);
      setRows(prev => prev + rowsCleared);
      if (rows + rowsCleared >= (level + 1) * 10) {
        setLevel(prev => prev + 1);
        setDropTime(prev => (prev ? prev * 0.9 : null));
      }
    }
    return sweptStage;
  }, [rows, level, setScore, setRows, setLevel, setDropTime]);

  // Handle piece collision and merging
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

  const handleKeyDown = ({ keyCode }: { keyCode: number }) => {
    if (!gameOver) {
      if (keyCode === 37) { // Left
        movePiece(-1);
      } else if (keyCode === 39) { // Right
        movePiece(1);
      } else if (keyCode === 40) { // Down
        drop();
      } else if (keyCode === 38) { // Up (Rotate)
        rotatePiece(stage, 1);
      } else if (keyCode === 32) { // Space (Hard drop)
        let tempY = 0;
        while (!checkCollision(piece, stage, { x: 0, y: tempY + 1 })) {
          tempY += 1;
        }
        updatePiecePos({ x: 0, y: tempY, collided: true });
      }
    }
  };

  return (
    <div 
      className="app-container" 
      role="button" 
      tabIndex={0} 
      onKeyDown={e => handleKeyDown(e)}
      style={{ outline: 'none' }}
    >
      <h1 className="game-title">TETRIS</h1>
      <div className="game-layout">
        <div className="game-area">
          <Board stage={stage} piece={piece} />
          {gameOver && (
            <div className="game-over-overlay">
              <div className="game-over-text">GAME OVER</div>
            </div>
          )}
        </div>
        <div className="side-area">
          <SidePanel score={score} level={level} rows={rows} nextPiece={nextPiece} />
          <button className="start-button" onClick={startGame}>
            {gameOver || !dropTime ? 'START GAME' : 'RESTART'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
