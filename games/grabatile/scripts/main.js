"use strict"

// ONCLICK ACTION
let action = (tile, header) => {

    console.log(tile.style.backgroundColor)
    console.log(header.style.backgroundColor)

    if (tile.style.backgroundColor === header.style.backgroundColor) {
        // if it is the right one -> hide current tile, remove one tile from the counter and play good sound
        // if it is the last tile of a series -> play finished series sound and change the nextColor var
        // if it is the last tile in the set -> play finished sound
        tile.style.visibility = "hidden"
    } else {
        // if it is not the right one -> play bad sound
    }
}


// CREATE TILE SET
let createTileSet = (colors) => {
    let tiles = []
    let tileSet = {}
    
    for (let i=0; i<36; i++) {
        let n = random(0, colors.length-1)
        shuffle(colors)
        let color = colors[n].color
        tiles.push(color)

        if (tileSet.hasOwnProperty(color)) {
            tileSet[color] += 1
        } else {
            tileSet[color] = 1
        }
    }

    return [tiles, tileSet]
}


// FILL TILE MAP IN DOM
let fillTileMap = async (tileMap, tiles, header) => {
    for (let i=0; i<36; i++) {
        let tile = make("div", "class=tile")
        tile.style.backgroundImage = `url("images/${tiles[i]}_tile.png")`
        tile.onclick = () => { action(tile, header) }
        insert(tileMap, tile)
    }
}


// MAIN
let colors = [
    { color: "white", hex: "#FFFFFF" },
    { color: "yellow", hex: "#FFdd00" },
    { color: "orange", hex: "#FF9100" },
    { color: "red", hex: "#FF4b1F" },
    { color: "brown", hex: "#9e5b0e" },
    { color: "green", hex: "#6e9900" },
    { color: "blue", hex: "#146de0" },
    { color: "purple", hex: "#a72bff" },
    { color: "pink", hex: "#ff4fdf" },
    { color: "grey", hex: "#b6b6b6" },
    { color: "black", hex: "#1e1e1e" },
]

let elements = {
    header: get("header"),
    tileMap: get("tileMap"),
}

let [tiles, tileSet] = createTileSet(colors)
fillTileMap(tileMap, tiles, header)
