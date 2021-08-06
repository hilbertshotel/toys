"use strict";
// GET ELEMENT BY ID
const get = (id) => {
    return document.getElementById(id);
};
// CREATE ELEMENT
const make = (type) => {
    return document.createElement(type);
};
// SLEEP
const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
};
// RESTART
const restartIn = async (ms) => {
    await sleep(ms);
    location.reload();
};
// SHUFFLE
const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]];
    }
};
