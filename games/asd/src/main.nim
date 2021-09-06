import dom

import lib


proc addTiles(element: Node, max: int, even: string, odd: string) =
    for n in 1..max:
        let tile = make("div", "class=tile")
       
        if n mod 2 == 0: tile.style.borderRadius = even
        else: tile.style.borderRadius = odd

        element.insert(tile)


proc main() =
    let
        leftBox = getId("leftBox")
        rightBox = getId("rightBox")

    leftBox.addTiles(25, "5rem 0 5rem 0", "0 5rem 0 5rem")
    rightBox.addTiles(25, "0 5rem 0 5rem", "5rem 0 5rem 0")


main()