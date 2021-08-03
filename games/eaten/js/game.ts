// CONSTANTS
// ==================================================

const
    startRow = 8,
    startColumn = 3,
    tilesPerRow = 8,
    tilesPerColumn = 8,
    numberOfTiles = tilesPerRow * tilesPerColumn


// GENERATE BOARD
// ==================================================

const generateBoard = (): string[][] => {
    let board = [
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
        ["X", "T", "T", "T", "T", "T", "T", "T", "T", "X"],
        ["X", "T", "O", "3", "T", "T", "T", "2", "T", "X"],
        ["X", "T", "T", "T", "T", "T", "T", "T", "T", "X"],
        ["X", "T", "T", "T", "O", "O", "T", "T", "T", "X"],
        ["X", "4", "T", "T", "T", "T", "T", "T", "T", "X"],
        ["X", "T", "O", "T", "T", "T", "T", "T", "10", "X"],
        ["X", "T", "T", "T", "1", "T", "T", "O", "T", "X"],
        ["X", "T", "T", "P", "T", "T", "5", "T", "T", "X"],
        ["X", "X", "X", "X", "X", "X", "X", "X", "X", "X"],
    ]
    return board
}


// DISPLAY BOARD IN DOM
// ==================================================

const displayBoard = (board: string[][]) => {
    const boardDiv = get("boardDiv")

    for (const rows of board) {
        for (const [i, column] of rows.entries()) {
            if (column === "T") {
                const tileDiv = make("div")
                tileDiv.className = "tile"
                insert(boardDiv, [tileDiv])
            }

            else if (column === "O") {
                const tileDiv = make("div")
                tileDiv.className = "obstacle"
                tileDiv.innerHTML = "X"
                insert(boardDiv, [tileDiv])
            }

            else if (column === "P") {
                const tileDiv = make("div")
                tileDiv.className = "player"
                tileDiv.id = "playerDiv"
                tileDiv.innerHTML = "P"
                insert(boardDiv, [tileDiv])
            }

            else if (isNumber(column)) {
                const tileDiv = make("div")
                tileDiv.className = "number"
                tileDiv.innerHTML = column
                insert(boardDiv, [tileDiv])
            }

        }
    }

}


const clearDOM = () => {
    const boardDiv = get("boardDiv")
    boardDiv.innerHTML = ""
}

// PLAYER
// ==================================================

let newPlayer = (row: number, column: number) => {

    // attributes
    let
        position = { "row": row, "column": column },
        number = 1

    // methods
    return {
        row: (): number => {
            return position.row
        },
        column: (): number => {
            return position.column
        },
        number: (): string => {
            return `${number}`
        },
        incrementNumber: () => {
            number++
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

let board = generateBoard()
displayBoard(board)
let player = newPlayer(startRow, startColumn)

document.onkeydown = handleKey

function handleKey(event: KeyboardEvent) {
    const k = event.key
    
    // Move Left
    if (k === "ArrowLeft") {
        event.preventDefault()

        const nextTile = board[player.row()][player.column()-1] // -1 for left

        if (nextTile === "X" || nextTile === "O") {
            return
        }

        else if (nextTile === "T") {
            board[player.row()][player.column()] = "T"
            player.moveLeft()
            board[player.row()][player.column()] = "P"
            clearDOM()
            displayBoard(board)
        }

        else if (nextTile === player.number()) {
            board[player.row()][player.column()] = "T"
            player.moveLeft()
            board[player.row()][player.column()] = "P"
            clearDOM()
            displayBoard(board)
            player.incrementNumber()
        }

    }

    // // Move Right
    // else if (k === "ArrowRight") {
    //     event.preventDefault()

    //     if (player.isOnLastColumn()) {
    //         // play out of bounds sound effect ???
    //         return
    //     }

    //     player.pickup()
    //     player.moveRight()
    //     player.place()
    // }

    // // Move Up
    // else if (k === "ArrowUp") {
    //     event.preventDefault()

    //     if (player.isOnFirstRow()) {
    //         return
    //     }

    //     player.pickup()
    //     player.moveUp()
    //     player.place()
    // }

    // // Move Down
    // else if (k === "ArrowDown") {
    //     event.preventDefault()

    //     if (player.isOnLastRow()) {
    //         return
    //     }

    //     player.pickup()
    //     player.moveDown()
    //     player.place()
    // }

}
