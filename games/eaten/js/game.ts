// CONSTANTS
// ==================================================

const
    tilesPerRow = 8,
    tilesPerColumn = 8,
    numberOfTiles = tilesPerRow * tilesPerColumn


// BOARD
// ==================================================

const generateBoard = (): string[][] => {
    return [
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
}


const displayBoard = (board: string[][]) => {
    const boardDiv = get("boardDiv")
    boardDiv.innerHTML = ""

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


// PLAYER
// ==================================================

let newPlayer = () => {

    // attributes
    let
        position = { "row": 8, "column": 3 },
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
let player = newPlayer()

document.onkeydown = handleKey

function handleKey(event: KeyboardEvent) {
    const k = event.key
    
    // Move Left
    if (k === "ArrowLeft") {
        event.preventDefault()

        const nextTile = board[player.row()][player.column()-1]

        if (nextTile === "X" || nextTile === "O") {
            return
        }

        else if (nextTile === "T") {
            board[player.row()][player.column()] = "T"
            player.moveLeft()
            board[player.row()][player.column()] = "P"
            displayBoard(board)
        }

        else if (nextTile === player.number()) {
            board[player.row()][player.column()] = "T"
            player.moveLeft()
            board[player.row()][player.column()] = "P"
            displayBoard(board)
            player.incrementNumber()
        }
    }

    // Move Right
    else if (k === "ArrowRight") {
        event.preventDefault()

        const nextTile = board[player.row()][player.column()+1]

        if (nextTile === "X" || nextTile === "O") {
            return
        }

        else if (nextTile === "T") {
            board[player.row()][player.column()] = "T"
            player.moveRight()
            board[player.row()][player.column()] = "P"
            displayBoard(board)
        }

        else if (nextTile === player.number()) {
            board[player.row()][player.column()] = "T"
            player.moveRight()
            board[player.row()][player.column()] = "P"
            displayBoard(board)
            player.incrementNumber()
        }
    }

    // Move Up
    else if (k === "ArrowUp") {
        event.preventDefault()

        const nextTile = board[player.row()-1][player.column()]

        if (nextTile === "X" || nextTile === "O") {
            return
        }

        else if (nextTile === "T") {
            board[player.row()][player.column()] = "T"
            player.moveUp()
            board[player.row()][player.column()] = "P"
            displayBoard(board)
        }

        else if (nextTile === player.number()) {
            board[player.row()][player.column()] = "T"
            player.moveUp()
            board[player.row()][player.column()] = "P"
            displayBoard(board)
            player.incrementNumber()
        }
    }

    // Move Down
    else if (k === "ArrowDown") {
        event.preventDefault()

        const nextTile = board[player.row()+1][player.column()]

        if (nextTile === "X" || nextTile === "O") {
            return
        }

        else if (nextTile === "T") {
            board[player.row()][player.column()] = "T"
            player.moveDown()
            board[player.row()][player.column()] = "P"
            displayBoard(board)
        }

        else if (nextTile === player.number()) {
            board[player.row()][player.column()] = "T"
            player.moveDown()
            board[player.row()][player.column()] = "P"
            displayBoard(board)
            player.incrementNumber()
        }
    }

}
