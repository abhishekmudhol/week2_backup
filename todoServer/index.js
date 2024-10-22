const express = require('express');
const shortid = require('shortid');
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000

const app = express();
app.use(bodyParser.json());

let todos = [{
    id: 1,
    titile : "morning routine",
    description: "do some workout in morning"
}]

app.get('/todos' , (req , res)=>{
    res.status(200).json(todos)
})

app.get('/todos/:id' , (req , res)=>{
    const Id = req.params.id

    for(let i = 0 ; i < todos.length ; i++){
        if(todos[i].id == Id){
            res.status(200).json(todos[i])
        }else{
            res.status(404).send(`Invalid id`)
        }
    }
})

    let idSquence = 1

app.post('/todos' , (req , res)=>{
    const todo = req.body
    idSquence++
    todos.push({id : idSquence,...todo})
    res.status(201).json({
        id : idSquence
    })
    //console.log(todos);
})

app.put('/todos/:id' , (req , res)=>{
    const Id = Number(req.params.id)
    const update = req.body

    const index = todos.findIndex((todo)=>{
        return todo.id === Id
    })
    if(index === -1){
        res.status(404).send(`todo 404 Not Found`)
    }else{
        todos[index] = {...todos[index] , ...update}
        res.status(200).json(todos)
    }

})

app.delete('/todos/:id' , (req , res)=>{
    const Id = Number(req.params.id)
    const index = todos.findIndex((todo)=>{
        return todo.id === Id
    })
    if(index == -1){
        res.status(404).send(`todo 404 Not Found`)
    }else{
        let newTodos = todos.filter((todo)=>{
            return todo.id != Id
        })
        todos = newTodos
        res.status(200).send(`todo with ID ${Id} deleted`)
    }
    console.log(todos);
})

app.all('*' , (req , res)=>{
    res.status(404).send(`ROUTE IS NOT DEFINED`)
})

app.listen(PORT , ()=>{
    console.log(`server is running on port ${PORT}`);
})