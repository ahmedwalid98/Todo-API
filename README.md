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

## Todo

| end point | method | action                           |
| --------- | ------ | -------------------------------- |
| /:id/todo | POST   | create todo in specific todolist |
| /:id/todo | GET    | get all todo in todo list        |
| /todo/:id | GET    | get todo with specific id        |
| /todo/:id | DELETE | DELETE Todo                      |
| /todo/:id | PUT    | Update todo                      |

## How to run

- Clone the repo
- npm i
- Add .env file with the variables mentioned in .env.sample
- npm start

## Postman Collection

- Postman collection is available at public/docs directory
