const get = (id: string): HTMLElement => {
    return document.getElementById(id)!
}

const make = (type: string, className: string, id: string, text: string): HTMLElement => {
    const newElement = document.createElement(type)
    newElement.className = className
    newElement.id = id
    newElement.innerHTML = text
    return newElement
}