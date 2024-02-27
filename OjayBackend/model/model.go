package models

// Problem represents a single problem in the list
type Problem struct {
	ID         int    `json:"id"`
	Name       string `json:"name"`
	Difficulty string `json:"difficulty"`
	NumSolved  int    `json:"numSolved"`
	Solved     bool   `json:"solved"`
}

type Post struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Description string `json:"content"`
	DatePosted  string `json:"datePosted"`
}
