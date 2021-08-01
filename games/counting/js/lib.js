"use strict";
const getById = (id) => {
    return document.getElementById(id);
};
const make = (type) => {
    return document.createElement(type);
};
const insertInto = (element, elements) => {
    for (const e of elements) {
        element.appendChild(e);
    }
};
