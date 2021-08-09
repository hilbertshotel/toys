// MENU
// ============================================================
const ADDRESS = "http://127.0.0.1:8888" 
let NEXT = "nextNumber"

const restart = () => {
    main()
}

const quit = () => {
    window.location.href = ADDRESS
}

const help = (button: HTMLElement) => {
    const next = <HTMLElement>document.getElementsByClassName("nextNumber")[0]!

    if (button.id === "help") {
        button.id = ""
        next.style.animationName = ""
        NEXT = ""
    } else {
        button.id = "help"
        next.style.animationName = "nextNumber"
        NEXT = "nextNumber"
    }
}

const music = (button: HTMLAudioElement) => {
    if (button.id === "music") {
        button.id = ""
        audio().pause()
    } else {
        button.id = "music"
        audio().play()
    }
}


// GENERATE BOARD
// ============================================================
const generateBoard = (): Tile[][] => {

    const
        board: Tile[][] = [[],[],[],[],[],[],[],[]]

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

    // test board (if not valid generateBoard())
    console.log(board)

    return board
}


// DISPLAY BOARD
// ============================================================
const displayBoard = (board: Tile[][]): [number[], Numbers] => {
    
    const boardDiv = get("boardDiv")
    boardDiv.innerHTML = ""
    
    let
        numbers: Numbers = {},
        position: number[] = []

    const spawnDiv = (name: string, id: string, inner: string) => {
            const div = make("div")
            div.className = name
            div.id = id
            div.innerHTML = inner
            boardDiv.appendChild(div)
    }

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
                get(tile.id).style.animationName = NEXT
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
// ============================================================
const main = () => {
    let 
        board = generateBoard(),
        [[row, column], numbers] = displayBoard(board),
        number = 1,
        previous = { type: "E", class: "empty", text: "" }


    const action = async (nextTile: string, move: () => void) => {
        if (nextTile === "E") {
            board[row][column].type = previous.type
            get(board[row][column].id).className = previous.class
            get(board[row][column].id).innerHTML = previous.text

            move()
            previous = { type: "E", class: "empty", text: "" }

            board[row][column].type = "P"
            get(board[row][column].id).className = "player"
        }

        else if (nextTile === `${number}`) {
            board[row][column].type = previous.type
            get(board[row][column].id).className = previous.class
            get(board[row][column].id).innerHTML = previous.text

            move()
            previous = { type: "E", class: "empty", text: "" }

            board[row][column].type = "P"
            get(board[row][column].id).className = "player"
            get(board[row][column].id).innerHTML = ""
            
            number++
            get(numbers[number]).className = "nextNumber"
            get(numbers[number]).style.animationName = NEXT
        }

        else if (isNumber(nextTile)) {
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


main()
