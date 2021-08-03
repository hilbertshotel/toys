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
// IS NUMBER
const isNum = (n) => {
    return "12345678910".includes(n);
};
