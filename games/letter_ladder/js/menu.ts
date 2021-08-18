// ____________________________________________________________
// MENU DOM ELEMENTS

const addHeader = (mainWindow: HTMLElement) => {
    const headerDiv = make("h1", "header", "", "Letter Ladder")
    mainWindow.appendChild(headerDiv)
}

const addStartButton = (mainWindow: HTMLElement) => {
    const startButton = make("button", "", "", "START GAME")
    startButton.onclick = () => { start(mainWindow) }
    mainWindow.appendChild(startButton)
}

const addQuitButton = (mainWindow: HTMLElement) => {
    const quitButton = make("button", "", "", "QUIT GAME")
    quitButton.onclick = quit
    mainWindow.appendChild(quitButton)
}

const addLineBreak = (mainWindow: HTMLElement) => {
    const br = make("br", "", "", "")
    mainWindow.appendChild(br)
}


// ____________________________________________________________
// MENU BUTTONS

const start = (mainWindow: HTMLElement) => {
    startGame(mainWindow)
}

const quit = () => {
    window.location.href = "/"
}


// ____________________________________________________________
// MENU FUNCTIONS

const loadMenu = (mainWindow: HTMLElement) => {
    addHeader(mainWindow)
    addStartButton(mainWindow)
    addLineBreak(mainWindow)
    addQuitButton(mainWindow)
}

const clearMenu = (mainWindow: HTMLElement) => {
    mainWindow.innerHTML = ""
}


// ____________________________________________________________
// MAIN

const main = () => {
    const mainWindow = get("mainWindow")
    loadMenu(mainWindow)
}

main()
