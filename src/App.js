import './App.css';
import './mobile.App.css';
import { useState, useEffect } from 'react';
import Connect4 from './util/Connect4';
import { redCircle, yellowCircle } from './circles';

const c4 = new Connect4(6,7);
const PLAYERS = ["red", "yellow"];

function App() {

  const [turn, setTurn] = useState("red");
  const [redScore, setRedScore] = useState(0);
  const [yellowScore, setYellowScore] = useState(0);
  const [isLock, setIsLock] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const moves = (e) => {
    if (isLock) return;

    const column = parseInt(e.currentTarget.dataset.column);

    if (turn === "red") {
      console.log(c4)
      
      c4.putRed(column);
      
      if(c4.isMoved) {
        setTurn("yellow");     
      }
    }

    if (turn === "yellow") {
      console.log(c4)
      
      c4.putYellow(column);

      if(c4.isMoved) {
        setTurn("red");
      }
    }

    if (c4.boardCapacity === 0) {
      setIsLock(true);
      setIsNext(true);
    }
    
  }
  
  useEffect(() => {
    let checkWin = Connect4.checkWin(c4);
    
    if (checkWin.isWin) {
      if (checkWin.winner === "red") {
        setRedScore((oldScore) => oldScore + 1);
        console.log(checkWin)
      }

      if (checkWin.winner === "yellow") {
        setYellowScore((oldScore) => oldScore + 1);
        console.log(checkWin)

      }
      
      setIsLock(true);
      setIsNext(true);

    }    
  }, [turn])


  const next = () => {
    c4.reset();
    
    const oneNzero = Math.ceil(Math.random() * 2) - 1;
    setTurn(PLAYERS[oneNzero]);
    
    setIsLock(false);
    setIsNext(false);
  }

  const newGame = () => {
    c4.reset();
    setRedScore(0);
    setYellowScore(0);
    setIsLock(false);
    setIsNext(false);

    const oneNzero = Math.ceil(Math.random() * 2) - 1;
    setTurn(PLAYERS[oneNzero]);
  }


  return (
    <div className="App">
      <header>
        <h2 className="header-2">Connect4</h2>
        <div className="division-line"></div>
      </header>

      <section>
        <div className="player-turns">
          <h3>Turn</h3>
          <br></br>
          <div>
            {
              turn === "red"
              ? redCircle
              : yellowCircle
            }
          </div>
        </div>

        <div className="board">
          
          {c4.board.map((columnArr, index) => {
            return <div onClick={moves} key={index} className="column" data-column={index}>
              
              {columnArr.map((row, index) => {
                return <div key={index} className="row" data-row={index}>
                  {
                    row ? 
                      row === "red" 
                      ? redCircle
                      : yellowCircle
                    : null 
                  }
                </div>
              })}
            </div>
          })}

        </div>

        <div className="scores">
          <h3>Score Table</h3>
          <br></br>
          <div className="score-table">
            
            <div className="score">
              {redCircle}
              <div className="score-number">
                {redScore}
              </div>
            </div>
            
            <div className="score">
              {yellowCircle}
              <div className="score-number">
                {yellowScore}
              </div>
            </div>

          </div>

          <div className="btns">
            <button onClick={newGame} id="newGameBtn" type="button">New game</button>
            {
              isNext && 
                <button onClick={next} id="nextBtn" type="button">Next</button>
            }
          </div>
        
        </div>  
      </section>
    </div>
  );
}

export default App;
