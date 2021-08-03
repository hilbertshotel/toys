// CONSTANTS
// ==================================================

const
    startRow = 1,
    startColumn = 1,
    tilesPerRow = 8,
    tilesPerColumn = 8,
    numberOfTiles = tilesPerRow * tilesPerColumn


// BOARD
// ==================================================

const spawnBoard = () => {

    // GENERATE 2D ARRAY BOARD WITH 64 TILES - X, P, T, 1to10

    // create divs for each tile with className = obstacle, tile, number

    let boardArray = [
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "T", "T", "T", "T", "T", "T", "T", "T", "X"],
        ["X", "T", "O", "3", "T", "T", "T", "2", "T", "X"],
        ["X", "T", "T", "T", "T", "T", "T", "T", "T", "X"],
        ["X", "T", "T", "T", "O", "O", "T", "T", "T", "X"],
        ["X", "4", "T", "T", "T", "T", "T", "T", "T", "X"],
        ["X", "T", "O", "T", "T", "T", "T", "T", "10", "X"],
        ["X", "T", "T", "T", "1", "T", "T", "O", "T", "X"],
        ["X", "P", "T", "T", "T", "T", "5", "T", "T", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ]

    const board = get("board")

    for (const arr of boardArray) {
        for (const [i, e] of arr.entries()) {
            if (e === "T") {
                const tile = make("div")
                tile.className = "tile"
                insert(board, [tile])
            }

            else if (e === "O") {
                const tile = make("div")
                tile.className = "obstacle"
                tile.innerHTML = "X"
                insert(board, [tile])
            }

            else if (e === "P") {
                const tile = make("div")
                tile.className = "player"
                tile.innerHTML = "P"
                insert(board, [tile])
            }

            else if (isNum(e)) {
                const tile = make("div")
                tile.className = "number"
                tile.innerHTML = e
                insert(board, [tile])
            }

        }
    }

    // for (let i = 0; i < numberOfTiles; i++) {
    //     const tile = make("div")
    //     tile.className = "tile"
    //     tile.id = `${i + 1}`
    //     insert(board, [tile])
    // }

}


// PLAYER
// ==================================================

let newPlayer = (row: number, column: number) => {

    // attributes
    let position = {
        "row": row,
        "column": column,
    }

    // EATEN NUMBERS

    // methods
    return {
        isOnFirstColumn: (): boolean => {
            return position.column === 1
        },
        isOnLastColumn: (): boolean => {
            return position.column === tilesPerColumn
        },
        isOnFirstRow: (): boolean => {
            return position.row === 1
        },
        isOnLastRow: (): boolean => {
            return position.row === tilesPerRow
        },
        pickup: () => {
            get("player").id = `${(position.row - 1) * tilesPerRow + position.column}`
        },
        place: () => {
            get(`${(position.row - 1) * tilesPerRow + position.column}`).id = "player"
        },
        moveLeft: () => {
            position.column--
        },
        moveRight: () => {
            position.column++
        },
        moveUp: () => {
            position.row--
        },
        moveDown: () => {
            position.row++
        }
    }

}


// MAIN
// ==================================================

spawnBoard()
let player = newPlayer(startRow, startColumn)
player.place()

document.onkeydown = handleKey

function handleKey(event: KeyboardEvent) {
    const k = event.key
    
    // CANT MOVE IF NOT CORRECT NUMBER, OBSTACLE OR END OF BOARD

    // Move Left
    if (k === "ArrowLeft") {
        event.preventDefault()

        if (player.isOnFirstColumn()) {
            return
        }

        player.pickup()
        player.moveLeft()
        player.place()
    }

    // Move Right
    else if (k === "ArrowRight") {
        event.preventDefault()

        if (player.isOnLastColumn()) {
            // play out of bounds sound effect ???
            return
        }

        player.pickup()
        player.moveRight()
        player.place()
    }

    // Move Up
    else if (k === "ArrowUp") {
        event.preventDefault()

        if (player.isOnFirstRow()) {
            return
        }

        player.pickup()
        player.moveUp()
        player.place()
    }

    // Move Down
    else if (k === "ArrowDown") {
        event.preventDefault()

        if (player.isOnLastRow()) {
            return
        }

        player.pickup()
        player.moveDown()
        player.place()
    }

}
