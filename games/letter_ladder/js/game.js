"use strict"

// ____________________________________________________________
// GAME DOM ELEMENTS

const addTileMap = (mainWindow) => {
    const tileMap = make("div", "tileMap", "", "")
    mainWindow.appendChild(tileMap)

    for (let i = 0; i < 130; i++) {
        const tileDiv = make("div", "tile", "", "")
        tileMap.appendChild(tileDiv)
    }
}


// ____________________________________________________________
// GAME FUNCTIONS

const startGame = function (mainWindow) {
    clearMenu(mainWindow)
    addTileMap(mainWindow)
}

