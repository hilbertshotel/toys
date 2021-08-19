"use strict"

// ____________________________________________________________
// MENU DOM ELEMENTS

const addHeader = (mainWindow) => {
    const headerDiv = make("h1", "header", "", "Letter Ladder")
    mainWindow.appendChild(headerDiv)
}

const addStartButton = (mainWindow) => {
    const startButton = make("button", "", "", "START GAME")
    startButton.onclick = () => { start(mainWindow) }
    mainWindow.appendChild(startButton)
}

const addQuitButton = (mainWindow) => {
    const quitButton = make("button", "", "", "QUIT GAME")
    quitButton.onclick = quit
    mainWindow.appendChild(quitButton)
}

const addLineBreak = (mainWindow) => {
    const br = make("br", "", "", "")
    mainWindow.appendChild(br)
}


// ____________________________________________________________
// MENU BUTTONS

const start = (mainWindow) => {
    startGame(mainWindow)
}

const quit = () => {
    window.location.href = "/"
}


// ____________________________________________________________
// MENU FUNCTIONS

const loadMenu = (mainWindow) => {
    addHeader(mainWindow)
    addStartButton(mainWindow)
    addLineBreak(mainWindow)
    addQuitButton(mainWindow)
}

const clearMenu = (mainWindow) => {
    mainWindow.innerHTML = ""
}


// ____________________________________________________________
// MAIN

const main = () => {
    const mainWindow = get("mainWindow")
    loadMenu(mainWindow)
}

main()
