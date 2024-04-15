import { WebSocketServer } from 'ws'
import ejs from 'ejs'
import { db, getAllTodos } from './db.js'
/** @type {Set<WebSocket>} */
export const connections = new Set();
export const createWebSocketServer = (server) => {
    const wss = new WebSocketServer({ server })
  
    wss.on('connection', (ws) => {
      connections.add(ws)
  
      console.log('New connection', connections.size)
  
      ws.on('close', () => {
        connections.delete(ws)
  
        console.log('Closed connection', connections.size)
      })
     
    })
    
  }
  export const sendTodosToAllConnections = async () => {
    const todos = await db('todos').select('*')
  
    const html = await ejs.renderFile('views/_todos.ejs', {
      todos,
    })
  
    for (const connection of connections) {
      const message = {
        type: 'todos',
        html,
      }
  
          
      const json = JSON.stringify(message)
  
      connection.send(json)
    }
  }
  export const sendTodoDetail = async (todoId) => {
    const todo = await db('todos').select('*').where('id', todoId).first();
    if (!todo) {
      console.log('Todo not found');
      return;
    }
    const html = await ejs.renderFile('views/_todo_detail.ejs', { todo });
  
    const message = {
      type: 'todoDetail',
      html,
      todoId: todo.id,
    };
  
    const json = JSON.stringify(message);
  
    for (const connection of connections) {
      connection.send(json);
    }
    
  };
  export const deleteTodo = async (todo,res) => {
  await db('todos').delete().where('id', todo.id)
  sendTodosToAllConnections()
  const message = JSON.stringify({ type: 'todoDeleted', todoId: todo.id });
  connections.forEach(connection => connection.send(message));
  res.redirect('/')
  }
  