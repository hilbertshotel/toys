package main

import (
	"fmt"
	"log"
	"os"
	"os/signal"
	"syscall"
	"net/http"

	"toys/config"
	"toys/routes"
)

func main() {

	fmt.Println()
	log.Println("SERVICE START")

	// Logging
	// ==================================================

	log := log.New(os.Stdout, "", log.Ldate|log.Ltime|log.Lshortfile)
	log.Println("logging initiated")

	
	// Config
	// ==================================================

	cfg := config.New()

	if err := cfg.Parse(); err != nil {
		log.Println("ERROR:", err)
		log.Println("config parsing failed: loading default values")
	} else {
		log.Println("config initiated")
	}


	// Channels
	// ==================================================

	shutdown := make(chan os.Signal, 1)
	signal.Notify(shutdown, os.Interrupt, syscall.SIGTERM)

	serverError := make(chan error, 1)

	log.Println("channels initiated")


	// Api
	// ==================================================
	
	api := http.Server{
		Addr: cfg.HostAddr,
		Handler: routes.Mux(),
		ReadTimeout: cfg.ReadTimeout,
		WriteTimeout: cfg.WriteTimeout,
	}

	log.Println("api initiated")


	// Server
	// ==================================================

	go func() {
		log.Println("service listening on:", cfg.HostAddr)
		serverError <- api.ListenAndServe()
	}()


	// Shutdown
	// ==================================================

	select {

	case <-shutdown:
		log.Println("SHUTDOWN initiated")
		log.Println("SERVICE STOP\n")

	case err := <-serverError:
		log.Println("ERROR:", err)
		log.Println("SERVICE STOP\n")
	}

}