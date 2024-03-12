// controller/controller.go
package controller

import (
	"bytes"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	models "ojay/model"
	"os"
	"os/exec"
	"reflect"
	"strings"
)

func GetProblems(w http.ResponseWriter, r *http.Request) {
	resp, err := http.Get("http://localhost:3001/problems")
	if err != nil {
		http.Error(w, "Failed to fetch problems", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	var problems []models.ProblemDetails
	// fmt.Println(json.NewDecoder(resp.Body).Decode(&problems))
	if err := json.NewDecoder(resp.Body).Decode(&problems); err != nil {
		fmt.Println(resp.Body)
		http.Error(w, "Failed to decode problems data", http.StatusInternalServerError)
		return
	}
	fmt.Println(problems)
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate") // Prevent caching
	json.NewEncoder(w).Encode(problems)
}

func GetProblemByID(w http.ResponseWriter, r *http.Request) {
	pathSegments := strings.Split(r.URL.Path, "/")
	fmt.Println("url== ", r.URL.Path)
	if len(pathSegments) < 3 {
		http.Error(w, "Invalid request, problem ID is missing", http.StatusBadRequest)
		return
	}
	problemID := pathSegments[2]
	resp, err := http.Get("http://localhost:3001/problems")
	if err != nil {
		http.Error(w, "Failed to fetch problems", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	var problems []models.ProblemDetails
	if err := json.NewDecoder(resp.Body).Decode(&problems); err != nil {
		http.Error(w, "Failed to decode problems data", http.StatusInternalServerError)
		return
	}
	for _, problem := range problems {
		fmt.Println("problem==", problem)
		if problem.ID == problemID {
			w.Header().Set("Content-Type", "application/json")
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate") // Prevent caching
			json.NewEncoder(w).Encode(problem)
			return
		}
	}
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

type Users []models.User

func fetchUsers() (Users, error) {
	resp, err := http.Get("http://localhost:3001/users")
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, err
	}
	var users Users
	err = json.Unmarshal(body, &users)
	if err != nil {
		return nil, err
	}
	return users, nil
}

func Login(w http.ResponseWriter, r *http.Request) {
	var loginUser models.LoginRequest
	err := json.NewDecoder(r.Body).Decode(&loginUser)
	if err != nil {
		http.Error(w, "Invalid request", http.StatusBadRequest)
		return
	}
	users, err := fetchUsers()
	fmt.Println(users)
	if err != nil {
		http.Error(w, "Failed to fetch users", http.StatusInternalServerError)
		return
	}

	var response models.User
	for _, user := range users {
		if user.Username == loginUser.Username && user.Password == loginUser.Password {
			response = user
			break
		}
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	fmt.Println(response)
	json.NewEncoder(w).Encode(response)
}

func GetUserByUsername(w http.ResponseWriter, r *http.Request) {
	username := r.URL.Path[1:]
	users, err := fetchUsers()
	fmt.Println(users)
	if err != nil {
		http.Error(w, "Failed to fetch users", http.StatusInternalServerError)
		return
	}

	fmt.Println(users)

	for _, user := range users {
		fmt.Println(user.Username)
		if user.Username == username {
			w.Header().Set("Content-Type", "application/json")
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			json.NewEncoder(w).Encode(user)
			return
		}
	}
	http.Error(w, "User not found", http.StatusNotFound)
}
func executeCppCode(cppfilepath, inputFilePath string) (string, error) {
	executablePath := "/Users/abhayishere/Desktop/asa/Ojay/OjayBackend/solutions/solution1"
	compileCmd := exec.Command("g++", cppfilepath, "-o", executablePath)
	if err := compileCmd.Run(); err != nil {
		fmt.Println("failed to compile C++ code: %w", err)
	}

	inputFile, err := os.Open(inputFilePath)
	if err != nil {
		fmt.Println("failed to open input file: %w", err)
	}
	defer inputFile.Close()

	cmd := exec.Command(executablePath)
	cmd.Stdin = inputFile
	var stdout bytes.Buffer
	cmd.Stdout = &stdout
	if err := cmd.Run(); err != nil {
		fmt.Println("error came while running", err)
	}
	fmt.Println(stdout.String())
	os.Remove(executablePath)
	return stdout.String(), nil
}

func RunCode(w http.ResponseWriter, r *http.Request) {
	var response models.Payload
	err := json.NewDecoder(r.Body).Decode(&response)
	if err != nil {
		fmt.Println("Unuccessfully executed the code")
		return
	}
	payloadCode := response.Code
	// problemId := response.ProblemId,

	// create cpp file for the received code
	cppFile, err := os.Create("/Users/abhayishere/Desktop/asa/Ojay/OjayBackend/solutions/received_code.cpp")
	if err != nil {
		fmt.Println("Failed to create the file")
		return
	}
	defer cppFile.Close()

	if _, err := cppFile.WriteString(payloadCode); err != nil {
		fmt.Println("Failed to write to the file")
		return
	}

	//create the input file with the test cases from the problems input data
	var got_outputs []string
	var want_outputs []string

	resp, err := http.Get(`http://localhost:3001/problems/` + response.ProblemId)
	if err != nil {
		http.Error(w, "Failed to fetch problems", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	var problem models.ProblemDetails
	err = json.NewDecoder(resp.Body).Decode(&problem)
	if err != nil {
		fmt.Println("Unuccessfully executed the code")
		return
	}
	var verdicts []models.Verdict
	for i, op := range problem.SampleTCs {
		file, err := os.Create("/Users/abhayishere/Desktop/asa/Ojay/OjayBackend/solutions/input1.txt")
		if err != nil {
			fmt.Println("Failed to create the file")
			return
		}
		for _, inputLine := range op.Input {
			if _, err := file.WriteString(inputLine); err != nil {
				fmt.Printf("Error writing to file: %v\n", err)
				file.Close()
				return
			}
		}
		got_output, err := executeCppCode("/Users/abhayishere/Desktop/asa/Ojay/OjayBackend/solutions/received_code.cpp", "/Users/abhayishere/Desktop/asa/Ojay/OjayBackend/solutions/input1.txt")
		if err != nil {
			fmt.Println("received code didnt run")
		}
		got_outputs = append(got_outputs, got_output)
		want_output := strings.Join(op.Output, "\n")
		if reflect.DeepEqual(got_output, want_output) {
			verdicts = append(verdicts, models.Verdict{i+1, "Passed"})
		} else {
			verdicts = append(verdicts, models.Verdict{i+1, "Failed"})
		}
		// os.Remove("/Users/abhayishere/Desktop/asa/Ojay/OjayBackend/solutions/received_code.cpp")
	}

	fmt.Println("got outputs========>", got_outputs)
	fmt.Println("want outputs========>", want_outputs)
	// IMPLEMENTATION FOR HIDDEN TEST CASES

	result := "Correct Answer"
	for _, verdict := range verdicts {
		if verdict.Verdict == "Failed" {
			result = "Incorrect"
		}
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type,access-control-allow-origin, access-control-allow-headers")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")

	submission := models.Submission{
		Username:  response.Username,
		ProblemID: response.ProblemId,
		Code:      payloadCode,
		Verdict:   result,
		Language:  "cpp",
	}
	postSubmission(submission)
	fmt.Println(verdicts)
	json.NewEncoder(w).Encode(map[string][]models.Verdict{
		"output": verdicts,
	})
}
func postSubmission(submission models.Submission) error {

	fmt.Println("Submission function enter")
	submissionJSON, err := json.Marshal(submission)
	if err != nil {
		fmt.Println("failed to marshal submission:")
	}
	resp, err := http.Post("http://localhost:3001/submissions", "application/json", bytes.NewBuffer(submissionJSON))
	if err != nil {
		fmt.Println("failed to post submission")
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusCreated {
		fmt.Println("received non-201 status code")
	}
	fmt.Println("Submission added successdully")
	return nil
}

func GetPostByPostId(w http.ResponseWriter, r *http.Request) {
	pathSegments := strings.Split(r.URL.Path, "/")
	fmt.Println("url== ", r.URL.Path)
	if len(pathSegments) < 3 {
		http.Error(w, "Invalid request, problem ID is missing", http.StatusBadRequest)
		return
	}
	postId := pathSegments[2]
	url := fmt.Sprintf("http://localhost:3001/posts/%s", postId)
	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Failed to fetch problems", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	var posts models.Post
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
func GetSubmissionsByUsername(w http.ResponseWriter, r *http.Request) {
	pathSegments := strings.Split(r.URL.Path, "/")
	fmt.Println("url== ", r.URL.Path)
	if len(pathSegments) < 3 {
		http.Error(w, "Invalid request, problem ID is missing", http.StatusBadRequest)
		return
	}
	username := pathSegments[2]
	resp, err := http.Get("http://localhost:3001/submissions")
	if err != nil {
		http.Error(w, "Failed to fetch problems", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()
	var submissions []models.Submission
	if err := json.NewDecoder(resp.Body).Decode(&submissions); err != nil {
		fmt.Println(err)
		http.Error(w, "Failed to decode problems data", http.StatusInternalServerError)
		return
	}

	var userSubmissions []models.Submission
	for _, sub := range submissions {
		if sub.Username == username {
			userSubmissions = append(userSubmissions, sub)
		}
	}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Cache-Control", "no-cache, no-store, must-revalidate") // Prevent caching
	json.NewEncoder(w).Encode(userSubmissions)
}

// #include<iostream>
// using namespace std;

// int main(){
//   int n;
//   cin>>n;
//   int nums[n];
//   for(int i=0;i<n;i++)cin>>nums[i];
//   int maxIdx = nums[0];
//   for (int i = 0; i < n; ++i) {
//       if (maxIdx >= n - 1){
//         cout<<"true";
//         return 0;
//       }

//       if (nums[i] == 0 and maxIdx == i){
//         cout<<"false";
//         return 0;
//       }

//       if (i + nums[i] > maxIdx) maxIdx = i + nums[i];
//   }
//   cout<<"true";
//   return 0;
// }
