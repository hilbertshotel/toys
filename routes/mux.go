package routes

import (
	"net/http"
)

func Mux() *http.ServeMux {

	mux := http.NewServeMux()
	
	main := http.FileServer(http.Dir("frontend/"))
	mux.Handle("/", main)

	eaten := http.StripPrefix("/eaten/", http.FileServer(http.Dir("games/eaten/")))
	mux.Handle("/eaten/", eaten)

	letter_ladder := http.StripPrefix("/color_grab/", http.FileServer(http.Dir("games/color_grab/")))
	mux.Handle("/color_grab/", letter_ladder)

	mux.Handle("/toys.log", http.FileServer(http.Dir("logs/")))

	return mux
}