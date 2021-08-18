// ____________________________________________________________
// GAME DOM ELEMENTS

const addTileMap = (mainWindow: HTMLElement) => {
    const tileMap = make("div", "tileMap", "", "")
    mainWindow.appendChild(tileMap)

    for (let i=0; i<130; i++) {
        const tileDiv = make("div", "tile", "", "")
        tileMap.appendChild(tileDiv)
    }
}


// ____________________________________________________________
// GAME FUNCTIONS

const startGame = (mainWindow: HTMLElement) => {
    clearMenu(mainWindow)
    addTileMap(mainWindow)
}