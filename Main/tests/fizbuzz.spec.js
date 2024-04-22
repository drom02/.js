import test from 'ava'
import {fizbuzz} from '../fizbuzz.js'

//Run|Debug
test('it returns fizz for number 9',(t)=>{
    const result = fizbuzz(9);
    t.is(result, 'fizz')
})