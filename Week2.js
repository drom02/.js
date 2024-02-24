console.log("Hi")
const fs = require('fs');
function readFileAsync(filePath) {
  return new Promise((resolve,reject)=>{
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(`Error reading file from disk: ${err}`);
      } else {
        resolve(data);
      }
    });
  });   
  }
// Asynchronously writing data to a file
function writeFileAsync(inputString,path){
    fs.writeFile(path, inputString, 'utf8', (err) => {
        if (err) {
          console.error(`Error writing file: ${err}`);
        } else {
          console.log('File written successfully');
        }
      });
}
async function parseSettings(){
  try{
    var source = await readFileAsync('C:/Users/matej/VSE/.js/settings.txt');
    var inputLoc = source.split(";")[0].split(":")[1];
    var target = source.split(";")[1].split(":")[1];
    try{var inputText = await readFileAsync(inputLoc)
      console.log(inputLoc);
      writeFileAsync(inputText,target);
      console.log(inputText);
    }catch(err){
      console.log("File not found")
    }
  
  }catch(err){

  }
  
  //
  
 // console.log(target)
}
parseSettings();
//writeFileAsync("testing testing",'C:/Users/matej/VSE/.js/test.js.txt')

