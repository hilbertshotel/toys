import strformat
import dom
import strformat

import lib

proc addTiles(element: Node, max: int) =
    for n in 1..max:
        let tile = make("div", "class=tile")
        element.insert(tile)


proc main() =
    let
        leftBox = getId("leftBox")
        rightBox = getId("rightBox")

    leftBox.addTiles(25)
    rightBox.addTiles(25)


main()