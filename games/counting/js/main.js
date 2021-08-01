"use strict";
const main = () => {
    // Constants
    // ==================================================
    const board = getById("board");
    // Spawn Board
    // ==================================================
    for (let i = 0; i < 64; i++) {
        const tile = make("div");
        tile.className = "tile";
        tile.id = `tile${i + 1}`;
        insertInto(board, [tile]);
    }
    // Spawn Player
    // ==================================================
    const firstTile = getById("tile1");
    const left = firstTile.clientLeft;
    const top = firstTile.clientTop;
    firstTile.style.left = `${left + 2}px`;
    firstTile.style.top = `${top + 2}px`;
    firstTile.style.boxShadow = "none";
};
main();
