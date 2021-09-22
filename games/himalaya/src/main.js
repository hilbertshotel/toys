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
    const
      randTop = rand(5, 70),
      randLeft = rand(0, 70)
      
    const cloud = {
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


// DOM HANDLING
// ================================================================================

const newCloudDiv = (cloudNumber) => {
  const
    cloudDiv = make("div", "class=cloud" ,`id=${cloudNumber}`),
    cleft = make("div", "class=cloudling", "id=cleft"),
    cbottom = make("div", "class=cloudling", "id=cbottom"),
    cright = make("div", "class=cloudling", "id=cright"),
    ctop = make("div", "class=cloudling", "id=ctop")

  insert(cloudDiv, cleft, cbottom, cright, ctop)
  return cloudDiv
}

const scatterClouds = (backDiv, frontDiv, clouds) => {
  for (const [i, cloud] of clouds.entries()) {

    const cloudDiv = newCloudDiv(i)
    cloudDiv.onclick = () => { removeCloud(cloudDiv) }
    cloudDiv.style.cursor = "pointer"

    cloudDiv.style.top = cloud.top
    cloudDiv.style.left = cloud.left
    cloudDiv.style.animationName = cloud.nameAnim
    cloudDiv.style.animationDuration = cloud.durAnim

    if (cloud.pos === 0) {
      cloudDiv.style.width = "15%"
      cloudDiv.style.height = "10%"
      insert(backDiv, cloudDiv)
    } else {
      insert(frontDiv, cloudDiv)
    }

  }
}

const scatterWhiteStars = (starsDiv) => {
  for (let i=0; i<100; i++){
    const star = make("div", "class=whiteStar")
    star.style.left = `${rand(5, 90)}%`
    star.style.top = `${rand(5, 80)}%`
    insert(starsDiv, star)
  }
}

const scatterStars = async (starsDiv) => {
  let leftPositions = [
    [5, 8], [10, 13], [15, 18], [20, 23], [25, 30],
    [70, 73], [75, 78], [80, 83], [85, 88], [90, 93],
  ]
  shuffle(leftPositions)

  const numOfStars = rand(1, 10)

  for (let i=0; i<numOfStars; i++) {
    const star = make("div", "class=star")
    star.style.left = `${rand(leftPositions[i][0], leftPositions[i][1])}%`
    star.style.top = `${rand(5, 40)}%`
    insert(starsDiv, star)
    
    await sleep(100)
  }

  return numOfStars
}


// ACTIONS
// ================================================================================

const addCloud = () => {
  const
    clouds = createClouds(1),
    backDiv = get("backCloudsDiv"),
    frontDiv = get("frontCloudsDiv")

  if (getClass("cloud").length !== 10) {
    scatterClouds(backDiv, frontDiv, clouds)
    // play add cloud
  }
}

const removeCloud = (cloudDiv) => {
  cloudDiv.remove()
  // playRemoveSound
}

const testOutcome = (statue, spawnScreen, numOfStars) => {
  const clouds = getClass("cloud")
  if (clouds.length === numOfStars) {

    get("eyes").hidden = false

    // play completion sound
    statue.onclick = null
    statue.style.cursor = "default"
    spawnScreen.onclick = null
    spawnScreen.style.cursor = "default"

    for (const cloud of clouds) {
      cloud.onclick = null
      cloud.style.cursor = "default"
    }

  } else {
    // play fail sound
  }

}


// BUTTONS
// ================================================================================

const start = async () => {
  // start music
  get("eyes").hidden = true

  const
    starsDiv = get("starsDiv"),
    backDiv = get("backCloudsDiv"),
    frontDiv = get("frontCloudsDiv"),
    spawnScreen = get("spawnScreen"),
    statue = get("statue")

  clear(starsDiv, backDiv, frontDiv)
  let numOfStars = await scatterStars(starsDiv)

  spawnScreen.onclick = addCloud
  spawnScreen.style.cursor = "pointer"
  statue.onclick = () => { testOutcome(statue, spawnScreen, numOfStars) }
  statue.style.cursor = "pointer"
}

const mute = () => {
  // ADD FUNCTIONALITY
}

const exit = () => {
  window.location.href = "/"
}


// ON PAGE LOAD
// ================================================================================

const main = () => {
  scatterWhiteStars(get("whiteStarsDiv"))
}


main()
