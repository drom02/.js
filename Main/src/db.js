import knex from 'knex'

import knexfile from '../knexfile.js'

export const db = knex(knexfile)

// Nebo pouze 'export' takzvaný jmenný export
// Jmenný export se importuje takto:
// import { getAllTodos } from './src/db.js'
// kde musíme dodržet název getAllTodos, pokud se nám nehodí můžeme přejmenovat:
// import { getAllTodos as libovolnyNazev } from './src/db.js'
export const getAllTodos = async () => {
  const todos = await db('todos').select('*')

  return todos
}