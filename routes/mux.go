package routes

import (
	"net/http"
)

func Mux() *http.ServeMux {

	mux := http.NewServeMux()
	
	main := http.FileServer(http.Dir("games/menu/"))
	mux.Handle("/", main)

	counting := http.StripPrefix("/counting/", http.FileServer(http.Dir("games/counting/")))
	mux.Handle("/counting/", counting)

	mux.Handle("/toys.log", http.FileServer(http.Dir("logs/")))

	return mux
}