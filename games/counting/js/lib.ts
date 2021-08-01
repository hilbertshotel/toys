const getById = (id: string): HTMLElement => {
    return document.getElementById(id)!
} 

const make = (type: string): HTMLElement => {
    return document.createElement(type)

}

const insertInto = (element: HTMLElement, elements: HTMLElement[]) => {
    for (const e of elements) {
        element.appendChild(e)
    }
}