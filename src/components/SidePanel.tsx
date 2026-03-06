import '../styles/SidePanel.css'

interface SidePanelProps {
  score: number;
  level: number;
  rows: number;
  nextPiece: any;
}

const SidePanel = ({ score, level, rows, nextPiece }: SidePanelProps) => {
  return (
    <div className="side-panel">
      <div className="panel-section">
        <div className="section-title">Score</div>
        <div className="section-value">{score}</div>
      </div>
      <div className="panel-section">
        <div className="section-title">Level</div>
        <div className="section-value">{level}</div>
      </div>
      <div className="panel-section">
        <div className="section-title">Rows</div>
        <div className="section-value">{rows}</div>
      </div>
      <div className="panel-section">
        <div className="section-title">Next</div>
        <div 
          className="next-piece-display"
          style={{
            gridTemplateColumns: `repeat(${nextPiece.shape[0].length}, 20px)`,
            gridTemplateRows: `repeat(${nextPiece.shape.length}, 20px)`,
            width: `${nextPiece.shape[0].length * 21}px`, // Adjust width dynamically
            height: `${nextPiece.shape.length * 21}px`
          }}
        >
          {nextPiece.shape.map((row: any[], y: number) =>
            row.map((cell: any, x: number) => (
              <div 
                key={`${y}-${x}`} 
                className={`mini-cell ${cell !== 0 ? `cell-${cell}` : ''}`} 
              />
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default SidePanel
