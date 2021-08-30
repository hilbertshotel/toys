import random
import dom
import system
import strformat
import system

import lib
import data


# GAME PROCEDURES
# ================================================================================
proc action(tile, header: Node) =
    # delete topmost header
    # make the one below visible
    tile.style.visibility = "hidden"


proc sampleTileColors(): seq[Color] =
    randomize()
    for i in 1..36:
        add(result, sample(COLORS)) 


proc sortByNextOccurence(tileColors: seq[Color]): seq[string] =
    
    let colors = tileColors[18..^1] & tileColors[0..17]
    var currentColor: string

    for c in colors:
        currentColor = c.hex
        if currentColor notin result:
            for color in colors:
                if color.hex == currentColor:
                    result.add(color.hex)


proc stackHeaders(headerBoard: Node, headerColors: seq[string]) =

    let 
        firstColor = headerColors[0]
        firstHeader = make("h1", "class=header", &"id={firstColor}", "text=GRABATILE")

    firstHeader.style.backgroundColor = firstColor
    insert(headerBoard, firstHeader)

    for color in headerColors[1..^1]:
        let header = make("h1", "class=header", &"id={color}", "text=GRABATILE")
        header.style.visibility = "hidden"
        header.style.backgroundColor = color
        insert(headerBoard, header)


proc fillTileMap(tileMap, headerBoard: Node, tileColors: seq[Color]) =

    for color in tileColors:
        
        closureScope:
            let tile = make("div", "class=tile", &"id={color.hex}")
            tile.style.backgroundImage = &"url(\"images/{color.name}_tile.png\")"
            tile.onclick = (proc (_: Event) = action(tile, headerBoard))
            insert(tileMap, tile)


# START GAME
# ================================================================================
proc start() =

    let
        tileColors = sampleTileColors()
        headerColors = sortByNextOccurence(tileColors)

    let
        tileMap = getId("tileMap")
        headerBoard = getId("headerBoard")
        
    stackHeaders(headerBoard, headerColors)
    fillTileMap(tileMap, headerBoard, tileColors)


start()