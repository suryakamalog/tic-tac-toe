import Player from "./components/Player"
import GameBoard from "./components/GameBoard"
import Log from "./components/Log"
import GameOver from "./components/GameOver"
import { WINNING_COMBINATIONS } from './winning-combinations'
import { useState } from "react"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];
const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = 'X';

  if(gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

const deriveWinner = (gameBoard, players) => {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol)
      {
        winner = players[firstSquareSymbol]
      }
  }
  return winner;
}

const deriveGameBoard = (gameTurns) => {
  let gameBoard = [...initialGameBoard.map(array => [...array])];

  for (const turn of gameTurns) {
      const {square, player} = turn;
      const {row, col} = square

      gameBoard[row][col] = player;   
  }
  return gameBoard;
}
function App() {
  
  const [gameTurns, setGameTurns] = useState([])
  const [players, setPlayers] = useState(
    {
      'X': 'Player 1',
      '0': 'Player 2',
    }
  )

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns)
  const winner = deriveWinner(gameBoard, players);
  const hasDraw = gameTurns.length === 9 && !winner;


  const handleSelectSquare = (rowIndex, colIndex) => {
    setGameTurns((prevTurns) => {


      const updatedTurns = [
        { square: {row: rowIndex, col: colIndex}, player: activePlayer}, ...prevTurns
      ]

      return updatedTurns;
    })
  }

  const handleRestart = () => {
    setGameTurns([]);
  }

  const handlePlayerNameChange = (symbol, newName) => {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player name="Player 1" symbol="X" isActive={activePlayer === 'X'} changePlayerName={handlePlayerNameChange} />
          <Player name="Player 2" symbol="O" isActive={activePlayer === 'O'} changePlayerName={handlePlayerNameChange} />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}/>
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
