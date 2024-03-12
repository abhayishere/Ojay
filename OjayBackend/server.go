package main

import (
	"fmt"
	"net/http"
	"ojay/controller"

	"github.com/gorilla/mux"

	"github.com/gorilla/handlers"
)

func main() {
	router := mux.NewRouter()
	router.HandleFunc("/problems", controller.GetProblems).Methods("GET")
	router.HandleFunc("/posts", controller.GetPosts).Methods("GET")
	router.HandleFunc("/login", controller.Login).Methods("POST")
	router.HandleFunc("/problems/{problemid}", controller.GetProblemByID).Methods("GET")
	router.HandleFunc("/run", controller.RunCode).Methods("POST")
	router.HandleFunc("/{username}", controller.GetUserByUsername).Methods("GET")
	router.HandleFunc("/posts/{postId}", controller.GetPostByPostId).Methods("GET")
	router.HandleFunc("/submissions/{username}", controller.GetSubmissionsByUsername).Methods("GET")

	fmt.Println("Server listening on port 8080...")
	http.ListenAndServe(":8080", handlers.CORS(
		handlers.AllowedOrigins([]string{"*"}),
		handlers.AllowedMethods([]string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}),
		handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
	)(router))
}
