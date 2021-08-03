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

// INCREMENT "tile-1" TO "tile-2"
const increment = (id: string): string => {
    return `tile-${ parseInt(id.split("-")[1]) + 1 }`
}
