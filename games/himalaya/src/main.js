// LOGIC
// ================================================================================

const animationName = (num) => {
    if (num < 20) {
        return "clouds-left"
    } else if (num > 60) {
        return "clouds-right"
    } else {
        return ["clouds-left", "clouds-right"][rand(0, 1)]
    }
}


const position = (num) => {
    if (num < 30) {
        return 0
    } else {
        return 1
    }
}


const createClouds = (n) => {
    let clouds = []

    for (let i=0; i<n; i++) {
        let
            randTop = rand(5, 70),
            randLeft = rand(0, 70)
        
        let cloud = {
            top: `${randTop}%`,
            left: `${randLeft}%`,
            nameAnim: animationName(randLeft),
            durAnim: `${rand(300, 400)}s`,
            pos: position(randTop),
        }

        clouds.push(cloud)
    }

    return clouds
}


// DOM
// ================================================================================

const newCloudDiv = () => {
    let
        cloudDiv = make("div", "class=cloud"),
        cleft = make("div", "class=cloudling", "id=cleft"),
        cbottom = make("div", "class=cloudling", "id=cbottom"),
        cright = make("div", "class=cloudling", "id=cright"),
        ctop = make("div", "class=cloudling", "id=ctop")

    insert(cloudDiv, cleft, cbottom, cright, ctop)
    return cloudDiv
}


const scatterClouds = async (sky, clouds) => {
    for (const cloud of clouds) {

        const cloudDiv = newCloudDiv()
        cloudDiv.onclick = () => { action(cloudDiv) }

        cloudDiv.style.top = cloud.top
        cloudDiv.style.left = cloud.left
        cloudDiv.style.animationName = cloud.nameAnim
        cloudDiv.style.animationDuration = cloud.durAnim

        if (cloud.pos === 0) {
            cloudDiv.style.width = "15%"
            cloudDiv.style.height = "10%"
            sky.insertAdjacentElement("afterbegin", cloudDiv)
        } else {
            insert(sky, cloudDiv)
        }

        await sleep(100)
    }
}


const action = (cloudDiv) => {
    cloudDiv.remove()
    // playRemoveSound
    if (getClass("cloud").length === 0) {
        // play completion sound
    }
}


// ON PAGE LOAD
// ================================================================================

const main = () => {

    let
        sky = get("sky"),
        peak = make("div", "class=peak")
        clouds = createClouds(10)
    
    insert(sky, peak)
    scatterClouds(sky, clouds)

}


main()
