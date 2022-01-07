

import './ScoreBoard.css'

const name=window.prompt("enter name")
const ScoreBoard = ({ score }) => {



    return (
      <div className="score-board">
        <h2>{name}</h2>
        <h2> score:{score}</h2>
      </div>
    )
  }
  
  export default ScoreBoard