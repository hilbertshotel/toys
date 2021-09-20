package routes

import (
	"log"
	"net/http"
	"io/ioutil"
)

const DIR = "./games"

func Mux(log *log.Logger) *http.ServeMux {

	mux := http.NewServeMux()
	
	// index page
	main := http.FileServer(http.Dir("frontend/"))
	mux.Handle("/", main)

	// dynamically add routes based on folder names
	folders, err := ioutil.ReadDir(DIR)
	if err != nil {
		log.Println("ERROR:", err)
	}

	for _, folder := range folders {
		name := "/" + folder.Name() + "/"
		mux.Handle(name, http.StripPrefix(name, http.FileServer(http.Dir(DIR + name))))
	}

	// logs
	mux.Handle("/toys.log", http.FileServer(http.Dir("logs/")))

	return mux
}