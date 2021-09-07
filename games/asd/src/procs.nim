import dom
import data
import random
import sequtils
import lib
import strformat

# ================================================================================
proc getBoxDivs*(): (Node, Node) =
    return (getId("leftBox"), getId("rightBox"))


# ================================================================================
proc clearBoxDivs*(leftBox, rightBox: Node) =
    leftBox.innerHTML = ""
    rightBox.innerHTML = ""


# ================================================================================
proc allTilesEqual(): bool =
    let (leftBox, rightBox) = getBoxDivs()
    for n in 0..15:
        if leftBox.children[n].id != rightBox.children[n].id:
            return false
    return true


# ================================================================================
func borderRadius*(n: int): string =
    if n in [1, 3, 6, 8, 9, 11, 14, 16]:
        "6.5rem 0 6.5rem 0"
    else:
        "0 6.5rem 0 6.5rem"


# ================================================================================
proc changeTileColor(color: string, tile: Node) =
    tile.id = color
    tile.style.backgroundColor = color


# ================================================================================
proc sampleTiles*(tilenum, colornum: int, colors: AllColors): seq[string] =
    var
        colorPick: seq[string]
        tiles: seq[string]

    case colornum:
    of 1: colorPick = @[colors.orange]
    of 2: colorPick = @[colors.orange, colors.yellow]
    of 3: colorPick = @[colors.orange, colors.yellow, colors.red]
    else: colorPick = @[colors.orange, colors.yellow, colors.red, colors.pink]
    
    randomize()

    for n in 1..tilenum:
        tiles.add(sample(colorPick))

    tiles = tiles & repeat(colors.nocolor, 16-tilenum)
    shuffle(tiles)
    tiles


# ================================================================================
proc loadEmptyBoxes*() =
    let (leftBox, rightBox) = getBoxDivs()
    clearBoxDivs(leftBox, rightBox)

    for n in 1..16:
        let
            lt = make("div", "class=tile")
            rt = make("div", "class=tile")

        lt.style.borderRadius = borderRadius(n)
        rt.style.borderRadius = borderRadius(n)
        
        leftBox.insert(lt)
        rightBox.insert(rt)


# ================================================================================
proc action*(tile: Node, colornum: int, colors: AllColors) = # IS TILENUM NECESSARY
    let tileColor = $tile.id

    case colornum:
    of 1:
        if tileColor == colors.nocolor: changeTileColor(colors.orange, tile)
        elif tileColor == colors.orange: changeTileColor(colors.nocolor, tile)
    of 2:
        if tileColor == colors.nocolor: changeTileColor(colors.orange, tile)
        elif tileColor == colors.orange: changeTileColor(colors.yellow, tile)
        elif tileColor == colors.yellow: changeTileColor(colors.nocolor, tile)
    of 3:
        if tileColor == colors.nocolor: changeTileColor(colors.orange, tile)
        elif tileColor == colors.orange: changeTileColor(colors.yellow, tile)
        elif tileColor == colors.yellow: changeTileColor(colors.red, tile)
        elif tileColor == colors.red: changeTileColor(colors.nocolor, tile)
    else:
        if tileColor == colors.nocolor: changeTileColor(colors.orange, tile)
        elif tileColor == colors.orange: changeTileColor(colors.yellow, tile)
        elif tileColor == colors.yellow: changeTileColor(colors.red, tile)
        elif tileColor == colors.red: changeTileColor(colors.pink, tile)
        elif tileColor == colors.pink: changeTileColor(colors.nocolor, tile)

    if allTilesEqual():
        # play WIN sound
        loadEmptyBoxes() # WHAT TO DO WHEN WIN GAME ?
    

# ================================================================================
proc assembleTiles*(leftBox, rightBox: Node, tiles: seq[string], tilenum, colornum: int, colors: AllColors) =
    for n in 1..16:
        closureScope:
            let lt = make("div", "class=tile", &"id={colors.nocolor}")
            lt.style.borderRadius = borderRadius(n)
            lt.onclick = proc (_: Event) = action(lt, colornum, colors)
            leftBox.insert(lt)

        let
            color = tiles[n-1]
            rt = make("div", "class=tile", &"id={color}")

        rt.style.borderRadius = borderRadius(n)
        rt.style.backgroundColor = color
        rightBox.insert(rt)
