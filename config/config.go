package config

import (
	"os"
	"time"
	"encoding/json"
)

type Config struct {
	HostAddr string
	ReadTimeout time.Duration
	WriteTimeout time.Duration
}


func New() *Config {
	return &Config{
		HostAddr: "127.0.0.1:8888",
		ReadTimeout: time.Second * 10,
		WriteTimeout: time.Second * 10,
	}
}


func (cfg *Config) Parse() error {
	file, err := os.Open("config/config.json")
	if err != nil {
		return err
	}
	defer file.Close()

	decoder := json.NewDecoder(file)
	if err := decoder.Decode(&cfg); err != nil {
		return err 
	}

	return nil
}