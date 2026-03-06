import { useState, useCallback } from 'react';
import { TETROMINOS, randomTetromino } from '../utils/tetrominoes';

export const STAGE_WIDTH = 10;
export const STAGE_HEIGHT = 20;

export const createStage = () =>
  Array.from(Array(STAGE_HEIGHT), () =>
    new Array(STAGE_WIDTH).fill([0, 'clear'])
  );

export const useTetris = () => {
  const [stage, setStage] = useState(createStage());
  const [piece, setPiece] = useState<any>({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOS[0],
    collided: false,
  });
  const [nextPiece, setNextPiece] = useState(randomTetromino());
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [rows, setRows] = useState(0);
  const [level, setLevel] = useState(0);
  const [dropTime, setDropTime] = useState<number | null>(null);

  const resetPiece = useCallback(() => {
    setPiece({
      pos: { x: STAGE_WIDTH / 2 - 2, y: 0 },
      tetromino: nextPiece,
      collided: false,
    });
    setNextPiece(randomTetromino());
  }, [nextPiece]);

  const updatePiecePos = ({ x, y, collided }: { x: number; y: number; collided?: boolean }) => {
    setPiece((prev: any) => ({
      ...prev,
      pos: { x: prev.pos.x + x, y: prev.pos.y + y },
      collided: collided !== undefined ? collided : prev.collided,
    }));
  };

  const checkCollision = (
    pieceObj: any,
    stageObj: any,
    { x: moveX, y: moveY }: { x: number; y: number }
  ) => {
    for (let y = 0; y < pieceObj.tetromino.shape.length; y += 1) {
      for (let x = 0; x < pieceObj.tetromino.shape[y].length; x += 1) {
        if (pieceObj.tetromino.shape[y][x] !== 0) {
          if (
            !stageObj[y + pieceObj.pos.y + moveY] ||
            !stageObj[y + pieceObj.pos.y + moveY][x + pieceObj.pos.x + moveX] ||
            stageObj[y + pieceObj.pos.y + moveY][x + pieceObj.pos.x + moveX][1] !== 'clear'
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const startGame = () => {
    setStage(createStage());
    setDropTime(1000);
    resetPiece();
    setGameOver(false);
    setScore(0);
    setRows(0);
    setLevel(0);
  };

  const drop = () => {
    if (!checkCollision(piece, stage, { x: 0, y: 1 })) {
      updatePiecePos({ x: 0, y: 1, collided: false });
    } else {
      if (piece.pos.y < 1) {
        setGameOver(true);
        setDropTime(null);
      }
      updatePiecePos({ x: 0, y: 0, collided: true });
    }
  };

  const movePiece = (dir: number) => {
    if (!checkCollision(piece, stage, { x: dir, y: 0 })) {
      updatePiecePos({ x: dir, y: 0 });
    }
  };

  const rotate = (matrix: any[][], dir: number) => {
    const rotated = matrix.map((_, index) => matrix.map((col) => col[index]));
    if (dir > 0) return rotated.map((row) => row.reverse());
    return rotated.reverse();
  };

  const rotatePiece = (stage: any, dir: number) => {
    const clonedPiece = JSON.parse(JSON.stringify(piece));
    clonedPiece.tetromino.shape = rotate(clonedPiece.tetromino.shape, dir);

    const pos = clonedPiece.pos.x;
    let offset = 1;
    while (checkCollision(clonedPiece, stage, { x: 0, y: 0 })) {
      clonedPiece.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPiece.tetromino.shape[0].length) {
        rotate(clonedPiece.tetromino.shape, -dir);
        clonedPiece.pos.x = pos;
        return;
      }
    }
    setPiece(clonedPiece);
  };

  return {
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
  };
};
