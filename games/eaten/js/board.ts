const loadEmptyBoard = (boardDiv: HTMLElement) => {
    for (let i=0; i<64; i++) {
        const tileDiv = make("div", "empty", "", "")
        boardDiv.appendChild(tileDiv)
    }
}

const clearBoard = (boardDiv: HTMLElement) => {
    boardDiv.innerHTML = ""
}

const newBoard = (): Tile[][] => {
    const board: Tile[][] = [[],[],[],[],[],[],[],[]]

    let
        empties = new Array(43).fill("E"),
        obstacles = new Array(10).fill("O"),
        rest = ["1","2","3","4","5","6","7","8","9","10", "P"],
        types = [...empties, ...obstacles, ...rest]
        
    shuffle(types)

    let i = 0
    for (let row of board) {
        for (let j=0; j<8; j++) {
            row.push({
                type: types[i],
                id: `${i}`,
            })
            i++
        }
    }

    // test board (if not valid newBoard()) else
    return board
}

const loadNewBoard = (board: Tile[][], boardDiv: HTMLElement): [number[], Numbers] => {
    clearBoard(boardDiv)
    
    let
        numbers: Numbers = {},
        playerPosition: number[] = []

    for (const [i, rows] of board.entries()) {
        for (const [j, tile] of rows.entries()) {

            if (tile.type === "E") {
                const emptyTile = make("div", "empty", tile.id, "")
                boardDiv.appendChild(emptyTile)
            }

            else if (tile.type === "O") {
                const obstacle = make("div", "obstacle", tile.id, "")
                boardDiv.appendChild(obstacle)
            }

            else if (tile.type === "P") {
                playerPosition = [i, j]
                const player = make("div", "player", tile.id, "")
                boardDiv.appendChild(player)
            }

            else if (tile.type === "1") {
                numbers[tile.type] = tile.id
                const nextNumber = make("div", "nextNumber", tile.id, tile.type)
                boardDiv.appendChild(nextNumber)
                get(tile.id).style.animationName = NEXT
            }

            else {
                numbers[tile.type] = tile.id
                const number = make("div", "number", tile.id, tile.type)
                boardDiv.append(number)
            }

        }
    }

    return [playerPosition, numbers]
}

const startGame = (boardDiv: HTMLElement) => {
    let 
        board = newBoard(),
        [[row, column], numbers] = loadNewBoard(board, boardDiv),
        nextNumber = 1,
        previous = { type: "E", class: "empty", text: "" }

    const action = async (nextTile: string, move: () => void) => {
        if (nextTile === "E") {
            getAudio("moveSound").play()

            board[row][column].type = previous.type
            get(board[row][column].id).className = previous.class
            get(board[row][column].id).innerHTML = previous.text

            move()
            previous = { type: "E", class: "empty", text: "" }

            board[row][column].type = "P"
            get(board[row][column].id).className = "player"
        }

        else if (nextTile === `${nextNumber}`) {
            getAudio("moveSound").play()
            playNextNumber(nextNumber)

            board[row][column].type = previous.type
            get(board[row][column].id).className = previous.class
            get(board[row][column].id).innerHTML = previous.text

            move()
            previous = { type: "E", class: "empty", text: "" }

            board[row][column].type = "P"
            get(board[row][column].id).className = "player"
            get(board[row][column].id).innerHTML = ""
            
            get(numbers[nextNumber]).style.animationName = "player"
            nextNumber++
            if (nextNumber === 11) {}
            else {
                get(numbers[nextNumber]).className = "nextNumber"
                get(numbers[nextNumber]).style.animationName = NEXT
            }
        }

        else if (isNumber(nextTile)) {
            getAudio("moveSound").play()

            board[row][column].type = previous.type
            get(board[row][column].id).className = previous.class
            get(board[row][column].id).innerHTML = previous.text

            move()
            previous = { type: nextTile, class: "number", text: nextTile }

            board[row][column].type = "P"
            get(board[row][column].id).className = "player"
            get(board[row][column].id).innerHTML = ""
        }
    }

    document.onkeydown = (event: KeyboardEvent) => {
        // event.preventDefault()
    }

    document.onkeyup = (event: KeyboardEvent) => {
        const k = event.key
        event.preventDefault()

        if (k === "ArrowLeft") {
            if (column-1 < 0) { return }
            const nextTile = board[row][column-1].type
            action(nextTile, () => { column-- })
        }

        else if (k === "ArrowRight") {
            if (column+1 > 7) { return }
            const nextTile = board[row][column+1].type
            action(nextTile, () => { column++ })
        }

        else if (k === "ArrowUp") {
            if (row-1 < 0) { return }
            const nextTile = board[row-1][column].type
            action(nextTile, () => { row-- })
        }

        else if (k === "ArrowDown") {
            if (row+1 > 7) { return }
            const nextTile = board[row+1][column].type
            action(nextTile, () => { row++ })
        }
    }
}
