"use strict";
// ____________________________________________________________
// GAME DOM ELEMENTS
var addTileMap = function (mainWindow) {
    var tileMap = make("div", "tileMap", "", "");
    mainWindow.appendChild(tileMap);
    for (var i = 0; i < 130; i++) {
        var tileDiv = make("div", "tile", "", "");
        tileMap.appendChild(tileDiv);
    }
};
// ____________________________________________________________
// GAME FUNCTIONS
var startGame = function (mainWindow) {
    clearMenu(mainWindow);
    addTileMap(mainWindow);
};
