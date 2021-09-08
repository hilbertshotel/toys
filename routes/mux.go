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

	grabatile := http.StripPrefix("/grabatile/", http.FileServer(http.Dir("games/grabatile/")))
	mux.Handle("/grabatile/", grabatile)

	asd := http.StripPrefix("/patterns/", http.FileServer(http.Dir("games/patterns/")))
	mux.Handle("/patterns/", asd)

	mux.Handle("/toys.log", http.FileServer(http.Dir("logs/")))

	return mux
}