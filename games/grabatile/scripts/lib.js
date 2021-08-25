"use strict"

// GET
let get = (id) => {
    return document.getElementById(id)
}

// INSERT
let insert = (parent, ...elements) => {
    for (let element of elements) {
        parent.append(element)
    }
}

// MAKE
let MAKEOBJECT = {
    class: (element, name) => { element.className = name },
    id: (element, id) => { element.id = id },
    text: (element, text) => { element.innerHTML = text },
}

let make = (type, ...properties) => {
    let element = document.createElement(type)

    for (let property of properties) {
        let [key, value] = property.split("=")
        MAKEOBJECT[key](element, value)
    }

    return element
}

// SLEEP
let sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

// SHUFFLE
let shuffle = (array) => {
    for (let i=array.length-1; i>0; i--) {
        let rand = Math.floor(Math.random() * (i+1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

// RANDOM
let random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}
