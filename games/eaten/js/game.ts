// BOARD
// ==================================================

const generateBoard = (): [string, string][][] => {
    return [
        [["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""]],
        [["X",""], ["E","1"], ["E","2"], ["O","3"], ["3","4"], ["E","5"], ["E","6"], ["E","7"], ["10","8"], ["X",""]],
        [["X",""], ["E","9"], ["E","10"], ["E","11"], ["E","12"], ["E","13"], ["E","14"], ["E","15"], ["O","16"], ["X",""]],
        [["X",""], ["O","17"], ["E","18"], ["E","19"], ["O","20"], ["6","21"], ["O","22"], ["2","23"], ["E","24"], ["X",""]],
        [["X",""], ["5","25"], ["E","26"], ["E","27"], ["E","28"], ["7","29"], ["O","30"], ["E","31"], ["E","32"], ["X",""]],
        [["X",""], ["E","33"], ["O","34"], ["O","35"], ["E","36"], ["E","37"], ["E","38"], ["E","39"], ["E","40"], ["X",""]],
        [["X",""], ["E","41"], ["E","42"], ["E","43"], ["1","44"], ["E","45"], ["E","46"], ["O","47"], ["9","48"], ["X",""]],
        [["X",""], ["E","49"], ["8","50"], ["O","51"], ["E","52"], ["E","53"], ["E","54"], ["E","55"], ["E","56"], ["X",""]],
        [["X",""], ["E","57"], ["E","58"], ["P","59"], ["E","60"], ["E","61"], ["E","62"], ["4","63"], ["E","64"], ["X",""]],
        [["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""], ["X",""]],
    ]
}

const displayBoard = (board: [string, string][][]) => {
    const boardDiv = get("boardDiv")
    
    let numbers: Numbers = {}

    for (const rows of board) {
        for (const tile of rows) {
            if (tile[0] === "E") {
                const tileDiv = make("div")
                tileDiv.className = "empty"
                tileDiv.id = tile[1]
                insert(boardDiv, [tileDiv])
            }

            else if (tile[0] === "O") {
                const tileDiv = make("div")
                tileDiv.className = "obstacle"
                tileDiv.id = tile[1]
                insert(boardDiv, [tileDiv])
            }

            else if (tile[0] === "P") {
                const tileDiv = make("div")
                tileDiv.className = "player"
                tileDiv.id = tile[1]
                insert(boardDiv, [tileDiv])
            }

            else if (tile[0] === "1") {
                numbers[tile[0]] = tile[1]
                const tileDiv = make("div")
                tileDiv.className = "nextNumber"
                tileDiv.id = tile[1]
                tileDiv.innerHTML = tile[0]
                insert(boardDiv, [tileDiv])
            }

            else if (isNumber(tile[0])) {
                numbers[tile[0]] = tile[1]
                const tileDiv = make("div")
                tileDiv.className = "number"
                tileDiv.id = tile[1]
                tileDiv.innerHTML = tile[0]
                insert(boardDiv, [tileDiv])
            }

        }
    }

    return numbers
}


// MAIN
// ==================================================

let 
    board = generateBoard(),
    row = 8,
    column = 3,
    number = 1,
    numbers = displayBoard(board)

document.onkeydown = (event: KeyboardEvent) => {
    const k = event.key
    
    // Move Left
    if (k === "ArrowLeft") {
        event.preventDefault()

        const nextTile = board[row][column-1][0]

        if (nextTile === "X" || nextTile === "O") {
            return
        }

        else if (nextTile === "E") {
            board[row][column][0] = "E"
            get(board[row][column][1]).className = "empty"
            column--
            board[row][column][0] = "P"
            get(board[row][column][1]).className = "player"
        }

        else if (nextTile === `${number}`) {
            board[row][column][0] = "E"
            get(board[row][column][1]).className = "empty"
            column--
            board[row][column][0] = "P"
            get(board[row][column][1]).className = "player"
            get(board[row][column][1]).innerHTML = ""
            number++
            get(numbers[number]).className = "nextNumber"
        }
    }

    // Move Right
    if (k === "ArrowRight") {
        event.preventDefault()

        const nextTile = board[row][column+1][0]

        if (nextTile === "X" || nextTile === "O") {
            return
        }

        else if (nextTile === "E") {
            board[row][column][0] = "E"
            get(board[row][column][1]).className = "empty"
            column++
            board[row][column][0] = "P"
            get(board[row][column][1]).className = "player"
        }

        else if (nextTile === `${number}`) {
            board[row][column][0] = "E"
            get(board[row][column][1]).className = "empty"
            column++
            board[row][column][0] = "P"
            get(board[row][column][1]).className = "player"
            get(board[row][column][1]).innerHTML = ""
            number++
            get(numbers[number]).className = "nextNumber"
        }
    }

    // Move Up
    if (k === "ArrowUp") {
        event.preventDefault()

        const nextTile = board[row-1][column][0]

        if (nextTile === "X" || nextTile === "O") {
            return
        }

        else if (nextTile === "E") {
            board[row][column][0] = "E"
            get(board[row][column][1]).className = "empty"
            row--
            board[row][column][0] = "P"
            get(board[row][column][1]).className = "player"
        }

        else if (nextTile === `${number}`) {
            board[row][column][0] = "E"
            get(board[row][column][1]).className = "empty"
            row--
            board[row][column][0] = "P"
            get(board[row][column][1]).className = "player"
            get(board[row][column][1]).innerHTML = ""
            number++
            get(numbers[number]).className = "nextNumber"
        }
    }

    // Move Down
    if (k === "ArrowDown") {
        event.preventDefault()

        const nextTile = board[row+1][column][0]

        if (nextTile === "X" || nextTile === "O") {
            return
        }

        else if (nextTile === "E") {
            board[row][column][0] = "E"
            get(board[row][column][1]).className = "empty"
            row++
            board[row][column][0] = "P"
            get(board[row][column][1]).className = "player"
        }

        else if (nextTile === `${number}`) {
            board[row][column][0] = "E"
            get(board[row][column][1]).className = "empty"
            row++
            board[row][column][0] = "P"
            get(board[row][column][1]).className = "player"
            get(board[row][column][1]).innerHTML = ""
            number++
            get(numbers[number]).className = "nextNumber"
        }
    }

}
