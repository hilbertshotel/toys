// ==================================================

let keyState = {}

document.onkeydown = (event) => {
    event.preventDefault()
    keyState[event.key] = true
}

document.onkeyup = (event) => {
    event.preventDefault()
    keyState[event.key] = false
}

// ==================================================

const init = () => {

    // spawn board
    for (let i = 0; i < 64; i++) {
        const tile = make("div")
        tile.className = "tile"
        tile.id = `tile-${i + 1}`
        insert(get("board"), [tile])
    }

    // spawn player
    const firstTile = get("tile-1")
    const prevId = firstTile.id
    firstTile.id = "player"

    return [firstTile, prevId]
}

// ==================================================

const main = (player, prevId) => {

    if (keyState["ArrowLeft"]) {
    }

    else if (keyState["ArrowRight"]) {
        player.id = prevId
        const nextId = parseInt(prevId.split("-")[1])
        const newPlayer = get(`tile-${nextId+1}`)
        newPlayer.id = "player"
    }

    else if (keyState["ArrowUp"]) {
    }

    else if (keyState["ArrowDown"]) {
    }

    requestAnimationFrame(() => {
        main(newPlayer, prevId)
    })
}

// ==================================================

const [player, prevId] = init()
main(player, prevId)
