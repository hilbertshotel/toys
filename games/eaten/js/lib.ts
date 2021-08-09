// LIB
const audio = (): HTMLAudioElement => {
    return <HTMLAudioElement>document.getElementById("audio")!
}

const get = (id: string):HTMLElement => {
    return document.getElementById(id)!
}

const make = (type: string): HTMLElement => {
    return document.createElement(type)
}

const sleep = (ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const shuffle = (array: string[]) => {
    for (let i = array.length - 1; i > 0; i--) {
        let rand = Math.floor(Math.random() * (i + 1));
        [array[i], array[rand]] = [array[rand], array[i]]
    }
}

const isNumber = (str: string) => {
    return "12345678910".includes(str)
}

// INTEFACES
interface Numbers {
    [key: string]: string
}

interface Tile {
    type: string,
    id: string,
}