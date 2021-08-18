"use strict";
// ____________________________________________________________
// MENU DOM ELEMENTS
var addHeader = function (mainWindow) {
    var headerDiv = make("h1", "header", "", "Letter Ladder");
    mainWindow.appendChild(headerDiv);
};
var addStartButton = function (mainWindow) {
    var startButton = make("button", "", "", "START GAME");
    startButton.onclick = function () { start(mainWindow); };
    mainWindow.appendChild(startButton);
};
var addQuitButton = function (mainWindow) {
    var quitButton = make("button", "", "", "QUIT GAME");
    quitButton.onclick = quit;
    mainWindow.appendChild(quitButton);
};
var addLineBreak = function (mainWindow) {
    var br = make("br", "", "", "");
    mainWindow.appendChild(br);
};
// ____________________________________________________________
// MENU BUTTONS
var start = function (mainWindow) {
    startGame(mainWindow);
};
var quit = function () {
    window.location.href = "/";
};
// ____________________________________________________________
// MENU FUNCTIONS
var loadMenu = function (mainWindow) {
    addHeader(mainWindow);
    addStartButton(mainWindow);
    addLineBreak(mainWindow);
    addQuitButton(mainWindow);
};
var clearMenu = function (mainWindow) {
    mainWindow.innerHTML = "";
};
// ____________________________________________________________
// MAIN
var main = function () {
    var mainWindow = get("mainWindow");
    loadMenu(mainWindow);
};
main();
