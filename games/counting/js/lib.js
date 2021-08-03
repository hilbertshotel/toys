"use strict";
// GET ELEMENT BY ID
const get = (id) => {
    return document.getElementById(id);
};
// CREATE ELEMENT
const make = (type) => {
    return document.createElement(type);
};
// APPEND CHILD
const insert = (element, elements) => {
    for (const e of elements) {
        element.appendChild(e);
    }
};
// INCREMENT "tile-1" TO "tile-2"
const increment = (id) => {
    return `tile-${parseInt(id.split("-")[1]) + 1}`;
};
