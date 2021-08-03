// GET ELEMENT BY ID
const get = (id: string):HTMLElement => {
    return document.getElementById(id)!
}

// CREATE ELEMENT
const make = (type: string): HTMLElement => {
    return document.createElement(type)
}

// APPEND CHILD
const insert = (element: HTMLElement, elements: HTMLElement[]) => {
    for (const e of elements) {
        element.appendChild(e)
    }
}

// IS NUMBER
const isNumber = (n: string): boolean => {
    return "12345678910".includes(n)
}
