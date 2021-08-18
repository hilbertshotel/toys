"use strict";
// FUNCTION LIBRARY
const get = (id) => {
    return document.getElementById(id);
};
const make = (type, className, id, text) => {
    const element = document.createElement(type);
    element.className = className;
    element.id = id;
    element.innerHTML = text;
    return element;
};
const addAudio = (src, id) => {
    const element = document.createElement("audio");
    element.src = src;
    element.id = id;
    document.body.appendChild(element);
};
const getAudio = (id) => {
    return document.getElementById(id);
};
const playNextNumber = (nextNumber) => {
    let n = "";
    if (nextNumber === 1) {
        n = "one";
    }
    else if (nextNumber === 2) {
        n = "two";
    }
    else if (nextNumber === 3) {
        n = "three";
    }
    else if (nextNumber === 4) {
        n = "four";
    }
    else if (nextNumber === 5) {
        n = "five";
    }
    else if (nextNumber === 6) {
        n = "six";
    }
    else if (nextNumber === 7) {
        n = "seven";
    }
    else if (nextNumber === 8) {
        n = "eight";
    }
    else if (nextNumber === 9) {
        n = "nine";
    }
    else if (nextNumber === 10) {
        n = "ten";
    }
    getAudio(n).play();
};
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
};
const isNumber = (str) => {
    return "12345678910".includes(str);
};
