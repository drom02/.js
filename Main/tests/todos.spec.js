import test from 'ava'
import supertest from 'supertest'
import {app} from '.src/app.js'

//Run|Debug
test('it renders a list of todos' , async (t)=> {const response = await supertest(app).get('/')
t.assert(response.text.includes('<h1>Todos</h1>'))


} )