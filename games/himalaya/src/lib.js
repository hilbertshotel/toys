// GET
const get = (id) => {
  return document.getElementById(id)
}

// CLASS
const getClass = (name, pos=-1) => {
  const c = document.getElementsByClassName(name)
  if (pos < 0) {
      return c
  } else {
      return c[pos]
  }
}

// MAKE
const MAKEOBJECT = {
  class: (e, v) => { e.className = v },
  id: (e, v) => { e.id = v },
  text: (e, v) => { e.innerHTML = v }
}

const make = (type, ...properties) => {
  const element = document.createElement(type)
  for (const property of properties) {
    const [p1, p2] = property.split("=")
    MAKEOBJECT[p1](element, p2)
  }
  return element
}

// SLEEP
const sleep = (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// RAND
const rand = (min, max) => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1) + min)
}

// INSERT
const insert = (parent, ...elements) => {
  for (const element of elements) {
    parent.append(element)
  }
}

// CLEAR
const clear = (...elements) => {
  for (const element of elements) {
    element.innerHTML = ""
  }
}

// SHUFFLE
const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    let rand = Math.floor(Math.random() * (i + 1));
    [array[i], array[rand]] = [array[rand], array[i]]
  }
}