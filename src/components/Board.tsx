import '../styles/Board.css'

interface BoardProps {
  stage: any[][];
  piece?: any;
  ghostPos?: { x: number, y: number };
}

const Board = ({ stage, piece, ghostPos }: BoardProps) => {
  const displayStage = stage.map(row => [...row]);

  // Render Ghost Piece first (so the actual piece is on top)
  if (piece && ghostPos) {
    piece.tetromino.shape.forEach((row: any[], y: number) => {
      row.forEach((value: any, x: number) => {
        if (value !== 0) {
          const boardY = y + ghostPos.y;
          const boardX = x + ghostPos.x;
          if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
            // Use a special tag for ghost piece to apply different styling
            displayStage[boardY][boardX] = [value, 'ghost'];
          }
        }
      });
    });
  }

  // Render Actual Piece
  if (piece) {
    piece.tetromino.shape.forEach((row: any[], y: number) => {
      row.forEach((value: any, x: number) => {
        if (value !== 0) {
          const boardY = y + piece.pos.y;
          const boardX = x + piece.pos.x;
          if (boardY >= 0 && boardY < 20 && boardX >= 0 && boardX < 10) {
            displayStage[boardY][boardX] = [value, 'merged'];
          }
        }
      });
    });
  }

  return (
    <div className="board-container">
      {displayStage.map((row, y) =>
        row.map((cell, x) => (
          <div 
            key={`${y}-${x}`} 
            className={`cell ${cell[0] !== 0 ? `cell-${cell[0]}` : ''} ${cell[1] === 'ghost' ? 'cell-ghost' : ''}`} 
          />
        ))
      )}
    </div>
  );
};

export default Board;
