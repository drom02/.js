import test from 'ava'
import supertest from 'supertest';
import {app} from '../src/app.js';
import  {db} from '../src/db.js'

const testId =1;

test.beforeEach(async () => {
  await db.migrate.latest();
  await prepareDatabase();
})

test.afterEach(async () => {
  await db.migrate.rollback();
})


//Run|Debug
//Todo's are displayed
test.serial('it renders a list of todos' , async (t)=> {const response = await supertest(app).get('/')
t.assert(response.text.includes('<h1>Todos</h1>'))
} );

//State of todo is changed
test.serial('State of todo is changed' , 
async (t)=> {const response = await supertest(app).get(`/toggle-todo/${testId}`);
const loaded = await db('todos').select('*').where('id', testId).first();

t.assert(loaded.done==true);
const displayed = await supertest(app).get(`/`);
t.assert(displayed.text.includes('Test Todo'))
t.assert(displayed.text.includes('hotovo'))
} );

//The displayed information is actual
test.serial('if the information is actual' , async (t)=> {
  let response = await supertest(app).get(`/todo/${testId}`);
  t.assert(response.text.includes('<h1>Test Todo</h1>'))
  t.assert(response.text.includes('<option value="1" selected>Low</option>'))

   response = await supertest(app)
  .post(`/update-todo/${testId}`)
  .type('form')  
  .send({
    title: 'Updated Title',
    priority: 2
  })
  response = await supertest(app).get(`/todo/${testId}`);
 t.assert(response.text.includes('<h1>Updated Title</h1>'))
  t.assert(response.text.includes('<option value="2" selected>Normal</option>'))

  } );

//Deletion of todo
test.serial('Deletion of todo' , async (t)=> {
  let loaded = await db('todos').select('*').where('id', testId).first();
  t.assert(loaded.id===1);
  const res = await supertest(app)
        .get(`/remove-todo/${testId}`) 
        .expect(302);          
    t.is(res.headers.location, '/');
    loaded = await db('todos').select('*').where('id', testId).first();
    t.assert(loaded=== undefined);
} );

//Details are displayed
test.serial('if the details are displayed' , async (t)=> {
  const response = await supertest(app).get(`/todo/${testId}`)
t.assert(response.text.includes('<title>Todo Detail</title>'))
t.assert(response.text.includes('Test Todo'))
} );

const  prepareDatabase = async () => {
await db('todos').truncate();
await db('todos').insert({id: testId, title: 'Test Todo', done: false, priority:1});
};