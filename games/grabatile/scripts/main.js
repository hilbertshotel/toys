let tileMap = get("tileMap")

for (let i=0; i<36; i++) {
    let tile = make("div", "class=tile", `id=${i}`)
    insert(tileMap, tile)
}

// collors -> white, yellow, orange, red, brown, green, blue, purple, grey, black
