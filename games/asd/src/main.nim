import dom
import random
import sequtils
import strformat

import lib

# DATA
# ================================================================================

const
    ORANGE = "#f09473"
    YELLOW = "#f5b82b"
    RED = "#eb5952"
    PINK = "#e95990"
    NOCOLOR = "#f7b6b1"

var
    TILENUM = 3
    COLORNUM = 1


# FUNCTIONS
# ================================================================================

func borderRadius(n: int): string =
    if n in [1, 3, 6, 8, 9, 11, 14, 16]:
        "6.5rem 0 6.5rem 0"
    else:
        "0 6.5rem 0 6.5rem"


proc sampleTiles(tilenum, colornum: int): seq[string] =
    var
        colors: seq[string]
        tiles: seq[string]

    case colornum:
    of 1: colors = @[ORANGE]
    of 2: colors = @[ORANGE, YELLOW]
    of 3: colors = @[ORANGE, YELLOW, RED]
    else: colors = @[ORANGE, YELLOW, RED, PINK]
    
    randomize()

    for n in 1..tilenum:
        tiles.add(sample(colors))

    tiles = tiles & repeat(NOCOLOR, 16-tilenum)
    shuffle(tiles)
    tiles


# DOM PROCEDURES
# ================================================================================

proc action(tile: Node, tilenum, colornum: int) =
    print(tile.id)
    # case colornum:
    # of 1:
    # of 2:
    # of 3:
    # else:

    # if LEFT BOX == RIGHT BOX -> LIUN GAME


proc startGame(leftBox, rightBox: Node, tiles: seq[string], tilenum, colornum: int) =
    for n in 1..16:
        closureScope:
            let lt = make("div", "class=tile", &"id={NOCOLOR}")
            lt.style.borderRadius = borderRadius(n)
            lt.onclick = proc (_: Event) = action(lt, tilenum, colornum)
            leftBox.insert(lt)

        let rt = make("div", "class=tile")
        rt.style.borderRadius = borderRadius(n)
        rt.style.backgroundColor = tiles[n-1]
        rightBox.insert(rt)


# BUTTONS
# ================================================================================

proc play() {.exportc.} =
    # START MUSIC

    let
        leftBox = getId("leftBox")
        rightBox = getId("rightBox")

    leftBox.innerHTML = ""
    rightBox.innerHTML = ""

    var tiles = sampleTiles(TILENUM, COLORNUM)
    startGame(leftBox, rightBox, tiles, TILENUM, COLORNUM)


proc changeTiles(tile: Element) {.exportc.} =
    case $tile.innerHTML:
    of "3t": TILENUM = 6
    of "6t": TILENUM = 9
    of "9t": TILENUM = 12
    of "12t": TILENUM = 3
    tile.innerHTML = &"{TILENUM}t"


proc changeColors(tile: Element) {.exportc.} =
    case $tile.innerHTML:
    of "1c": COLORNUM = 2
    of "2c": COLORNUM = 3
    of "3c": COLORNUM = 4
    of "4c": COLORNUM = 1
    tile.innerHTML = &"{COLORNUM}c"


proc mute() {.exportc.} =
    discard


proc exit() {.exportc.} =
    window.location.href = "/"


# MAIN
# ================================================================================

proc main() =
    for n in 1..16:
        let
            lt = make("div", "class=tile")
            rt = make("div", "class=tile")

        lt.style.borderRadius = borderRadius(n)
        rt.style.borderRadius = borderRadius(n)
        
        getId("leftBox").insert(lt)
        getId("rightBox").insert(rt)


main()