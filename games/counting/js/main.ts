// CONSTANTS
// ==================================================

const boardSize = 64


// SPAWN BOARD
// ==================================================

const spawnBoard = () => {
    // SPAWN 10 NUMBERS AND 10 OBSTACLES RANDOMLY ON EACH RELOAD
    for (let i = 0; i < boardSize; i++) {
        const tile = make("div")
        tile.className = "tile"
        tile.id = `tile-${i + 1}`
        insert(get("board"), [tile])
    }
}


// SPAWN PLAYER
// ==================================================

const spawnPlayer = (): [HTMLElement, string] => {
    const firstTile = get("tile-1")
    const previousTileId = firstTile.id
    firstTile.id = "player"

    return [firstTile, previousTileId]
}


// MAIN
// ==================================================

spawnBoard()
let [currentTile, previousTileId] = spawnPlayer()

document.onkeyup = handleKey

function handleKey(event: KeyboardEvent) {
    const k = event.key

    if (k === "ArrowRight") {
        event.preventDefault()

        let nextTileId = increment(previousTileId)

        if (nextTileId === `tile-${boardSize+1}`) {
            return
        }

        let nextTile = get(nextTileId)
        nextTile.id = "player"

        currentTile.id = previousTileId
        previousTileId = nextTileId
        currentTile = nextTile
    }

    // ARROW KEYS
    // CANT MOVE IF NOT CORRECT NUMBER, OBSTACLE OR END OF BOARD

}
