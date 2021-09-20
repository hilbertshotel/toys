let main = () => {
    let body = document.body

    for (let i=0; i<10000; i++) {
        let tile = document.createElement("div")
        tile.className = "tile"
        // tile.innerHTML = `${i+1}`
        body.append(tile)
    }
}


main()