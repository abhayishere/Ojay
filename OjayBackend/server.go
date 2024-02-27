package main

import (
	"fmt"
	"net/http"
	"ojay/controller"

	"github.com/gorilla/mux"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/problems", controller.GetProblems).Methods("GET")
	router.HandleFunc("/posts", controller.GetPosts).Methods("GET")

	fmt.Println("Server listening on port 8080...")
	http.ListenAndServe(":8080", router)
}
