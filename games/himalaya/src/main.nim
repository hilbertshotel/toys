import lib
import dom
import random
import strformat

# PROCS
# ================================================================================

proc newCloud(): Node =
    let
        cloud = make("div", "class=cloud")
        cleft = make("div", "class=cloudling", "id=cleft")
        cbottom = make("div", "class=cloudling", "id=cbottom")
        cright = make("div", "class=cloudling", "id=cright")
        ctop = make("div", "class=cloudling", "id=ctop")
    cloud.insert(cleft, cbottom, cright, ctop)
    cloud


proc scatterClouds(sky: Node) =
    randomize()

    var i = 0.0
    while i < 3:
        let
            cloud = newCloud()
            randTop = rand(5..80)
            randLeft = rand(5..80)

        # randomize positioning
        cloud.style.top = &"{randTop}%"
        cloud.style.left = &"{randLeft}%"

        # randomize animation
        var animation: string
        if randLeft < 20: animation = "clouds-left"
        elif randLeft > 60: animation = "clouds-right"
        else: animation = sample(["clouds-left", "clouds-right"])
        
        if randTop < 30: discard # put cloud behind peak

        cloud.style.animationName = animation
        cloud.style.animationDuration = &"{rand(300..400)}s"
        # cloud.style.animationDuration = "10s"
        cloud.style.animationDelay = &"-{i}s"

        sky.insert(cloud)
        i += 0.3
    

# ON PAGE LOAD
# ================================================================================

proc onPageLoad() =
    let
        sky = getId("sky")
        peak = make("div", "class=peak")
    
    main.insert(peak)

    # create Cloud type
    # fill Cloud container
    # sky.scatterCloudsFrom(cloudContainer: CloudContainer)

    # Clouds:
        # placement: front | back
        # position: in %
        # animation-details:
            # duration
            # delay
            # name

    sky.scatterClouds


onPageLoad()