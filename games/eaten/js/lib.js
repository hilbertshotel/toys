"use strict";
// LIB
const audio = () => {
    return document.getElementById("audio");
};
const get = (id) => {
    return document.getElementById(id);
};
const make = (type) => {
    return document.createElement(type);
};
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
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
