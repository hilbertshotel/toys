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
    restartButton.onclick = () => { restart(menuDiv, boardDiv); };
    menuDiv.appendChild(restartButton);
};
const addMuteButton = (menuDiv) => {
    const muteButton = make("button", "", "", "Mute");
    muteButton.onclick = () => { mute(muteButton); };
    menuDiv.appendChild(muteButton);
};
const addLineBreak = (menuDiv) => {
    menuDiv.appendChild(make("br", "", "", ""));
};
const addEasyButton = (menuDiv) => {
    const easyButton = make("button", "", "easy", "Easy");
    easyButton.onclick = () => { easy(easyButton); };
    menuDiv.appendChild(easyButton);
};
const addMediumButton = (menuDiv) => {
    const mediumButton = make("button", "", "", "Medium");
    mediumButton.onclick = () => { medium(mediumButton); };
    menuDiv.appendChild(mediumButton);
};
const addHardButton = (menuDiv) => {
    const hardButton = make("button", "", "", "Hard");
    hardButton.onclick = () => { hard(hardButton); };
    menuDiv.appendChild(hardButton);
};
const addCheatSheet = (menuDiv) => {
    const nextNumberTile = getNextNumberTile();
    const cheatSheet = make("button", "cheatSheet", "cheatSheet", nextNumberTile.innerHTML);
    cheatSheet.hidden = true;
    menuDiv.appendChild(cheatSheet);
};
// MENU BUTTONS
// ============================================================
const start = (menuDiv, boardDiv) => {
    clearBoard(boardDiv);
    clearMenu(menuDiv);
    startGame(menuDiv, boardDiv);
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
const restart = (menuDiv, boardDiv) => {
    clearBoard(boardDiv);
    startGame(menuDiv, boardDiv);
    get("cheatSheet").innerHTML = `${1}`;
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
const easy = (easyButton) => {
    const nextNumberTile = getNextNumberTile();
    if (DIFFICULTY === "medium") {
        get("cheatSheet").hidden = true;
        get("medium").id = "";
    }
    else if (DIFFICULTY === "hard") {
        get("hard").id = "";
    }
    else {
        return;
    }
    easyButton.id = "easy";
    NEXT = "nextNumber";
    nextNumberTile.style.animationName = "nextNumber";
    DIFFICULTY = "easy";
};
const medium = (mediumButton) => {
    const nextNumberTile = getNextNumberTile();
    if (DIFFICULTY === "easy") {
        nextNumberTile.style.animationName = "";
        NEXT = "";
        get("easy").id = "";
    }
    else if (DIFFICULTY === "hard") {
        get("hard").id = "";
    }
    else {
        return;
    }
    get("cheatSheet").hidden = false;
    mediumButton.id = "medium";
    DIFFICULTY = "medium";
};
const hard = (hardButton) => {
    const nextNumberTile = getNextNumberTile();
    if (DIFFICULTY === "easy") {
        nextNumberTile.style.animationName = "";
        NEXT = "";
        get("easy").id = "";
    }
    else if (DIFFICULTY === "medium") {
        get("cheatSheet").hidden = true;
        get("medium").id = "";
    }
    else {
        return;
    }
    hardButton.id = "hard";
    DIFFICULTY = "hard";
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
    addCheatSheet(menuDiv);
    addLineBreak(menuDiv);
    addEasyButton(menuDiv);
    addMediumButton(menuDiv);
    addHardButton(menuDiv);
    addLineBreak(menuDiv);
    addMuteButton(menuDiv);
    addRestartButton(menuDiv, boardDiv);
    addQuitButton(menuDiv);
    addFooter(menuDiv);
};
