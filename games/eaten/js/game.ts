// GENERATE BOARD
const generateBoard = (): Tile[][] => {
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

    // TEST BOARD IF NOT VALID generateBoard()

    return board
}


// DISPLAY BOARD
const displayBoard = (board: Tile[][]): [number[], Numbers] => {
    
    const
        boardDiv = get("boardDiv"),
        spawnDiv = (name: string, id: string, inner: string) => {
            const div = make("div")
            div.className = name
            div.id = id
            div.innerHTML = inner
            boardDiv.appendChild(div)
        }
    
    let
        numbers: Numbers = {},
        position: number[] = []

    for (const [i, rows] of board.entries()) {
        for (const [j, tile] of rows.entries()) {
            if (tile.type === "E") {
                spawnDiv("empty", tile.id, "")
            }

            else if (tile.type === "O") {
                spawnDiv("obstacle", tile.id, "")
            }

            else if (tile.type === "P") {
                position = [i, j]
                spawnDiv("player", tile.id, "")
            }

            else if (tile.type === "1") {
                numbers[tile.type] = tile.id
                spawnDiv("nextNumber", tile.id, tile.type)
            }

            else {
                numbers[tile.type] = tile.id
                spawnDiv("number", tile.id, tile.type)
            }

        }
    }

    return [position, numbers]
}


// MAIN
let 
    board = generateBoard(),
    [position, numbers] = displayBoard(board),
    row = position[0],
    column = position[1],
    number = 1


const action = async (nextTile: string, move: () => void) => {
    if (nextTile === "E") {
        board[row][column].type = "E"
        get(board[row][column].id).className = "empty"
        move()
        
        board[row][column].type = "P"
        get(board[row][column].id).className = "player"
    }

    else if (nextTile === `${number}`) {
        board[row][column].type = "E"
        get(board[row][column].id).className = "empty"
        move()
        
        board[row][column].type = "P"
        get(board[row][column].id).className = "player"
        get(board[row][column].id).innerHTML = ""
        
        number++
        if (number === 11) { restartIn(2000) }
        get(numbers[number]).className = "nextNumber"
    }
}


document.onkeydown = (event: KeyboardEvent) => {
    const k = event.key
    
    if (k === "ArrowLeft") {
        event.preventDefault()
        if (column-1 < 0) { return }
        const nextTile = board[row][column-1].type
        action(nextTile, () => { column-- })
    }

    else if (k === "ArrowRight") {
        event.preventDefault()
        if (column+1 > 7) { return }
        const nextTile = board[row][column+1].type
        action(nextTile, () => { column++ })
    }

    else if (k === "ArrowUp") {
        event.preventDefault()
        if (row-1 < 0) { return }
        const nextTile = board[row-1][column].type
        action(nextTile, () => { row-- })
    }

    else if (k === "ArrowDown") {
        event.preventDefault()
        if (row+1 > 7) { return }
        const nextTile = board[row+1][column].type
        action(nextTile, () => { row++ })
    }

}
