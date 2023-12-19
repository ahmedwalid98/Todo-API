# Todo API

### RESTful API for Todo

## User

| end point | method | action                   |
| --------- | ------ | ------------------------ |
| /login    | POST   | login with existing user |
| /sign-up  | POST   | create new user          |
| /me       | GET    | get user profile         |
| /logout   | POST   | log out                  |

## Todo List

| end point     | method | action                         |
| ------------- | ------ | ------------------------------ |
| /todolist     | POST   | create todo list for the user  |
| /todolist     | GET    | get all todo list of the user  |
| /todolist/:id | GET    | get todo list with specific id |
| /todolist/:id | DELETE | DELETE Todo list               |
| /todolist/:id | PUT    | Update todo list               |
