import React, { useState } from 'react'
import Cell from './Cell';

const Board = ({ lightsOutSize }) => {
    const createGrid = () =>
        new Array(lightsOutSize)
            .fill()
            .map(r =>
                new Array(lightsOutSize)
                    .fill()
                    .map(c => Math.random() < 0.4)
            )
    const [board, setBoard] = useState(createGrid());

    const toggleLights = (row, col) => {
        const copy = [...board.map(r => [...r])]
        copy[row][col] = !copy[row][col]
        if (row < lightsOutSize - 1)
            copy[row + 1][col] = !copy[row + 1][col]
        if (row > 0)
            copy[row - 1][col] = !copy[row - 1][col]
        if (col < lightsOutSize - 1)
            copy[row][col + 1] = !copy[row][col + 1]
        if (col > 0)
            copy[row][col - 1] = !copy[row][col - 1]

        setBoard(copy)
    }

    const gameEnds = () => board.every(row => row.every (cell => !cell))

    return (
        <div className='lightsOutBoard'>
            {gameEnds() ? <div className='won uppercase font1'>You won</div> : 
            
            board.map((row, rowIndex) =>
                <div className='row' key={rowIndex}>
                    {row.map((_, colIndex) => (
                        <Cell
                            key={`${rowIndex}-${colIndex}`}
                            isOn={board[rowIndex][colIndex]}
                            rowIndex={rowIndex}
                            colIndex={colIndex}
                            toggleLights={toggleLights}
                        />
                    ))}
                </div>
            )}
            
        </div>
    )
}

export default Board