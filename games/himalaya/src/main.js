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

const scatterClouds = (distantCloudsDiv, closeCloudsDiv, clouds) => {
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
      insert(distantCloudsDiv, cloudDiv)
    } else {
      insert(closeCloudsDiv, cloudDiv)
    }

  }
}

const scatterStars = (starsDiv) => {
  for (let i=0; i<100; i++){
    const star = make("div", "class=star")
    star.style.left = `${rand(5, 90)}%`
    star.style.top = `${rand(5, 80)}%`
    insert(starsDiv, star)
  }

  for (let i=0; i<10; i++) {
    const star = make("div", "class=shiningStar")
    star.style.left = `${rand(5, 90)}%`
    star.style.top = `${rand(5, 80)}%`
    star.style.animationDuration = `${rand(5, 20)}s`
    star.style.animationDelay = `1.${i}s`
    insert(starsDiv, star)
  }
}


// ACTIONS
// ================================================================================

const addCloud = () => {
  const
    clouds = createClouds(1),
    distantCloudsDiv = get("distantCloudsDiv"),
    closeCloudsDiv = get("closeCloudsDiv")

  if (getClass("cloud").length !== 10) {
    scatterClouds(distantCloudsDiv, closeCloudsDiv, clouds)
    get("click").play()
  }
}

const removeCloud = (cloudDiv) => {
  cloudDiv.remove()
  get("click").play()
}

const testOutcome = (statueDiv, cloudSpawnScreen, countNumber) => {
  const clouds = getClass("cloud")
  
  if (clouds.length === countNumber) {

    get("eyes").hidden = false
    get("win").play()
    get("numberDiv").innerHTML = ""

    statueDiv.onclick = null
    statueDiv.style.cursor = "default"
    cloudSpawnScreen.onclick = null
    cloudSpawnScreen.style.cursor = "default"

    for (const cloud of clouds) {
      cloud.onclick = null
      cloud.style.cursor = "default"
    }

  } else {
    get("fail").play()
  }

}


// BUTTONS
// ================================================================================

const start = () => {
  get("music").play()
  get("eyes").hidden = true

  const
    starsDiv = get("starsDiv"),
    distantCloudsDiv = get("distantCloudsDiv"),
    closeCloudsDiv = get("closeCloudsDiv"),
    cloudSpawnScreen = get("cloudSpawnScreen"),
    statueDiv = get("statueDiv")
    countNumber = rand(0, 9)

  clear(starsDiv, distantCloudsDiv, closeCloudsDiv)
  scatterStars(starsDiv)
  get("numberDiv").innerHTML = countNumber
  cloudSpawnScreen.onclick = addCloud
  cloudSpawnScreen.style.cursor = "pointer"
  statueDiv.onclick = () => { testOutcome(statueDiv, cloudSpawnScreen, countNumber) }
  statueDiv.style.cursor = "pointer"
}

const mute = (button) => {
  const music = get("music")
    if (button.id === "mute") {
      music.muted = false
      button.id = ""
    } else {
      music.muted = true
      button.id = "mute"
    }
}

const exit = () => {
  window.location.href = "/"
}


// ON PAGE LOAD
// ================================================================================

const main = () => {
  scatterStars(get("starsDiv"))
}


main()
