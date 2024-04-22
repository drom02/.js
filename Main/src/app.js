import express from 'express'
import knex from 'knex'
import knexfile from '../knexfile.js'
import  { db,getAllTodos } from './db.js'
import { createWebSocketServer, sendTodosToAllConnections,connections, sendTodoDetail,deleteTodo } from './websockets.js'
const port = 3000;
export const app = express();
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
  console.log('Incomming request', req.method, req.url)
  next()
})

app.get('/', async (req, res) => {
  const todos = await db().select('*').from('todos')

  res.render('index', {
    title: 'Todos',
    todos,
  })
})
//Get details
app.get('/todo/:id', async (req, res, next) => {
  const todo = await db('todos').select('*').where('id', req.params.id).first()

  if (!todo) return next()

  res.render('todo-detail', {
    todo,
  })
})
//Add todo
app.post('/add-todo', async (req, res) => {
  const todo = {
    title: req.body.title,
    done: false,
    priority: req.body.priority, // Default priority
};

  await db('todos').insert(todo)
  sendTodosToAllConnections()
  res.redirect('/')
})
//Update
app.post('/update-todo/:id', async (req, res, next) => {
  const todo = await db('todos').select('*').where('id', req.params.id).first()

  if (!todo) return next()

  await db('todos').update({ title: req.body.title,priority: req.body.priority, }).where('id', todo.id)
  sendTodosToAllConnections()
  sendTodoDetail(todo.id);
  res.redirect('back')
})
//Remove
app.get('/remove-todo/:id', async (req, res,next) => {
  const todo = await db('todos').select('*').where('id', req.params.id).first()
  if (!todo) return next();
  deleteTodo(todo,res);
  res.redirect('/')
})
//Change state
app.get('/toggle-todo/:id', async (req, res, next) => {
  const todo = await db('todos').select('*').where('id', req.params.id).first()

  if (!todo) return next()

  await db('todos').update({ done: !todo.done }).where('id', todo.id)
  sendTodosToAllConnections()
  sendTodoDetail(todo.id);
  res.redirect('back')
})
//Error
app.use((req, res) => {
  res.status(404)
  res.send('404 - Stránka nenalezena')
})
//Error
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500)
  res.send('500 - Chyba na straně serveru')
})

const server = app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})


createWebSocketServer(server)