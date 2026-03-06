import '../styles/Board.css'

interface BoardProps {
  stage: any[][];
  piece?: any;
}

const Board = ({ stage, piece }: BoardProps) => {
  // Create a deep copy of the stage to draw the current piece on it without modifying the original state
  const displayStage = stage.map(row => [...row]);

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
            className={`cell ${cell[0] !== 0 ? `cell-${cell[0]}` : ''}`} 
          />
        ))
      )}
    </div>
  );
};

export default Board;
