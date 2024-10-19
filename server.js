const express = require('express')
const app = express()
const port = 3000
// const fetch = require('node-fetch')

// import fetch from 'node-fetch'

//middle ware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let person = {
  name: 'Zach',
  age: 24,
  hair: 'Blonde'
}

let todos = [
  {
    id: 1,
    task: 'Do the dishes',
    completed: false,
    category: 'Housework'
  },
  {
    id: 2,
    task: 'Walk the dog',
    completed: true,
    category: 'Pet Care'
  },
  {
    id: 3,
    task: 'Buy groceries',
    completed: false,
    category: 'Shopping'
  }
]

app.get('/api/todos', (req, res) => {
  res.send(todos)
})

app.post('/api/todos', (req, res) => {
  // modify the todos array to add a new todo

  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    category: req.body.category,
    completed: false
  }

  todos.push(newTodo)
  res.send(todos)

})

app.delete('/api/todos', (req, res) => {

  // modify the todos array to delete a todo with the id provided in the request body
  const id = req.body.id
  todos = todos.filter(todo => todo.id !== id)
  res.send(todos)
})

app.put('/api/todos', (req, res) => {
  // modify the todos array to update a todo with the id provided in the request body
  const id = req.body.id
  const updatedTask = req.body.task
  const updatedCompleted = req.body.completed
  const updatedCategory = req.body.category

  todos = todos.map(todo => {
    if (todo.id === id) {
      todo.task = updatedTask
      todo.completed = updatedCompleted
      todo.category = updatedCategory
    }
    return todo
  })

  res.send(todos)
})


app.get('/api/todos/category', (req, res) => {
  // return all todos with the category provided in the request params
  category = todos.filter(todo => todo.category === req.query.category)
  res.send(category)
  })

app.get('/api/todos/categories', (req, res) => {
  // return all categories of todos
  categories = todos.map(todo => todo.category)
  res.send(categories)
})

app.post('/api/todos/categories', (req, res) => {

  categories = todos.map(todo => todo.category)
  if (categories.includes(req.body.category)) {
    res.send('Category already exists')
  } else {
    categories.push(req.body.category)
    res.send(categories)
  }
})

app.put('/api/todos/categories', (req, res) => {
  // modify the todos array to update a category with the new category
  const category = req.body.category
  const updatedCategory = req.body.updatedCategory

  todos = todos.map(todo => {
    if (todo.category === category) {
      todo.category = updatedCategory
    }
    return todo
  })
  res.send(todos)
  console.log(todos)
  res.send('Category updated')
})


app.get('/home', (req, res) => {
  res.send('Hello World, Welcome to the home page!')
})

app.post('/person', (req, res) => {
  res.send(person)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
