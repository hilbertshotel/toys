"use strict";
var get = function (id) {
    return document.getElementById(id);
};
var make = function (type, className, id, text) {
    var newElement = document.createElement(type);
    newElement.className = className;
    newElement.id = id;
    newElement.innerHTML = text;
    return newElement;
};
