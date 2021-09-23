const GAMES = {
  1: "/eaten",
  2: "grabatile",
  3: "patterns",
  4: "himalaya",
}

const goto = (n) => {
  window.location.href = GAMES[n]
}