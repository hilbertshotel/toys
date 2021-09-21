// GLOBALS
// ================================================================================

let NEXT_NUMBER = 0


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


// DOM
// ================================================================================

const newCloudDiv = (cloudNumber) => {
  const
    cloudDiv = make("div", "class=cloud" ,`id=${cloudNumber}`),
    cleft = make("div", "class=cloudling", "id=cleft"),
    cbottom = make("div", "class=cloudling", "id=cbottom"),
    cright = make("div", "class=cloudling", "id=cright"),
    ctop = make("div", "class=cloudling", "id=ctop")
    number = make("div", "class=number", `id=n${cloudNumber}`, `text=${cloudDiv.id}`)

  insert(cloudDiv, number, cleft, cbottom, cright, ctop)
  return cloudDiv
}


const scatterClouds = (sky, clouds) => {
  for (const [i, cloud] of clouds.entries()) {

    const cloudDiv = newCloudDiv(i)
    cloudDiv.onclick = () => { action(cloudDiv) }

    cloudDiv.style.top = cloud.top
    cloudDiv.style.left = cloud.left
    cloudDiv.style.animationName = cloud.nameAnim
    cloudDiv.style.animationDuration = cloud.durAnim

    if (cloud.pos === 0) {
      cloudDiv.style.width = "15%"
      cloudDiv.style.height = "10%"
      insertAtStart(sky, cloudDiv)

      // handle smaller font size in back clouds
      const currentNumber = get(`n${i}`)
      currentNumber.style.fontSize = "4.3vh"
      currentNumber.style.top = "-35%"
      currentNumber.style.left = "35%"
    }
    
    else {
      insert(sky, cloudDiv)
    }

  }
}


const scatterStars = (sky, n) => {
  for (let i=0; i<n; i++) {
    const star = make("div", "class=star")
    star.style.left = `${rand(5, 90)}%`
    star.style.top = `${rand(5, 50)}%`
    star.style.animationDelay = `${i}s`
    insertAtStart(sky, star)
  }
}


const action = async (cloudDiv) => {
  
  if (cloudDiv.id === `${NEXT_NUMBER}`) {

    cloudDiv.remove()
    // playRemoveSound
    NEXT_NUMBER++

    if (NEXT_NUMBER === 10) {
      NEXT_NUMBER = 0
      await sleep(100)
      get("main").onclick = start
      // play completion sound
    }

  }

  else {
    // playWrongSound
  }
  
}


// ON PAGE LOAD
// ================================================================================

const start = () => {
  const
    main = get("main"),
    sky = get("sky"),
    peak = make("div", "class=peak"),
    clouds = createClouds(10)
  
  main.onclick = null
  clear(sky)
  insert(sky, peak)
  scatterClouds(sky, clouds)
  scatterStars(sky, 10)
}


const main = () => {
  const
    main = get("main"),
    sky = get("sky"),
    peak = make("div", "class=peak")

  main.onclick = start
  insert(sky, peak)
  scatterStars(sky, 10)
}


main()
