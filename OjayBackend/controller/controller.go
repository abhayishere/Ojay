// controller/controller.go
package controller

import (
	"encoding/json"
	"fmt"
	"net/http"
	models "ojay/model"
)

func GetProblems(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("http://localhost:3001/problems")
	if err != nil {
		http.Error(w, "Failed to fetch problems", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	var problems []models.Problem
	// fmt.Println(json.NewDecoder(resp.Body).Decode(&problems))
	if err := json.NewDecoder(resp.Body).Decode(&problems); err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to decode problems data", http.StatusInternalServerError)
		return
	}
	fmt.Println(problems)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate") // Prevent caching
	json.NewEncoder(w).Encode(problems)
}
func GetPosts(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("http://localhost:3001/posts")
	if err != nil {
		http.Error(w, "Failed to fetch problems", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	var posts []models.Post
	// fmt.Println(json.NewDecoder(resp.Body).Decode(&posts))
	if err := json.NewDecoder(resp.Body).Decode(&posts); err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to decode problems data", http.StatusInternalServerError)
		return
	}

	fmt.Println(posts)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate") // Prevent caching
	json.NewEncoder(w).Encode(posts)
}
