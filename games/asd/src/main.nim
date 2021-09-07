import dom
import random

import lib

# DATA
# ================================================================================

let
    TILES = 3
    COLORS = 1


# FUNCTIONS
# ================================================================================

func borderRadius(n: int): string =
    if n in [1, 3, 6, 8, 9, 11, 14, 16]:
        "6.5rem 0 6.5rem 0"
    else:
        "0 6.5rem 0 6.5rem"


func createTileSet(): array[16, string] =
    var tileSet: array[16, string] = [ "#f7b6b1", "#f7b6b1", "#f7b6b1", "#f7b6b1", "#f7b6b1", 
    "#f7b6b1", "#f7b6b1", "#f7b6b1", "#f7b6b1", "#f7b6b1", "#f7b6b1", "#f7b6b1", "#f7b6b1",
    "#f09473", "#f09473", "#f09473" ]
    tileSet



# DOM PROCEDURES
# ================================================================================

proc action() = discard


proc loadTiles(leftBox, rightBox: Node, tileSet: array[16, string]) =
    for n in 1..16:
        let leftTile = make("div", "class=tile")
        leftTile.style.borderRadius = borderRadius(n)
        leftTile.onclick = proc (_: Event) = action()

        let rightTile = make("div", "class=tile")
        rightTile.style.borderRadius = borderRadius(n)
        rightTile.style.backgroundColor = tileSet[n-1]
        
        leftBox.insert(leftTile)
        rightBox.insert(rightTile)


proc loadEmptyBoxes() =
    for n in 1..16:
        let leftTile = make("div", "class=tile")
        leftTile.style.borderRadius = borderRadius(n)

        let rightTile = make("div", "class=tile")
        rightTile.style.borderRadius = borderRadius(n)
        
        getId("leftBox").insert(leftTile)
        getId("rightBox").insert(rightTile)


# BUTTONS
# ================================================================================

proc play() {.exportc.} =

    let
        leftBox = getId("leftBox")
        rightBox = getId("rightBox")
    var tileSet = createTileSet()

    leftBox.innerHTML = ""
    rightBox.innerHTML = ""
    shuffle(tileSet)

    loadTiles(leftBox, rightBox, tileSet)
    # generate tiles
    # generate colors
    # start music
    # generate game box
    # generate example box with TILES and COLORS


proc changeTiles(tile: Element) {.exportc.} =
    case $tile.innerHTML:
    of "3t": tile.innerHTML = "6t"
    of "6t": tile.innerHTML = "9t"
    of "9t": tile.innerHTML = "12t"
    else: tile.innerHTML = "3t"


proc changeColors(tile: Element) {.exportc.} =
    case $tile.innerHTML:
    of "1c": tile.innerHTML = "2c"
    of "2c": tile.innerHTML = "3c"
    of "3c": tile.innerHTML = "4c"
    else: tile.innerHTML = "1c"


proc mute() {.exportc.} =
    discard


proc exit() {.exportc.} =
    window.location.href = "/"


# MAIN
# ================================================================================
proc main() = loadEmptyBoxes()


main()