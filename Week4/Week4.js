import http from 'http';
import { promises as fs } from 'fs';
import chalk from 'chalk';

const port = 3000
const server = http.createServer(async (req, res) => {
    res.statusCode = 200; // OK
    res.setHeader('Content-Type', 'text/html');
    try{
        let output = await respond(req.url,res)
        res.write(output.toString());
    } catch (error) {
        res.statusCode = 500;
        res.write("An error occurred");
      }
    res.end();
})
server.listen(port, () => {
  console.log(chalk.green(`Server listening at http://localhost:${port}`))
})

async function respond(request, res){
    let path = "./Week4/counter.txt";
    let out;
    switch(request){
        case "/increase":
             out = await change(1,path)
             return `Value increased to :${out}`;
        case "/decrease":
            out = await change(-1,path)
            return `Value decreased to :${out}`;
        case "/read":
            out = await change(0,path)
            return `Value currently is :${out}`;
        default:
            res.statusCode = 400; 
            return "Nothing to see here";
    }
}   
async function change(input, filePath){
    let r = parseInt(await read(filePath), 10);
    r = r + input;
    write(r,filePath);
    return r;
}
async function read(filePath){
    try{
        let source = await fs.readFile(filePath, 'utf8');
        return source 
    }catch(err){
        await write(0,filePath);
        return 0;
      }
}
async function write(input,filePath,){
    try{
        await fs.writeFile(filePath,input.toString(), 'utf8');
        return "Write operation success";
    }catch(err){
        return `Write operation failed ${err}`;
      }
}
