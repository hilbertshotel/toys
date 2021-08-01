package main

import (
	"fmt"
	"log"
	"os"
)

func main() {

	fmt.Println()
	log.Println("SERVICE START")

	// Logging
	// ==================================================

	log := log.New(os.Stdout, "", log.Ldate|log.Ltime|log.Lshortfile)
	log.Println("logging initiated")

	

}