import React from 'react'

const Cell = ({ rowIndex, colIndex, toggleLights, isOn }) => {
    
    const handleClick = () => toggleLights(rowIndex, colIndex)

    return (
        <button 
            onClick={handleClick}
            className={isOn ? 'on lightsOutButton' : 'off lightsOutButton'}
            >
            {/* {rowIndex}{colIndex} */}
        </button>

    )

}



export default Cell