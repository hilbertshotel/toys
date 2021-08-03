package routes

import (
	"net/http"
)

func Mux() *http.ServeMux {

	mux := http.NewServeMux()
	
	main := http.FileServer(http.Dir("games/menu/"))
	mux.Handle("/", main)

	counting := http.StripPrefix("/eaten/", http.FileServer(http.Dir("games/eaten/")))
	mux.Handle("/eaten/", counting)

	mux.Handle("/toys.log", http.FileServer(http.Dir("logs/")))

	return mux
}