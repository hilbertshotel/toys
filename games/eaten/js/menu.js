"use strict";
// MENU ELEMENTS
// ============================================================
const clearMenu = (menuDiv) => {
    menuDiv.innerHTML = "";
};
const addHeader = (menuDiv) => {
    const header = make("h1", "", "", "eaTen");
    menuDiv.appendChild(header);
};
const addStartButton = (menuDiv, boardDiv) => {
    const startButton = make("button", "", "", "Start");
    startButton.onclick = () => { start(menuDiv, boardDiv); };
    menuDiv.appendChild(startButton);
};
const addQuitButton = (menuDiv) => {
    const quitButton = make("button", "", "", "Quit");
    quitButton.onclick = quit;
    menuDiv.appendChild(quitButton);
};
const addFooter = (menuDiv) => {
    const footer = make("p", "", "", "by kolu");
    menuDiv.appendChild(footer);
};
const addRestartButton = (menuDiv, boardDiv) => {
    const restartButton = make("button", "", "", "Restart");
    restartButton.onclick = () => { restart(boardDiv); };
    menuDiv.appendChild(restartButton);
};
const addMuteButton = (menuDiv) => {
    const muteButton = make("button", "", "", "Mute");
    muteButton.onclick = () => { mute(muteButton); };
    menuDiv.appendChild(muteButton);
};
const addHelpButton = (menuDiv) => {
    const helpButton = make("button", "", "help", "Help");
    helpButton.onclick = () => { help(helpButton); };
    menuDiv.appendChild(helpButton);
};
const addLineBreak = (menuDiv) => {
    menuDiv.appendChild(make("br", "", "", ""));
};
// MENU BUTTONS
// ============================================================
const start = (menuDiv, boardDiv) => {
    clearBoard(boardDiv);
    clearMenu(menuDiv);
    startGame(boardDiv);
    loadMenuInGame(menuDiv, boardDiv);
    addAudio("sound/music.ogg", "music");
    addAudio("sound/moveSound.ogg", "moveSound");
    addAudio("sound/one.ogg", "one");
    addAudio("sound/two.ogg", "two");
    addAudio("sound/three.ogg", "three");
    addAudio("sound/four.ogg", "four");
    addAudio("sound/five.ogg", "five");
    addAudio("sound/six.ogg", "six");
    addAudio("sound/seven.ogg", "seven");
    addAudio("sound/eight.ogg", "eight");
    addAudio("sound/nine.ogg", "nine");
    addAudio("sound/ten.ogg", "ten");
    const music = getAudio("music");
    music.loop = true;
    music.play();
};
const restart = (boardDiv) => {
    clearBoard(boardDiv);
    startGame(boardDiv);
};
const quit = () => {
    window.location.href = "/";
};
const mute = (muteButton) => {
    const music = getAudio("music");
    if (muteButton.id === "mute") {
        muteButton.id = "";
        music.muted = false;
    }
    else {
        muteButton.id = "mute";
        music.muted = true;
    }
};
const help = (helpButton) => {
    const next = document.getElementsByClassName("nextNumber")[0];
    if (helpButton.id === "help") {
        helpButton.id = "";
        next.style.animationName = "";
        NEXT = "";
    }
    else {
        helpButton.id = "help";
        next.style.animationName = "nextNumber";
        NEXT = "nextNumber";
    }
};
// MENU DOM
// ============================================================
const loadMenuPreGame = (menuDiv, boardDiv) => {
    clearMenu(menuDiv);
    addHeader(menuDiv);
    addStartButton(menuDiv, boardDiv);
    addQuitButton(menuDiv);
    addFooter(menuDiv);
};
const loadMenuInGame = (menuDiv, boardDiv) => {
    clearMenu(menuDiv);
    addHeader(menuDiv);
    addMuteButton(menuDiv);
    addHelpButton(menuDiv);
    addLineBreak(menuDiv);
    addRestartButton(menuDiv, boardDiv);
    addQuitButton(menuDiv);
    addFooter(menuDiv);
};
