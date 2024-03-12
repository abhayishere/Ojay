package models

// Problem represents a single problem in the list

type ProblemDetails struct {
	ID               string      `json:"id"`
	Difficulty       string      `json:"difficulty"`
	Name             string      `json:"name"`
	Hint             string      `json:"hint"`
	ProblemStatement string      `json:"problem_statement"`
	Examples         []Example   `json:"examples"`
	Constraints      []string    `json:"constraints"`
	TimeComplexities []string    `json:"time_complexities"`
	Solved           int         `json:"solved"`
	SampleTCs        []TestCases `json:"sample_test_cases"`
}

type TestCases struct {
	ID     int      `json:"id"`
	Input  []string `json:"input"`
	Output []string `json:"output"`
}

type Example struct {
	ID int    `json:"id"`
	Ex string `json:"example"`
}
type Post struct {
	ID          string `json:"id"`
	Title       string `json:"title"`
	Description string `json:"content"`
	DatePosted  string `json:"datePosted"`
	Author      string `json:"author"`
}
type Payload struct {
	Code      string `json:"code"`
	ProblemId string `json:"problemId"`
	Username  string `json:"username"`
}

type User struct {
	Username         string `json:"username"`
	Password         string `json:"password"`
	Role             string `json:"role"`
	ProblemIdsSolved []int  `json:"problemIdsSolved"`
	PostIds          []int  `json:"postIds"`
	JoinedDate       string `json:"joinedDate"`
}

type LoginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"` // admin or user
}

type LoginResponse struct {
	Username string `json:"username"`
	Token    string `json:"token"`
	Role     string `json:"role"` // admin or user
}

type Submission struct {
	Username  string `json:"username"`
	ProblemID string `json:"problemID"`
	Code      string `json:"code"`
	Verdict   string `json:"verdict"`
	Language  string `json:"language"`
}

type Verdict struct {
	ID      int `json:"id"`
	Verdict string `json:"verdict"`
}
