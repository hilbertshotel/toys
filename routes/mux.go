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

	letter_ladder := http.StripPrefix("/letter_ladder/", http.FileServer(http.Dir("games/letter_ladder/")))
	mux.Handle("/letter_ladder/", letter_ladder)

	mux.Handle("/toys.log", http.FileServer(http.Dir("logs/")))

	return mux
}