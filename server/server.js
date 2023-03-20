const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()


app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000", "https://to-do-app-mern-stack.onrender.com" ]
}))


mongoose.connect('mongodb+srv://todomern:Jacobjames0304@todo.pteecks.mongodb.net/ToDoAppMERN?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch(console.error)

const Todo = require('./models/Todo')

app.get('/todos', async (req, res) => {
    const todos = await Todo.find()

    res.json(todos)
})
//get checked with postman and working

app.post('/todo/new', async (req, res) => {
        const todo = await new Todo({
            text: req.body.text
        })
        todo.save()

        res.json(todo)
})
//post checked with postman and working

app.delete('/todo/delete/:id',  async (req, res) => {
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})
//delete checked with postman and working

app.get('/todo/complete/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    todo.complete = !todo.complete;
    todo.save();
    res.json(todo);
})
//todo changed to complete on postman

app.put('/todo/update/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id)
    todo.text = req.body.text;
    todo.save()
    res.json(todo)
})


app.listen(3002, () => console.log('Server started on port 3002'))