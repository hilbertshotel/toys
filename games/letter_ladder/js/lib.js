"use strict"

const get = (id) => {
    return document.getElementById(id)
}

const make = (type, className, id, text) => {
    const newElement = document.createElement(type)
    newElement.className = className
    newElement.id = id
    newElement.innerHTML = text
    return newElement
}